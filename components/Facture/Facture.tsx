'use client'

import {
  CategoryProps,
  ClientProps,
  CompanyProps,
  FactureProps,
  ItemProps,
  PaymentProps,
  RowProps,
} from '@/types'
import React, { useEffect, useState, useRef } from 'react'
import PrinterButton from '../PrinterButton'
import Link from 'next/link'
import CategoryData from '../Category/CategoryData'
import ItemData from '../Item/ItemData'

interface FactureFormProps {
  params: { id: string }
}
const Facture: React.FC<FactureFormProps> = ({ params }) => {
  const { categories, setCategories } = CategoryData()
  const { items, setItems } = ItemData()
  const id = params.id
  const componentRef = useRef<HTMLDivElement | null>(null)
  const [company, setCompany] = useState<CompanyProps>({
    _id: '',
    name: '',
    address: '',
    zipcode: '',
    city: '',
    country: '',
    phone: '',
    website: '',
    email: '',
    siret: '',
    tva: '',
  })

  const [client, setClient] = useState<ClientProps>({
    _id: '',
    clientName: '',
    personName: '',
    clientAddress: '',
    clientZipcode: '',
    clientCity: '',
    clientCountry: '',
    clientEmail: '',
    clientPhone: '',
    clientSiret: '',
    clientTva: '',
    clientWebsite: '',
  })

  const [item, setItem] = useState<ItemProps>({
    _id: '',
    itemName: {
      fr: '',
      jp: '',
    },
  })
  const [payment, setPayment] = useState<PaymentProps>({
    _id: '',
    bankName: '',
    bankCode: '',
    accountName: '',
    accountNumber: '',
    iban: '',
    bic: '',
  })
  const [rows, setRows] = useState<RowProps[]>([])
  const [subtotal, setSubtotal] = useState(0)
  const [commission, setCommission] = useState('')
  const [taux, setTaux] = useState(0)
  const [tauxValue, setTauxValue] = useState<number | null>(null)
  const [allTotal, setAllTotal] = useState(0)
  const [factureData, setFactureData] = useState<FactureProps | null>(null)

  useEffect(() => {
    const fetchFacture = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXTAUTH_URL}/api/factures/${id}`,
          {
            cache: 'no-store',
          }
        )
        if (res.ok) {
          const data = await res.json()
          const facture = await data.facture
          setFactureData(facture)
        }
      } catch (error) {
        console.log(error)
      }
    }
    fetchFacture()
  }, [id])

  useEffect(() => {
    const fetchCompanyDetails = async () => {
      try {
        if (factureData?.company) {
          const res = await fetch(`/api/companies/${factureData.company}`)
          if (res.ok) {
            const data = await res.json()
            setCompany(data.company)
          }
        }
      } catch (error) {
        console.log(error)
      }
    }
    fetchCompanyDetails()
  }, [factureData?.company, company])

  useEffect(() => {
    const fetchClientDetails = async () => {
      try {
        if (factureData?.client) {
          const res = await fetch(`/api/clients/${factureData.client}`)
          if (res.ok) {
            const data = await res.json()
            setClient(data.client)
          }
        }
      } catch (error) {
        console.log(error)
      }
    }
    fetchClientDetails()
  }, [factureData?.client, client])

  useEffect(() => {
    const fetchPaymentDetails = async () => {
      try {
        if (factureData?.payment) {
          const res = await fetch(`/api/payments/${factureData.payment}`)
          if (res.ok) {
            const data = await res.json()
            setPayment(data.payment)
          }
        }
      } catch (error) {
        console.log(error)
      }
    }
    fetchPaymentDetails()
  }, [factureData?.payment, payment])

  useEffect(() => {
    const fetchCommissionDetails = async () => {
      try {
        if (factureData?.commission) {
          const res = await fetch(`/api/commissions/${factureData.commission}`)
          if (res.ok) {
            const data = await res.json()
            const commissionTaux = data.commission ? data.commission.taux : null
            setTaux(commissionTaux)
            setCommission(
              data.commission ? data.commission.commissionName : '-1'
            )
            setTauxValue(
              commissionTaux !== null
                ? subtotal * (commissionTaux * 0.01)
                : null
            )
          }
        }
      } catch (error) {
        console.error('Error fetching commission details:', error)
      }
    }
    fetchCommissionDetails()
  }, [factureData?.commission, subtotal, commission])

  useEffect(() => {
    const categoryOrder = [
      '656321acccd2ad4d3d6f4d0a',
      '65632247ccd2ad4d3d6f4d32',
      '65632461ccd2ad4d3d6f4d3a',
      '656321beccd2ad4d3d6f4d12',
      '6563221cccd2ad4d3d6f4d22',
      '656324ecccd2ad4d3d6f4d42',
      '6563220bccd2ad4d3d6f4d1a',
      '6563222dccd2ad4d3d6f4d2a',
    ]

    const fetchRowsDetails = async () => {
      try {
        const rowPromises =
          factureData?.rows?.map(async (rowId) => {
            const res = await fetch(`/api/rows/${rowId}`)
            if (res.ok) {
              const data = await res.json()
              return data.row || null
            } else {
              return null
            }
          }) || []
        const rowsData = await Promise.all(rowPromises)
        // setRows(rowsData.filter(Boolean))
        const sortByCategoryOrder = (a: any, b: any) => {
          const indexA = categoryOrder.indexOf(a.category)
          const indexB = categoryOrder.indexOf(b.category)
          console.log('Category A:', a.category.catName, 'Index A:', indexA)
          console.log('Category B:', b.category.catName, 'Index B:', indexB)
          return indexA - indexB
        }
        const sortedRows = rowsData.sort(sortByCategoryOrder)
        setRows(sortedRows)

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
        setCategories(updatedCategories)
        const updatedItems = await Promise.all<ItemProps>(itemPromises)
        setItems(updatedItems)
      } catch (error) {
        console.log(error)
      }
    }
    fetchRowsDetails()
  }, [factureData?.rows, setCategories, setItems])
  console.log(categories)
  console.log(rows)
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
      const tauxValue = subtotal * (taux * 0.01)
      setTauxValue(tauxValue)
      const allTotal = subtotal + tauxValue
      setAllTotal(allTotal)
    }
    calculAllTotal()
  }, [subtotal, allTotal, taux])

  /* ================ Number====================*/
  const numbering = () => {}

  return (
    <div className="facture">
      <div className="w-1/4 flex gap-2 items-center">
        <div>
          <PrinterButton componentRef={componentRef} />
        </div>
        <div className="cancel-link">
          <Link href="/dashboard">CANCEL</Link>
        </div>
      </div>
      <div className="facture_container">
        <div ref={componentRef} className="printer_container w-full">
          <div className="facture_header">
            <div className="facture_header-logo text-right">
              <h3>Facture</h3>
            </div>
          </div>
          <div className="company_zone w-1/3">
            <ul>
              <li>
                {company && company.name && (
                  <b className="facture_companyName">{company.name}</b>
                )}
              </li>
              <li>{company && company.address && <p>{company.address}</p>}</li>
              <li>
                {company && company.zipcode && (
                  <div className="flex gap-2">
                    <p>{company.zipcode}</p>
                    {company && company.city && <p>{company.city}</p>}
                    {company && company.country && <p>{company.country}</p>}
                  </div>
                )}
              </li>
              <li>
                {company && company.phone && (
                  <p>
                    <span>Phone: </span>
                    {company.phone}
                  </p>
                )}
              </li>
              <li>
                {company && company.website && (
                  <p>
                    <span>Website: </span>
                    {company.website}
                  </p>
                )}
              </li>
              <li>
                {company && company.email && (
                  <p>
                    <span>Email: </span>
                    {company.email}
                  </p>
                )}
              </li>
              <li>
                {company && company.siret && (
                  <p>
                    <span>SIRET: </span>
                    {company.siret}
                  </p>
                )}
              </li>
              <li>
                {company && company.tva && (
                  <p>
                    <span>TVA: </span>
                    {company.tva}
                  </p>
                )}
              </li>
            </ul>
          </div>

          <div className="client_zone w-full">
            <div className="flex justify-center">
              <ul>
                <li className="attention">À l’attention de :</li>
                <li>
                  {client && client.clientName && (
                    <b className="text-lg">{client.clientName}</b>
                  )}
                </li>
                <li>
                  {client && client.personName && (
                    <p>
                      <span>M.</span>
                      {client.personName}
                    </p>
                  )}
                </li>

                <li>
                  {client && client.clientAddress && (
                    <p>{client.clientAddress}</p>
                  )}
                </li>
                <li className="flex gap-2">
                  {client && client.clientZipcode && (
                    <p>{client.clientZipcode}</p>
                  )}
                  {client && client.clientCity && <p>{client.clientCity}</p>}
                  {client && client.clientCountry && (
                    <p>{client.clientCountry}</p>
                  )}
                </li>

                <li>
                  {client && client.clientWebsite && (
                    <p>
                      <span>Website: </span>
                      {client.clientWebsite}
                    </p>
                  )}
                </li>
                <li>
                  {client && client.clientPhone && (
                    <p>
                      <span>Phone: </span>
                      {client.clientPhone}
                    </p>
                  )}
                </li>
                <li>
                  {client && client.clientEmail && (
                    <p>
                      <span>Email: </span>
                      {client.clientEmail}
                    </p>
                  )}
                </li>
                <li>
                  {client && client.clientSiret && (
                    <p>
                      <span>SIRET: </span>
                      {client.clientSiret}
                    </p>
                  )}
                </li>
                <li>
                  {client && client.clientTva && (
                    <p>
                      <span>TVA: </span>
                      {client.clientTva}
                    </p>
                  )}
                </li>
              </ul>
            </div>
          </div>
          <div className="factureData_zone w-full">
            <div className="flex justify-end text-right">
              <ul>
                <li>
                  {factureData && (
                    <p>
                      <span>Numero de facture: </span>
                      {factureData?.factureNumber}
                    </p>
                  )}
                </li>
                <li>
                  {factureData && (
                    <p>
                      <span>Date de facture: </span>
                      {factureData?.factureDate}
                    </p>
                  )}
                </li>
                <li>
                  {factureData && (
                    <p>
                      <span>Conditions de paiement (jours): </span>
                      {factureData?.conditionPayment}
                    </p>
                  )}
                </li>
                <li>
                  {factureData && (
                    <p>
                      <span>Date d’échéance: </span>
                      {factureData?.paymentDue}
                    </p>
                  )}
                </li>
              </ul>
            </div>
          </div>

          <div className="row-zone flex flex-col">
            <div className="sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                <div className="overflow-hidden">
                  <table className="min-w-full border text-center text-sm font-light dark:border-neutral-500">
                    <thead className="border-b font-medium dark:border-neutral-500 ">
                      <tr className="border-b bg-white-100 dark:border-neutral-500">
                        <th className="uppercase py-4 px-2"></th>
                        <th className="uppercase py-4 text-left">
                          {factureData?.title}
                        </th>
                        <th className="py-4 text-left">{factureData?.note}</th>
                      </tr>
                      <tr className="border-b bg-neutral-100 dark:border-neutral-500 dark:bg-neutral-700">
                        <th
                          scope="col"
                          className="border-r dark:border-neutral-500"
                        ></th>
                        <th
                          scope="col"
                          className="border-r px-10 py-4 dark:border-neutral-500"
                        >
                          <p>Category</p>
                        </th>
                        <th
                          scope="col"
                          className="border-r px-10 py-4 dark:border-neutral-500"
                        >
                          <p>Description</p>
                        </th>
                        <th
                          scope="col"
                          className="border-r px-10 py-4 dark:border-neutral-500"
                        >
                          <p>詳細</p>
                        </th>
                        <th
                          scope="col"
                          className="border-r dark:border-neutral-500"
                        >
                          <p>Qty</p>
                        </th>
                        <th
                          scope="col"
                          className="border-r dark:border-neutral-500"
                        >
                          <p>Unité</p>
                        </th>
                        <th
                          scope="col"
                          className="border-r dark:border-neutral-500"
                        >
                          <p>Prix</p>
                        </th>
                        <th scope="col" className="px-10 py-4">
                          <p>Montant</p>
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      {rows?.map((row, i) => (
                        <tr
                          key={row._id}
                          className="border-b dark:border-neutral-500"
                        >
                          <td
                            scope="col"
                            className="border-r p-0 w-0 dark:border-neutral-500 text-xs"
                          >
                            {i + 1}
                          </td>
                          <td
                            scope="col"
                            className="border-r px-10 py-2 dark:border-neutral-500 text-left"
                          >
                            {categories[i] && <p>{categories[i].catName}</p>}
                          </td>
                          <td
                            scope="col"
                            className="border-r px-10 py-2 dark:border-neutral-500"
                          >
                            {items[i] && <p>{items[i].itemName.fr}</p>}
                          </td>
                          <td
                            scope="col"
                            className="border-r px-10 py-2 dark:border-neutral-500"
                          >
                            {items[i] && <p>{items[i].itemName.jp}</p>}
                          </td>
                          <td
                            scope="col"
                            className="border-r px-3 py-2 dark:border-neutral-500"
                          >
                            <p>{row.qty}</p>
                          </td>
                          <td
                            scope="col"
                            className="border-r px-3 py-2 dark:border-neutral-500"
                          >
                            <p>{row.unit}</p>
                          </td>
                          <td
                            scope="col"
                            className="border-r px-3 py-2 dark:border-neutral-500"
                          >
                            <p>{row.price.toFixed(2)}</p>
                          </td>
                          <td
                            scope="col"
                            className="border-r px-3 py-2 dark:border-neutral-500 text-right"
                          >
                            <p>{row.total.toFixed(2)}</p>
                          </td>
                        </tr>
                      ))}
                      <tr className="border-b dark:border-neutral-500">
                        <td
                          colSpan={7}
                          className="text-right whitespace-nowrap border-r px-3 py-2 dark:border-neutral-500"
                        >
                          <p>Sous Total</p>
                        </td>
                        <td className="flex justify-end px-3 py-2">
                          <p>
                            <span>€ </span>
                            {subtotal.toFixed(2)}
                          </p>
                        </td>
                      </tr>
                      <tr className="border-b dark:border-neutral-500">
                        <td
                          colSpan={7}
                          className="text-right whitespace-nowrap border-r px-3 py-2 dark:border-neutral-500"
                        >
                          {commission && <p>{commission}</p>}
                          {taux && <p>{taux}%</p>}
                        </td>
                        <td className="flex justify-end whitespace-nowrap px-3 py-2 dark:border-neutral-500">
                          {tauxValue && (
                            <p>
                              <span>€ </span>
                              {tauxValue.toFixed(2)}
                            </p>
                          )}
                        </td>
                      </tr>
                      <tr className="border-b border-t-2">
                        <td
                          colSpan={7}
                          className="text-right whitespace-nowrap border-r px-3 py-2 font-bold"
                        >
                          TOTAL
                        </td>
                        <td className="flex justify-end px-3 py-2 font-bold">
                          € {allTotal.toFixed(2)}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="articleCode flex justify-end">
                    <p>
                      TVA non applicable, article 293B du code général des
                      impôts
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="payment_zone bottom-0 flex flex-col gap-2">
            <div className="payment_zone_letter flex justify-center gap-2">
              {payment.bankName && (
                <p>
                  <span>Banque: </span>
                  {payment.bankName}
                </p>
              )}
              {payment.bankCode && (
                <p>
                  <span>Code bancaires: </span>
                  {payment.bankCode}
                </p>
              )}
              {payment.accountNumber && (
                <p>
                  <span>No de compte: </span>
                  {payment.accountNumber}
                </p>
              )}
              {payment.bic && (
                <p>
                  <span>BIC: </span>
                  {payment.bic}
                </p>
              )}
              {payment.iban && (
                <p>
                  <span>IBAN: </span>
                  {payment.iban}
                </p>
              )}
              {payment.accountName && (
                <p>
                  <span>Titulaire du compte: </span>
                  {payment.accountName}
                </p>
              )}
            </div>
            <div className="condition flex justify-center">
              <p>Conditions de paiement : Paiement à reception de facture</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Facture
