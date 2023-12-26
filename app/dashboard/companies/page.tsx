'use client'
import { CompanyProps } from '@/types'
import React, { useEffect, useState } from 'react'
import Companies from '@/components/Company/Companies'

const GetAllCompanies = () => {
  const [companies, setCompanies] = useState<CompanyProps[]>([])

  useEffect(() => {
    const fetchAllCompanies = async () => {
      try {
        const res = await fetch(`${process.env.NEXTAUTH_URL}/api/companies`, {
          cache: 'no-store',
        })
        if (res.ok) {
          const data = await res.json()
          setCompanies(data.companies)
        }
      } catch (error) {
        console.log(error)
      }
    }
    fetchAllCompanies()
  }, [])

  return <Companies companies={companies} setCompanies={setCompanies} />
}

export default GetAllCompanies
