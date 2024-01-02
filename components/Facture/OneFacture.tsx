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
import { useEffect, useState } from 'react'
import EditFactureForm from './EditFactureForm'

const OneFacture = ({ id }: { id: string }) => {
  const [facture, setFacture] = useState<FactureProps | null>(null)
  const [company, setCompany] = useState<CompanyProps | null>(null)
  const [client, setClient] = useState<ClientProps | null>(null)
  const [payment, setPayment] = useState<PaymentProps | null>(null)
  const [commission, setCommission] = useState<CommissionProps | null>(null)
  const [rows, setRows] = useState<RowProps[]>([])
  const [currentCategories, setCurrentCategories] = useState<CategoryProps[]>(
    []
  )
  const [currentItems, setCurrentItems] = useState<ItemProps[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXTAUTH_URL}/api/factures/${id}`,
          {
            cache: 'no-store',
          }
        )
        if (res.ok) {
          const data = await res.json()
          setFacture(data.facture)
        }
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }, [id])

  useEffect(() => {
    const fetchCompanyDetails = async () => {
      try {
        const companyId = facture?.company
        if (companyId) {
          const res = await fetch(
            `${process.env.NEXTAUTH_URL}/api/companies/${companyId}`
          )
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
  }, [facture?.company])

  useEffect(() => {
    const fetchClientDetails = async () => {
      try {
        const clientId = facture?.client
        if (clientId) {
          const res = await fetch(
            `${process.env.NEXTAUTH_URL}/api/clients/${clientId}`
          )
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
  }, [facture?.client])

  useEffect(() => {
    const fetchPaymentDetails = async () => {
      try {
        const paymentId = facture?.payment
        if (paymentId) {
          const res = await fetch(
            `${process.env.NEXTAUTH_URL}/api/payments/${paymentId}`
          )
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
  }, [facture?.payment])

  useEffect(() => {
    const fetchCommissionDetails = async () => {
      try {
        const commissionId = facture?.commission
        if (commissionId) {
          const res = await fetch(
            `${process.env.NEXTAUTH_URL}/api/commissions/${commissionId}`
          )
          if (res.ok) {
            const data = await res.json()
            setCommission(data.commission)
          }
        }
      } catch (error) {
        console.error('Error fetching commission details:', error)
      }
    }
    fetchCommissionDetails()
  }, [facture?.commission])

  useEffect(() => {
    const fetchRowsDetails = async () => {
      try {
        const rowPromises =
          facture?.rows?.map(async (rowId) => {
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
        const categoriesData = await Promise.all(categoryPromises)
        setCurrentCategories(categoriesData)

        const itemPromises = rowsData.map(async (row: RowProps) => {
          const resItem = await fetch(`/api/items/${row.item}`)
          if (resItem.ok) {
            const dataItem = await resItem.json()
            return dataItem.item ? dataItem.item : null
          } else {
            return null
          }
        })
        const itemsData = await Promise.all(itemPromises)
        setCurrentItems(itemsData)
      } catch (error) {
        console.log(error)
      }
    }
    fetchRowsDetails()
  }, [facture?.rows])

  return (
    <EditFactureForm
      id={id}
      facture={facture}
      setFacture={setFacture}
      company={company}
      setCompany={setCompany}
      client={client}
      setClient={setClient}
      payment={payment}
      setPayment={setPayment}
      commission={commission}
      setCommission={setCommission}
      rows={rows}
      setRows={setRows}
      currentCategories={currentCategories}
      setCurrentCategories={setCurrentCategories}
      currentItems={currentItems}
      setCurrentItems={setCurrentItems}
    />
  )
}

export default OneFacture
