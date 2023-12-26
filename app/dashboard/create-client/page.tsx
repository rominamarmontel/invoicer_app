import { getServerSession } from 'next-auth/next'
import { authOptions } from '../../api/auth/auth'
import { redirect } from 'next/navigation'
import CreateClientForm from '@/components/Client/CreateClientForm'

const createClient = async () => {
  const session = await getServerSession(authOptions)
  if (!session) {
    redirect('/sign-in')
  }
  return <CreateClientForm />
}

export default createClient
