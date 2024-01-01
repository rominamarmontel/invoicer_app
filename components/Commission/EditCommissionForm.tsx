'use client'

import { CommissionProps } from '@/types'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'

const EditCommissionForm = ({ id }: { id: string }) => {
  const [commissionName, setCommissionName] = useState('')
  const [taux, setTaux] = useState<number>(0)
  const router = useRouter()
  const [commission, setCommission] = useState<CommissionProps | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXTAUTH_URL}/api/commissions/${id}`,
          {
            cache: 'no-store',
          }
        )
        if (res.ok) {
          const data = await res.json()
          const commission = await data.commission
          setCommission(commission)
        }
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }, [id])

  useEffect(() => {
    const initialValues = () => {
      setCommissionName(commission?.commissionName || '')
      setTaux(commission?.taux || 0)
    }
    initialValues()
  }, [commission?.commissionName, commission?.taux])

  const handleSubmit = async (e: React.FocusEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!commissionName || !taux) {
      toast.error('Commission name and taux are required')
    }

    try {
      const res = await fetch(`/api/commissions/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          commissionName,
          taux,
        }),
      })
      if (res.ok) {
        toast.success('Update Commission successfully')
        router.push('/dashboard/commissions')
        router.refresh()
      }
    } catch (error) {
      console.log(error)
    }
    return null
  }

  return (
    <div className="editCommissionForm">
      <div className="editCommissionForm_container">
        <div className="editCommissionForm_header">
          <div className="editCommissionForm_header-logo">
            <h3>Edit commission</h3>
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
              <label>COMMISSION NAME</label>
              <input
                type="text"
                placeholder="ex. Prod commission, TVA..."
                onChange={(e) => setCommissionName(e.target.value)}
                value={commissionName}
              />
            </div>
            <div className="form_group mb-8">
              <label>TAUX (%)</label>
              <input
                type="number"
                placeholder="ex. 30"
                onChange={(e) => setTaux(Number(e.target.value))}
                value={taux}
              />
            </div>
            <button className="btn">UPDATE</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditCommissionForm
