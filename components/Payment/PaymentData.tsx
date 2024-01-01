'use client'

import { PaymentProps } from '@/types'
import { useState, useEffect } from 'react'

const PaymentData = () => {
  const [payments, setPayments] = useState<PaymentProps[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${process.env.NEXTAUTH_URL}/api/payments`, {
          cache: 'no-store',
        })
        if (res.ok) {
          const data = await res.json()
          setPayments(data.payments)
        }
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }, [])

  return { payments, setPayments }
}

export default PaymentData
