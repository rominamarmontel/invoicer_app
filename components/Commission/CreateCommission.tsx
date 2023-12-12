'use client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { toast } from 'react-hot-toast'

const CreateCommission = () => {
  const [commissionName, setCommissionName] = useState('')
  const [taux, setTaux] = useState<number>(0)
  const router = useRouter()

  const handleSubmit = async (e: React.FocusEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!commissionName || !taux) {
      toast.error('Commission name and taux are required')
    }

    try {
      const res = await fetch('/api/commissions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          commissionName,
          taux,
        }),
      })
      if (res.ok) {
        toast.success('Create Commission successfully')
        router.push('/dashboard/commissions')
        router.refresh()
      }
    } catch (error) {
      console.log(error)
    }
    return null
  }

  return (
    <div className="m-5 p-5 lg:max-w-4xl lg:mx-auto bg-white rounded shadow">
      <div className="createCommission_container">
        <div className="createCommission_header flex items-center justify-between">
          <h2>Create commission</h2>
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
        </div>
        <form className="flex flex-col" onSubmit={handleSubmit}>
          <div className="form_group flex flex-col">
            <label>Commission Name</label>
            <input
              type="text"
              placeholder="ex. Prod commission, TVA..."
              onChange={(e) => setCommissionName(e.target.value)}
            />
          </div>
          <div className="form_group flex flex-col">
            <label>Taux (%)</label>
            <input
              type="number"
              placeholder="ex. 30"
              onChange={(e) => setTaux(Number(e.target.value))}
            />
          </div>
          <button className="btn">Create</button>
        </form>
      </div>
    </div>
  )
}

export default CreateCommission
