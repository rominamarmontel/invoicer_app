import React from 'react'
import CompanyData from './CompanyData'
import { CompanyProps, FactureProps } from '@/types'

const CompanyForm = ({
  setCompany,
  setFacture,
}: {
  setCompany: React.Dispatch<React.SetStateAction<CompanyProps[]>>
  setFacture: React.Dispatch<React.SetStateAction<FactureProps[]>>
}) => {
  const { companies, setCompanies } = CompanyData()

  const getCompanyInfoByName = async (companyName: string) => {
    return {
      _id: 'someObjectId',
      name: companyName,
    }
  }
  const companyChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCompanyName = e.target.value
    setCompany(selectedCompanyName)
    try {
      const selectedCompanyInfo = await getCompanyInfoByName(
        selectedCompanyName
      )
      const selectedCompanyId = selectedCompanyInfo._id
      setFacture((prevFacture) => ({
        ...prevFacture,
        company: selectedCompanyId,
      }))
    } catch (error) {
      console.error('Error fetching company information:', error)
    }
  }

  return (
    <div className="form_group w-1/2 mb-4">
      {/* ================ Your company info ======================*/}
      <label>BILL FROM</label>
      <select onChange={companyChange}>
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
