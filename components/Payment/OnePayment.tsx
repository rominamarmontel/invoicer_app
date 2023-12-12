import { PaymentProps } from '@/types'
import React, { useEffect, useState } from 'react'

interface OnePaymentProps {
  paymentId: PaymentProps
}
const OnePayment: React.FC<OnePaymentProps> = ({ paymentId }) => {
  const [payment, setPayment] = useState<PaymentProps | null>(null)
  useEffect(() => {
    const fetchPayment = async () => {
      try {
        const res = await fetch(`/api/payments/${paymentId}`, {
          cache: 'no-store',
        })
        if (res.ok) {
          const data = await res.json()
          const payment = await data.payment
          if (!payment) {
            console.log('Payment not found')
            return
          }
          setPayment(payment)
        }
      } catch (error) {
        console.log(error)
      }
    }
    fetchPayment()
  }, [paymentId])

  return (
    <div className="w-full flex justify-center">
      <div className="onePayment_container flex flex-wrap gap-2 text-sm mt-10 text-slate-700">
        {payment?.bankName && (
          <p>
            <span className="font-bold">Bank Name: </span>
            {payment.bankName}
          </p>
        )}
        {payment?.accountNumber && (
          <p>
            <span className="font-bold">Account Number: </span>
            {payment.accountNumber}
          </p>
        )}
        {payment?.accountName && (
          <p>
            <span className="font-bold">Account Name: </span>
            {payment.accountName}
          </p>
        )}
        {payment?.bankCode && (
          <p>
            <span className="font-bold">Bank Code: </span>
            {payment.bankCode}
          </p>
        )}
        {payment?.bic && (
          <p>
            <span className="font-bold">BIC: </span>
            {payment.bic}
          </p>
        )}
        {payment?.iban && (
          <p>
            <span className="font-bold">IBAN: </span>
            {payment.iban}
          </p>
        )}
      </div>
    </div>
  )
}

export default OnePayment
