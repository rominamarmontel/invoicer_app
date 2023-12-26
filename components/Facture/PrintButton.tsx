import React, { useCallback } from 'react'
import { useReactToPrint } from 'react-to-print'

interface PrintButtonProps {
  componentRef: React.MutableRefObject<HTMLDivElement | null>
}

const PrintButton: React.FC<PrintButtonProps> = ({ componentRef }) => {
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
    <div className="w-1/4">
      <button
        onClick={handlePrint}
        className={
          'w-full h-9 font-semibold rounded-medium border border-gray-darkest text-white bg-sky-400 hover:bg-gray-500'
        }
      >
        Print
      </button>
    </div>
  )
}

export default PrintButton
