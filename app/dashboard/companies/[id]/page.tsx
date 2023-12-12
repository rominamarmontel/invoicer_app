'use client'

import OneCompany from '@/components/Company/OneCompany'
import React, { useEffect, useState } from 'react'
import { CompanyProps } from '@/types'

const DetailsCompany = ({ params }: { params: { id: string } }) => {
  const [company, setCompany] = useState<CompanyProps | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXTAUTH_URL}/api/companies/${params.id}`,
          {
            cache: 'no-store',
          }
        )

        if (res.ok) {
          const data = await res.json()
          const company = data.company
          setCompany(company)
        }
      } catch (error) {
        console.log(error)
      }
    }

    fetchData()
  }, [params.id])

  return (
    <div>
      {company ? (
        <OneCompany companyId={company._id} />
      ) : (
        <div className="loading">Loading...</div>
      )}
    </div>
  )
}

export default DetailsCompany
