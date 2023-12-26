import './datatable.scss'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { DataGrid } from '@mui/x-data-grid'
import { companyColumns } from '../../datatablesource'
import DeleteButtonCompany from '../DeleteButton/DeleteButtonCompany'
import { CompanyProps } from '@/types'

interface DatatableProps {
  columns: { field: string; headerName: string; width: number }[]
}
const DatatableCompany: React.FC<DatatableProps> = ({ columns }) => {
  const [companies, setCompanies] = useState<CompanyProps[]>([])

  useEffect(() => {
    const fetchAllCompanies = async () => {
      try {
        const res = await fetch('/api/companies')
        if (res.ok) {
          const data = await res.json()
          setCompanies(data)
        }
      } catch (error) {
        console.log(error)
      }
    }
    fetchAllCompanies()
  }, [])

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
              href={`/dashboard/companies/${params.id}`}
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
