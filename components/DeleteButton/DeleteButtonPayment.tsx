import { PaymentProps } from '@/types'
import { useRouter } from 'next/navigation'
import React from 'react'
import { RiDeleteBin6Line } from 'react-icons/ri'

const DeleteButtonPayment = ({
  id,
  setPayments,
}: {
  id: string
  setPayments: React.Dispatch<React.SetStateAction<PaymentProps[]>>
}) => {
  const router = useRouter()
  const removePayment = async () => {
    const confirmed = confirm('Are you sure?')
    if (confirmed) {
      const res = await fetch(`/api/payments/${id}`, {
        method: 'DELETE',
      })
      if (res.ok) {
        setPayments((prevPayments) =>
          prevPayments.filter((payment) => payment._id !== id)
        )
      }
    }
  }

  return (
    <button onClick={removePayment}>
      <RiDeleteBin6Line className="text-red-400 text-2xl" />
    </button>
  )
}

export default DeleteButtonPayment
