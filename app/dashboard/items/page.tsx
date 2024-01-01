import { authOptions } from '@/app/api/auth/auth'
import Items from '@/components/Item/Items'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

const GetAllItems = async () => {
  const session = await getServerSession(authOptions)
  if (!session) {
    redirect('/login')
  }
  return <Items />
}

export default GetAllItems
