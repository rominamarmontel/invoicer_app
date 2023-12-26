'use client'
import CreateFactureForm from '@/components/Facture/CreateFactureForm'
import {
  CategoryProps,
  ClientProps,
  CommissionProps,
  CompanyProps,
  ItemProps,
  PaymentProps,
} from '@/types'
import { useEffect, useState } from 'react'

const CreateFacture = () => {
  const [companies, setCompanies] = useState<CompanyProps[]>([])
  const [clients, setClients] = useState<ClientProps[]>([])
  const [payments, setPayments] = useState<PaymentProps[]>([])
  const [categories, setCategories] = useState<CategoryProps[]>([])
  const [items, setItems] = useState<ItemProps[]>([])
  const [commissions, setCommissions] = useState<CommissionProps[]>([])

  /* ================ fetch Companies ======================*/
  useEffect(() => {
    const fetchAllCompanies = async () => {
      try {
        const res = await fetch(`/api/companies`, {
          cache: 'no-store',
        })
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
        const res = await fetch(`/api/clients`, {
          cache: 'no-store',
        })
        if (res.ok) {
          const data = await res.json()
          if (data.clients && Array.isArray(data.clients)) {
            setClients(data)
          } else {
            console.error('Invalid data format for clients:', data)
          }
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
        const res = await fetch('/api/payments', {
          cache: 'no-store',
        })
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
        const res = await fetch('/api/categories', {
          cache: 'no-store',
        })
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
        const res = await fetch('/api/items', {
          cache: 'no-store',
        })
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
        const res = await fetch('/api/commissions', {
          cache: 'no-store',
        })
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

  return (
    <CreateFactureForm
      companies={companies}
      clients={clients}
      payments={payments}
      categories={categories}
      items={items}
      commissions={commissions}
    />
  )
}

export default CreateFacture
