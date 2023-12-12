'use client'

import { PaymentProps } from '@/types'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'

const EditPaymentForm = ({ payment }: { payment: PaymentProps }) => {
  const [bankName, setBankName] = useState('')
  const [bankCode, setBankCode] = useState('')
  const [accountNumber, setAccountNumber] = useState('')
  const [bic, setBic] = useState('')
  const [iban, setIban] = useState('')
  const [accountName, setAccountName] = useState('')
  const router = useRouter()

  useEffect(() => {
    const initialValues = () => {
      setBankName(payment.bankName || '')
      setBankCode(payment.bankCode || '')
      setAccountNumber(payment.accountNumber || '')
      setBic(payment.bic || '')
      setIban(payment.iban || '')
      setAccountName(payment.accountName || '')
    }
    initialValues()
  }, [
    payment.bankName,
    payment.bankCode,
    payment.accountNumber,
    payment.bic,
    payment.iban,
    payment.accountName,
  ])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!bankName || !bankCode || !accountNumber || !iban || !bic) {
      toast.error('Bank name, code, account number IBAN and BIC are required')
      return
    }

    try {
      const res = await fetch(`/api/payments/${payment._id}`, {
        method: 'PUT',
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
        toast.success('Update Your payment successfully')
        router.push('/dashboard')
        router.refresh()
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="m-5 p-5 lg:max-w-4xl lg:mx-auto bg-white rounded shadow">
      <div className="createpayment_container">
        <div className="createpayment_header">
          <h2>Edit your payment info</h2>
        </div>
        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="payment name"
            onChange={(e) => setBankName(e.target.value)}
            value={bankName || ''}
          />
          <input
            type="text"
            placeholder="payment address"
            onChange={(e) => setBankCode(e.target.value)}
            value={bankCode || ''}
          />
          <input
            type="text"
            placeholder="payment city name"
            onChange={(e) => setAccountNumber(e.target.value)}
            value={accountNumber || ''}
          />
          <input
            type="text"
            placeholder="payment zipcode"
            onChange={(e) => setBic(e.target.value)}
            value={bic || ''}
          />
          <input
            type="text"
            placeholder="payment country"
            onChange={(e) => setIban(e.target.value)}
            value={iban || ''}
          />
          <input
            type="text"
            placeholder="payment phone number"
            onChange={(e) => setAccountName(e.target.value)}
            value={accountName || ''}
          />
          <button className="btn">Update</button>
        </form>
      </div>
    </div>
  )
}

export default EditPaymentForm
