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
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { toast } from 'react-hot-toast'

const EditFactureForm = ({ facture }: { facture: FactureProps }) => {
  const [companies, setCompanies] = useState<CompanyProps[]>([])
  const [company, setCompany] = useState<string>('')
  const [clients, setClients] = useState<ClientProps[]>([])
  const [client, setClient] = useState<string>('')
  const [factureDate, setFactureDate] = useState('')
  const [factureNumber, setFactureNumber] = useState('')
  const [conditionPayment, setConditionPayment] = useState(0)
  const [paymentDue, setPaymentDue] = useState('')
  const [title, setTitle] = useState('-1')
  const [categories, setCategories] = useState<CategoryProps[]>([])
  const [category, setCategory] = useState('')
  const [items, setItems] = useState<ItemProps[]>([])
  const [item, setItem] = useState('')
  const [note, setNote] = useState('')
  const [payments, setPayments] = useState<PaymentProps[]>([])
  const [payment, setPayment] = useState('')
  const router = useRouter()
  const [rows, setRows] = useState<RowProps[]>([])
  const [subtotal, setSubtotal] = useState(0)
  const [commissions, setCommissions] = useState<CommissionProps[]>([])
  const [commission, setCommission] = useState('')
  const [selectedCommissionTaux, setSelectedCommissionTaux] = useState<
    number | null
  >(null)
  const [tauxValue, setTauxValue] = useState<number | null>(null)
  const [allTotal, setAllTotal] = useState(0)
  const [factureState, setFactureState] = useState({
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
    subtotal: 0,
    commission: '',
    allTotal: 0,
  })

  useEffect(() => {
    const fetchCompanyDetails = async () => {
      try {
        if (facture.company) {
          const res = await fetch(`/api/companies/${facture.company}`)
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
        if (facture.client) {
          const res = await fetch(`/api/clients/${facture.client}`)
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
        if (facture.payment) {
          const res = await fetch(`/api/payments/${facture.payment}`)
          if (res.ok) {
            const data = await res.json()
            setPayment(data.payment.bankName)
          }
        }
      } catch (error) {
        console.log(error)
      }
    }

    const fetchCommissionDetails = async () => {
      try {
        const res = await fetch(`/api/commissions/${facture.commission}`)
        if (res.ok) {
          const data = await res.json()
          const commissionName = data.commission
            ? data.commission.commissionName
            : '-1'
          const taux = data.commission ? data.commission.taux : '-1'
          console.log('Commission Name:', commissionName)
          console.log('Taux Value:', taux)
          setCommission(commissionName)
          setTauxValue(taux)
        }
      } catch (error) {
        console.error('Error fetching commission details:', error)
      }
    }

    const fetchRowsDetails = async () => {
      try {
        const res = await fetch(`/api/rows/${facture.rows}`)
        if (res.ok) {
          const data = await res.json()
          const rowsData = data.row ? [data.row] : []
          setRows(rowsData)
          const categoryPromises = rowsData.map(async (row) => {
            const resCat = await fetch(`/api/categories/${row.category}`)
            if (resCat.ok) {
              const dataCat = await resCat.json()
              const oneCat = dataCat.category ? dataCat.category.catName : null
              setCategory(oneCat)
            }
          })

          const itemPromises = rowsData.map(async (row) => {
            const resItem = await fetch(`/api/items/${row.item}`)
            if (resItem.ok) {
              const dataItem = await resItem.json()
              const oneItem = dataItem.item ? dataItem.item.itemName.fr : null
              setItem(oneItem)
            }
          })
          await Promise.all([...categoryPromises, ...itemPromises])
          calculAllTotal()
        }
      } catch (error) {
        console.log(error)
      }
    }

    const initialValues = async () => {
      try {
        setCompany(company ? company : '-1')
        setClient(client ? client : '-1')
        setFactureDate(facture.factureDate)
        setFactureNumber(facture.factureNumber)
        setConditionPayment(facture.conditionPayment)
        setPaymentDue(facture.paymentDue)
        setTitle(facture.title)
        setNote(facture.note)
        setPayment(payment ? payment : '-1')
        setSubtotal(facture.subtotal)
        setCommission(commission ? commission : '-1')
        setAllTotal(facture.allTotal)
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
    facture.company,
    facture.client,
    facture.factureDate,
    facture.factureNumber,
    facture.conditionPayment,
    facture.paymentDue,
    facture.title,
    facture.note,
    facture.payment,
    facture.rows,
    facture.subtotal,
    facture.commission,
    facture.allTotal,
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
  const calculateSubtotal = () => {
    const subtotalValue = rows.reduce((acc, row) => acc + row.total, 0)
    setSubtotal(subtotalValue)
  }
  useEffect(() => {
    calculateSubtotal()
  }, [rows])

  /* ================ Calcul all total====================*/
  const calculAllTotal = () => {
    const selectedCommissionTauxNumber = selectedCommissionTaux || 0
    const tauxValue = subtotal * (selectedCommissionTauxNumber * 0.01)
    setTauxValue(tauxValue)
    const allTotal = subtotal + tauxValue
    setAllTotal(allTotal)
  }
  useEffect(() => {
    const fetchData = async () => {
      await calculAllTotal()
    }
    fetchData()
  }, [subtotal, selectedCommissionTaux, allTotal])

  /* ================ fetch Companies ======================*/
  useEffect(() => {
    const fetchAllCompanies = async () => {
      try {
        const res = await fetch(`/api/companies`)
        if (res.ok) {
          const data = await res.json()
          setCompanies(data)
        }
      } catch (error) {
        console.log(error)
      }
    }
    fetchAllCompanies()
  }, [])

  /* ================ fetch Clients ======================*/
  useEffect(() => {
    const fetchAllClients = async () => {
      try {
        const res = await fetch(`/api/clients`)
        if (res.ok) {
          const data = await res.json()
          setClients(data)
        }
      } catch (error) {
        console.log(error)
      }
    }
    fetchAllClients()
  }, [])

  /* ================ fetch Payments ======================*/
  useEffect(() => {
    const fetchAllPayments = async () => {
      try {
        const res = await fetch('/api/payments')
        if (res.ok) {
          const data = await res.json()
          setPayments(data)
        }
      } catch (error) {
        console.log(error)
      }
    }
    fetchAllPayments()
  }, [])

  /* ================ fetch categories ======================*/
  useEffect(() => {
    const fetchAllCategories = async () => {
      try {
        const res = await fetch('/api/categories')
        if (res.ok) {
          const data = await res.json()
          setCategories(data)
        }
      } catch (error) {
        console.log(error)
      }
    }
    fetchAllCategories()
  }, [])

  /* ================ fetch Items ======================*/
  useEffect(() => {
    const fetchAllItems = async () => {
      try {
        const res = await fetch('/api/items')
        if (res.ok) {
          const data = await res.json()
          setItems(data)
        }
      } catch (error) {
        console.log(error)
      }
    }
    fetchAllItems()
  }, [])

  /* ================ fetch Commissions ======================*/
  useEffect(() => {
    const fetchAllCommissions = async () => {
      try {
        const res = await fetch('/api/commissions')
        if (res.ok) {
          const data = await res.json()
          setCommissions(data)
        }
      } catch (error) {
        console.log(error)
      }
    }
    fetchAllCommissions()
  }, [])

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
      setFactureState((prevFactureState) => ({
        ...prevFactureState,
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
      setFactureState((prevFactureState) => ({
        ...prevFactureState,
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
      setFactureState((prevFactureState) => ({
        ...prevFactureState,
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
    for (let i = 0; i < commissions.length; i++) {
      if (commissions[i].commissionName === selectedCommissionName) {
        console.log('Selected Commission Taux:', commissions[i].taux)
        setSelectedCommissionTaux(commissions[i].taux)
      }
    }
    try {
      const selectedCommissionInfo = await getCommissionInfoByName(
        selectedCommissionName
      )
      const selectedCommissionId = await selectedCommissionInfo._id
      setFactureState((prevFactureState) => ({
        ...prevFactureState,
        commission: selectedCommissionId,
      }))
    } catch (error) {
      console.error('Error fetching Commission information:', error)
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

  /* ================ handleUpdate ======================*/
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
      const res = await fetch(`/api/factures/${facture._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          company,
          client,
          factureDate,
          factureNumber,
          conditionPayment,
          paymentDue,
          title,
          rows: formattedRows,
          note,
          payment,
          subtotal,
          commission,
          allTotal,
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
    <div className="m-5 p-5 lg:max-w-4xl lg:mx-auto bg-white rounded shadow">
      <div className="new_invoice">
        <div className="new_invoice-header">
          <h2>Create a Facture</h2>
        </div>
        <form>
          <div className="new_invoice-body">
            {/* ================ Your company info ======================*/}
            <div className="bill_from">
              <p className="bill_title">BILL FROM</p>
              <div className="form_group">
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
            </div>
            {/* ================ Client info ======================*/}
            <div className="client">
              <p className="client_title">BILL TO</p>
              <div className="form_group">
                <select onChange={clientChange} value={client}>
                  <option value="">Choose Client</option>
                  {clients &&
                    clients.map((client) => (
                      <option key={client._id} value={client.clientName}>
                        {client.clientName}
                      </option>
                    ))}
                </select>
              </div>
            </div>
            {/* ================ Facture date ======================*/}
            <div className="facture_date">
              <p className="facture_date-title">FACTURE DATE</p>

              <div className="form_group">
                <p>Facture number: generate automatically</p>
                {factureNumber}
              </div>

              <div className="form_group inline_form-group">
                <div>
                  <p>Facture date</p>
                  <input
                    type="date"
                    placeholder="Facture Date"
                    onChange={(e) => setFactureDate(e.target.value)}
                    value={factureDate}
                  />
                </div>

                <div>
                  <p>Payment Terms</p>
                  <select
                    onChange={(e) =>
                      setConditionPayment(Number(e.target.value))
                    }
                    value={conditionPayment}
                  >
                    <option value="-1">Choose days</option>
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="30">30</option>
                    <option value="60">60</option>
                  </select>
                </div>

                <div>
                  <p>Payment due</p>
                  <input
                    type="date"
                    placeholder="Payment due"
                    value={paymentDue}
                    onChange={(e) => setPaymentDue(e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* ================ Payment ======================*/}
            <div className="payment">
              <p className="payment-title">Payment</p>

              <div className="form_group">
                <select onChange={paymentChange} className="" value={payment}>
                  <option value="-1">Choose Payment</option>
                  {payments &&
                    payments.map((payment) => (
                      <option key={payment._id} value={payment.bankName}>
                        {payment.bankName}
                      </option>
                    ))}
                </select>
              </div>
            </div>

            {/* ================ Note ======================*/}
            <div className="note">
              <div>
                <p className="note-title">Note (*Option)</p>
                <textarea
                  placeholder="note"
                  onChange={(e) => setNote(e.target.value)}
                  value={note}
                />
              </div>
            </div>

            {/* ================ Items ======================*/}
            <div className="item_details">
              <p className="item_details-title">ITEM LIST</p>

              <div className="form_group inline_form-group">
                <div>
                  <select
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                  >
                    <option value="-1">Choose a Title</option>
                    <option value="preparation">preparation</option>
                    <option value="reperage">reperage</option>
                    <option value="tournage">tournage</option>
                  </select>
                </div>
              </div>

              {/* ================ Items Details Start ======================*/}
              <div className="rows">
                {rows?.map((row, i) => (
                  <div className="row" key={i}>
                    <div className="form_group inline_form-group">
                      <div className="form_group">
                        <div>
                          <select
                            name="category"
                            onChange={(e) => handlerChange(e, i)}
                            value={category}
                          >
                            <option value="-1">Choose Category</option>
                            {categories &&
                              categories.map((category) => (
                                <option
                                  key={category._id}
                                  value={category.catName}
                                >
                                  {category.catName}
                                </option>
                              ))}
                          </select>
                        </div>
                      </div>

                      <div className="form_group">
                        <div>
                          <select
                            name="item"
                            onChange={(e) => handlerChange(e, i)}
                            value={item}
                          >
                            <option value="-1">Choose Item Name</option>
                            {items &&
                              items.map((item) => (
                                <option key={item._id} value={item.itemName.fr}>
                                  {item.itemName.fr}
                                </option>
                              ))}
                          </select>
                        </div>
                      </div>

                      <div className="form_group">
                        <div>
                          <p>You can add</p>
                          <input
                            name="itemPlus"
                            type="text"
                            placeholder="Plus"
                            onChange={(e) => handlerChange(e, i)}
                            value={row.itemPlus}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="form_group inline_form-group">
                      <div className="form_group">
                        <div>
                          <p>Qty</p>
                          <input
                            name="qty"
                            type="number"
                            placeholder="Qty"
                            onChange={(e) => handlerChange(e, i)}
                            value={row.qty}
                          />
                        </div>
                      </div>

                      <div className="form_group">
                        <div>
                          <p>Unit</p>
                          <input
                            name="unit"
                            type="text"
                            placeholder="unit"
                            onChange={(e) => handlerChange(e, i)}
                            value={row.unit}
                          />
                        </div>
                      </div>

                      <div className="form_group">
                        <div>
                          <p>Price</p>
                          <input
                            name="price"
                            type="number"
                            placeholder="price"
                            onChange={(e) => handlerChange(e, i)}
                            value={row.price}
                          />
                        </div>
                      </div>

                      <div className="form_group">
                        <div>
                          <p>Total</p>
                          <div>{row.total}</div>
                        </div>
                      </div>
                      <button onClick={() => deleteRow(i)}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-6 h-6"
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
                ))}
              </div>
            </div>
            <div className="flex justify-center">
              <button
                onClick={handleAddItem}
                className="flex items-center gap-3"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>{' '}
                <p>create item</p>
              </button>
            </div>
            {/* ================ Total calcul Start ======================*/}
            <div className="create_facture-calcul flex flex-col border mt-10">
              <div className="form_group flex items-center gap-12 justify-end">
                <p>Subtotal</p>
                <p>{subtotal}</p>
              </div>
              <div className="form_group flex items-center gap-12 justify-end">
                <select onChange={commissionChange} value={commission}>
                  <option value="">Choose your commission</option>
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
                {selectedCommissionTaux !== null
                  ? `${selectedCommissionTaux}%`
                  : ''}
                <div>{tauxValue}</div>
              </div>
              <div className="form_group flex items-center gap-12 justify-end">
                <div>All total</div>
                <p>{allTotal}</p>
              </div>
            </div>
            <div className="facture_btn">
              <button className="mark_as-btn" onClick={handleSendAndSave}>
                Update
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditFactureForm
