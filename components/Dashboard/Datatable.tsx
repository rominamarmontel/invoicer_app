import './datatable.scss'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import type {} from '@mui/x-data-grid/themeAugmentation'
import { ClientProps, FactureProps } from '@/types'
import DeleteButtonFacture from '../DeleteButton/DeleteButtonFacture'

interface DatatableProps {
  columns: { field: string; headerName: string; width: number }[]
  factures: FactureProps[]
  setFactures: React.Dispatch<React.SetStateAction<FactureProps[]>>
}
interface DataFactureProps {
  id: string
  row: FactureProps
}

const Datatable: React.FC<DatatableProps> = ({
  columns,
  factures,
  setFactures,
}) => {
  const [clients, setClients] = useState<ClientProps[]>([])
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${process.env.NEXTAUTH_URL}/api/clients`, {
          cache: 'no-store',
        })
        if (res.ok) {
          const data = await res.json()
          const clients = await data.clients
          setClients(clients)
        }
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }, [])

  const getClientName = (client: ClientProps | string): string => {
    if (typeof client === 'string') {
      const foundClient = clients.find((c) => c._id === client)
      return foundClient ? foundClient.clientName : ''
    } else {
      return client.clientName || ''
    }
  }

  const actionColumn = [
    {
      field: 'action',
      headerName: 'Action',
      width: 200,
      renderCell: (params: DataFactureProps) => {
        return (
          <div className="cellAction">
            <Link
              href={`/dashboard/factures/${params.id}`}
              style={{ textDecoration: 'none' }}
            >
              <div className="editButton">Edit</div>
            </Link>
            <Link
              href={`/dashboard/factures/${params.id}`}
              style={{ textDecoration: 'none' }}
            >
              <div className="viewButton">View</div>
            </Link>
            <DeleteButtonFacture id={params.id} setFactures={setFactures} />
          </div>
        )
      },
    },
  ]

  const [paginationModel, setPaginationModel] = useState({
    pageSize: 25,
    page: 0,
  })

  const customColumns = columns.map((column) => {
    if (column.field === 'clientName') {
      return {
        ...column,
        renderCell: (params: DataFactureProps) => {
          const clientName = getClientName(params.row.client)
          return <span>{clientName}</span>
        },
      } as GridColDef<FactureProps>
    }
    return column as GridColDef<FactureProps>
  })

  return (
    <div className="datatable">
      <div className="datatableTitle">
        <Link href={'/dashboard/create-facture'} className="link">
          Add New
        </Link>
      </div>
      {factures && (
        <DataGrid
          className="datagrid"
          rows={factures}
          columns={(
            customColumns as readonly GridColDef<FactureProps>[]
          ).concat(actionColumn as readonly GridColDef<FactureProps>[])}
          pagination
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          checkboxSelection
          getRowId={(facture) => facture._id}
        />
      )}
    </div>
  )
}

export default Datatable
