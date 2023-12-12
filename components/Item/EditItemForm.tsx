'use client'

import { ItemProps } from '@/types'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'

const EditItemForm = ({ item }: { item: ItemProps }) => {
  const [itemNames, setItemNames] = useState<{ fr: string; jp: string }>({
    fr: '',
    jp: '',
  })
  const router = useRouter()

  useEffect(() => {
    const initialValues = () => {
      if (typeof item.itemName === 'string') {
        setItemNames({ fr: '', jp: '' })
      } else {
        setItemNames(item.itemName || { fr: '', jp: '' })
      }
    }
    initialValues()
  }, [item.itemName])

  const handleSubmit = async (e: React.FocusEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!itemNames.fr || !itemNames.jp) {
      toast.error('Item name in french and in japanese are required')
    }

    try {
      const res = await fetch(`/api/items/${item._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          itemName: itemNames,
        }),
      })
      if (res.ok) {
        toast.success('Update Item successfully')
        router.push('/dashboard/items')
        router.refresh()
      }
    } catch (error) {
      console.log(error)
    }
    return null
  }
  return (
    <div className="m-5 p-5 lg:max-w-4xl lg:mx-auto bg-white rounded shadow">
      <div className="editItem_container">
        <div className="editItem_header flex items-center justify-between">
          <span>
            <Link href="/dashboard/items">
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
                  d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3"
                />
              </svg>
            </Link>
          </span>
          <h2>Edit item</h2>
        </div>
        <form className="flex flex-col" onSubmit={handleSubmit}>
          <div className="form_group flex flex-col">
            <label>Item content in french</label>
            <input
              onChange={(e) =>
                setItemNames((prevItems) => ({
                  ...prevItems,
                  fr: e.target.value,
                }))
              }
              type="text"
              placeholder="Item name (French)"
              value={itemNames.fr || ''}
              className="md:flex-1 w-[100%] border border-red-400"
            />
          </div>
          <div className="form_group flex flex-col">
            <label>Item content in japanese</label>
            <input
              onChange={(e) =>
                setItemNames((prevItems) => ({
                  ...prevItems,
                  jp: e.target.value,
                }))
              }
              type="text"
              placeholder="Item name (japanese)"
              value={itemNames.jp || ''}
              className="md:flex-1 w-[100%] border border-red-400"
            />
          </div>
          <button className="btn">Update</button>
        </form>
      </div>
    </div>
  )
}

export default EditItemForm
