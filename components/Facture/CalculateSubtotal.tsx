import { RowProps } from '@/types'
import { useEffect, useState } from 'react'

const CalculateSubtotal = (rows: RowProps[]) => {
  const [subtotal, setSubtotal] = useState(0)
  useEffect(() => {
    const calculateSubtotalFunc = () => {
      const subtotalValue = rows.reduce((acc, row) => acc + row.total, 0)
      setSubtotal(subtotalValue)
    }
    calculateSubtotalFunc()
  }, [rows])
  return { subtotal, setSubtotal }
}

export default CalculateSubtotal
