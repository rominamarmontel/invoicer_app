import { getServerSession } from 'next-auth/next'
import { authOptions } from '../../api/auth/auth'
import { redirect } from 'next/navigation'
import CreateCompanyForm from '@/components/Company/CreateCompanyForm'

const createCompany = async () => {
  const session = await getServerSession(authOptions)
  if (!session) {
    redirect('/sign-in')
  }
  return <CreateCompanyForm />
}

export default createCompany
