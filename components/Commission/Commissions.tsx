import { CommissionProps } from '@/types'
import Link from 'next/link'
import React from 'react'
import { LiaEditSolid } from 'react-icons/lia'
import DeleteButtonCommission from '../DeleteButton/DeleteButtonCommission'

const Commissions = ({
  commissions,
  setCommissions,
}: {
  commissions: CommissionProps[]
  setCommissions: React.Dispatch<React.SetStateAction<CommissionProps[]>>
}) => {
  return (
    <div className="m-5 p-5 lg:max-w-4xl lg:mx-auto bg-white rounded shadow">
      <div className="commissions_container">
        <div className="commissions_header flex items-center justify-between">
          <h2>Commissions List</h2>
          <div className="edit-btn commissions_create ">
            <Link href="/dashboard/create-commission">
              <p className="flex items-center gap-5">
                Create{' '}
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </span>
              </p>
            </Link>
          </div>
        </div>

        <div className="inline_card-group">
          {commissions ? (
            commissions.map((commission: CommissionProps) => (
              <div
                key={commission._id}
                className="card_group w-1/3 flex items-center justify-between"
              >
                <div>{commission.commissionName}</div>
                <div>
                  {commission.taux} <span>%</span>
                </div>
                <div className="flex justify-between items-center gap-2">
                  <DeleteButtonCommission
                    id={commission._id}
                    setCommissions={setCommissions}
                  />
                  <Link href={`/dashboard/edit-commission/${commission._id}`}>
                    <LiaEditSolid className="text-green-500 text-2xl" />
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <div>
              <p>Loading...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Commissions
