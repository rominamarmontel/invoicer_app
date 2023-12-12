'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { LiaEditSolid } from 'react-icons/lia'
import { FactureProps } from '@/types'
import DeleteButtonCategory from './DeleteButton/DeleteButtonCategory'
import DeleteButtonFacture from './DeleteButton/DeleteButtonFacture'

const Dashboard = () => {
  const [factures, setFactures] = useState<FactureProps[]>([])

  useEffect(() => {
    const fetchAllFactures = async () => {
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
    fetchAllFactures()
  }, [])

  const countFactures = () => {
    let count = 0
    for (let i = 0; i < factures.length; i++) {
      count++
    }
    return count
  }
  return (
    <div className="dashboard m-5 p-5 lg:max-w-4xl lg:mx-auto bg-white rounded shadow">
      <div className="facture_header">
        <div className="facture_header-logo">
          <h3>Facture</h3>
          <p>
            {`There are total ${countFactures()}`}{' '}
            {factures.length > 0 ? 'factures' : 'facture'}.
          </p>
        </div>
        <Link href="/dashboard/create-facture" className="btn">
          Add new
        </Link>
      </div>
      <div className="facture_container">
        <div className="facture_item">
          {factures &&
            factures.map((facture: FactureProps) => (
              <div
                key={facture._id}
                className="flex items-center justify-between"
              >
                <Link href={`/dashboard/facture/${facture._id}`}>
                  <div>
                    <h5 className="facture_id">{facture.factureNumber}</h5>
                  </div>
                </Link>
                {/* <div>
                  {clients.map((client: ClientProps) => (
                    <div key={client._id}>
                      {client._id === facture.client ? (
                        <h6 className="facture_client">{client.clientName}</h6>
                      ) : (
                        <div>loading...</div>
                      )}
                    </div>
                  ))}
                </div> */}
                <div>
                  {/* {facture.rows.map((row: RowProps) => (
                    <div key={row._id}>
                      {row._id === facture.rows ? (
                        <h6 className="facture_total">{row.total}</h6>
                      ) : (
                        <div>Loading...</div>
                      )}
                    </div>
                  ))} */}
                  <p className="facture_created">{facture.factureDate}</p>
                </div>
                <div className="flex justify-between items-center gap-4">
                  <DeleteButtonFacture
                    id={facture._id}
                    setFactures={setFactures}
                  />

                  <Link href={`/dashboard/edit-facture/${facture._id}`}>
                    <LiaEditSolid className="text-green-500 text-2xl" />
                  </Link>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}
export default Dashboard
