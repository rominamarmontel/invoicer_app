import CreateCategoryForm from '@/components/Category/CreateCategoryForm'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '../../api/auth/auth'
import { redirect } from 'next/navigation'

const CreateCategory = async () => {
  const session = await getServerSession(authOptions)
  if (!session) {
    redirect('/login')
  }
  return <CreateCategoryForm />
}

export default CreateCategory
