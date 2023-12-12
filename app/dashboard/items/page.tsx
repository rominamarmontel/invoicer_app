'use client'

import React, { useEffect, useState } from 'react'
import { ItemProps, PaymentProps } from '@/types'
import Payments from '@/components/Payment/Payments'
import Items from '@/components/Item/Items'

const GetAllItems = () => {
  const [items, setItems] = useState<ItemProps[]>([])

  useEffect(() => {
    const fetchAllItems = async () => {
      try {
        const res = await fetch('/api/items')
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
  return <Items items={items} setItems={setItems} />
}

export default GetAllItems
