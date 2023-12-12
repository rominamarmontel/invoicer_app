import { CommissionProps } from '@/types'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/app/api/auth/auth'
import { redirect } from 'next/navigation'
import EditCommissionForm from '@/components/Commission/EditCommissionForm'

const getCommissiontById = async (
  id: string
): Promise<CommissionProps | null> => {
  try {
    const res = await fetch(
      `${process.env.NEXTAUTH_URL}/api/commissions/${id}`,
      {
        cache: 'no-store',
      }
    )
    if (res.ok) {
      const data = await res.json()
      const commission = await data.commission
      return commission
    }
  } catch (error) {
    console.log(error)
  }
  return null
}

export default async function EditCommission({
  params,
}: {
  params: { id: string }
}) {
  const session = await getServerSession(authOptions)
  if (!session) {
    redirect('/login')
  }
  const id = params.id
  const commission = await getCommissiontById(id)

  return (
    <>
      {commission ? (
        <EditCommissionForm commission={commission} />
      ) : (
        <div>Loading...</div>
      )}
    </>
  )
}
