'use client'

import React, { useEffect, useState } from 'react'
import { ClientProps } from '@/types'
import Clients from '@/components/Client/Clients'

const GetAllClients = () => {
  const [clients, setClients] = useState<ClientProps[]>([])

  useEffect(() => {
    const fetchAllClients = async () => {
      try {
        const res = await fetch('/api/clients')
        if (res.ok) {
          const data = await res.json()
          setClients(data)
        }
      } catch (error) {
        console.log(error)
      }
    }
    fetchAllClients()
  }, [])

  return <Clients clients={clients} setClients={setClients} />
}

export default GetAllClients
