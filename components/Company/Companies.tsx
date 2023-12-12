import { CompanyProps } from '@/types'
import React, { useState } from 'react'
import DeleteButtonCompany from '../DeleteButton/DeleteButtonCompany'
import Link from 'next/link'
import { LiaEditSolid } from 'react-icons/lia'

const Companies = ({
  companies,
  setCompanies,
}: {
  companies: CompanyProps[]
  setCompanies: React.Dispatch<React.SetStateAction<CompanyProps[]>>
}) => {
  return (
    <div className="dashboard m-5 p-5 lg:max-w-4xl lg:mx-auto bg-white rounded shadow">
      <div className="companies_container">
        <div className="companies_header flex items-center justify-between">
          <h2>Companies List</h2>
          <div className="edit-btn companies_create ">
            <Link href="/dashboard/create-company">
              <p className="flex items-center gap-5">
                Create{' '}
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </span>
              </p>
            </Link>
          </div>
        </div>

        <div className="inline_card-group">
          {companies &&
            companies.map((company: CompanyProps) => (
              <div
                key={company._id}
                className="card_group w-1/3 flex items-center justify-between"
              >
                <div>{company.name}</div>
                <div className="flex justify-between items-center gap-2">
                  <DeleteButtonCompany
                    id={company._id}
                    setCompanies={setCompanies}
                  />
                  <Link href={`/dashboard/edit-company/${company._id}`}>
                    <LiaEditSolid className="text-green-500 text-2xl" />
                  </Link>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}

export default Companies
