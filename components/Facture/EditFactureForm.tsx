'use client'

import {
  CategoryProps,
  ClientProps,
  CommissionProps,
  CompanyProps,
  FactureProps,
  ItemProps,
  PaymentProps,
  RowProps,
} from '@/types'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { v4 as uuidv4 } from 'uuid'

interface EditFactureFormProps {
  initialData: FactureProps
  companies: CompanyProps[]
  clients: ClientProps[]
  payments: PaymentProps[]
  categories: CategoryProps[]
  items: ItemProps[]
  commissions: CommissionProps[]
}

const EditFactureForm: React.FC<EditFactureFormProps> = ({
  initialData,
  companies,
  clients,
  payments,
  categories,
  items,
  commissions,
}) => {
  const [company, setCompany] = useState('')
  const [client, setClient] = useState('')
  const [factureDate, setFactureDate] = useState('')
  const [factureNumber, setFactureNumber] = useState('')
  const [conditionPayment, setConditionPayment] = useState(0)
  const [paymentDue, setPaymentDue] = useState('')
  const [title, setTitle] = useState('-1')
  const [category, setCategory] = useState('')
  const [item, setItem] = useState('')
  const [note, setNote] = useState('')
  const [payment, setPayment] = useState('')
  const router = useRouter()
  const [rows, setRows] = useState<RowProps[]>([])
  const [subtotal, setSubtotal] = useState(0)
  const [commission, setCommission] = useState('')
  const [tauxValue, setTauxValue] = useState<number | null>(null)
  const [selectedCommissionTaux, setSelectedCommissionTaux] = useState<
    number | null
  >(null)
  const [allTotal, setAllTotal] = useState(0)
  const [facture, setFacture] = useState({
    company: '',
    client: '',
    factureDate: '',
    factureNumber: '',
    conditionPayment: 0,
    paymentDue: '',
    title: '',
    note: '',
    payment: '',
    rows: [],
    commission: '',
  })

  useEffect(() => {
    const fetchCompanyDetails = async () => {
      try {
        if (initialData.company) {
          const res = await fetch(`/api/companies/${initialData.company}`)
          if (res.ok) {
            const data = await res.json()
            setCompany(data.company.name)
          }
        }
      } catch (error) {
        console.log(error)
      }
    }

    const fetchClientDetails = async () => {
      try {
        if (initialData.client) {
          const res = await fetch(`/api/clients/${initialData.client}`)
          if (res.ok) {
            const data = await res.json()
            setClient(data.client.clientName)
          }
        }
      } catch (error) {
        console.log(error)
      }
    }

    const fetchPaymentDetails = async () => {
      try {
        if (initialData.payment) {
          const res = await fetch(`/api/payments/${initialData.payment}`)
          if (res.ok) {
            const data = await res.json()
            setPayment(data.payment.bankName)
          }
        }
      } catch (error) {
        console.log(error)
      }
    }

    // const fetchCommissionDetails = async () => {
    //   try {
    //     const res = await fetch(`/api/commissions/${initialData.commission}`)
    //     if (res.ok) {
    //       const data = await res.json()
    //       const commissionName = data.commission
    //         ? data.commission.commissionName
    //         : '-1'
    //       const taux = data.commission ? data.commission.taux : '-1'
    //       setCommission(commissionName)
    //       setTauxValue(taux)
    //     }
    //   } catch (error) {
    //     console.error('Error fetching commission details:', error)
    //   }
    // }
    const fetchCommissionDetails = async () => {
      try {
        const res = await fetch(`/api/commissions/${initialData.commission}`)
        if (res.ok) {
          const data = await res.json()
          const commissionTaux = data.commission ? data.commission.taux : null
          setCommission(data.commission ? data.commission.commissionName : '-1')
          setTauxValue(
            commissionTaux !== null ? subtotal * (commissionTaux * 0.01) : null
          )
        }
      } catch (error) {
        console.error('Error fetching commission details:', error)
      }
    }

    const fetchRowsDetails = async () => {
      try {
        const rowPromises = initialData.rows.map(async (rowId) => {
          const res = await fetch(`/api/rows/${rowId}`)
          if (res.ok) {
            const data = await res.json()
            return data.row || null
          } else {
            return null
          }
        })
        const rowsData = await Promise.all(rowPromises)
        setRows(rowsData.filter(Boolean)) // レスポンスからrowsを取り出す

        const categoryPromises = rowsData.map(async (row: RowProps) => {
          const resCat = await fetch(`/api/categories/${row.category}`)
          if (resCat.ok) {
            const dataCat = await resCat.json()
            const oneCat = dataCat.category ? dataCat.category.catName : null
            setCategory(oneCat)
          }
        })

        const itemPromises = rowsData.map(async (row: RowProps) => {
          const resItem = await fetch(`/api/items/${row.item}`)
          if (resItem.ok) {
            const dataItem = await resItem.json()
            const oneItem = dataItem.item ? dataItem.item.itemName.fr : null
            setItem(oneItem)
          }
        })
        // Promise.allで全ての非同期処理が完了するのを待つ
        await Promise.all([...categoryPromises, ...itemPromises])
      } catch (error) {
        console.log(error)
      }
    }

    const initialValues = async () => {
      try {
        setCompany(company ? company : '-1')
        setClient(client ? client : '-1')
        setFactureDate(initialData.factureDate)
        setFactureNumber(initialData.factureNumber)
        setConditionPayment(initialData.conditionPayment)
        setPaymentDue(initialData.paymentDue)
        setTitle(initialData.title)
        setNote(initialData.note)
        setPayment(payment ? payment : '-1')
        setCommission(commission ? commission : '-1')
      } catch (error) {
        console.error('Error fetching initial values:', error)
      }
    }
    fetchCompanyDetails()
    fetchClientDetails()
    fetchPaymentDetails()
    fetchCommissionDetails()
    fetchRowsDetails()
    initialValues()
  }, [
    initialData.company,
    initialData.client,
    initialData.factureDate,
    initialData.factureNumber,
    initialData.conditionPayment,
    initialData.paymentDue,
    initialData.title,
    initialData.note,
    initialData.payment,
    initialData.rows,
    initialData.commission,
    company,
    client,
    commission,
    payment,
    rows,
    subtotal,
  ])

  /* ================ Calcul Payment Due Date ======================*/
  useEffect(() => {
    const calculatePaymentDue = () => {
      if (factureDate && conditionPayment !== 0) {
        const factureDateObj = new Date(factureDate)
        const daysToAdd = conditionPayment
        const paymentDueDate = new Date(factureDateObj)
        paymentDueDate.setDate(factureDateObj.getDate() + daysToAdd)
        setPaymentDue(paymentDueDate.toISOString().split('T')[0])
      }
    }
    calculatePaymentDue()
  }, [factureDate, conditionPayment])

  /* ================ Calcul Subtotal ======================*/
  useEffect(() => {
    const calculateSubtotal = () => {
      const subtotalValue = rows.reduce((acc, row) => acc + row.total, 0)
      setSubtotal(subtotalValue)
    }
    calculateSubtotal()
  }, [rows])

  /* ================ Calcul all total====================*/
  useEffect(() => {
    const calculAllTotal = () => {
      const selectedCommissionTauxNumber = selectedCommissionTaux || 0
      const tauxValue = subtotal * (selectedCommissionTauxNumber * 0.01)
      setTauxValue(tauxValue)
      const allTotal = subtotal + tauxValue
      setAllTotal(allTotal)
    }
    calculAllTotal()
  }, [subtotal, selectedCommissionTaux, allTotal])

  /* ================ Company ======================*/
  const getCompanyInfoByName = async (companyName: string) => {
    return {
      _id: 'someObjectId',
      name: companyName,
    }
  }
  const companyChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCompanyName = e.target.value
    setCompany(selectedCompanyName)
    try {
      const selectedCompanyInfo = await getCompanyInfoByName(
        selectedCompanyName
      )
      const selectedCompanyId = selectedCompanyInfo._id
      setFacture((prevFacture) => ({
        ...prevFacture,
        company: selectedCompanyId,
      }))
    } catch (error) {
      console.error('Error fetching company information:', error)
    }
  }

  /* ================ Client ======================*/
  const getClientInfoByName = async (clientName: string) => {
    return {
      _id: 'someObjectId',
      name: clientName,
    }
  }
  const clientChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedClientName = e.target.value.trim()
    setClient(selectedClientName)
    try {
      const selectedClientInfo = await getClientInfoByName(selectedClientName)
      const selectedClientId = selectedClientInfo._id
      setFacture((prevFacture) => ({
        ...prevFacture,
        client: selectedClientId,
      }))
    } catch (error) {
      console.error('Error fetching client information:', error)
    }
  }

  /* ================ Payment ======================*/
  const getPaymentInfoByName = async (bankName: string) => {
    return {
      _id: 'someObjectId',
      name: bankName,
    }
  }
  const paymentChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedPaymentName = e.target.value.trim()
    setPayment(selectedPaymentName)
    try {
      const selectedPaymentInfo = await getPaymentInfoByName(
        selectedPaymentName
      )
      const selectedPaymentId = selectedPaymentInfo._id
      setFacture((prevFacture) => ({
        ...prevFacture,
        payment: selectedPaymentId,
      }))
    } catch (error) {
      console.error('Error fetching Payment information:', error)
    }
  }

  /* ================ Select commission name and display taux ======================*/
  const getCommissionInfoByName = async (commissionName: string) => {
    return {
      _id: 'someObjectId',
      name: commissionName,
    }
  }
  const commissionChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCommissionName = e.target.value.trim()
    setCommission(selectedCommissionName)

    const selectedCommission = commissions.find(
      (commission) => commission.commissionName === selectedCommissionName
    )

    if (selectedCommission) {
      setSelectedCommissionTaux(selectedCommission.taux)
      try {
        const selectedCommissionInfo = await getCommissionInfoByName(
          selectedCommissionName
        )

        const selectedCommissionId = selectedCommissionInfo._id
        setFacture((prevFacture) => ({
          ...prevFacture,
          commission: selectedCommissionId,
        }))
      } catch (error) {
        console.error('Error fetching Commission information:', error)
      }
    }
  }

  /* ================ Category ======================*/
  const getCategoryInfoByName = async (catName: string) => {
    return {
      _id: 'somObjectId',
      name: catName,
    }
  }
  const categoryChange = async (
    e: React.ChangeEvent<HTMLSelectElement>,
    i: number
  ) => {
    const selectCategoryName = e.target.value.trim()
    setCategory(selectCategoryName)
    try {
      const selectedCategoryInfo = await getCategoryInfoByName(
        selectCategoryName
      )
      const selectedCategoryId = selectedCategoryInfo._id

      setRows((prevRows) => {
        const updatedRows = [...prevRows]
        updatedRows[i].category = {
          _id: selectedCategoryId,
          catName: selectCategoryName,
        }
        return updatedRows
      })
    } catch (error) {
      console.log('Error fetching Category information:', error)
    }
  }

  /* ================ Item ======================*/
  const getItemInfoByName = async (itemName: string) => {
    return {
      _id: 'someObjectId',
      name: itemName,
    }
  }
  const itemChange = async (
    e: React.ChangeEvent<HTMLSelectElement>,
    i: number
  ) => {
    const selectItemName = e.target.value.trim()
    setItem(selectItemName)
    try {
      const selectedItemInfo = await getItemInfoByName(selectItemName)
      const selectedItemId = selectedItemInfo._id
      setRows((prevRows) => {
        const updatedRows = [...prevRows]
        updatedRows[i].item = {
          _id: selectedItemId,
          itemName: {
            fr: selectItemName,
            jp: selectItemName,
          },
        }
        return updatedRows
      })
    } catch (error) {
      console.log('Error fetching Item information:', error)
    }
  }

  /* ================ Add row for item ======================*/
  const addRow = () => {
    setRows([
      ...rows,
      {
        _id: uuidv4(),
        category: { _id: '_id', catName: 'catName' },
        item: {
          _id: '_id',
          itemName: { fr: 'ItemName.fr', jp: 'ItemName.jp' },
        },
        itemPlus: '',
        qty: 0,
        price: 0,
        unit: '',
        total: 0,
      },
    ])
  }

  /* ================ handlerChange ======================*/
  const handlerChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    i: number
  ) => {
    const { name, value } = e.target
    const list = [...rows]

    if (
      name === 'category' ||
      name === 'item' ||
      name === 'itemPlus' ||
      name === 'unit' ||
      name === ''
    ) {
      list[i][name] = value
    } else {
      list[i][name] = parseFloat(value)
    }

    list[i]['total'] = list[i]['qty'] * list[i]['price']
    setRows(list)
  }
  const handleAddItem = (e: React.MouseEvent) => {
    e.preventDefault()
    addRow()
  }

  /* ================ Delete row ======================*/
  const deleteRow = (i: number) => {
    const updatedRows = rows.filter((row, index) => index !== i)
    setRows(updatedRows)
  }

  /* ================ handleSendAndSave ======================*/
  const handleSendAndSave = async (e: React.FormEvent) => {
    e.preventDefault()

    const formattedRows = rows.map((row) => {
      return {
        category: row.category,
        item: row.item,
        itemPlus: row.itemPlus,
        qty: row.qty,
        price: row.price,
        unit: row.unit,
        total: row.total,
      }
    })

    try {
      const res = await fetch('/api/factures', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          company,
          client,
          factureDate,
          factureNumber: factureNumber,
          conditionPayment,
          paymentDue,
          title,
          rows: formattedRows,
          note,
          payment,
          commission,
        }),
      })
      if (res.ok) {
        toast.success('Update Facture successfully')
        router.push('/dashboard')
        router.refresh()
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="editFactureForm m-5 p-5 bg-white rounded shadow">
      <div className="editFactureForm_container">
        <div className="editFactureForm_header">
          <div className="editFactureForm_header-logo">
            <h3>Edit a Facture</h3>
          </div>
          <Link href="/dashboard" className="flex items-center gap-2 mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="w-6 h-6 text-slate-400"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="m11.25 9-3 3m0 0 3 3m-3-3h7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
            <span className="text-sm text-slate-400">Return</span>
          </Link>
        </div>

        <form className="form_container">
          <div className="flex flex-col">
            <div className="form_group inline_form-group">
              {/* ================ Your company info ======================*/}
              <div className="company w-1/3">
                <label>BILL FROM</label>
                {companies.length > 0 && (
                  <select onChange={companyChange} value={company}>
                    <option value="">Choose your company</option>
                    {companies &&
                      companies.map((company) => (
                        <option key={company._id} value={company.name}>
                          {company.name}
                        </option>
                      ))}
                  </select>
                )}
              </div>
              {/* ================ Client info ======================*/}
              <div className="client w-1/3">
                <label>BILL TO</label>
                <select onChange={clientChange} value={client}>
                  <option value="">Choose Client</option>
                  {clients && Array.isArray(clients) ? (
                    clients.map((client) => (
                      <option key={client._id} value={client.clientName}>
                        {client.clientName}
                      </option>
                    ))
                  ) : (
                    <option value="-1">Loading clients...</option>
                  )}
                </select>
              </div>
              {/* ================ Facture number ======================*/}
              <div className="facture_number w-1/3">
                <label>FACTURE DATE</label>
                <div>
                  <p>{initialData.factureNumber}</p>
                </div>
              </div>
            </div>

            <div className="form_group inline_form-group">
              {/* ================ Facture date ======================*/}
              <div className="facture_date w-1/3">
                <label>Facture date</label>
                <input
                  type="date"
                  placeholder="Facture Date"
                  onChange={(e) => setFactureDate(e.target.value)}
                  value={initialData.factureDate}
                />
              </div>

              {/* ================ Payment terms ======================*/}
              <div className="payment_terms w-1/3">
                <label>Payment Terms</label>
                <select
                  onChange={(e) => setConditionPayment(Number(e.target.value))}
                  value={initialData.conditionPayment}
                >
                  <option value="-1">Choose days</option>
                  <option value="10">10</option>
                  <option value="20">20</option>
                  <option value="30">30</option>
                  <option value="60">60</option>
                </select>
              </div>

              {/* ================ Payment due ======================*/}
              <div className="payment_due w-1/3">
                <label>Payment due</label>
                <input
                  type="date"
                  placeholder="Payment due"
                  value={initialData.paymentDue}
                  onChange={(e) => setPaymentDue(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="form_group inline_form-group">
            {/* ================ Payment ======================*/}
            <div className="payment w-1/3">
              <label>Payment Moyen</label>
              <select onChange={paymentChange} value={payment}>
                <option value="-1">Choose Payment</option>
                {payments &&
                  payments.map((payment) => (
                    <option key={payment._id} value={payment.bankName}>
                      {payment.bankName}
                    </option>
                  ))}
              </select>
            </div>
            {/* ================ Note ======================*/}
            <div className="note w-1/3">
              <label>Note (*Option)</label>
              <textarea
                placeholder="note"
                onChange={(e) => setNote(e.target.value)}
                value={initialData.note}
              />
            </div>
            {/* ================ Items ======================*/}
            <div className="item_details w-1/3">
              <label>ITEM LIST</label>

              <select
                onChange={(e) => setTitle(e.target.value)}
                value={initialData.title}
              >
                <option value="-1">Choose a Title</option>
                <option value="preparation">preparation</option>
                <option value="reperage">reperage</option>
                <option value="tournage">tournage</option>
              </select>
            </div>
          </div>

          {/* ================ Items Details Start ======================*/}
          <div className="border border-stone-300 rounded bg-stone-300 p-4">
            {rows?.map((row, i) => (
              <>
                <div className="form_group inline_form-group" key={i}>
                  <div className="form_group w-2/12 mr-1">
                    <label>Category</label>
                    <select
                      name="category"
                      onChange={(e) => handlerChange(e, i)}
                      value={category}
                    >
                      <option value="-1" className="text-sm">
                        Choose Category
                      </option>
                      {categories &&
                        categories.map((category) => (
                          <option
                            key={category._id}
                            value={category.catName}
                            className="text-sm"
                          >
                            {category.catName}
                          </option>
                        ))}
                    </select>
                  </div>

                  <div className="form_group w-3/12 mr-1">
                    <label>Item Name</label>
                    <select
                      name="item"
                      onChange={(e) => handlerChange(e, i)}
                      value={item}
                    >
                      <option value="-1">Choose Item Name</option>
                      {items &&
                        items.map((item) => (
                          <option
                            key={item._id}
                            value={item.itemName.fr}
                            className="text-sm"
                          >
                            {item.itemName.fr}
                          </option>
                        ))}
                    </select>
                    <input
                      name="itemPlus"
                      type="text"
                      placeholder="Plus"
                      onChange={(e) => handlerChange(e, i)}
                      value={row.itemPlus}
                      className="mt-2"
                    />
                  </div>

                  <div className="form_group w-1/12 mr-1">
                    <label>Qty</label>
                    <input
                      name="qty"
                      type="number"
                      placeholder="ex) 1"
                      onChange={(e) => handlerChange(e, i)}
                      value={row.qty}
                      className="inputText text-sm"
                    />
                  </div>

                  <div className="form_group w-1/12 mr-1">
                    <label>Unit</label>
                    <input
                      name="unit"
                      type="text"
                      placeholder="ex) day"
                      onChange={(e) => handlerChange(e, i)}
                      value={row.unit}
                      className="inputText text-sm"
                    />
                  </div>

                  <div className="form_group w-1/12 mr-1">
                    <label>Price</label>
                    <input
                      name="price"
                      type="number"
                      placeholder="ex) 350"
                      onChange={(e) => handlerChange(e, i)}
                      value={row.price}
                      className="inputText text-sm"
                    />
                  </div>

                  <div className="form_group w-2/12">
                    <label>Total</label>
                    <div>{row.total}</div>
                  </div>

                  <div className="form_group w-1/12">
                    <label>Delete</label>
                    <button onClick={() => deleteRow(i)}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-9 h-9 text-red-400"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </>
            ))}
          </div>
          <div className="flex justify-center mb-20">
            <button
              onClick={handleAddItem}
              className="btn-gray flex items-center gap-3"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-9 h-9"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>{' '}
              <p>Add Item</p>
            </button>
          </div>

          {/* ================ Total calcul Start ======================*/}
          <div className="flex flex-col items-end">
            <div className="calcul-container w-1/2 border border-slate-800 p-8">
              <div className="flex justify-between border-b-2">
                <div className="form_group">
                  <label>Subtotal</label>
                </div>
                <p>{subtotal}</p>
              </div>
              <div className="form_group inline_form-group gap-2 border-b-2 pt-4">
                <div className="form_group w-2/3">
                  <label>Commission</label>
                  <select onChange={commissionChange} value={commission}>
                    <option value="-1">Choose your commission</option>
                    {commissions &&
                      commissions.map((commission: CommissionProps) => (
                        <option
                          key={commission._id}
                          value={commission.commissionName}
                        >
                          {commission.commissionName}
                        </option>
                      ))}
                  </select>
                </div>
                <div className="form_group w-1/3">
                  <label>TAUX</label>
                  <p>
                    {selectedCommissionTaux !== null
                      ? `${selectedCommissionTaux} %`
                      : ''}
                    {tauxValue !== null ? tauxValue : ''}
                  </p>
                </div>
                <p>{tauxValue ? tauxValue + subtotal : null}</p>
              </div>
              <div className="flex justify-between">
                <div className="form_group">
                  <label>All total</label>
                </div>
                <h2>{allTotal}</h2>
              </div>
            </div>
          </div>

          <div className="btn_container">
            <button className="btn" onClick={handleSendAndSave}>
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditFactureForm
