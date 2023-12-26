import './datatable.scss'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { DataGrid } from '@mui/x-data-grid'
import type {} from '@mui/x-data-grid/themeAugmentation'
import { paymentColumns } from '../../datatablesource'
import { PaymentProps } from '@/types'
import DeleteButtonPayment from '../DeleteButton/DeleteButtonPayment'

interface DatatableProps {
  columns: { field: string; headerName: string; width: number }[]
}
const DatatablePayment: React.FC<DatatableProps> = ({ columns }) => {
  const [payments, setPayments] = useState<PaymentProps[]>([])

  useEffect(() => {
    const fetchAllPayments = async () => {
      try {
        const res = await fetch('/api/payments')
        if (res.ok) {
          const data = await res.json()
          setPayments(data)
        }
      } catch (error) {
        console.log(error)
      }
    }
    fetchAllPayments()
  }, [])

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
              href={`/dashboard/payments/${params.id}`}
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
