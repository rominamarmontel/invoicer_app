import { CompanyProps } from '@/types'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/app/api/auth/auth'
import { redirect } from 'next/navigation'
import EditClientForm from '@/components/Client/EditClientForm'
import EditCompanyForm from '@/components/Company/EditCompanyForm'

const getCompanyById = async (id: string): Promise<CompanyProps | null> => {
  try {
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/companies/${id}`, {
      cache: 'no-store',
    })
    if (res.ok) {
      const data = await res.json()
      const company = await data.company
      return company
    }
  } catch (error) {
    console.log(error)
  }
  return null
}

export default async function EditCompany({
  params,
}: {
  params: { id: string }
}) {
  const session = await getServerSession(authOptions)
  if (!session) {
    redirect('/login')
  }
  const id = params.id
  const company = await getCompanyById(id)
  return (
    <>
      {company ? <EditCompanyForm company={company} /> : <div>Loading...</div>}
    </>
  )
}
