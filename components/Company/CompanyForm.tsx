import React from 'react'
import CompanyData from './CompanyData'
import { CompanyProps } from '@/types'

const CompanyForm = ({ setCompany }: { setCompany: CompanyProps }) => {
  const { companies, setCompanies } = CompanyData()

  return (
    <div className="form_group w-1/2 mb-4">
      <label>BILL FROM</label>
      <select onChange={(e) => setCompany(e.target.value)}>
        <option value="" selected>
          Choose your company
        </option>
        {companies &&
          companies.map((company: CompanyProps) => (
            <option key={company._id} value={company.name}>
              {company.name}
            </option>
          ))}
      </select>
    </div>
  )
}

export default CompanyForm
