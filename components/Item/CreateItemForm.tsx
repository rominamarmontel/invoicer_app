'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const CreateItemForm = () => {
  const [itemName, setItemName] = useState<{ fr: string; jp: string }>({
    fr: '',
    jp: '',
  })
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const res = await fetch('/api/items', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          itemName,
        }),
      })
      if (res.ok) {
        router.push('/dashboard/items')
        router.refresh()
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleItemChangeFr = (e: React.ChangeEvent<HTMLInputElement>) => {
    setItemName({ ...itemName, fr: e.target.value })
  }
  const handleItemChangeJp = (e: React.ChangeEvent<HTMLInputElement>) => {
    setItemName({ ...itemName, jp: e.target.value })
  }
  return (
    <div className="createItemForm">
      <div className="createItemForm_container">
        <div className="createItemForm_header">
          <div className="createItemsForm_header-logo">
            <h3>Create Items</h3>
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
      </div>

      <form onSubmit={handleSubmit} className="flex w-full justify-center">
        <div className="flex flex-col w-2/3">
          <div className="form_group mb-8">
            <label>Items name (French)</label>
            <input
              type="text"
              placeholder="ex.Coordinator"
              onChange={handleItemChangeFr}
            />
          </div>
          <div className="form_group mb-8">
            <label>Items name (Japanese)</label>
            <input
              type="text"
              placeholder="ex.コーディネーター"
              onChange={handleItemChangeJp}
            />
          </div>
          <div className="btn_container">
            <button className="btn">Add an Item</button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default CreateItemForm
