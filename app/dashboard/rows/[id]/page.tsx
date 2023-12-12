'use client'

import React, { useEffect, useState } from 'react'
import { RowProps } from '@/types'

const DetailsRow = ({ params }: { params: { id: string } }) => {
  const [row, setRow] = useState<RowProps | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXTAUTH_URL}/api/rows/${params.id}`,
          {
            cache: 'no-store',
          }
        )

        if (res.ok) {
          const data = await res.json()
          const row = data.row
          setRow(row)
        }
      } catch (error) {
        console.log(error)
      }
    }

    fetchData()
  }, [params.id])

  return (
    <div>
      {row ? (
        <OneRow rowId={row._id} />
      ) : (
        <div className="loading">Loading...</div>
      )}
    </div>
  )
}

export default DetailsRow
