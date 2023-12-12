import { PaymentProps } from '@/types'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/app/api/auth/auth'
import { redirect } from 'next/navigation'
import EditpaymentForm from '@/components/Payment/EditPaymentForm'

const getPaymentById = async (id: string): Promise<PaymentProps | null> => {
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

export default async function EditPayment({
  params,
}: {
  params: { id: string }
}) {
  const session = await getServerSession(authOptions)
  if (!session) {
    redirect('/login')
  }

  const id = params.id
  const payment = await getPaymentById(id)

  return (
    <>
      {payment ? <EditpaymentForm payment={payment} /> : <div>Loading...</div>}
    </>
  )
}
