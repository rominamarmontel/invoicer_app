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
    <div className="editCompanyForm">
      <div className="editCompanyForm_container">
        <div className="editCompanyForm_header">
          <div className="editCompanyForm_header-logo">
            <h3>Edit your company info</h3>
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
              <label>Company Name</label>
              <input
                type="text"
                placeholder="Company name"
                onChange={(e) => setName(e.target.value)}
                value={name || ''}
              />
            </div>
            <div className="form_group mb-8">
              <label>Company Address</label>
              <input
                type="text"
                placeholder="Company address"
                onChange={(e) => setAdress(e.target.value)}
                value={address || ''}
              />
            </div>
            <div className="form_group inline_form-group w-full">
              <div className="form_group w-1/2 mb-4">
                <label>City</label>
                <input
                  type="text"
                  placeholder="Company city name"
                  onChange={(e) => setCity(e.target.value)}
                  value={city || ''}
                />
              </div>
              <div className="form_group w-1/2 mb-4">
                <label>Zipcode</label>
                <input
                  type="text"
                  placeholder="Company zipcode"
                  onChange={(e) => setZipcode(e.target.value)}
                  value={zipcode || ''}
                />
              </div>
              <div className="form_group w-1/2 mb-4">
                <label>Country</label>
                <input
                  type="text"
                  placeholder="Company country"
                  onChange={(e) => setCountry(e.target.value)}
                  value={country || ''}
                />
              </div>
            </div>
            <div className="form_group inline_form-group w-full">
              <div className="form_group w-1/2">
                <label>Telephone</label>
                <input
                  type="text"
                  placeholder="Company phone number"
                  onChange={(e) => setPhone(e.target.value)}
                  value={phone || ''}
                />
              </div>
              <div className="form_group w-1/2 mb-4">
                <label>E-mail</label>
                <input
                  type="text"
                  placeholder="Company email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email || ''}
                />
              </div>
            </div>

            <div className="form_group inline_form-group w-full">
              <div className="form_group w-1/2 mb-4">
                <label>TVA</label>
                <input
                  type="text"
                  placeholder="Company TVA mb-4"
                  onChange={(e) => setTva(e.target.value)}
                  value={tva || ''}
                />
              </div>
              <div className="form_group w-1/2 mb-4">
                <label>SIRET number</label>
                <input
                  type="text"
                  placeholder="Company Siret number"
                  onChange={(e) => setSiret(e.target.value)}
                  value={siret || ''}
                />
              </div>
            </div>
            <div className="form_group mb-8">
              <label>Website</label>
              <input
                type="text"
                placeholder="Company website"
                onChange={(e) => setWebsite(e.target.value)}
                value={website || ''}
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

export default EditCompanyForm
