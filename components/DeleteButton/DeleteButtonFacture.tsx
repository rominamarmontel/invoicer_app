import { CategoryProps, FactureProps } from '@/types'
import React from 'react'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { toast } from 'react-hot-toast'

const DeleteButtonFacture = ({
  id,
  setFactures,
}: {
  id: string
  setFactures: React.Dispatch<React.SetStateAction<FactureProps[]>>
}) => {
  const removeFacture = async () => {
    const confirmed = confirm('Are you sure to delete FACTURE?')
    if (confirmed) {
      const res = await fetch(`/api/factures/${id}`, {
        method: 'DELETE',
      })
      if (res.ok) {
        setFactures((prevFactures) =>
          prevFactures.filter((facture: FactureProps) => facture._id !== id)
        )
        toast.success('Facture deleted successfully')
      }
    }
  }

  return (
    <button onClick={removeFacture}>
      <RiDeleteBin6Line className="text-red-400 text-2xl" />
    </button>
  )
}

export default DeleteButtonFacture
