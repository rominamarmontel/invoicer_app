'use client'

import { CommissionProps } from '@/types'
import { useState, useEffect } from 'react'

const CommissionData = () => {
  const [commissions, setCommissions] = useState<CommissionProps[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${process.env.NEXTAUTH_URL}/api/commissions`, {
          cache: 'no-store',
        })
        if (res.ok) {
          const data = await res.json()
          setCommissions(data.commissions)
        }
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }, [])
  return { commissions, setCommissions }
}

export default CommissionData
