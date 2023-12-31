import { getServerSession } from 'next-auth/next'
import { authOptions } from '../../../api/auth/auth'
import { redirect } from 'next/navigation'
import EditFactureForm from '@/components/Facture/EditFactureForm'
import { FactureProps } from '@/types'

const getFacture = async (id: string): Promise<FactureProps | null> => {
  try {
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/factures/${id}`, {
      cache: 'no-store',
    })
    if (res.ok) {
      const data = await res.json()
      return data.facture
    }
  } catch (error) {
    console.log(error)
  }
  return null
}

export default async function EditFacture({
  params,
}: {
  params: { id: string }
}) {
  const session = await getServerSession(authOptions)
  if (!session) {
    redirect('/login')
  }
  const id = params.id
  const facture = await getFacture(id)

  return (
    <>
      {facture ? <EditFactureForm facture={facture} /> : <div>Loading...</div>}
    </>
  )
}
