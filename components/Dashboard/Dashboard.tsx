'use client'

import React, { useEffect, useState } from 'react'
import { FactureProps } from '@/types'
import Datatable from './Datatable'
import { factureColumns } from '@/datatablesource'

const Dashboard = () => {
  const [factures, setFactures] = useState<FactureProps[]>([])

  useEffect(() => {
    const fetchAllFactures = async () => {
      try {
        const res = await fetch('/api/factures')
        if (res.ok) {
          const data = await res.json()
          setFactures(data)
        }
      } catch (error) {
        console.log(error)
      }
    }
    fetchAllFactures()
  }, [])

  const countFactures = () => {
    let count = 0
    for (let i = 0; i < factures.length; i++) {
      count++
    }
    return count
  }
  return (
    <div className="dashboard">
      <div className="dashboard_container">
        <div className="dashboard_header">
          <div className="dashboard_header-logo">
            <h3>Dashboard</h3>
            <p>
              {`There are total ${countFactures()}`}{' '}
              {factures.length > 0 ? 'factures' : 'facture'}.
            </p>
          </div>
        </div>
        <Datatable
          columns={factureColumns}
          factures={factures}
          setFactures={setFactures}
        />
      </div>
    </div>
  )
}
export default Dashboard
