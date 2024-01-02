'use client'

import {
  CategoryProps,
  CommissionProps,
  FactureProps,
  ItemProps,
  RowProps,
} from '@/types'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import CompanyData from '../Company/CompanyData'
import ClientData from '../Client/ClientData'
import PaymentData from '../Payment/PaymentData'
import CategoryData from '../Category/CategoryData'
import ItemData from '../Item/ItemData'
import CommissionData from '../Commission/CommissionData'
import CalculateSubtotal from './CalculateSubtotal'
import CalculateAllTotal from './CalculateAllTotal'
import CalculatePaymentDue from './CalculatePaymentDue '

interface EditFactureFormProps {
  factureData: FactureProps | null
  setFactureData: React.Dispatch<React.SetStateAction<FactureProps | null>>
}
const EditFactureForm: React.FC<EditFactureFormProps> = ({
  factureData,
  setFactureData,
}) => {
  const { companies, setCompanies } = CompanyData()
  const { clients, setClients } = ClientData()
  const { payments, setPayments } = PaymentData()
  const { categories, setCategories } = CategoryData()
  const { items, setItems } = ItemData()
  const { commissions, setCommissions } = CommissionData()
  const [company, setCompany] = useState('')
  const [client, setClient] = useState('')
  const [factureDate, setFactureDate] = useState('')
  const [factureNumber, setFactureNumber] = useState('')
  const [conditionPayment, setConditionPayment] = useState(0)
  const { paymentDue, setPaymentDue } = CalculatePaymentDue(
    factureDate,
    conditionPayment
  )
  const [title, setTitle] = useState('')
  const [currentCategories, setCurrentCategories] = useState<CategoryProps[]>(
    []
  )
  const [category, setCategory] = useState('')
  // const [currentItems, setCurrentItems] = useState<ItemProps[]>([
  //   {
  //     _id: '',
  //     itemName: {
  //       fr: '',
  //       jp: '',
  //     },
  //   },
  // ])
  const [currentItems, setCurrentItems] = useState<ItemProps[]>([])
  const [item, setItem] = useState('')
  const [note, setNote] = useState('')
  const [payment, setPayment] = useState('')
  const [rows, setRows] = useState<RowProps[]>([])
  const { subtotal, setSubtotal } = CalculateSubtotal(rows)
  const [commission, setCommission] = useState('')
  const {
    allTotal,
    setAllTotal,
    selectedCommissionTaux,
    setSelectedCommissionTaux,
    tauxValue,
    setTauxValue,
  } = CalculateAllTotal(subtotal)
  const router = useRouter()
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
    allTotal: 0,
  })

  useEffect(() => {
    const fetchCompanyDetails = async () => {
      try {
        const companyId = factureData?.company
        if (companyId) {
          const res = await fetch(
            `${process.env.NEXTAUTH_URL}/api/companies/${companyId}`
          )
          if (res.ok) {
            const data = await res.json()
            setCompany(data.company.name)
          }
        }
      } catch (error) {
        console.log(error)
      }
    }
    fetchCompanyDetails()
  }, [factureData?.company])

  useEffect(() => {
    const fetchClientDetails = async () => {
      try {
        const clientId = factureData?.client
        if (clientId) {
          const res = await fetch(
            `${process.env.NEXTAUTH_URL}/api/clients/${clientId}`
          )
          if (res.ok) {
            const data = await res.json()
            setClient(data.client.clientName || '')
          }
        }
      } catch (error) {
        console.log(error)
      }
    }
    fetchClientDetails()
  }, [factureData?.client])

  useEffect(() => {
    const fetchPaymentDetails = async () => {
      try {
        const paymentId = factureData?.payment
        if (paymentId) {
          const res = await fetch(
            `${process.env.NEXTAUTH_URL}/api/payments/${paymentId}`
          )
          if (res.ok) {
            const data = await res.json()
            setPayment(data.payment.bankName || '')
          }
        }
      } catch (error) {
        console.log(error)
      }
    }
    fetchPaymentDetails()
  }, [factureData?.payment])

  useEffect(() => {
    const fetchCommissionDetails = async () => {
      try {
        const commissionId = factureData?.commission
        if (commissionId) {
          const res = await fetch(
            `${process.env.NEXTAUTH_URL}/api/commissions/${commissionId}`
          )
          if (res.ok) {
            const data = await res.json()
            setCommission(data.commission.commissionName)
            setSelectedCommissionTaux(data.commission.taux)
          }
        }
      } catch (error) {
        console.error('Error fetching commission details:', error)
      }
    }
    fetchCommissionDetails()
  }, [factureData?.commission])

  useEffect(() => {
    const fetchRowsDetails = async () => {
      try {
        const rowPromises =
          factureData?.rows?.map(async (rowId) => {
            const res = await fetch(
              `${process.env.NEXTAUTH_URL}/api/rows/${rowId}`
            )
            if (res.ok) {
              const data = await res.json()
              return data.row || null
            } else {
              return null
            }
          }) || []
        const rowsData = await Promise.all(rowPromises)
        setRows(rowsData.filter(Boolean))

        const categoryPromises = rowsData.map(async (row: RowProps) => {
          const resCat = await fetch(`/api/categories/${row.category}`)
          if (resCat.ok) {
            const dataCat = await resCat.json()
            return dataCat.category ? dataCat.category : null
          } else {
            return null
          }
        })

        const itemPromises = rowsData.map(async (row: RowProps) => {
          const resItem = await fetch(`/api/items/${row.item}`)
          if (resItem.ok) {
            const dataItem = await resItem.json()
            return dataItem.item ? dataItem.item : null
          } else {
            return null
          }
        })

        const updatedCategories = await Promise.all<CategoryProps>(
          categoryPromises
        )
        setCurrentCategories(updatedCategories)
        const updatedItems = await Promise.all<ItemProps>(itemPromises)
        setCurrentItems(updatedItems)
      } catch (error) {
        console.log(error)
      }
    }
    fetchRowsDetails()
  }, [factureData?.rows])

  useEffect(() => {
    const initialValues = async () => {
      try {
        setCompany(company || '')
        setClient(client || '')
        setFactureDate(factureData?.factureDate || '')
        setFactureNumber(factureData?.factureNumber || '')
        setConditionPayment(factureData?.conditionPayment || 0)
        setPaymentDue(factureData?.paymentDue || '')
        setTitle(factureData?.title || '')
        setNote(factureData?.note || '')
        setRows(factureData?.rows || [])
        setPayment(payment || '')
        setCommission(commission || '')
      } catch (error) {
        console.error('Error fetching initial values:', error)
      }
    }
    initialValues()
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

  /* ============= Select commission name and display taux ===================*/
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
        _id: '',
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

  /* ================ handlerChange (row)======================*/
  const [selectedItemInfo, setSelectedItemInfo] = useState<
    (ItemProps | null)[]
  >(Array(rows.length).fill(null))

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

    if (name === 'item') {
      const selectedItemName = value
      const selectedItem = items.find(
        (item) => item.itemName.fr === selectedItemName
      )

      setSelectedItemInfo((prevSelected) => {
        const updatedSelected: (ItemProps | null)[] = [...(prevSelected || [])]
        updatedSelected[i] = selectedItem || null
        return updatedSelected
      })
    }
  }

  /* ================ Handle Add row ======================*/
  const handleAddItem = (e: React.MouseEvent) => {
    e.preventDefault()
    addRow()
    setSelectedItemInfo((prevSelected) => [...prevSelected, null])
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
      const res = await fetch(
        `${process.env.NEXTAUTH_URL}/api/factures/${factureData?._id}`,
        {
          method: 'PUT',
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
        }
      )
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
    <div className="editFactureForm">
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
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 text-slate-400"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m11.25 9-3 3m0 0 3 3m-3-3h7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
            <span className="text-sm text-slate-400">Return</span>
          </Link>
        </div>

        <form className="w-full">
          <div className="w-1/2">
            {/* ================ Your company info ======================*/}
            <div className="form_group w-1/2 mb-4">
              <label>BILL FROM</label>
              {companies?.length > 0 && (
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
            <div className="form_group w-1/2 mb-4">
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
            <div className="form_group mb-4">
              <label>FACTURE NUMBER</label>
              <div>
                <p>{factureData?.factureNumber}</p>
              </div>
            </div>

            {/* ================ Facture date ======================*/}
            <div className="form_group w-1/2 mb-4">
              <label>Facture date</label>
              <input
                type="date"
                placeholder="Facture Date"
                onChange={(e) => setFactureDate(e.target.value)}
                value={factureData?.factureDate}
              />
            </div>

            {/* ================ Payment terms ======================*/}
            <div className="form_group w-1/2 mb-4">
              <label>Payment Terms</label>
              <select
                onChange={(e) => setConditionPayment(Number(e.target.value))}
                value={factureData?.conditionPayment}
              >
                <option value="-1">Choose days</option>
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="30">30</option>
                <option value="60">60</option>
              </select>
            </div>

            {/* ================ Payment due ======================*/}
            <div className="form_group w-1/2 mb-4">
              <label>Payment due</label>
              <p>{paymentDue}</p>
            </div>

            {/* ================ Payment ======================*/}
            <div className="form_group w-1/2 mb-4">
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

            {/* ================ Title ======================*/}
            <div className="form_group w-1/2 mb-4">
              <label>TITLE LIST</label>
              <select
                onChange={(e) => setTitle(e.target.value)}
                value={factureData?.title}
              >
                <option value="-1">Choose a Title</option>
                <option value="preparation">PREPARATION</option>
                <option value="reperage">REPERAGE</option>
                <option value="tournage">TOURNAGE</option>
              </select>
            </div>
          </div>

          {/* ================ Items Details Start ======================*/}
          <div className="my-8 min-full">
            <table className="tablelayout w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                {/* ================ Note ======================*/}
                <tr>
                  <th scope="col" className="px-1 py-1">
                    <input
                      name="note"
                      type="string"
                      placeholder="ex. November 2023"
                      onChange={(e) => setNote(e.target.value)}
                      value={factureData?.note}
                      className="text-sm"
                    />
                  </th>
                </tr>
                <tr>
                  <th scope="col" className="px-6 py-3">
                    <p>Category</p>
                  </th>
                  <th scope="col" className="px-6 py-3">
                    <p>
                      Description
                      <br />
                      (French)
                    </p>
                  </th>
                  <th scope="col" className="px-6 py-3">
                    <p>
                      Description
                      <br />
                      (Japanese)
                    </p>
                  </th>
                  <th scope="col" className="px-6 py-3">
                    <p>Qty</p>
                  </th>
                  <th scope="col" className="px-6 py-3">
                    <p>Unité</p>
                  </th>
                  <th scope="col" className="px-6 py-3">
                    <p>Prix uni</p>
                  </th>
                  <th scope="col" className="px-6 py-3">
                    <p>Montant</p>
                  </th>
                  <th scope="col" className="px-6 py-3">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>

              <tbody className="w-full">
                {rows?.map((row, i) => (
                  <tr
                    key={i}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                  >
                    {/* ================ Category ======================*/}
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      <select
                        name="category"
                        onChange={(e) => handlerChange(e, i)}
                        value={currentCategories[i]?.catName}
                      >
                        <option value="-1">Choose Category</option>
                        {categories &&
                          categories.map((category) => (
                            <option key={category._id} value={category.catName}>
                              {category.catName}
                            </option>
                          ))}
                      </select>
                    </th>
                    {/* ================ itemName.fr ======================*/}
                    <td className="px-2 py-2">
                      <select
                        name="item"
                        onChange={(e) => handlerChange(e, i)}
                        value={currentItems[i]?.itemName.fr}
                      >
                        <option value="-1">Choose Item Name</option>
                        {items &&
                          items.map((item) => (
                            <option key={item._id} value={item.itemName.fr}>
                              {item.itemName.fr}
                            </option>
                          ))}
                      </select>
                    </td>
                    {/* ================ itemName.jp ======================*/}
                    <td className="px-2 py-2 text-xs">
                      {selectedItemInfo[i] && selectedItemInfo[i]?.itemName ? (
                        <p>{selectedItemInfo[i]?.itemName.jp}</p>
                      ) : (
                        <p>{currentItems[i]?.itemName.jp}</p>
                      )}
                    </td>
                    {/* ================ Qty ======================*/}
                    <td className="px-2 py-2">
                      <input
                        name="qty"
                        type="number"
                        placeholder="ex) 1"
                        onChange={(e) => handlerChange(e, i)}
                        value={row.qty || 0}
                      />
                    </td>
                    {/* ================ Unit ======================*/}
                    <td className="px-2 py-2">
                      <input
                        name="unit"
                        type="text"
                        placeholder="ex) 1"
                        onChange={(e) => handlerChange(e, i)}
                        value={row.unit || ''}
                      />
                    </td>
                    {/* ================ Price ======================*/}
                    <td className="px-1 py-1">
                      <input
                        name="price"
                        type="number"
                        placeholder="ex) 350"
                        onChange={(e) => handlerChange(e, i)}
                        value={row.price || 0}
                        className="inputText text-sm"
                      />
                    </td>
                    {/* ================ Total ======================*/}
                    <td className="px-1 py-1">
                      <p className="text-right">{row.total.toFixed(2)}</p>
                    </td>
                    {/* ================ Delete Button ======================*/}
                    <td className="form_group w-1/12">
                      <button onClick={() => deleteRow(i)}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-6 h-6 text-red-400"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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
                <p>{subtotal.toFixed(2)}</p>
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
                  </p>
                </div>
                <p>{tauxValue && tauxValue.toFixed(2)}</p>
              </div>
              <div className="flex justify-between">
                <div className="form_group">
                  <label>All total</label>
                </div>
                <h2>{allTotal.toFixed(2)}</h2>
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
