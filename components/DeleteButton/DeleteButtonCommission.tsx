import { CommissionProps } from '@/types'
import { useRouter } from 'next/navigation'
import React from 'react'
import { RiDeleteBin6Line } from 'react-icons/ri'

const DeleteButtonCommission = ({
  id,
  setCommissions,
}: {
  id: string
  setCommissions: React.Dispatch<React.SetStateAction<CommissionProps[]>>
}) => {
  const router = useRouter()
  const removeCommission = async () => {
    const confirmed = confirm('Are you sure?')
    if (confirmed) {
      const res = await fetch(`/api/commissions/${id}`, {
        method: 'DELETE',
      })
      if (res.ok) {
        setCommissions((prevCommissions) =>
          prevCommissions.filter((commission) => commission._id !== id)
        )
      }
    }
  }

  return (
    <button onClick={removeCommission}>
      <RiDeleteBin6Line className="text-red-400 text-2xl" />
    </button>
  )
}

export default DeleteButtonCommission
