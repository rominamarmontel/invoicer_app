'use client'

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
        router.push('/dashboard')
        router.refresh()
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className="m-5 p-5 lg:max-w-4xl lg:mx-auto bg-white rounded shadow">
      <div>
        <h2>Create Category</h2>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <input type="text" placeholder="category" />
        <button className="primary-btn">Add a category</button>
      </form>
    </div>
  )
}

export default CreateCategoryForm
