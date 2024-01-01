import { getServerSession } from 'next-auth/next'
import { authOptions } from '../../api/auth/auth'
import { redirect } from 'next/navigation'
import CreateCommission from '@/components/Commission/CreateCommission'

const createCommission = async () => {
  const session = await getServerSession(authOptions)
  if (!session) {
    redirect('/login')
  }
  return <CreateCommission />
}

export default createCommission
