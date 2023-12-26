'use client'

import { PaymentProps } from '@/types'
import React, { useEffect, useState } from 'react'
import EditPaymentForm from '@/components/Payment/EditPaymentForm'

const DetailsPayment = ({ params }: { params: { id: PaymentProps } }) => {
  const [payment, setPayment] = useState<PaymentProps | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXTAUTH_URL}/api/payments/${params.id}`,
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
  }, [params.id])

  return (
    <div>
      {payment ? <EditPaymentForm payment={payment} /> : <div>Loading...</div>}
    </div>
  )
}

export default DetailsPayment
