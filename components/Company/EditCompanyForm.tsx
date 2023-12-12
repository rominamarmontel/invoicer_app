'use client'

import { CompanyProps } from '@/types'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'

const EditCompanyForm = ({ company }: { company: CompanyProps }) => {
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

  useEffect(() => {
    const initialValues = () => {
      setName(company.name || '')
      setAdress(company.address || '')
      setZipcode(company.zipcode || '')
      setCity(company.city || '')
      setCountry(company.country || '')
      setPhone(company.phone || '')
      setEmail(company.email || '')
      setWebsite(company.website || '')
      setSiret(company.siret || '')
      setTva(company.tva || '')
    }
    initialValues()
  }, [
    company.name,
    company.address,
    company.zipcode,
    company.city,
    company.country,
    company.phone,
    company.email,
    company.website,
    company.siret,
    company.tva,
  ])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !address || !zipcode || !city) {
      toast.error('Your company name, address, zipcode and city are required')
      return
    }

    try {
      const res = await fetch(`/api/companies/${company._id}`, {
        method: 'PUT',
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
        toast.success('Update Company successfully')
        router.push('/dashboard/companies')
        router.refresh()
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="m-5 p-5 lg:max-w-4xl lg:mx-auto bg-white rounded shadow">
      <div className="editCompany_container">
        <div className="editCompany_header flex items-top justify-between">
          <span>
            <Link href="/dashboard/companies">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3"
                />
              </svg>
            </Link>
          </span>
          <h2>Edit your company info</h2>
        </div>
        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
          <div className="form_group flex flex-col">
            <label>Company Name</label>
            <input
              type="text"
              placeholder="Company name"
              onChange={(e) => setName(e.target.value)}
              value={name || ''}
            />
          </div>
          <div className="form_group flex flex-col">
            <label>Company Address</label>
            <input
              type="text"
              placeholder="Company address"
              onChange={(e) => setAdress(e.target.value)}
              value={address || ''}
            />
          </div>
          <div className="form_group inline_form-group">
            <div className="form_group flex flex-col">
              <label>City</label>
              <input
                type="text"
                placeholder="Company city name"
                onChange={(e) => setCity(e.target.value)}
                value={city || ''}
              />
            </div>
            <div className="form_group flex flex-col">
              <label>Zipcode</label>
              <input
                type="text"
                placeholder="Company zipcode"
                onChange={(e) => setZipcode(e.target.value)}
                value={zipcode || ''}
              />
            </div>
            <div className="form_group flex flex-col">
              <label>Country</label>
              <input
                type="text"
                placeholder="Company country"
                onChange={(e) => setCountry(e.target.value)}
                value={country || ''}
              />
            </div>
          </div>
          <div className="form_group inline_form-group">
            <div className="form_group flex flex-col">
              <label>Phone</label>
              <input
                type="text"
                placeholder="Company phone number"
                onChange={(e) => setPhone(e.target.value)}
                value={phone || ''}
              />
            </div>
            <div className="form_group flex flex-col">
              <label>E-mail</label>
              <input
                type="text"
                placeholder="Company email"
                onChange={(e) => setEmail(e.target.value)}
                value={email || ''}
              />
            </div>
            <div className="form_group flex flex-col">
              <label>Website</label>
              <input
                type="text"
                placeholder="Company website"
                onChange={(e) => setWebsite(e.target.value)}
                value={website || ''}
              />
            </div>
          </div>

          <div className="form_group inline_form-groupA">
            <div className="form_group flex flex-col">
              <label>SIRET number</label>
              <input
                type="text"
                placeholder="Company Siret number"
                onChange={(e) => setSiret(e.target.value)}
                value={siret || ''}
              />
            </div>
            <div className="form_group flex flex-col">
              <label>TVA</label>
              <input
                type="text"
                placeholder="Company TVA"
                onChange={(e) => setTva(e.target.value)}
                value={tva || ''}
              />
            </div>
          </div>
          <button className="btn">Update</button>
        </form>
      </div>
    </div>
  )
}

export default EditCompanyForm
