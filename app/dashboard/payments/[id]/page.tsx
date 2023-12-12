'use client'

import { PaymentProps } from '@/types'
import React, { useEffect, useState } from 'react'
import OnePayment from '@/components/Payment/OnePayment'

const getOnePayment = async (id: string): Promise<PaymentProps | null> => {
  try {
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/payments/${id}`, {
      cache: 'no-store',
    })
    if (res.ok) {
      const data = await res.json()
      const payment = await data.payment
      return payment
    }
  } catch (error) {
    console.log(error)
  }
  return null
}

const DetailsPayment = ({ params }: { params: { id: string } }) => {
  const [payment, setPayment] = useState<PaymentProps | null>(null)
  useEffect(() => {
    const fetchData = async () => {
      const fetchedPayment = await getOnePayment(params.id)
      setPayment(fetchedPayment)
    }
    fetchData()
  }, [params.id])

  if (payment === null) {
    return <div>Loading....</div>
  }

  return (
    <div>
      {payment ? (
        <OnePayment
          _id={payment._id}
          bankName={payment.bankName}
          bankCode={payment.bankCode}
          accountNumber={payment.accountNumber}
          bic={payment.bic}
          iban={payment.iban}
          accountName={payment.accountName}
        />
      ) : (
        <div>Loading...</div>
      )}
    </div>
  )
}

export default DetailsPayment
