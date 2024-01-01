import Facture from '@/components/Facture/Facture'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/auth'
import { redirect } from 'next/navigation'

const EditFacture = async ({ params }: { params: { id: string } }) => {
  const session = await getServerSession(authOptions)
  if (!session) {
    redirect('/login')
  }

  return <Facture params={params} />
}
export default EditFacture
