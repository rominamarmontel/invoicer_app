import './datatable.scss'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { itemColumns } from '../../datatablesource'
import { ItemProps } from '@/types'
import DeleteButtonItem from '../DeleteButton/DeleteButtonItem'
import ItemData from './ItemData'

interface DatatableProps {
  columns: { field: string; headerName: string; width: number }[]
}
interface DataItemProps {
  id: string
  row: ItemProps
}

const DatatableItem: React.FC<DatatableProps> = ({ columns }) => {
  const { items, setItems } = ItemData()

  const actionColumn = [
    {
      field: 'action',
      headerName: 'Action',
      width: 200,
      renderCell: (params: DataItemProps) => {
        return (
          <div className="cellAction">
            <Link
              href={`/dashboard/items/${params.id}`}
              style={{ textDecoration: 'none' }}
            >
              <div className="editButton">Edit</div>
            </Link>

            <DeleteButtonItem id={params.id} setItems={setItems} />
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
    if (column.field === 'itemName.fr') {
      return {
        ...column,
        field: 'itemName_fr',
        headerName: 'Description (FRENCH)',
        renderCell: (params: DataItemProps) => (
          <span>{params.row.itemName.fr}</span>
        ),
      }
    } else if (column.field === 'itemName.jp') {
      return {
        ...column,
        field: 'itemName_jp',
        headerName: 'Description (JAPANESE)',
        renderCell: (params: DataItemProps) => (
          <span>{params.row.itemName.jp}</span>
        ),
      }
    }
    return column as GridColDef<ItemProps>
  })

  return (
    <div className="datatable">
      <div className="datatableTitle">
        <Link href={'/dashboard/create-item'} className="link">
          Add New
        </Link>
      </div>
      {items && (
        <DataGrid
          className="datagrid"
          rows={items.map((item) => ({
            ...item,
            itemName_fr: item.itemName?.fr,
            itemName_jp: item.itemName?.jp,
          }))}
          columns={(customColumns as readonly GridColDef<ItemProps>[]).concat(
            actionColumn as readonly GridColDef<ItemProps>[]
          )}
          pagination
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          checkboxSelection
          getRowId={(item) => item._id}
        />
      )}
    </div>
  )
}

export default DatatableItem
