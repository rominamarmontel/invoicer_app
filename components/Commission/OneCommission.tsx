import { CommissionProps, FactureProps } from '@/types'
import React, { useEffect, useState } from 'react'

interface OneCommissionProps {
  commissionId: CommissionProps
  facture: FactureProps
  subtotal: number
}
const OneCommission: React.FC<OneCommissionProps> = ({
  commissionId,
  facture,
  subtotal,
}) => {
  const [commission, setCommission] = useState<CommissionProps | null>(null)

  useEffect(() => {
    const fetchCommission = async () => {
      try {
        const res = await fetch(`/api/commissions/${commissionId}`, {
          cache: 'no-store',
        })
        if (res.ok) {
          const data = await res.json()
          const commission = await data.commission
          if (!commission) {
            console.log('Commission not found')
            return
          }
          setCommission(commission)
        }
      } catch (error) {
        console.log(error)
      }
    }
    fetchCommission()
  }, [commissionId])

  return (
    <>
      <td
        colSpan={7}
        className="text-right whitespace-nowrap border-r px-3 py-2 dark:border-neutral-500"
      >
        {commission?.commissionName && commission.commissionName}{' '}
        {commission?.taux && commission.taux} <span>%</span>
      </td>
      <td className="flex justify-end whitespace-nowrap px-3 py-2 dark:border-neutral-500">
        € {subtotal * (commission?.taux ? commission.taux * 0.01 : 0)}
      </td>
    </>
  )
}

export default OneCommission
