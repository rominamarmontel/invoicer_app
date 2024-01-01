import EditCommissionForm from '@/components/Commission/EditCommissionForm'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '../../../api/auth/auth'
import { redirect } from 'next/navigation'

const EditCommission = async ({ params }: { params: { id: string } }) => {
  const id = params.id
  const session = getServerSession(authOptions)
  if (!session) {
    redirect('/login')
  }
  return <EditCommissionForm id={id} />
}
export default EditCommission
