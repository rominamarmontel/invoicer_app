'use client'

import { useState } from 'react'
import Link from 'next/link'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'

const LoginForm = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email || !password) {
      setError('Email and Password are required')
    }
    try {
      const res = await signIn('credentials', {
        email,
        password,
        redirect: false,
      })
      if (res?.error) {
        setError('Invalid credentials')
        return
      }
      router.replace('dashboard')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="grid place-items-center h-screen">
      <div className="shadow-lg p-10 rounded-lg">
        <h2 className="mb-5 font-bold">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-3">
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="text"
              placeholder="Email"
            />
            <input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="password"
            />
            <button className="bg-green-300 text-white font-bold cursor-pointer px-6 py-2">
              Login
            </button>
          </div>

          {error && <div className="text-red-500 mt-5">{error}</div>}

          <Link href={'/register'} className="text-sm">
            Do you have an account? {''}
            <span className="underline">Register</span>
          </Link>
        </form>
      </div>
    </div>
  )
}

export default LoginForm
