'use client'

import { CategoryProps } from '@/types'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'

const EditCategoryForm = ({ category }: { category: CategoryProps }) => {
  const [catName, setCatName] = useState('')
  const router = useRouter()

  useEffect(() => {
    const initialValues = () => {
      setCatName(category.catName)
    }
    initialValues()
  }, [category.catName])

  const handleSubmit = async (e: React.FocusEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!catName) {
      toast.error('Category is required')
    }
    const res = await fetch(`/api/categories/${catName}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        catName,
      }),
    })
    if (res.ok) {
      toast.success('Update Category!')
      router.push('/dashboard/categories')
      router.refresh()
    }
    return null
  }

  return (
    <div className="m-5 p-5 lg:max-w-4xl lg:mx-auto bg-white rounded shadow">
      <div className="editCommission_container">
        <div className="editCommission_header flex items-center justify-between">
          <span>
            <Link href="/dashboard/commissions">
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
          <h2>Edit category</h2>
        </div>
        <form className="flex flex-col" onSubmit={handleSubmit}>
          <div className="form_group flex flex-col">
            <label>Commission Name</label>
            <input
              type="text"
              placeholder="ex. Prod commission, TVA..."
              onChange={(e) => setCatName(e.target.value)}
              value={catName}
            />
          </div>
          <button className="btn">Update</button>
        </form>
      </div>
    </div>
  )
}

export default EditCategoryForm
