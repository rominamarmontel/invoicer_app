import { CommissionProps } from '@/types'
import Link from 'next/link'
import React from 'react'
import { LiaEditSolid } from 'react-icons/lia'
import DeleteButtonCommission from '../DeleteButton/DeleteButtonCommission'
import DatatableCommission from './DatatableCommission'
import { commissionColumns } from '@/datatablesource'

const Commissions = ({
  commissions,
  setCommissions,
}: {
  commissions: CommissionProps[]
  setCommissions: React.Dispatch<React.SetStateAction<CommissionProps[]>>
}) => {
  return (
    <div className="commissions m-5 p-5 bg-white rounded shadow">
      <div className="commissions_container">
        <div className="commissions_header">
          <div className="commissions_header-logo">
            <h3>Commissions</h3>
          </div>
        </div>
        <DatatableCommission columns={commissionColumns} />
      </div>
    </div>
  )
}

export default Commissions
