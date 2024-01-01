import CreateFactureForm from '@/components/Facture/CreateFactureForm'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '../../api/auth/auth'
import { redirect } from 'next/navigation'

const CreateFacture = async () => {
  const session = await getServerSession(authOptions)
  if (!session) {
    redirect('/login')
  }
  return <CreateFactureForm />
}
export default CreateFacture
