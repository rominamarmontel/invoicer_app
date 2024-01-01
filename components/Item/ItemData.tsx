'use client'

import { ItemProps } from '@/types'
import { useState, useEffect } from 'react'

const ItemData = () => {
  const [items, setItems] = useState<ItemProps[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${process.env.NEXTAUTH_URL}/api/items`, {
          cache: 'no-store',
        })
        if (res.ok) {
          const data = await res.json()
          setItems(data.items)
        }
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }, [])
  return { items, setItems }
}

export default ItemData
