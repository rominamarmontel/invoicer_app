'use client'

import { FactureProps } from '@/types'
import { useEffect, useState } from 'react'
import EditFactureForm from './EditFactureForm'

const OneFacture = ({ id }: { id: string }) => {
  const [facture, setFacture] = useState<FactureProps | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXTAUTH_URL}/api/factures/${id}`,
          {
            cache: 'no-store',
          }
        )
        if (res.ok) {
          const data = await res.json()
          setFacture(data.facture)
        }
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }, [id])

  return <EditFactureForm factureData={facture} setFactureData={setFacture} />
}

export default OneFacture
