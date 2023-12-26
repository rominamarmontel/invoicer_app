import { getServerSession } from 'next-auth/next'
import { authOptions } from '../../api/auth/auth'
import { redirect } from 'next/navigation'
import CreatePaymentForm from '@/components/Payment/CreatePaymentForm'

const createPayment = async () => {
  const session = await getServerSession(authOptions)
  if (!session) {
    redirect('/sign-in')
  }
  return <CreatePaymentForm />
}

export default createPayment
