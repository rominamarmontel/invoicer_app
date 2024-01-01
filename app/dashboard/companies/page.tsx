import Companies from '@/components/Company/Companies'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/auth'
import { redirect } from 'next/navigation'

const GetAllCompanies = async () => {
  const session = await getServerSession(authOptions)
  if (!session) {
    redirect('/login')
  }

  return <Companies />
}

export default GetAllCompanies
