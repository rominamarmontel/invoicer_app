import { ClientProps } from '@/types'
import { useRouter } from 'next/navigation'
import React from 'react'
import { RiDeleteBin6Line } from 'react-icons/ri'

const DeleteButtonClient = ({
  id,
  setClients,
}: {
  id: string
  setClients: React.Dispatch<React.SetStateAction<ClientProps[]>>
}) => {
  const router = useRouter()
  const removeClient = async () => {
    const confirmed = confirm('Are you sure?')
    if (confirmed) {
      const res = await fetch(`/api/clients/${id}`, {
        method: 'DELETE',
      })
      if (res.ok) {
        setClients((prevClients) =>
          prevClients.filter((client) => client._id !== id)
        )
      }
    }
  }

  return (
    <button onClick={removeClient}>
      <RiDeleteBin6Line className="text-red-400 text-2xl" />
    </button>
  )
}

export default DeleteButtonClient
