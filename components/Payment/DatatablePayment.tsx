import './datatable.scss'
import { useState } from 'react'
import Link from 'next/link'
import { DataGrid } from '@mui/x-data-grid'
import type {} from '@mui/x-data-grid/themeAugmentation'
import { paymentColumns } from '../../datatablesource'
import DeleteButtonPayment from '../DeleteButton/DeleteButtonPayment'
import PaymentData from './PaymentData'

interface DatatableProps {
  columns: { field: string; headerName: string; width: number }[]
}
const DatatablePayment: React.FC<DatatableProps> = ({ columns }) => {
  const { payments, setPayments } = PaymentData()

  interface DataPaymentProps {
    id: string
  }
  const actionColumn = [
    {
      field: 'action',
      headerName: 'Action',
      width: 200,
      renderCell: (params: DataPaymentProps) => {
        return (
          <div className="cellAction">
            <Link
              href={`/dashboard/edit-payment/${params.id}`}
              style={{ textDecoration: 'none' }}
            >
              <div className="editButton">Edit</div>
            </Link>
            <DeleteButtonPayment id={params.id} setPayments={setPayments} />
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
        <Link href={'/dashboard/create-payment'} className="link">
          Add New
        </Link>
      </div>
      {payments && (
        <DataGrid
          className="datagrid"
          rows={payments}
          columns={paymentColumns.concat(actionColumn)}
          pagination
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          checkboxSelection
          getRowId={(payment) => payment._id}
        />
      )}
    </div>
  )
}

export default DatatablePayment
