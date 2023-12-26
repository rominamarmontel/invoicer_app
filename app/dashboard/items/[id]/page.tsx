'use client'

import { ItemProps } from '@/types'
import { useEffect, useState } from 'react'
import EditItemForm from '@/components/Item/EditItemForm'

const EditItem = ({ params }: { params: { id: ItemProps } }) => {
  const [item, setItem] = useState<ItemProps | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXTAUTH_URL}/api/items/${params.id}`,
          {
            cache: 'no-store',
          }
        )
        if (res.ok) {
          const data = await res.json()
          const item = await data.item
          setItem(item)
        }
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }, [params.id])
  return <>{item ? <EditItemForm item={item} /> : <div>Loading...</div>}</>
}

export default EditItem
