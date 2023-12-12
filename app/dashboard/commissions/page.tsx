'use client'

import React, { useEffect, useState } from 'react'
import { CommentProps } from 'postcss'
import Commissions from '@/components/Commission/Commissions'
import { CommissionProps } from '@/types'

const GetAllCommissions = () => {
  const [commissions, setCommissions] = useState<CommissionProps[]>([])

  useEffect(() => {
    const fetchAllCommissions = async () => {
      try {
        const res = await fetch('/api/commissions')
        if (res.ok) {
          const data = await res.json()
          setCommissions(data)
        }
      } catch (error) {
        console.log(error)
      }
    }
    fetchAllCommissions()
  }, [])

  return (
    <Commissions commissions={commissions} setCommissions={setCommissions} />
  )
}

export default GetAllCommissions
