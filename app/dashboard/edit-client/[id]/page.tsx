import { getServerSession } from 'next-auth/next'
import { authOptions } from '../../../api/auth/auth'
import { redirect } from 'next/navigation'
import EditClientForm from '@/components/Client/EditClientForm'

const EditClient = async ({ params }: { params: { id: string } }) => {
  const id = params.id
  const session = await getServerSession(authOptions)
  if (!session) {
    redirect('/login')
  }
  return <EditClientForm id={id} />
}
export default EditClient
