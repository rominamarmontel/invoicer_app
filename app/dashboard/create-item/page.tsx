import CreateItemForm from '@/components/Item/CreateItemForm'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '../../api/auth/auth'
import { redirect } from 'next/navigation'

const CreateItems = async () => {
  const session = await getServerSession(authOptions)
  if (!session) {
    redirect('/login')
  }
  return <CreateItemForm />
}

export default CreateItems
