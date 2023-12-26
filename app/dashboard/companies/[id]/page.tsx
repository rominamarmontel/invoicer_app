'use client'

import { CompanyProps } from '@/types'
import { useEffect, useState } from 'react'
import EditCompanyForm from '@/components/Company/EditCompanyForm'

const EditCompany = ({ params }: { params: { id: CompanyProps } }) => {
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
    <>
      {company ? <EditCompanyForm company={company} /> : <div>Loading...</div>}
    </>
  )
}

export default EditCompany
