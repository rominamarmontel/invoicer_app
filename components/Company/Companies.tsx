import { CompanyProps } from '@/types'
import React, { useState } from 'react'
import DatatableCompany from './DatatableCompany'
import { companyColumns } from '@/datatablesource'
interface DatatableProps {
  columns: { field: string; headerName: string; width: number }[]
}
const Companies = ({
  companies,
  setCompanies,
}: {
  companies: CompanyProps[]
  setCompanies: React.Dispatch<React.SetStateAction<CompanyProps[]>>
}) => {
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
