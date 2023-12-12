import { CompanyProps, ItemProps } from '@/types'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/app/api/auth/auth'
import { redirect } from 'next/navigation'
import EditItemForm from '@/components/Item/EditItemForm'

const getItemById = async (id: string): Promise<ItemProps | null> => {
  try {
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/items/${id}`, {
      cache: 'no-store',
    })
    if (res.ok) {
      const data = await res.json()
      const item = await data.item
      return item
    }
  } catch (error) {
    console.log(error)
  }
  return null
}

export default async function EditItem({ params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)
  if (!session) {
    redirect('/login')
  }
  const id = params.id
  const item = await getItemById(id)
  return <>{item ? <EditItemForm item={item} /> : <div>Loading...</div>}</>
}
