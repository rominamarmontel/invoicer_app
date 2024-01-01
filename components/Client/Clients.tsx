'use client'

import { ClientProps } from '@/types'
import { useEffect, useState } from 'react'
import DatatableClient from './DatatableClient'
import { clientColumns } from '@/datatablesource'

const clients = () => {
  const [clients, setClients] = useState<ClientProps[]>([])

  useEffect(() => {
    const fetchAllClients = async () => {
      try {
        const res = await fetch(`${process.env.NEXTAUTH_URL}/api/clients`, {
          cache: 'no-store',
        })
        if (res.ok) {
          const data = await res.json()
          setClients(data)
        }
      } catch (error) {
        console.log(error)
      }
    }
    fetchAllClients()
  }, [])

  return (
    <div className="clients m-5 p-5 bg-white rounded shadow">
      <div className="clients_container">
        <div className="clients_header">
          <div className="clients_header-logo">
            <h3>Clients</h3>
          </div>
        </div>
        <DatatableClient columns={clientColumns} />
      </div>
    </div>
  )
}

export default clients
