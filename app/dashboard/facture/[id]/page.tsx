'use client'

import { useEffect, useState } from 'react'
import { FactureProps } from '@/types'
import OneFacture from '@/components/Facture/OneFacture'

const getOneFacture = async (id: string): Promise<FactureProps | null> => {
  try {
    const res = await fetch(`/api/factures/${id}`, {
      cache: 'no-store',
    })
    if (res.ok) {
      const data = await res.json()
      const facture = await data.facture
      return facture
    }
  } catch (error) {
    console.log(error)
  }
  return null
}

const DetailsFacture = ({ params }: { params: { id: string } }) => {
  const [facture, setFacture] = useState<FactureProps | null>(null)
  useEffect(() => {
    const fetchData = async () => {
      const fetchFacture = await getOneFacture(params.id)
      setFacture(fetchFacture)
    }
    fetchData()
  }, [params.id])

  return (
    <div>
      {facture ? <OneFacture facture={facture} /> : <div>Loading...</div>}
    </div>
  )
}
export default DetailsFacture
