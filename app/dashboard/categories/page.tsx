import { authOptions } from '@/app/api/auth/auth'
import Categories from '@/components/Category/Categories'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

const GetAllCategories = async () => {
  const session = await getServerSession(authOptions)
  if (!session) {
    redirect('/login')
  }
  return <Categories />
}

export default GetAllCategories
