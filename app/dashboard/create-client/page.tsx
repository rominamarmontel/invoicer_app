import CreateClient from '@/components/Client/CreateClient'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '../../api/auth/auth'
import { redirect } from 'next/navigation'

const createClient = async () => {
  const session = await getServerSession(authOptions)
  if (!session) {
    redirect('/sign-in')
  }
  return <CreateClient />
}

export default createClient
