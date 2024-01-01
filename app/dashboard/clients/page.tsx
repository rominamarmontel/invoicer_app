import { authOptions } from '@/app/api/auth/auth'
import Clients from '@/components/Client/Clients'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

const GetAllClients = async () => {
  const session = await getServerSession(authOptions)
  if (!session) {
    redirect('/login')
  }
  return <Clients />
}

export default GetAllClients
