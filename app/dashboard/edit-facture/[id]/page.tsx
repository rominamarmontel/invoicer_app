import { getServerSession } from 'next-auth/next'
import { authOptions } from '../../../api/auth/auth'
import { redirect } from 'next/navigation'
import OneFacture from '@/components/Facture/OneFacture'
import EditFactureForm from '@/components/Facture/EditFactureForm'

const page = ({ params }: { params: { id: string } }) => {
  const id = params.id
  const session = getServerSession(authOptions)
  if (!session) {
    redirect('/login')
  }

  return <OneFacture id={id} />
}

export default page
