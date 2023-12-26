'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { toast } from 'react-hot-toast'

const CreateClientForm = () => {
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
        router.push('/dashboard/clients')
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="createClientForm">
      <div className="createClientForm_container">
        <div className="createClientForm_header">
          <div className="createClientForm_header-logo">
            <h3>Create your Client info</h3>
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
                  placeholder="ex.Societe Kazuko"
                  onChange={(e) => setClientName(e.target.value)}
                />
              </div>
              <div className="form_group w-1/2 mb-4">
                <label>Client Name</label>
                <input
                  type="text"
                  placeholder="ex.Ms Matsushima"
                  onChange={(e) => setPersonName(e.target.value)}
                />
              </div>
            </div>
            <div className="form_group mb-8">
              <label>Address</label>
              <input
                type="text"
                placeholder="ex.123 rue Saint Honore"
                onChange={(e) => setClientAdress(e.target.value)}
              />
            </div>
            <div className="form_group inline_form-group w-full">
              <div className="form_group w-1/2 mb-4">
                <label>City</label>
                <input
                  type="text"
                  placeholder="ex.Paris"
                  onChange={(e) => setClientCity(e.target.value)}
                />
              </div>
              <div className="form_group w-1/2 mb-4">
                <label>Zipcode</label>
                <input
                  type="text"
                  placeholder="ex.75001"
                  onChange={(e) => setClientZipcode(e.target.value)}
                />
              </div>
              <div className="form_group w-1/2 mb-4">
                <label>Country</label>
                <input
                  type="text"
                  placeholder="ex.France"
                  onChange={(e) => setClientCountry(e.target.value)}
                />
              </div>
            </div>
            <div className="form_group inline_form-group w-full">
              <div className="form_group w-1/2 mb-4">
                <label>Telephone</label>
                <input
                  type="text"
                  placeholder="ex.+33(0)1 23 45 67"
                  onChange={(e) => setClientPhone(e.target.value)}
                />
              </div>
              <div className="form_group w-1/2 mb-4">
                <label>E-mail</label>
                <input
                  type="text"
                  placeholder="ex.example@test.com"
                  onChange={(e) => setClientEmail(e.target.value)}
                />
              </div>
            </div>
            <div className="form_group inline_form-group w-full">
              <div className="form_group w-1/2 mb-4">
                <label>SIRET</label>
                <input
                  type="text"
                  placeholder="ex.123 456 789 12345"
                  onChange={(e) => setClientSiret(e.target.value)}
                />
              </div>
              <div className="form_group w-1/2 mb-4">
                <label>TVA</label>
                <input
                  type="text"
                  placeholder="ex.FRXX 999999999"
                  onChange={(e) => setClientTva(e.target.value)}
                />
              </div>
            </div>
            <div className="form_group mb-8">
              <label>Web-site</label>
              <input
                type="text"
                placeholder="ex.https://www.example.com"
                onChange={(e) => setClientWebsite(e.target.value)}
              />
            </div>
            <div className="btn_container">
              <button className="btn">Create</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreateClientForm
