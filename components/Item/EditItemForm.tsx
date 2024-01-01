import { ItemProps } from '@/types'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'

const EditItemForm = ({ id }: { id: string }) => {
  const [itemNames, setItemNames] = useState<{ fr: string; jp: string }>({
    fr: '',
    jp: '',
  })
  const router = useRouter()
  const [item, setItem] = useState<ItemProps | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${process.env.NEXTAUTH_URL}/api/items/${id}`, {
          cache: 'no-store',
        })
        if (res.ok) {
          const data = await res.json()
          const item = await data.item
          setItem(item)
        }
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }, [id])

  useEffect(() => {
    const initialValues = () => {
      if (typeof item?.itemName === 'string') {
        setItemNames({ fr: '', jp: '' })
      } else {
        setItemNames(item?.itemName || { fr: '', jp: '' })
      }
    }
    initialValues()
  }, [item?.itemName])

  const handleSubmit = async (e: React.FocusEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!itemNames.fr || !itemNames.jp) {
      toast.error('Item name in french and in japanese are required')
    }

    try {
      const res = await fetch(`/api/items/${item?._id}`, {
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
    <div className="editItemForm">
      <div className="editItemForm_container">
        <div className="editItemForm_header">
          <div className="editItemForm_header-logo">
            <h3>Edit item</h3>
          </div>
          <Link
            href="/dashboard/items"
            className="flex items-center gap-2 mb-4"
          >
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 text-slate-400"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m11.25 9-3 3m0 0 3 3m-3-3h7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
            </div>
            <span className="text-sm text-slate-400">Return</span>
          </Link>
        </div>

        <form className="flex w-full justify-center" onSubmit={handleSubmit}>
          <div className="flex flex-col w-2/3">
            <div className="form_group mb-8">
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
            <div className="form_group mb-8">
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
            <div className="btn_container">
              <button className="btn">Update</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditItemForm
