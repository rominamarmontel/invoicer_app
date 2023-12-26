'use client'

import { CommissionProps } from '@/types'
import { useEffect, useState } from 'react'
import EditCommissionForm from '@/components/Commission/EditCommissionForm'

const EditCommission = ({ params }: { params: { id: CommissionProps } }) => {
  const [commission, setCommission] = useState<CommissionProps | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXTAUTH_URL}/api/commissions/${params.id}`,
          {
            cache: 'no-store',
          }
        )
        if (res.ok) {
          const data = await res.json()
          const commission = await data.commission
          setCommission(commission)
        }
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }, [params.id])

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
export default EditCommission
