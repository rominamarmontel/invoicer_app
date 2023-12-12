import EditClientForm from '@/components/Client/EditClientForm'
import { ClientProps } from '@/types'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/app/api/auth/auth'
import { redirect } from 'next/navigation'

const getClientById = async (id: string): Promise<ClientProps | null> => {
  try {
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/clients/${id}`, {
      cache: 'no-store',
    })
    if (res.ok) {
      const data = await res.json()
      const client = await data.client
      return client
    }
  } catch (error) {
    console.log(error)
  }
  return null
}

export default async function EditClient({
  params,
}: {
  params: { id: string }
}) {
  const session = await getServerSession(authOptions)
  if (!session) {
    redirect('/login')
  }

  const id = params.id
  const client = await getClientById(id)

  return (
    <>{client ? <EditClientForm client={client} /> : <div>Loading...</div>}</>
  )
}
