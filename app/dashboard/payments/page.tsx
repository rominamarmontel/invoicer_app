'use client'

import React, { useEffect, useState } from 'react'
import { PaymentProps } from '@/types'
import Payments from '@/components/Payment/Payments'

const GetAllPayments = () => {
  const [payments, setPayments] = useState<PaymentProps[]>([])

  useEffect(() => {
    const fetchAllPayments = async () => {
      try {
        const res = await fetch(`${process.env.NEXTAUTH_URL}/api/payments`)
        if (res.ok) {
          const data = await res.json()
          setPayments(data)
        }
      } catch (error) {
        console.log(error)
      }
    }
    fetchAllPayments()
  }, [])
  return <Payments payments={payments} setPayments={setPayments} />
}

export default GetAllPayments
