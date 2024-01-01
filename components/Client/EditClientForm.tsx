'use client'

import { ClientProps } from '@/types'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'

const EditClientForm = ({ id }: { id: string }) => {
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
  const [client, setClient] = useState<ClientProps | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXTAUTH_URL}/api/clients/${id}`,
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
  }, [id])

  useEffect(() => {
    const initialValues = () => {
      setClientName(client?.clientName || '')
      setPersonName(client?.personName || '')
      setClientAdress(client?.clientAddress || '')
      setClientZipcode(client?.clientZipcode || '')
      setClientCity(client?.clientCity || '')
      setClientCountry(client?.clientCountry || '')
      setClientPhone(client?.clientPhone || '')
      setClientEmail(client?.clientEmail || '')
      setClientWebsite(client?.clientWebsite || '')
      setClientSiret(client?.clientSiret || '')
      setClientTva(client?.clientTva || '')
    }
    initialValues()
  }, [
    client?.clientName,
    client?.personName,
    client?.clientAddress,
    client?.clientCity,
    client?.clientZipcode,
    client?.clientCountry,
    client?.clientPhone,
    client?.clientEmail,
    client?.clientWebsite,
    client?.clientSiret,
    client?.clientTva,
  ])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!clientName || !clientAddress || !clientZipcode || !clientCity) {
      toast.error('Client name, address, zipcode and city are required')
      return
    }

    try {
      const res = await fetch(`/api/clients/${id}`, {
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
        router.push('/dashboard/clients')
        router.refresh()
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="editClientForm">
      <div className="editClientForm_container">
        <div className="editClientForm_header">
          <div className="editClientForm_header-logo">
            <h3>Edit your Client info</h3>
          </div>
          <Link
            href="/dashboard/clients"
            className="flex items-center gap-2 mb-4"
          >
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 text-slate-400"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m11.25 9-3 3m0 0 3 3m-3-3h7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
            </div>
            <span className="text-sm text-slate-400">Return</span>
          </Link>
        </div>

        <form className="flex w-full justify-center" onSubmit={handleSubmit}>
          <div className="flex flex-col w-2/3">
            <div className="form_group inline_form-group w-full">
              <div className="form_group w-1/2 mb-4">
                <label>Company Name</label>
                <input
                  type="text"
                  placeholder="Client name"
                  onChange={(e) => setClientName(e.target.value)}
                  value={clientName}
                />
              </div>
              <div className="form_group w-1/2 mb-4">
                <label>Client Name</label>
                <input
                  type="text"
                  placeholder="Attention client name"
                  onChange={(e) => setPersonName(e.target.value)}
                  value={personName || ''}
                />
              </div>
            </div>
            <div className="form_group mb-8">
              <label>Address</label>
              <input
                type="text"
                placeholder="Client address"
                onChange={(e) => setClientAdress(e.target.value)}
                value={clientAddress || ''}
              />
            </div>
            <div className="form_group inline_form-group w-full">
              <div className="form_group w-1/2 mb-4">
                <label>City</label>
                <input
                  type="text"
                  placeholder="Client city name"
                  onChange={(e) => setClientCity(e.target.value)}
                  value={clientCity || ''}
                />
              </div>
              <div className="form_group w-1/2 mb-4">
                <label>Zipcode</label>
                <input
                  type="text"
                  placeholder="Client zipcode"
                  onChange={(e) => setClientZipcode(e.target.value)}
                  value={clientZipcode || ''}
                />
              </div>
              <div className="form_group w-1/2 mb-4">
                <label>Country</label>
                <input
                  type="text"
                  placeholder="Client country"
                  onChange={(e) => setClientCountry(e.target.value)}
                  value={clientCountry || ''}
                />
              </div>
            </div>
            <div className="form_group inline_form-group w-full">
              <div className="form_group w-1/2 mb-4">
                <label>Telephone</label>
                <input
                  type="text"
                  placeholder="Client phone number"
                  onChange={(e) => setClientPhone(e.target.value)}
                  value={clientPhone || ''}
                />
              </div>
              <div className="form_group w-1/2 mb-4">
                <label>E-mail</label>
                <input
                  type="text"
                  placeholder="Client email"
                  onChange={(e) => setClientEmail(e.target.value)}
                  value={clientEmail || ''}
                />
              </div>
            </div>
            <div className="form_group inline_form-group w-full">
              <div className="form_group w-1/2 mb-4">
                <label>SIRET</label>
                <input
                  type="text"
                  placeholder="Client Siret number"
                  onChange={(e) => setClientSiret(e.target.value)}
                  value={clientSiret || ''}
                />
              </div>
              <div className="form_group w-1/2 mb-4">
                <label>TVA</label>
                <input
                  type="text"
                  placeholder="Client TVA"
                  onChange={(e) => setClientTva(e.target.value)}
                  value={clientTva || ''}
                />
              </div>
            </div>
            <div className="form_group mb-8">
              <label>Web-site</label>
              <input
                type="text"
                placeholder="Client website"
                onChange={(e) => setClientWebsite(e.target.value)}
                value={clientWebsite || ''}
              />
            </div>
            <div className="btn_container">
              <button className="btn">Update</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditClientForm
