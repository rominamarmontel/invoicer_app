'use client'

import { CompanyProps } from '@/types'
import { useEffect, useState } from 'react'

const CompanyData = () => {
  const [companies, setCompanies] = useState<CompanyProps[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${process.env.NEXTAUTH_URL}/api/companies`, {
          cache: 'no-store',
        })
        const data = await res.json()
        setCompanies(data.companies)
      } catch (error) {
        console.log(error)
      }
    }

    fetchData()
  }, [])

  return { companies, setCompanies }
}
export default CompanyData
