import CreateCompany from '@/components/Company/CreateCompany'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '../../api/auth/auth'
import { redirect } from 'next/navigation'

const createCompany = async () => {
  const session = await getServerSession(authOptions)
  if (!session) {
    redirect('/sign-in')
  }
  return <CreateCompany />
}

export default createCompany
