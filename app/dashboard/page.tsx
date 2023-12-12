import Dashboard from '@/components/Dashboard'
import { CompanyProps } from '@/types'
import React from 'react'

const getCompanies = async (): Promise<CompanyProps[] | null> => {
  try {
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/company`, {
      cache: 'no-store',
    })
    if (res.ok) {
      const data = res.json()
      return data
    }
  } catch (error) {
    console.log(error)
  }
  return null
}
const getFacture = () => {
  const companies = getCompanies()
  return <Dashboard />
}

export default getFacture
