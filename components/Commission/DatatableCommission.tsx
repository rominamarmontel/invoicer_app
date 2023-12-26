import './datatable.scss'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { DataGrid } from '@mui/x-data-grid'
import type {} from '@mui/x-data-grid/themeAugmentation'
import { commissionColumns } from '../../datatablesource'
import { CommissionProps } from '@/types'
import DeleteButtonCommission from '../DeleteButton/DeleteButtonCommission'

interface DatatableProps {
  columns: { field: string; headerName: string; width: number }[]
}
const DatatableCommission: React.FC<DatatableProps> = ({ columns }) => {
  const [commissions, setCommissions] = useState<CommissionProps[]>([])

  useEffect(() => {
    const fetchAllCommissions = async () => {
      try {
        const res = await fetch('/api/commissions')
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

  interface DataCommissionProps {
    id: string
  }
  const actionColumn = [
    {
      field: 'action',
      headerName: 'Action',
      width: 200,
      renderCell: (params: DataCommissionProps) => {
        return (
          <div className="cellAction">
            <Link
              href={`/dashboard/commissions/${params.id}`}
              style={{ textDecoration: 'none' }}
            >
              <div className="editButton">Edit</div>
            </Link>
            <DeleteButtonCommission
              id={params.id}
              setCommissions={setCommissions}
            />
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
        <Link href={'/dashboard/create-commission'} className="link">
          Add New
        </Link>
      </div>
      {commissions && (
        <DataGrid
          className="datagrid"
          rows={commissions}
          columns={commissionColumns.concat(actionColumn)}
          pagination
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          checkboxSelection
          getRowId={(commission) => commission._id}
        />
      )}
    </div>
  )
}

export default DatatableCommission
