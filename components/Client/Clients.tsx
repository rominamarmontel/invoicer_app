import { ClientProps } from '@/types'
import React from 'react'
import DeleteButtonClient from '../DeleteButton/DeleteButtonClient'
import Link from 'next/link'
import { LiaEditSolid } from 'react-icons/lia'
import DatatableClient from './DatatableClient'
import { clientColumns } from '@/datatablesource'

const clients = ({
  clients,
  setClients,
}: {
  clients: ClientProps[]
  setClients: React.Dispatch<React.SetStateAction<ClientProps[]>>
}) => {
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
