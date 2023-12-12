import { ClientProps, ItemProps } from '@/types'
import { useRouter } from 'next/navigation'
import React from 'react'
import { RiDeleteBin6Line } from 'react-icons/ri'

const DeleteButtonItem = ({
  id,
  setItems,
}: {
  id: string
  setItems: React.Dispatch<React.SetStateAction<ItemProps[]>>
}) => {
  const router = useRouter()
  const removeItem = async () => {
    const confirmed = confirm('Are you sure?')
    if (confirmed) {
      const res = await fetch(`/api/items/${id}`, {
        method: 'DELETE',
      })
      if (res.ok) {
        setItems((prevItems) => prevItems.filter((item) => item._id !== id))
      }
    }
  }

  return (
    <button onClick={removeItem}>
      <RiDeleteBin6Line className="text-red-400 text-2xl" />
    </button>
  )
}

export default DeleteButtonItem
