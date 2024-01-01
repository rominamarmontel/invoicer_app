'use client'

import Datatable from './Datatable'
import { factureColumns } from '@/datatablesource'
import FactureData from '../Facture/FactureData'

const Dashboard = () => {
  const { factures } = FactureData()
  const countFactures = () => {
    let count = 0
    for (let i = 0; i < factures?.length; i++) {
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
              {factures?.length > 0 ? 'factures' : 'facture'}.
            </p>
          </div>
        </div>
        <Datatable columns={factureColumns} />
      </div>
    </div>
  )
}
export default Dashboard
