'use client'

import { ClientProps } from '@/types'
import React, { useEffect, useState } from 'react'
import EditClientForm from '@/components/Client/EditClientForm'

const EditClient = ({ params }: { params: { id: ClientProps } }) => {
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
        <EditClientForm client={client} />
      ) : (
        <div className="loading">Loading...</div>
      )}
    </div>
  )
}
export default EditClient
