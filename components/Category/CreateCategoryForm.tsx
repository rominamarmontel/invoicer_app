'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const CreateCategoryForm = () => {
  const [catName, setCatName] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const res = await fetch('/api/categories', {
        method: 'POST',
        headers: {
          'Contetn-Type': 'application/json',
        },
        body: JSON.stringify({
          catName,
        }),
      })
      if (res.ok) {
        router.push('/dashboard/categories')
        router.refresh()
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className="createCategoryForm">
      <div className="createCategoryForm_container">
        <div className="createCategoryForm_header">
          <div className="createCategoryForm_header-logo">
            <h3>Create Category</h3>
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

        <form onSubmit={handleSubmit} className="flex w-full justify-center">
          <div className="flex flex-col w-2/3">
            <div className="form_group mb-8">
              <label>Category name</label>
              <input
                type="text"
                placeholder="ex.Production, Sejour, Frais divers..."
              />
            </div>
            <div className="btn_container">
              <button className="btn">Add a category</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreateCategoryForm
