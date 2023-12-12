'use client'

import Rows from '@/components/Row/Rows'
import { RowProps } from '@/types'
import { useEffect, useState } from 'react'

const CategoryRows = ({ params }: { params: { catName: string } }) => {
  const [rows, setRows] = useState<RowProps[]>([])
  const catName = params?.catName

  useEffect(() => {
    const getRows = async () => {
      try {
        const res = await fetch(`/api/categories/${catName}`, {
          cache: 'no-store',
        })

        if (res.ok) {
          const data = await res.json()
          const rows = data.getRow

          const formattedRows = await Promise.all(
            rows.map(async (row: RowProps) => {
              const itemResponse = await fetch(`/api/items/${row.items._id}`)
              const itemData = await itemResponse.json()

              return {
                ...row,
                items: itemData,
              }
            })
          )

          setRows(formattedRows)
        }
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }
    getRows()
  }, [catName])
  return (
    <div className="md:flex flex-wrap justify-between gap-auto">
      <>{rows && <Rows setRows={setRows} rows={rows} />}</>
    </div>
  )
}

export default CategoryRows
