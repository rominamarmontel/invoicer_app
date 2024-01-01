import { authOptions } from '@/app/api/auth/auth'
import Payments from '@/components/Payment/Payments'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

const GetAllPayments = async () => {
  const session = await getServerSession(authOptions)
  if (!session) {
    redirect('/login')
  }
  return <Payments />
}

export default GetAllPayments
