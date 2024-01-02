import './datatable.scss'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import type {} from '@mui/x-data-grid/themeAugmentation'
import { ClientProps, FactureProps } from '@/types'
import DeleteButtonFacture from '../DeleteButton/DeleteButtonFacture'
import ClientData from '../Client/ClientData'
import FactureData from '../Facture/FactureData'

interface DatatableProps {
  columns: { field: string; headerName: string; width: number }[]
}
interface DataFactureProps {
  id: string
  row: FactureProps
}

const Datatable: React.FC<DatatableProps> = ({ columns }) => {
  const { clients } = ClientData()
  const { factures, setFactures } = FactureData()

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
              href={`/dashboard/edit-facture/${params.id}`}
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
    if (column.field === 'createdAt') {
      return {
        ...column,
        renderCell: (params: DataFactureProps) => {
          const formattedCreatedAt = new Date(
            params.row.createdAt
          ).toLocaleDateString('fr-FR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
          })
          return <span>{formattedCreatedAt}</span>
        },
      } as GridColDef<FactureProps>
    } else if (column.field === 'factureDate') {
      return {
        ...column,
        renderCell: (params: DataFactureProps) => {
          const formattedFactureDate = new Date(
            params.row.factureDate
          ).toLocaleDateString('fr-FR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
          })
          return <span>{formattedFactureDate}</span>
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
