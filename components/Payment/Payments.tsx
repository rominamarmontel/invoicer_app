'use client'

import { PaymentProps } from '@/types'
import DatatablePayment from './DatatablePayment'
import { paymentColumns } from '@/datatablesource'
import { useState, useEffect } from 'react'

const Payments = () => {
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

  return (
    <div className="payments m-5 p-5 bg-white rounded shadow">
      <div className="payments_container">
        <div className="payments_header">
          <div className="payments_header-logo">
            <h3>Payments</h3>
          </div>
        </div>
        <DatatablePayment columns={paymentColumns} />
      </div>
    </div>
  )
}

export default Payments
