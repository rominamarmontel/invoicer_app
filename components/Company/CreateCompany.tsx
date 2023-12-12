'use client'
import React, { useState } from 'react'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/navigation'

const CreateCompany = () => {
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
    <div className="m-5 p-5 lg:max-w-4xl lg:mx-auto bg-white rounded shadow">
      <div className="createCompany_container">
        <div className="createCompany_header">
          <h2>Create your company info</h2>
        </div>
        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Company name"
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Company address"
            onChange={(e) => setAdress(e.target.value)}
          />
          <input
            type="text"
            placeholder="Company city name"
            onChange={(e) => setCity(e.target.value)}
          />
          <input
            type="text"
            placeholder="Company zipcode"
            onChange={(e) => setZipcode(e.target.value)}
          />
          <input
            type="text"
            placeholder="Company country"
            onChange={(e) => setCountry(e.target.value)}
          />
          <input
            type="text"
            placeholder="Company phone number"
            onChange={(e) => setPhone(e.target.value)}
          />
          <input
            type="text"
            placeholder="Company email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="text"
            placeholder="Company website"
            onChange={(e) => setWebsite(e.target.value)}
          />
          <input
            type="text"
            placeholder="Company Siret number"
            onChange={(e) => setSiret(e.target.value)}
          />
          <input
            type="text"
            placeholder="Company TVA"
            onChange={(e) => setTva(e.target.value)}
          />
          <button className="btn">Create</button>
        </form>
      </div>
    </div>
  )
}

export default CreateCompany
