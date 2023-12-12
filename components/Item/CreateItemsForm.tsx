'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

const CreateItemsForm = () => {
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
        router.push('/dashboard')
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
    <div className="m-5 p-5 lg:max-w-4xl lg:mx-auto bg-white rounded shadow">
      <div>
        <h2>Create Items</h2>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <input
          type="text"
          placeholder="Item Name(French)"
          onChange={handleItemChangeFr}
        />
        <input
          type="text"
          placeholder="Item Name(Japanese)"
          onChange={handleItemChangeJp}
        />
        <button className="btn">Add an Item</button>
      </form>
    </div>
  )
}

export default CreateItemsForm
