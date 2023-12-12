'use client'

import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { toast } from 'react-hot-toast'

const CreatePayment = () => {
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
          accountNumber,
          bic,
          iban,
          accountName,
        }),
      })
      if (res.ok) {
        router.push('/dashboard')
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className="m-5 p-5 lg:max-w-4xl lg:mx-auto bg-white rounded shadow">
      <div className="createCompany_container">
        <div className="createCompany_header">
          <h2>Create your bank info</h2>
        </div>
        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Bank name"
            onChange={(e) => setBankName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Bank code"
            onChange={(e) => setBankCode(e.target.value)}
          />
          <input
            type="text"
            placeholder="Bank account number"
            onChange={(e) => setAccountNumber(e.target.value)}
          />
          <input
            type="text"
            placeholder="BIC"
            onChange={(e) => setBic(e.target.value)}
          />
          <input
            type="text"
            placeholder="IBAN"
            onChange={(e) => setIban(e.target.value)}
          />
          <input
            type="text"
            placeholder="Account name"
            onChange={(e) => setAccountName(e.target.value)}
          />
          <button className="btn">Create</button>
        </form>
      </div>
    </div>
  )
}

export default CreatePayment
