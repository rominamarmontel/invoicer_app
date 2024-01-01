'use client'
import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'

const RegisterForm = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!name || !email || !password) {
      toast.error('All fields are necessary')
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
        toast.error('User already exists')
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
          <div className="register_header-logo">
            <h3>Register</h3>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-3">
              <div className="form_group">
                <input
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  placeholder="User name"
                />
              </div>
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
                  type="current-password"
                  placeholder="password"
                />
              </div>
              <div className="btn_container">
                <button className="btn-black">Register</button>
              </div>
            </div>

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
