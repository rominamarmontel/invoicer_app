import { useState, useEffect } from 'react'

const CalculatePaymentDue = (factureDate: string, conditionPayment: number) => {
  const [paymentDue, setPaymentDue] = useState('')

  useEffect(() => {
    const calculatePaymentDueFunc = () => {
      if (factureDate && conditionPayment !== 0) {
        const factureDateObj = new Date(factureDate)
        const daysToAdd = conditionPayment
        const paymentDueDate = new Date(factureDateObj)
        paymentDueDate.setDate(factureDateObj.getDate() + daysToAdd)

        const formattedPaymentDueDate = paymentDueDate.toLocaleDateString(
          'fr-FR',
          {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
          }
        )

        setPaymentDue(formattedPaymentDueDate)
      }
    }

    calculatePaymentDueFunc()
  }, [factureDate, conditionPayment])

  return { paymentDue, setPaymentDue }
}

export default CalculatePaymentDue
