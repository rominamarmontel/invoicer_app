import './datatable.scss'
import { useState } from 'react'
import Link from 'next/link'
import { DataGrid } from '@mui/x-data-grid'
import { companyColumns } from '../../datatablesource'
import DeleteButtonCompany from '../DeleteButton/DeleteButtonCompany'
import CompanyData from './CompanyData'

interface DatatableProps {
  columns: { field: string; headerName: string; width: number }[]
}
const DatatableCompany: React.FC<DatatableProps> = ({ columns }) => {
  const { companies, setCompanies } = CompanyData()
  interface DataCompanyProps {
    id: string
  }
  const actionColumn = [
    {
      field: 'action',
      headerName: 'Action',
      width: 200,
      renderCell: (params: DataCompanyProps) => {
        return (
          <div className="cellAction">
            <Link
              href={`/dashboard/edit-company/${params.id}`}
              style={{ textDecoration: 'none' }}
            >
              <div className="editButton">Edit</div>
            </Link>
            <DeleteButtonCompany id={params.id} setCompanies={setCompanies} />
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
        <Link href={'/dashboard/create-company'} className="link">
          Add New
        </Link>
      </div>
      {companies && (
        <DataGrid
          className="datagrid"
          rows={companies}
          columns={companyColumns.concat(actionColumn)}
          pagination
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          checkboxSelection
          getRowId={(companies) => companies._id}
        />
      )}
    </div>
  )
}

export default DatatableCompany
