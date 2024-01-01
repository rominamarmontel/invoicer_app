import { authOptions } from '@/app/api/auth/auth'
import EditItemForm from '@/components/Item/EditItemForm'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

const EditItem = async ({ params }: { params: { id: string } }) => {
  const id = params.id
  const session = await getServerSession(authOptions)
  if (!session) {
    redirect('/login')
  }
  return <EditItemForm id={id} />
}

export default EditItem
