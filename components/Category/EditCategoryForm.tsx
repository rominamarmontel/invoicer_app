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
    <div className="editCategoryForm">
      <div className="editCategoryForm_container">
        <div className="editCategoryForm_header">
          <div className="editCategoryForm_header-logo">
            <h3>Edit category</h3>
          </div>
          <Link
            href="/dashboard/categories"
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
              <label>Category Name</label>
              <input
                type="text"
                placeholder="ex.Production, Sejour, Frais divers..."
                onChange={(e) => setCatName(e.target.value)}
                value={catName}
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

export default EditCategoryForm
