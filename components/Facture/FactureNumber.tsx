import { useState } from 'react'

const FactureNumber = () => {
  const [factureNumber, setFactureNumber] = useState('')
  const handleCreateFactureNumber = async () => {
    try {
      const res = await fetch('/api/factures', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          factureNumber,
        }),
      })

      if (res.ok) {
        const data = await res.json()
        setFactureNumber(data.res.factureNumber)
      } else {
        console.error('Failed to create Facture')
      }
    } catch (error) {
      console.error('Error creating Facture:', error)
    }
  }
  return { factureNumber, setFactureNumber, handleCreateFactureNumber }
}

export default FactureNumber
