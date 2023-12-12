import { RowProps, FactureProps } from '@/types'
import Link from 'next/link'
import { LiaEditSolid } from 'react-icons/lia'
import DeleteButtonRow from '../DeleteButton/DeleteButtonRow'
import { useEffect, useState } from 'react'

const Rows = ({
  rows,
  setRows,
}: {
  rows: RowProps[]
  setRows: React.Dispatch<React.SetStateAction<RowProps[]>>
}) => {
  const [factures, setFactures] = useState<FactureProps[]>([])
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/factures')
        if (res.ok) {
          const data = await res.json()
          setFactures(data)
        }
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }, [])
  const resolveRowReferences = (facture: FactureProps) => {
    const rowIds: string[] = facture.rows as unknown as string[]
    const resolvedRows = rowIds
      .map((rowId) => {
        const row = rows.find((r: RowProps) => r._id === rowId)
        return row || null
      })
      .filter((row) => row !== null) as RowProps[]
    return resolvedRows
  }

  return (
    <div className="m-5 p-5 lg:max-w-4xl lg:mx-auto bg-white rounded shadow">
      <div className="rows_container">
        <div className="rows_header flex rows-center justify-between">
          <h2>Row List</h2>
          <div className="edit-btn rows_create">
            <Link href="/dashboard/create-row">
              <p className="flex rows-center gap-5">
                Create{' '}
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </span>
              </p>
            </Link>
          </div>
        </div>

        <div className="flex flex-col gap-2 mt-2">
          {factures ? (
            factures.map((facture: FactureProps) => {
              const resolvedRows = resolveRowReferences(facture)

              return (
                <div key={facture._id} className="card_group">
                  <div className="flex">
                    <div>{facture.factureNumber}</div>
                    <div>{facture.factureDate}</div>
                    <>
                      {resolvedRows && resolvedRows.length > 0 ? (
                        resolvedRows.map((row: RowProps | undefined) => (
                          <div key={row?._id} className="flex">
                            <div>{row?.category.catName}</div>
                            <div>{row?.items.item.itemName.fr}</div>
                            <div>{row?.items.item.itemName.jp}</div>
                            <div>{row?.itemPlus}</div>
                            <div>{row?.qty}</div>
                            <div>{row?.unit}</div>
                            <div>{row?.price}</div>
                            <div>{row?.total}</div>
                            <div className="flex justify-between rows-center gap-2">
                              <DeleteButtonRow
                                id={row?._id}
                                setRows={setRows}
                              />
                              <Link href={`/dashboard/edit-row/${row?._id}`}>
                                <LiaEditSolid className="text-green-500 text-2xl" />
                              </Link>
                            </div>
                          </div>
                        ))
                      ) : (
                        <p>Loading...</p>
                      )}
                    </>
                  </div>
                </div>
              )
            })
          ) : (
            <div>
              <p>Loading...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Rows
