import React, { useEffect, useState } from 'react'
import { RowProps } from '@/types'

interface SubTotalProps {
  rows?: RowProps[] | undefined
}

const SubTotal: React.FC<SubTotalProps> = ({ rows }) => {
  const [subtotal, setSubtotal] = useState<number>(0)
  const [rowDetails, setRowDetails] = useState<RowProps[]>([])

  useEffect(() => {
    const calculateSubtotal = async () => {
      try {
        if (!rows || rows.length === 0) {
          setSubtotal(0)
          setRowDetails([])
          return
        }

        const details = await Promise.all(
          rows.map(async (row) => {
            const response = await fetch(`/api/rows/${row}`)
            if (!response.ok) {
              throw new Error(`Failed to fetch row with ID ${row}`)
            }
            const data = await response.json()
            return data.row
          })
        )

        setRowDetails(details.filter(Boolean))
        const subtotalValue = details.reduce(
          (acc, row) => acc + (row.total || 0),
          0
        )
        setSubtotal(subtotalValue)
      } catch (error) {
        console.error(error)
      }
    }

    calculateSubtotal()
  }, [rows])

  return null
}

export default SubTotal
