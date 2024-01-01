import Commissions from '@/components/Commission/Commissions'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/auth'
import { redirect } from 'next/navigation'

const GetAllCommissions = async () => {
  const session = await getServerSession(authOptions)
  if (!session) {
    redirect('/login')
  }
  return <Commissions />
}

export default GetAllCommissions
