'use client'

import { FactureProps } from '@/types'
import { useState, useEffect } from 'react'

const FactureData = () => {
  const [factures, setFactures] = useState<FactureProps[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${process.env.NEXTAUTH_URL}/api/factures`, {
          cache: 'no-store',
        })
        if (res.ok) {
          const data = await res.json()
          setFactures(data.factures)
        }
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }, [])

  return { factures, setFactures }
}

export default FactureData
