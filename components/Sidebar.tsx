import Link from 'next/link'
import imageAccount from '@/public/images/computer-icons-google-account-icon-design-login-png-favpng-jFjxPac6saRuDE3LiyqsYTEZM.jpg'
import Image from 'next/image'
import { signOut } from 'next-auth/react'

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar_container">
        <div className="sidebar_header">
          <div className="sidebar_header-logo">
            <h2>Actarus Sarl</h2>
          </div>
          <ul className="sidebar_list">
            <li>
              <Link href="/dashboard">
                <p>DASHBOARD</p>
              </Link>
            </li>
            <li>
              <Link href="/dashboard/companies">
                <p>COMPANY</p>
              </Link>
            </li>
            <li>
              <Link href="/dashboard/clients">
                <p>CLIENTS</p>
              </Link>
            </li>
            <li>
              <Link href="/dashboard/payments">
                <p>PAYMENTS</p>
              </Link>
            </li>
            <li>
              <Link href="/dashboard/categories">
                <p>CATEGORIES</p>
              </Link>
            </li>
            <li>
              <Link href="/dashboard/items">
                <p>ITEMS</p>
              </Link>
            </li>
            <li>
              <Link href="/dashboard/commissions">
                <p>COMMISSIONS</p>
              </Link>
            </li>
          </ul>
          <button onClick={() => signOut()} className="btn w-32">
            Sign Out
          </button>
        </div>
        <div className="sidebar_bottom text-xs">@copyright Romi</div>
      </div>
    </div>
  )
}

export default Sidebar
