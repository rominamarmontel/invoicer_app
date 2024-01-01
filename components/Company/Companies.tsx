'use client'

import { CompanyProps } from '@/types'
import React, { useState, useEffect } from 'react'
import DatatableCompany from './DatatableCompany'
import { companyColumns } from '@/datatablesource'

const Companies = () => {
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

  return (
    <div className="companies">
      <div className="companies_container">
        <div className="companies_header">
          <div className="companies_header-logo">
            <h3>Companies</h3>
          </div>
        </div>
        <DatatableCompany columns={companyColumns} />
      </div>
    </div>
  )
}

export default Companies
