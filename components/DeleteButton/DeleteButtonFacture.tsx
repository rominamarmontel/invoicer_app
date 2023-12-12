import { CategoryProps, FactureProps } from '@/types'
import React from 'react'
import { RiDeleteBin6Line } from 'react-icons/ri'

const DeleteButtonFacture = ({
  id,
  setFactures,
}: {
  id: string
  setFactures: React.Dispatch<React.SetStateAction<FactureProps[]>>
}) => {
  const removeCategory = async () => {
    const confirmed = confirm('Are you sure?')
    if (confirmed) {
      const res = await fetch(`/api/factures/${id}`, {
        method: 'DELETE',
      })
      if (res.ok) {
        setFactures((prevFactures) =>
          prevFactures.filter((facture: FactureProps) => facture._id !== id)
        )
      }
    }
  }

  return (
    <button onClick={removeCategory}>
      <RiDeleteBin6Line className="text-red-400 text-2xl" />
    </button>
  )
}

export default DeleteButtonFacture
