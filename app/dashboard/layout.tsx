'use client'
import Sidebar from '@/components/Sidebar'
import React, { ReactNode, Fragment } from 'react'
import { Toaster } from 'react-hot-toast'

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  return (
    <Fragment>
      <Sidebar />
      <div>{children}</div>
      <Toaster />
    </Fragment>
  )
}

export default DashboardLayout
