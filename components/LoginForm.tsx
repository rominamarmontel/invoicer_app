'use client'

import { useState } from 'react'
import Link from 'next/link'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'

const LoginForm = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email || !password) {
      toast.error('Email and Password are required')
    }
    try {
      const res = await signIn('credentials', {
        email,
        password,
        redirect: false,
      })
      if (res?.error) {
        toast.error('Invalid credentials')
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
        <div className="login_header-logo">
          <h3>Login</h3>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <div className="form_group">
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="text"
              placeholder="Email"
            />
          </div>
          <div className="form_group">
            <input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="password"
            />
          </div>
          <div className="btn_container">
            <button className="btn-black">Login</button>
          </div>

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
