import './datatable.scss'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { DataGrid } from '@mui/x-data-grid'
import { categoryColumns } from '../../datatablesource'
import { CategoryProps } from '@/types'
import DeleteButtonCategory from '../DeleteButton/DeleteButtonCategory'
import CategoryData from './CategoryData'

interface DatatableProps {
  columns: { field: string; headerName: string; width: number }[]
}

interface DataCategoryProps {
  id: string
  row: CategoryProps
}
const DatatableCategory: React.FC<DatatableProps> = ({ columns }) => {
  const { categories, setCategories } = CategoryData()

  const actionColumn = [
    {
      field: 'action',
      headerName: 'Action',
      width: 200,
      renderCell: (params: DataCategoryProps) => {
        return (
          <div className="cellAction">
            <Link
              href={`/dashboard/categories/${params.row.catName}`}
              style={{ textDecoration: 'none' }}
            >
              <div className="editButton">Edit</div>
            </Link>

            <DeleteButtonCategory
              id={params.row.catName}
              setCategories={setCategories}
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
        <Link href={'/dashboard/create-category'} className="link">
          Add New
        </Link>
      </div>
      {categories && (
        <DataGrid
          className="datagrid"
          rows={categories}
          columns={categoryColumns.concat(actionColumn)}
          pagination
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          checkboxSelection
          getRowId={(category) => category._id}
        />
      )}
    </div>
  )
}

export default DatatableCategory
