import './datatable.scss'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { clientColumns } from '../../datatablesource'
import { ClientProps } from '@/types'
import DeleteButtonClient from '../DeleteButton/DeleteButtonClient'

interface DatatableProps {
  columns: { field: string; headerName: string; width: number }[]
}
const DatatableClient: React.FC<DatatableProps> = ({ columns }) => {
  const [clients, setClients] = useState<ClientProps[]>([])

  useEffect(() => {
    const fetchAllClients = async () => {
      try {
        const res = await fetch('/api/clients')
        if (res.ok) {
          const data = await res.json()
          setClients(data.clients)
        }
      } catch (error) {
        console.log(error)
      }
    }
    fetchAllClients()
  }, [])

  interface DataClientProps {
    id: string
  }
  const actionColumn = [
    {
      field: 'action',
      headerName: 'Action',
      width: 200,
      renderCell: (params: DataClientProps) => {
        return (
          <div className="cellAction">
            <Link
              href={`/dashboard/clients/${params.id}`}
              style={{ textDecoration: 'none' }}
            >
              <div className="editButton">Edit</div>
            </Link>
            <DeleteButtonClient id={params.id} setClients={setClients} />
          </div>
        )
      },
    },
  ]

  const [paginationModel, setPaginationModel] = useState({
    pageSize: 25,
    page: 0,
  })

  return (
    <div className="datatable">
      <div className="datatableTitle">
        <Link href={'/dashboard/create-client'} className="link">
          Add New
        </Link>
      </div>
      {clients && (
        <DataGrid
          className="datagrid"
          rows={clients}
          columns={clientColumns.concat(actionColumn)}
          pagination
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          checkboxSelection
          getRowId={(client) => client._id}
        />
      )}
    </div>
  )
}

export default DatatableClient
