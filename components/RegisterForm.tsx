'use client'
import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

const RegisterForm = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!name || !email || !password) {
      setError('All fields are necessary')
      return
    }

    try {
      const resUserExists = await fetch('api/userExists', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })
      const { user } = await resUserExists.json()
      if (user) {
        setError('User already exists')
        return
      }

      const res = await fetch('api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      })

      if (res.ok) {
        const form = e.target as HTMLFormElement
        form.reset()
        router.push('/login')
      } else {
        console.log('User registration failed')
      }
    } catch (error) {
      console.log('Error during registration', error)
    }
  }

  return (
    <>
      <div className="grid place-items-center h-screen">
        <div className="shadow-lg p-10 rounded-lg">
          <h2 className="mb-5 font-bold">Register</h2>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-3">
              <input
                onChange={(e) => setName(e.target.value)}
                type="text"
                placeholder="User name"
              />
              <input
                onChange={(e) => setEmail(e.target.value)}
                type="text"
                placeholder="Email"
              />
              <input
                onChange={(e) => setPassword(e.target.value)}
                type="current-password"
                placeholder="password"
              />
              <button className="bg-green-300 text-white font-bold cursor-pointer px-6 py-2">
                Register
              </button>
            </div>

            {error && <div className="text-red-500 mt-5">{error}</div>}

            <Link href={'/login'} className="text-sm">
              Do you have an account? {''}
              <span className="underline">Login</span>
            </Link>
          </form>
        </div>
      </div>
    </>
  )
}

export default RegisterForm
