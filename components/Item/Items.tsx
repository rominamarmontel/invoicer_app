import { ItemProps } from '@/types'
import Link from 'next/link'
import React from 'react'
import DeleteButtonItem from '../DeleteButton/DeleteButtonItem'
import { LiaEditSolid } from 'react-icons/lia'
import DatatableItem from './DatatableItem'
import { itemColumns } from '@/datatablesource'

const Items = ({
  items,
  setItems,
}: {
  items: ItemProps[]
  setItems: React.Dispatch<React.SetStateAction<ItemProps[]>>
}) => {
  return (
    <div className="items m-5 p-5 bg-white rounded shadow">
      <div className="items_container">
        <div className="items_header">
          <div className="items_header-logo">
            <h3>Items List</h3>
          </div>
        </div>
        <DatatableItem columns={itemColumns} />
      </div>
    </div>
  )
}

export default Items
