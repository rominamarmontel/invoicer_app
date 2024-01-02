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
import React, { useState, useEffect } from 'react'
import { toast } from 'react-hot-toast'
import CompanyData from '../Company/CompanyData'
import ClientData from '../Client/ClientData'
import PaymentData from '../Payment/PaymentData'
import CategoryData from '../Category/CategoryData'
import ItemData from '../Item/ItemData'
import CommissionData from '../Commission/CommissionData'
import FactureNumber from './FactureNumber'
import CalculatePaymentDue from './CalculatePaymentDue '
import CalculateSubtotal from './CalculateSubtotal'
import CalculateAllTotal from './CalculateAllTotal'
import ReturnButton from './../Button/ReturnButton'

interface EditFactureFormProps {
  id: string
  facture: FactureProps | null
  company: CompanyProps | null
  client: ClientProps | null
  payment: PaymentProps | null
  commission: CommissionProps | null
  rows: RowProps[]
  currentCategories: CategoryProps[]
  currentItems: ItemProps[]
  setFacture: React.Dispatch<React.SetStateAction<FactureProps | null>>
  setCompany: React.Dispatch<React.SetStateAction<CompanyProps | null>>
  setClient: React.Dispatch<React.SetStateAction<ClientProps | null>>
  setPayment: React.Dispatch<React.SetStateAction<PaymentProps | null>>
  setCommission: React.Dispatch<React.SetStateAction<CommissionProps | null>>
  setRows: React.Dispatch<React.SetStateAction<RowProps[]>>
  setCurrentCategories: React.Dispatch<React.SetStateAction<CategoryProps[]>>
  setCurrentItems: React.Dispatch<React.SetStateAction<ItemProps[]>>
}

const EditFactureForm: React.FC<EditFactureFormProps> = ({
  id,
  facture,
  company,
  client,
  payment,
  commission,
  rows,
  currentCategories,
  currentItems,
  setFacture,
  setCompany,
  setClient,
  setPayment,
  setCommission,
  setRows,
  setCurrentCategories,
  setCurrentItems,
}) => {
  const { companies, setCompanies } = CompanyData()
  const { clients, setClients } = ClientData()
  const { payments, setPayments } = PaymentData()
  const { categories, setCategories } = CategoryData()
  const { items, setItems } = ItemData()
  const { commissions, setCommissions } = CommissionData()
  const { factureNumber, setFactureNumber, handleCreateFactureNumber } =
    FactureNumber()
  const [selectedCompany, setSelectedCompany] = useState<CompanyProps | null>(
    null
  )
  const [selectedClient, setSelectedClient] = useState<ClientProps | null>(null)
  const [factureDate, setFactureDate] = useState('')
  const [conditionPayment, setConditionPayment] = useState(0)
  const { paymentDue, setPaymentDue } = CalculatePaymentDue(
    factureDate,
    conditionPayment
  )
  const [title, setTitle] = useState('')
  const [selectedCategory, setSelectedCategory] =
    useState<CategoryProps | null>(null)
  const [selectedItemJp, setSelectedItemJp] = useState<ItemProps | null>(null)
  const [note, setNote] = useState('')
  const [selectedPayment, setSelectedPayment] = useState<PaymentProps | null>(
    null
  )
  const router = useRouter()
  const { subtotal, setSubtotal } = CalculateSubtotal(rows)
  const [selectedCommission, setSelectedCommission] =
    useState<CommissionProps | null>(null)
  const {
    allTotal,
    setAllTotal,
    selectedCommissionTaux,
    setSelectedCommissionTaux,
    tauxValue,
    setTauxValue,
  } = CalculateAllTotal(subtotal)

  /* ================ Company ======================*/
  const companyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCompanyName = e.target.value.trim()
    const selectedCompany =
      companies.find((company) => company.name === selectedCompanyName) || null
    setSelectedCompany(selectedCompany)
  }

  /* ================ Client ======================*/
  const clientChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedClientName = e.target.value.trim()
    const selectedClient =
      clients.find((client) => client.clientName === selectedClientName) || null
    setSelectedClient(selectedClient)
  }

  /* ================ Payment ======================*/
  const paymentChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedPaymentName = e.target.value.trim()
    const selectedPayment =
      payments.find((payment) => payment.bankName === selectedPaymentName) ||
      null
    setSelectedPayment(selectedPayment)
  }

  /* ========== Select commission name and display taux =============*/
  const commissionChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCommissionName = e.target.value.trim()
    const selectedCommission =
      commissions.find(
        (commission) => commission.commissionName === selectedCommissionName
      ) || null
    setSelectedCommission(selectedCommission)

    for (let i = 0; i < commissions.length; i++) {
      if (commissions[i].commissionName === selectedCommissionName) {
        setSelectedCommissionTaux(commissions[i].taux)
      }
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
  const [selectedItem, setSelectedItem] = useState<(ItemProps | null)[]>(
    Array(rows.length).fill(null)
  )
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

    if (name === 'category') {
      const selectedCategoryName = value
      const selectedCategory =
        categories.find(
          (category) => category.catName === selectedCategoryName
        ) || null
      setSelectedCategory(selectedCategory)
    }

    if (name === 'item') {
      const selectedItemName = value
      const selectedItem =
        items.find((item) => item.itemName.fr === selectedItemName) || null
      setSelectedItem((prevSelected) => {
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
    setSelectedItem((prevSelected) => [...prevSelected, null])
  }

  /* ================ Delete row ======================*/
  const deleteRow = (i: number) => {
    const updatedRows = rows.filter((row, index) => index !== i)
    setRows(updatedRows)
  }

  /* ================ handleSendAndSave ======================*/
  const handleSendAndSave = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!company) {
      toast.error('Please select a COMPANY.')
      return
    }
    if (!client) {
      toast.error('Please select a CLIENT.')
      return
    }
    if (!factureDate) {
      toast.error('Please select a FACTURE DATE.')
      return
    }
    if (!paymentDue) {
      toast.error('Please select a PAYMENT TERMS.')
      return
    }
    if (!payment) {
      toast.error('Please select a PAYMENT MOYEN.')
      return
    }
    if (!title) {
      toast.error('Please select a TITLE LIST.')
      return
    }
    if (rows.length === 0) {
      toast.error('Please add at least one row.')
      return
    }

    const rowsValidation = rows.every((row, index) => {
      if (!row.category) {
        toast.error(`Please select a CATEGORY for row ${index + 1}.`)
        return false
      }

      if (!row.item) {
        toast.error(`Please select an DESCRIPTION for row ${index + 1}.`)
        return false
      }

      if (!row.qty || row.qty <= 0 || isNaN(row.qty)) {
        toast.error(`Please enter a valid quantity for row ${index + 1}.`)
        return false
      }

      if (!row.unit || row.unit === 'string') {
        toast.error(`Please enter a valid unite for row ${index + 1}.`)
        return false
      }

      if (!row.price || row.price <= 0 || isNaN(row.qty)) {
        toast.error(`Please enter a valid price for row ${index + 1}.`)
        return false
      }
      return true
    })
    if (!commission) {
      toast.error('Please select a COMMISSION.')
      return
    }

    if (!rowsValidation) {
      return
    }

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
        `${process.env.NEXTAUTH_URL}/api/factures/${id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            company: selectedCompany?._id,
            client: selectedClient?._id,
            factureDate,
            factureNumber,
            conditionPayment,
            paymentDue,
            title,
            rows: formattedRows,
            note,
            payment: selectedPayment?._id,
            commission: selectedCommission?._id,
          }),
        }
      )
      if (res.ok) {
        toast.success('Update Facture successfully')
        router.push('/dashboard')
        router.refresh()
      } else {
        const errorData = await res.json()
        toast.error(`Failed to update Facture: ${errorData.error}`)
      }
    } catch (error) {
      console.log(error)
      const errorMessage = (error as Error)?.message || 'Internal Server Error'
      toast.error(`Failed to update Facture: ${errorMessage}`)
    }
  }

  return (
    <div className="createFactureForm">
      <div className="createFactureForm_container">
        <div className="createFactureForm_header">
          <div className="createFactureForm_header-logo">
            <h3>Edit a Facture</h3>
          </div>
          <ReturnButton />
        </div>
        <form className="w-full">
          <div className="w-1/2">
            {/* ================ Your company info ======================*/}
            <div className="form_group w-1/2 mb-4">
              <label>BILL FROM</label>
              <select onChange={companyChange} value={company?.name}>
                <option value="-1">Choose your company</option>
                {companies &&
                  companies.map((company: CompanyProps) => (
                    <option key={company._id} value={company.name}>
                      {company.name}
                    </option>
                  ))}
              </select>
            </div>
            {/* ================ Client info ======================*/}
            <div className="form_group w-1/2 mb-4">
              <label>BILL TO</label>
              <select onChange={clientChange} value={client?.clientName || ''}>
                <option value="-1">Choose Client</option>
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
              <div>{facture?.factureNumber}</div>
            </div>

            {/* ================ Facture date ======================*/}
            <div className="form_group w-1/2 mb-4">
              <label>Facture date</label>
              <input
                type="date"
                placeholder="Facture Date"
                onChange={(e) => setFactureDate(e.target.value)}
                className="input-factureDate"
                value={facture?.factureDate || factureDate}
              />
            </div>

            {/* ================ Payment terms ======================*/}
            <div className="form_group w-1/2 mb-4">
              <label>Payment Terms</label>
              <select
                onChange={(e) => setConditionPayment(Number(e.target.value))}
                value={facture?.conditionPayment}
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
              <div className="text-center py-2">{paymentDue}</div>
            </div>

            {/* ================ Payment Moyen======================*/}
            <div className="form_group w-1/2 mb-4">
              <label>Payment Moyen</label>
              <select onChange={paymentChange} value={payment?.bankName}>
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
                value={facture?.title}
              >
                <option value="-1">Choose a Title</option>
                <option value="preparation">Preparation</option>
                <option value="reperage">Reperage</option>
                <option value="tournage">Tournage</option>
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
                      {currentItems[i] && currentItems[i]?.itemName.jp ? (
                        <p>{currentItems[i]?.itemName.jp}</p>
                      ) : (
                        <p>No Japanese name available</p>
                      )}
                    </td>

                    {/* ================ Qty ======================*/}
                    <td className="px-2 py-2">
                      <input
                        name="qty"
                        type="number"
                        placeholder="ex.1"
                        onChange={(e) => handlerChange(e, i)}
                        value={row.qty}
                      />
                    </td>

                    {/* ================ Unit ======================*/}
                    <td className="px-2 py-2">
                      <input
                        name="unit"
                        type="text"
                        placeholder="ex. day"
                        onChange={(e) => handlerChange(e, i)}
                        value={row.unit}
                      />
                    </td>

                    {/* ================ Price ======================*/}
                    <td className="px-1 py-1">
                      <input
                        name="price"
                        type="number"
                        placeholder="ex. 350"
                        onChange={(e) => handlerChange(e, i)}
                        value={row.price}
                      />
                    </td>

                    {/* ================ Total ======================*/}
                    <td className="px-1 py-1">
                      <p className="text-right">{row.total.toFixed(2)}</p>
                    </td>

                    {/* ================ Delete Button ======================*/}
                    <td className="px-2 py-2">
                      <button onClick={() => deleteRow(i)}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-6 h-6 text-red-400 text-center"
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
                className="w-6 h-6"
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
                  <select
                    onChange={commissionChange}
                    value={commission?.commissionName}
                  >
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
                      ? `${selectedCommissionTaux}%`
                      : ''}
                  </p>
                </div>
                <p>{tauxValue?.toFixed(2)}</p>
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
            <button className="btn-black" onClick={handleSendAndSave}>
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditFactureForm
