'use client'
import React, { useCallback } from 'react'
import { useReactToPrint } from 'react-to-print'
interface PrintButtonProps {
  componentRef: React.MutableRefObject<HTMLDivElement | null>
}

const PrinterButton: React.FC<PrintButtonProps> = ({ componentRef }) => {
  const pageStyle = `
    @page { 
      height: 100vh; 
      size: auto;
      margin: 0 !important;
      padding: 0 !important;
      overflow: hidden;
    }
    
    @media print {
      body { -webkit-print-color-adjust: exact; }
      table { break-after: auto; }
      tr    { break-inside: avoid; break-after: auto; }
      td    { break-inside: avoid; break-after: auto; }
    }
  `

  const reactToPrintContent = useCallback(() => {
    if (!componentRef.current) return null
    return componentRef.current
  }, [componentRef])

  const handlePrint = useReactToPrint({
    pageStyle,
    content: reactToPrintContent,
    removeAfterPrint: true,
  })
  return (
    <button onClick={handlePrint} className="btn-mint">
      Print
    </button>
  )
}

export default PrinterButton
