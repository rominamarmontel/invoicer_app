import { useEffect, useState } from 'react'

const CalculateAllTotal = (subtotal: number) => {
  const [allTotal, setAllTotal] = useState(0)
  const [tauxValue, setTauxValue] = useState<number | null>(null)
  const [selectedCommissionTaux, setSelectedCommissionTaux] = useState<
    number | null
  >(0)

  useEffect(() => {
    const calculAllTotalFunc = () => {
      const selectedCommissionTauxNumber = selectedCommissionTaux || 0
      const tauxValue = subtotal * (selectedCommissionTauxNumber * 0.01)
      setTauxValue(tauxValue)
      const newAllTotal = subtotal + tauxValue
      setAllTotal(newAllTotal)
    }
    calculAllTotalFunc()
  }, [subtotal, selectedCommissionTaux])

  return {
    allTotal,
    setAllTotal,
    tauxValue,
    setTauxValue,
    selectedCommissionTaux,
    setSelectedCommissionTaux,
  }
}

export default CalculateAllTotal
