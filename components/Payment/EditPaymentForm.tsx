'use client'

import { PaymentProps } from '@/types'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'

const EditPaymentForm = ({ id }: { id: string }) => {
  const [bankName, setBankName] = useState('')
  const [bankCode, setBankCode] = useState('')
  const [accountNumber, setAccountNumber] = useState('')
  const [bic, setBic] = useState('')
  const [iban, setIban] = useState('')
  const [accountName, setAccountName] = useState('')
  const router = useRouter()
  const [payment, setPayment] = useState<PaymentProps | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXTAUTH_URL}/api/payments/${id}`,
          {
            cache: 'no-store',
          }
        )
        if (res.ok) {
          const data = await res.json()
          const payment = await data.payment
          setPayment(payment)
        }
      } catch (error) {
        console.log(error)
      }
    }

    fetchData()
  }, [id])

  useEffect(() => {
    const initialValues = () => {
      setBankName(payment?.bankName || '')
      setBankCode(payment?.bankCode || '')
      setAccountNumber(payment?.accountNumber || '')
      setBic(payment?.bic || '')
      setIban(payment?.iban || '')
      setAccountName(payment?.accountName || '')
    }
    initialValues()
  }, [
    payment?.bankName,
    payment?.bankCode,
    payment?.accountNumber,
    payment?.bic,
    payment?.iban,
    payment?.accountName,
  ])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!bankName || !bankCode || !accountNumber || !iban || !bic) {
      toast.error('Bank name, code, account number IBAN and BIC are required')
      return
    }

    try {
      const res = await fetch(`/api/payments/${id}`, {
        method: 'PUT',
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
        toast.success('Update Your payment successfully')
        router.push('/dashboard/payments')
        router.refresh()
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="editPaymentForm">
      <div className="editPaymentForm_container">
        <div className="editPaymentForm_header">
          <div className="editPaymentForm_header-logo">
            <h3>Edit your payment info</h3>
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
                value={bankName || ''}
              />
            </div>
            <div className="form_group mb-8">
              <label>Bank Code</label>
              <input
                type="text"
                placeholder="ex.12345"
                onChange={(e) => setBankCode(e.target.value)}
                value={bankCode || ''}
              />
            </div>
            <div className="form_group mb-8">
              <label>Account Number</label>
              <input
                type="text"
                placeholder="ex.0000012345A"
                onChange={(e) => setAccountNumber(e.target.value)}
                value={accountNumber || ''}
              />
            </div>
            <div className="form_group mb-8">
              <label>BIC</label>
              <input
                type="text"
                placeholder="ex.ABCDFRPP"
                onChange={(e) => setBic(e.target.value)}
                value={bic || ''}
              />
            </div>
            <div className="form_group mb-8">
              <label>IBAN</label>
              <input
                type="text"
                placeholder="ex.FR00 1234 5678 1234 5678 1234 A12"
                onChange={(e) => setIban(e.target.value)}
                value={iban || ''}
              />
            </div>
            <div className="form_group mb-8">
              <label>Account Name</label>
              <input
                type="text"
                placeholder="ex.France Hanako"
                onChange={(e) => setAccountName(e.target.value)}
                value={accountName || ''}
              />
            </div>
            <div className="btn_container">
              <button className="btn">Update</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditPaymentForm
