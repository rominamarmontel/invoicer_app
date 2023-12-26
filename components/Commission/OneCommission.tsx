import { CommissionProps } from '@/types'
import React, { useState } from 'react'

const OneCommission = ({
  commissionId,
  subtotal,
}: {
  commissionId: CommissionProps
  subtotal: number
}) => {
  const [commission, setCommission] = useState<CommissionProps | null>(null)
  console.log(commission)
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
