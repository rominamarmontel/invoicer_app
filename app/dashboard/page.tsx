import DashboardTop from '@/components/Dashboard/Dashboard'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '../api/auth/auth'
import { redirect } from 'next/navigation'

const GetDashboard = async () => {
  const session = await getServerSession(authOptions)
  if (!session) {
    redirect('/login')
  }
  return <DashboardTop />
}

export default GetDashboard
