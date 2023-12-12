'use client'

import { ClientProps } from '@/types'
import React, { useEffect, useState } from 'react'
import OneClient from '@/components/Client/OneClient'

const DetailsClient = ({ params }: { params: { id: string } }) => {
  const [client, setClient] = useState<ClientProps | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXTAUTH_URL}/api/clients/${params.id}`,
          {
            cache: 'no-store',
          }
        )

        if (res.ok) {
          const data = await res.json()
          const client = data.client
          setClient(client)
        }
      } catch (error) {
        console.log(error)
      }
    }

    fetchData()
  }, [params.id])

  return (
    <div>
      {client ? (
        <OneClient clientId={client._id} />
      ) : (
        <div className="loading">Loading...</div>
      )}
    </div>
  )
}
export default DetailsClient
