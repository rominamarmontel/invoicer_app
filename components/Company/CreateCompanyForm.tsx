'use client'
import React, { useState } from 'react'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const CreateCompanyForm = () => {
  const [name, setName] = useState('')
  const [address, setAdress] = useState('')
  const [zipcode, setZipcode] = useState('')
  const [city, setCity] = useState('')
  const [country, setCountry] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [website, setWebsite] = useState('')
  const [siret, setSiret] = useState('')
  const [tva, setTva] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !address || !zipcode || !city) {
      const errorMessage =
        'Company name, address, zipcode and city are required'
      toast.error(errorMessage)
    }

    try {
      const res = await fetch('/api/company', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          address,
          zipcode,
          city,
          country,
          phone,
          email,
          website,
          siret,
          tva,
        }),
      })
      if (res.ok) {
        toast.success('Create Company successfully')
        router.push('/dashboard/companies')
        router.refresh
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="createCompanyForm">
      <div className="createCompanyForm_container">
        <div className="createCompanyForm_header">
          <div className="createCompanyForm_header-logo">
            <h3>Create your company info</h3>
          </div>
          <Link
            href="/dashboard/companies"
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
            <div className="form_group mb-8">
              <label>Company name</label>
              <input
                type="text"
                placeholder="ex.Societe Kazuko"
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="form_group mb-8">
              <label>Company Address</label>
              <input
                type="text"
                placeholder="ex.123 rue Saint Honore"
                onChange={(e) => setAdress(e.target.value)}
              />
            </div>

            <div className="form_group inline_form-group w-full">
              <div className="form_group w-1/2 mb-4">
                <label>City</label>
                <input
                  type="text"
                  placeholder="ex.Paris"
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>
              <div className="form_group w-1/2 mb-4">
                <label>Zipcode</label>
                <input
                  type="text"
                  placeholder="ex.75001"
                  onChange={(e) => setZipcode(e.target.value)}
                />
              </div>
              <div className="form_group w-1/2 mb-4">
                <label>Country</label>
                <input
                  type="text"
                  placeholder="ex.France"
                  onChange={(e) => setCountry(e.target.value)}
                />
              </div>
            </div>

            <div className="form_group inline_form-group w-full">
              <div className="form_group w-1/2 mb-4">
                <label>Telephone number</label>
                <input
                  type="text"
                  placeholder="ex.+33(0)1 23 45 67"
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <div className="form_group w-1/2 mb-4">
                <label>E-mail</label>
                <input
                  type="text"
                  placeholder="ex.example@test.com"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            <div className="form_group inline_form-group w-full">
              <div className="form_group w-1/2 mb-4">
                <label>TVA</label>
                <input
                  type="text"
                  placeholder="ex.FRXX 999999999"
                  onChange={(e) => setTva(e.target.value)}
                />
              </div>
              <div className="form_group w-1/2 mb-4">
                <label>SIRET</label>
                <input
                  type="text"
                  placeholder="ex.123 456 789 12345"
                  onChange={(e) => setSiret(e.target.value)}
                />
              </div>
            </div>

            <div className="form_group mb-8">
              <label>Web-site</label>
              <input
                type="text"
                placeholder="ex.https://www.example.com"
                onChange={(e) => setWebsite(e.target.value)}
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

export default CreateCompanyForm
