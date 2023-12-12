'use client'
import React from 'react'

const PrinterButton = () => {
  const handlePrint = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault()
    await window.print()
  }
  return <button onClick={handlePrint}>Print</button>
}

export default PrinterButton
