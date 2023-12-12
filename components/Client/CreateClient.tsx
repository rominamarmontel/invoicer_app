'use client'

import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { toast } from 'react-hot-toast'

const CreateClient = () => {
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!clientName || !clientAddress || !clientZipcode || !clientCity) {
      const errorMessage = 'Client name, address, zipcode and city are required'
      toast.error(errorMessage)
    }

    try {
      const res = await fetch('/api/clients', {
        method: 'POST',
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
        router.push('/dashboard')
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="m-5 p-5 lg:max-w-4xl lg:mx-auto bg-white rounded shadow">
      <div className="createClient_container">
        <div className="createClient_header">
          <h2>Create your Client info</h2>
        </div>
        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Client name"
            onChange={(e) => setClientName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Attention client name"
            onChange={(e) => setPersonName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Client address"
            onChange={(e) => setClientAdress(e.target.value)}
          />
          <input
            type="text"
            placeholder="Client city name"
            onChange={(e) => setClientCity(e.target.value)}
          />
          <input
            type="text"
            placeholder="Client zipcode"
            onChange={(e) => setClientZipcode(e.target.value)}
          />
          <input
            type="text"
            placeholder="Client country"
            onChange={(e) => setClientCountry(e.target.value)}
          />
          <input
            type="text"
            placeholder="Client phone number"
            onChange={(e) => setClientPhone(e.target.value)}
          />
          <input
            type="text"
            placeholder="Client email"
            onChange={(e) => setClientEmail(e.target.value)}
          />
          <input
            type="text"
            placeholder="Client website"
            onChange={(e) => setClientWebsite(e.target.value)}
          />
          <input
            type="text"
            placeholder="Client Siret number"
            onChange={(e) => setClientSiret(e.target.value)}
          />
          <input
            type="text"
            placeholder="Client TVA"
            onChange={(e) => setClientTva(e.target.value)}
          />
          <button className="btn">Create</button>
        </form>
      </div>
    </div>
  )
}

export default CreateClient
