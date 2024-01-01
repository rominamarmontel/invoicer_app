'use client'

import { CommissionProps } from '@/types'
import React, { useEffect, useState } from 'react'
import DatatableCommission from './DatatableCommission'
import { commissionColumns } from '@/datatablesource'

const Commissions = () => {
  const [commissions, setCommissions] = useState<CommissionProps[]>([])

  useEffect(() => {
    const fetchAllCommissions = async () => {
      try {
        const res = await fetch(`${process.env.NEXTAUTH_URL}/api/commissions`)
        if (res.ok) {
          const data = await res.json()
          setCommissions(data)
        }
      } catch (error) {
        console.log(error)
      }
    }
    fetchAllCommissions()
  }, [])

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
