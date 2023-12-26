'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { toast } from 'react-hot-toast'

const CreatePaymentForm = () => {
  const [bankName, setBankName] = useState('')
  const [bankCode, setBankCode] = useState('')
  const [accountNumber, setAccountNumber] = useState('')
  const [bic, setBic] = useState('')
  const [iban, setIban] = useState('')
  const [accountName, setAccountName] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!bankName || !bankCode || !accountNumber || !iban || !bic) {
      const errorMessage =
        'Bank name, code, account number IBAN and BIC are required'
      toast.error(errorMessage)
    }

    try {
      const res = await fetch('/api/payments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          bankName,
          bankCode,
          accountNumber,
          bic,
          iban,
          accountName,
        }),
      })
      if (res.ok) {
        router.push('/dashboard/payments')
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className="createPaymentForm">
      <div className="createPaymentForm_container">
        <div className="createPaymentForm_header">
          <div className="createPaymentForm_header-logo">
            <h3>Create your bank info</h3>
          </div>
          <Link
            href="/dashboard/payments"
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
              <label>Bank name</label>
              <input
                type="text"
                placeholder="ex.France Bank"
                onChange={(e) => setBankName(e.target.value)}
              />
            </div>
            <div className="form_group mb-8">
              <label>Bank Code</label>
              <input
                type="text"
                placeholder="ex.12345"
                onChange={(e) => setBankCode(e.target.value)}
              />
            </div>
            <div className="form_group mb-8">
              <label>Account Number</label>
              <input
                type="text"
                placeholder="ex.0000012345A"
                onChange={(e) => setAccountNumber(e.target.value)}
              />
            </div>
            <div className="form_group mb-8">
              <label>BIC</label>
              <input
                type="text"
                placeholder="ex.ABCDFRPP"
                onChange={(e) => setBic(e.target.value)}
              />
            </div>
            <div className="form_group mb-8">
              <label>IBAN</label>
              <input
                type="text"
                placeholder="ex.FR00 1234 5678 1234 5678 1234 A12
              "
                onChange={(e) => setIban(e.target.value)}
              />
            </div>
            <div className="form_group mb-8">
              <label>Account Name</label>
              <input
                type="text"
                placeholder="ex.France Hanako"
                onChange={(e) => setAccountName(e.target.value)}
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

export default CreatePaymentForm
