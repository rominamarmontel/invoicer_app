'use client'

import { ItemProps } from '@/types'
import { useState, useEffect } from 'react'

const OneItemData = ({ params }: { params: { id: string } }) => {
  const [item, setItem] = useState<ItemProps[]>([])
  const id = params.id

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${process.env.NEXTAUTH_URL}/api/items/${id}`, {
          cache: 'no-store',
        })
        if (res.ok) {
          const data = await res.json()
          setItem(data.item)
        }
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }, [id])
  return { item, setItem }
}

export default OneItemData
