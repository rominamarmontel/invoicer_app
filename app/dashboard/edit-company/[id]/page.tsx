import EditCompanyForm from '@/components/Company/EditCompanyForm'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '../../../api/auth/auth'
import { redirect } from 'next/navigation'

const EditCompany = async ({ params }: { params: { id: string } }) => {
  const id = params.id
  const session = await getServerSession(authOptions)
  if (!session) {
    redirect('/login')
  }
  return <EditCompanyForm id={id} />
}

export default EditCompany
