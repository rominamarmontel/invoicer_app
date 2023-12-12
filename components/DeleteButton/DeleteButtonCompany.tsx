import { ClientProps, CompanyProps } from '@/types'
import React from 'react'
import { RiDeleteBin6Line } from 'react-icons/ri'

const DeleteButtonCompany = ({
  id,
  setCompanies,
}: {
  id: string
  setCompanies: React.Dispatch<React.SetStateAction<CompanyProps[]>>
}) => {
  const removeCompany = async () => {
    const confirmed = confirm('Are you sure?')
    if (confirmed) {
      const res = await fetch(`/api/companies/${id}`, {
        method: 'DELETE',
      })
      if (res.ok) {
        setCompanies((prevCompanies) =>
          prevCompanies.filter((company) => company._id !== id)
        )
      }
    }
  }

  return (
    <button onClick={removeCompany}>
      <RiDeleteBin6Line className="text-red-400 text-2xl" />
    </button>
  )
}

export default DeleteButtonCompany
