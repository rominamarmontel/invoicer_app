'use client'

import { ClientProps } from '@/types'
import React, { useState, useEffect } from 'react'

interface OneClientProps {
  clientId: ClientProps
}

const OneClient: React.FC<OneClientProps> = ({ clientId }) => {
  const [client, setClient] = useState<ClientProps | null>(null)
  useEffect(() => {
    const fetchClient = async () => {
      try {
        const res = await fetch(`/api/clients/${clientId}`, {
          cache: 'no-store',
        })
        if (res.ok) {
          const data = await res.json()
          const client = data.client
          if (!client) {
            console.log('Client not found')
            return
          }
          setClient(client)
        }
      } catch (error) {
        console.log(error)
      }
    }

    fetchClient()
  }, [clientId])

  return (
    <div>
      {client ? (
        <div>
          <p className="italic">À l&apos;attention de :</p>
          {client.clientName && (
            <h2 className="font-bold">{client.clientName}</h2>
          )}
          {client.clientAddress && (
            <p className="text-sm">{client.clientAddress}</p>
          )}
          <div className="flex gap-2">
            {client.clientZipcode && (
              <p className="text-sm">{client.clientZipcode}</p>
            )}
            {client.clientCity && (
              <p className="text-sm">{client.clientCity}</p>
            )}
          </div>
          {client.clientCountry && (
            <p className="text-sm">{client.clientCountry}</p>
          )}
          {client.clientPhone && (
            <p className="text-sm">
              <span>Phone: </span>
              {client.clientPhone}
            </p>
          )}
          {client.clientEmail && (
            <p className="text-sm">
              <span>Email: </span>
              {client.clientEmail}
            </p>
          )}
          {client.clientWebsite && (
            <p>
              <span>Website: </span>
              {client.clientWebsite}
            </p>
          )}
          {client.clientSiret && (
            <p>
              <span>SIRET: </span>
              {client.clientSiret}
            </p>
          )}
          {client.clientTva && (
            <p>
              <span>TVA: </span>
              {client.clientTva}
            </p>
          )}
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  )
}

export default OneClient
