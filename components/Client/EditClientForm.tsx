'use client'

import { ClientProps } from '@/types'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'

const EditClientForm = ({ client }: { client: ClientProps }) => {
  const [clientName, setClientName] = useState('')
  const [personName, setPersonName] = useState('')
  const [clientAddress, setClientAdress] = useState('')
  const [clientZipcode, setClientZipcode] = useState('')
  const [clientCity, setClientCity] = useState('')
  const [clientCountry, setClientCountry] = useState('')
  const [clientPhone, setClientPhone] = useState('')
  const [clientEmail, setClientEmail] = useState('')
  const [clientWebsite, setClientWebsite] = useState('')
  const [clientSiret, setClientSiret] = useState('')
  const [clientTva, setClientTva] = useState('')
  const router = useRouter()

  useEffect(() => {
    const initialValues = () => {
      setClientName(client.clientName || '')
      setPersonName(client.personName || '')
      setClientAdress(client.clientAddress || '')
      setClientZipcode(client.clientZipcode || '')
      setClientCity(client.clientCity || '')
      setClientCountry(client.clientCountry || '')
      setClientPhone(client.clientPhone || '')
      setClientEmail(client.clientEmail || '')
      setClientWebsite(client.clientWebsite || '')
      setClientSiret(client.clientSiret || '')
      setClientTva(client.clientTva || '')
    }
    initialValues()
  }, [
    client.clientName,
    client.personName,
    client.clientAddress,
    client.clientCity,
    client.clientZipcode,
    client.clientCountry,
    client.clientPhone,
    client.clientEmail,
    client.clientWebsite,
    client.clientSiret,
    client.clientTva,
  ])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!clientName || !clientAddress || !clientZipcode || !clientCity) {
      toast.error('Client name, address, zipcode and city are required')
      return
    }

    try {
      const res = await fetch(`/api/clients/${client._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          clientName,
          personName,
          clientAddress,
          clientZipcode,
          clientCity,
          clientCountry,
          clientPhone,
          clientEmail,
          clientWebsite,
          clientSiret,
          clientTva,
        }),
      })
      if (res.ok) {
        toast.success('Update Client successfully')
        router.push('/dashboard')
        router.refresh()
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="m-5 p-5 lg:max-w-4xl lg:mx-auto bg-white rounded shadow">
      <div className="createClient_container">
        <div className="createClient_header">
          <h2>Edit your Client info</h2>
        </div>
        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Client name"
            onChange={(e) => setClientName(e.target.value)}
            value={clientName}
          />
          <input
            type="text"
            placeholder="Attention client name"
            onChange={(e) => setPersonName(e.target.value)}
            value={personName || ''}
          />
          <input
            type="text"
            placeholder="Client address"
            onChange={(e) => setClientAdress(e.target.value)}
            value={clientAddress || ''}
          />
          <input
            type="text"
            placeholder="Client city name"
            onChange={(e) => setClientCity(e.target.value)}
            value={clientCity || ''}
          />
          <input
            type="text"
            placeholder="Client zipcode"
            onChange={(e) => setClientZipcode(e.target.value)}
            value={clientZipcode || ''}
          />
          <input
            type="text"
            placeholder="Client country"
            onChange={(e) => setClientCountry(e.target.value)}
            value={clientCountry || ''}
          />
          <input
            type="text"
            placeholder="Client phone number"
            onChange={(e) => setClientPhone(e.target.value)}
            value={clientPhone || ''}
          />
          <input
            type="text"
            placeholder="Client email"
            onChange={(e) => setClientEmail(e.target.value)}
            value={clientEmail || ''}
          />
          <input
            type="text"
            placeholder="Client website"
            onChange={(e) => setClientWebsite(e.target.value)}
            value={clientWebsite || ''}
          />
          <input
            type="text"
            placeholder="Client Siret number"
            onChange={(e) => setClientSiret(e.target.value)}
            value={clientSiret || ''}
          />
          <input
            type="text"
            placeholder="Client TVA"
            onChange={(e) => setClientTva(e.target.value)}
            value={clientTva || ''}
          />
          <button className="btn">Update</button>
        </form>
      </div>
    </div>
  )
}

export default EditClientForm
