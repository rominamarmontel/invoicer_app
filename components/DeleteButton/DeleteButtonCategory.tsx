import { CategoryProps } from '@/types'
import React from 'react'
import { RiDeleteBin6Line } from 'react-icons/ri'

const DeleteButtonCategory = ({
  id,
  setCategories,
}: {
  id: string
  setCategories: React.Dispatch<React.SetStateAction<CategoryProps[]>>
}) => {
  const removeCategory = async () => {
    const confirmed = confirm('Are you sure?')
    if (confirmed) {
      const res = await fetch(`/api/categories/${id}`, {
        method: 'DELETE',
      })
      if (res.ok) {
        setCategories((prevCategories) =>
          prevCategories.filter(
            (category: CategoryProps) => category._id !== id
          )
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

export default DeleteButtonCategory
