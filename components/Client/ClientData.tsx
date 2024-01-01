'use client'

import { ClientProps } from '@/types'
import { useEffect, useState } from 'react'

const ClientData = () => {
  const [clients, setClients] = useState<ClientProps[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${process.env.NEXTAUTH_URL}/api/clients`, {
          cache: 'no-store',
        })
        const data = await res.json()
        setClients(data.clients)
      } catch (error) {
        console.log(error)
      }
    }

    fetchData()
  }, [])

  return { clients, setClients }
}
export default ClientData
