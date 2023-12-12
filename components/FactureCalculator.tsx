import { useEffect, useState } from 'react'
import { CommissionProps, FactureProps } from '@/types'

const FactureCalculator = (facture: FactureProps) => {
  const [subtotal, setSubtotal] = useState(0)
  const [commissionValue, setCommissionValue] = useState(0)
  const [commission, setCommission] = useState<CommissionProps | null>(null)

  useEffect(() => {
    const calculateSubtotal = async () => {
      try {
        if (!facture.rows || facture.rows.length === 0) {
          setSubtotal(0)
          return
        }

        const rowDetails = await Promise.all(
          facture.rows.map(async (row) => {
            const response = await fetch(`/api/rows/${row}`)
            if (!response.ok) {
              throw new Error(`Failed to fetch row with ID ${row}`)
            }
            const data = await response.json()
            return data.row
          })
        )
        const subtotalValue = rowDetails.reduce(
          (acc, row) => acc + (row.total || 0),
          0
        )
        setSubtotal(subtotalValue)
        fetchCommission()
      } catch (error) {
        console.error(error)
      }
    }

    const calculateCommissionValue = () => {
      if (!commission) {
        return
      }
      const commissionRate = commission.taux || 0
      const commissionValue = subtotal * (commissionRate * 0.01)
      setCommissionValue(commissionValue)
    }

    const fetchCommission = async () => {
      try {
        const res = await fetch(`/api/commissions/${facture.commission}`, {
          cache: 'no-store',
        })
        if (res.ok) {
          const data = await res.json()
          const fetchedCommission = data.commission
          setCommission(fetchedCommission)
          calculateCommissionValue()
        } else {
          console.log('Failed to fetch commission data')
        }
      } catch (error) {
        console.error(error)
      }
    }

    calculateSubtotal()
  }, [facture.rows, facture.commission, subtotal, commission])

  const allTotal = subtotal + commissionValue

  return { subtotal, commissionValue, allTotal, commission }
}

export default FactureCalculator
