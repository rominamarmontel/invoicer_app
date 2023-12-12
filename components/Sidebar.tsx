import Link from 'next/link'
import imageAccount from '@/public/images/computer-icons-google-account-icon-design-login-png-favpng-jFjxPac6saRuDE3LiyqsYTEZM.jpg'
import Image from 'next/image'
import { signOut } from 'next-auth/react'

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar_container">
        <div className="sidebar_header">
          <div className="sidebar_logo">
            <Image
              src={imageAccount}
              width={36}
              alt="Profile Image"
              className="rounded-full cursor-pointer"
            />
            <div>Bonjour!</div>
          </div>
          <ul>
            <li>
              <Link href="/dashboard">Dashboard</Link>
            </li>
            <li>
              <Link href="/dashboard/create-facture" className="flex gap-1">
                Create New Facture
                <span>
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
                      d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </span>
              </Link>
            </li>
            <li>
              <Link href="/dashboard/companies">Your company</Link>
            </li>
            <li>
              <Link href="/dashboard/clients">Clients</Link>
            </li>
            <li>
              <Link href="/dashboard/payments">Payments</Link>
            </li>
            <li>
              <Link href="/dashboard/categories">Categories</Link>
            </li>
            <li>
              <Link href="/dashboard/items">Items</Link>
            </li>
            <li>
              <Link href="/dashboard/commissions">Commissions</Link>
            </li>
            <li>
              <button onClick={() => signOut()} className="btn w-32">
                Sign Out
              </button>
            </li>
          </ul>
        </div>
        <div className="sidebar_bottom">@copyright Romi</div>
      </div>
    </div>
  )
}

export default Sidebar
