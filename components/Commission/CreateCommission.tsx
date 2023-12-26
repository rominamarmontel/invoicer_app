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
    <div className="createCommission">
      <div className="createCommission_container">
        <div className="createCommission_header">
          <div className="createCommission_header-logo">
            <h3>Create commission</h3>
          </div>
          <Link
            href="/dashboard/commissions"
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
              <label>Commission Name</label>
              <input
                type="text"
                placeholder="ex. Prod commission, TVA..."
                onChange={(e) => setCommissionName(e.target.value)}
              />
            </div>
            <div className="form_group mb-8">
              <label>Taux (%)</label>
              <input
                type="number"
                placeholder="ex. 30"
                onChange={(e) => setTaux(Number(e.target.value))}
              />
            </div>
            <div className="btn_container">
              <button className="btn">Create</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreateCommission
