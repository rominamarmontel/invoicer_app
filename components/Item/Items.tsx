'use client'

import { ItemProps } from '@/types'
import React, { useEffect, useState } from 'react'
import DatatableItem from './DatatableItem'
import { itemColumns } from '@/datatablesource'

const Items = () => {
  const [items, setItems] = useState<ItemProps[]>([])

  useEffect(() => {
    const fetchAllItems = async () => {
      try {
        const res = await fetch(`${process.env.NEXTAUTH_URL}/api/items`)
        if (res.ok) {
          const data = await res.json()
          setItems(data)
        }
      } catch (error) {
        console.log(error)
      }
    }
    fetchAllItems()
  }, [])

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
