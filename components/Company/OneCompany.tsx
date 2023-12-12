'use client'

import { useEffect, useState } from 'react'
import { CompanyProps } from '@/types'

interface OneCompanyProps {
  companyId: CompanyProps
}

const OneCompany: React.FC<OneCompanyProps> = ({ companyId }) => {
  const [company, setCompany] = useState<CompanyProps | null>(null)
  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const res = await fetch(`/api/companies/${companyId}`, {
          cache: 'no-store',
        })
        if (res.ok) {
          const data = await res.json()
          const company = data.company
          if (!company) {
            console.log('Client not found')
            return
          }
          setCompany(company)
        }
      } catch (error) {
        console.log(error)
      }
    }

    fetchCompany()
  }, [companyId])

  return (
    <div>
      {company ? (
        <div>
          {company.name && (
            <h2 className="font-bold text-slate-700 text-lg">{company.name}</h2>
          )}
          {company.address && <p className="text-sm">{company.address}</p>}
          <div className="flex gap-2">
            {company.zipcode && <p className="text-sm">{company.zipcode}</p>}
            {company.city && <p className="text-sm">{company.city}</p>}
          </div>
          {company.country && <p className="text-sm">{company.country}</p>}
          {company.phone && (
            <p className="text-sm">
              <span>Phone: </span>
              {company.phone}
            </p>
          )}
          {company.email && (
            <p className="text-sm">
              <span>Email: </span>
              {company.email}
            </p>
          )}
          {company.website && (
            <p className="text-sm">
              <span>Website: </span>
              {company.website}
            </p>
          )}
          {company.siret && (
            <p className="text-sm">
              <span>SIRET: </span>
              {company.siret}
            </p>
          )}
          {company.tva && (
            <p className="text-sm">
              <span>TVA: </span>
              {company.tva}
            </p>
          )}
        </div>
      ) : (
        <div className="loading">Loading...</div>
      )}
    </div>
  )
}

export default OneCompany
