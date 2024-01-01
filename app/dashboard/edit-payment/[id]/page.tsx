import EditPaymentForm from '@/components/Payment/EditPaymentForm'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/app/api/auth/auth'
import { redirect } from 'next/navigation'

const DetailsPayment = async ({ params }: { params: { id: string } }) => {
  const id = params.id
  const session = await getServerSession(authOptions)
  if (!session) {
    redirect('/login')
  }
  return <EditPaymentForm id={id} />
}

export default DetailsPayment
