import { CommissionProps, FactureProps, RowProps } from '@/types'
import OneCompany from '../Company/OneCompany'
import OneClient from '../Client/OneClient'
import OneRow from '../Row/OneRow'
import OnePayment from '../Payment/OnePayment'
import { useState, useEffect } from 'react'

const OneFacture = ({ facture }: { facture: FactureProps }) => {
  const [subtotal, setSubtotal] = useState<number>(0)
  const [rowDetails, setRowDetails] = useState<RowProps[]>([])
  const [commission, setCommission] = useState<CommissionProps | null>(null)
  const [commissionValue, setCommissionValue] = useState<number>(0)

  useEffect(() => {
    const calculateSubtotal = async () => {
      try {
        if (!facture.rows || facture.rows.length === 0) {
          setSubtotal(0)
          setRowDetails([])
          return
        }

        const rowDetails = await Promise.all(
          facture.rows.map(async (row) => {
            const response = await fetch(`/api/rows/${row}`)
            if (!response.ok) {
              throw new Error(`Failed to fetch row with ID ${row}`)
            }
            const data = await response.json()
            return data.row
          })
        )
        setRowDetails(rowDetails.filter(Boolean))
      } catch (error) {
        console.error(error)
      }
    }

    const calculateCommissionValue = () => {
      if (!facture.commission) {
        console.log('Commission data is missing')
        return
      }
      const commissionRate = facture.commission.taux || 0
      const subtotalValue = rowDetails.reduce(
        (acc, row) => acc + (row.total || 0),
        0
      )
      setSubtotal(subtotalValue)
      const commissionValue = subtotalValue * (commissionRate * 0.01)
      setCommissionValue(commissionValue)
    }

    const fetchCommission = async () => {
      try {
        const res = await fetch(`/api/commissions/${facture.commission}`, {
          cache: 'no-store',
        })
        if (res.ok) {
          const data = await res.json()
          const fetchedCommission = data.commission
          setCommission(fetchedCommission)
          if (fetchedCommission) {
            calculateSubtotal()
            calculateCommissionValue()
          } else {
            console.log('Commission data is missing')
          }
        }
      } catch (error) {
        console.error(error)
      }
    }
    fetchCommission()
  }, [facture.rows, facture.commission, rowDetails])

  return (
    <div className="m-5 p-5 lg:max-w-4xl lg:mx-auto bg-white rounded shadow">
      <div className="oneFacture_container">
        <div className="flex flex-col gap-3">
          <div className="flex justify-start">
            {facture.company ? (
              <OneCompany companyId={facture.company} />
            ) : (
              <div>No company ID found</div>
            )}
          </div>
          <div className="flex justify-center">
            {facture.client ? (
              <OneClient clientId={facture.client} />
            ) : (
              <div>No Client ID found</div>
            )}
          </div>
          <div className="flex justify-end text-end">
            <div className="flex flex-col leading-5">
              <h2>
                <span>Numero de facture: </span>
                {facture.factureNumber}
              </h2>
              <p>
                <span>Date de facture: </span>
                {facture.factureDate}
              </p>
              <p>
                <span>Conditions de paiement (jours): </span>
                {facture.conditionPayment}
              </p>
              <p>
                <span>Date d’échéance: </span>
                {facture.paymentDue}
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
              <div className="overflow-hidden">
                <table className="min-w-full border text-center text-sm font-light dark:border-neutral-500">
                  <thead className="border-b font-medium dark:border-neutral-500 ">
                    <tr>
                      <th>{facture.note}</th>
                    </tr>
                    <tr className="border-b bg-neutral-100 dark:border-neutral-500 dark:bg-neutral-700">
                      <th
                        scope="col"
                        className="border-r px-6 py-4 dark:border-neutral-500"
                      >
                        Category
                      </th>
                      <th
                        scope="col"
                        className=" px-6 py-4 dark:border-neutral-500"
                      ></th>
                      <th
                        scope="col"
                        className="px-6 py-4 dark:border-neutral-500 text-left"
                      >
                        Description
                      </th>
                      <th
                        scope="col"
                        className="border-r px-6 py-4 dark:border-neutral-500"
                      ></th>
                      <th
                        scope="col"
                        className="border-r px-3 py-2 dark:border-neutral-500"
                      >
                        Qty
                      </th>
                      <th
                        scope="col"
                        className="border-r px-3 py-2 dark:border-neutral-500"
                      >
                        Unité
                      </th>
                      <th
                        scope="col"
                        className="border-r px-3 py-2 dark:border-neutral-500"
                      >
                        Prix unitaire
                      </th>
                      <th scope="col" className="px-3 py-2">
                        Montant
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {facture.rows ? (
                      facture.rows.map((row, i) => (
                        <tr
                          key={`${row._id}-${i}`}
                          className="border-b dark:border-neutral-500"
                        >
                          <OneRow rowId={row} />
                        </tr>
                      ))
                    ) : (
                      <tr key="no-row">
                        <td colSpan={8} className="text-center">
                          No Row ID found
                        </td>
                      </tr>
                    )}
                    <tr className="border-b dark:border-neutral-500">
                      <td
                        colSpan={7}
                        className="text-right whitespace-nowrap border-r px-3 py-2 dark:border-neutral-500"
                      >
                        Sous Total
                      </td>
                      <td className="flex justify-end px-3 py-2">{subtotal}</td>
                    </tr>
                    <tr className="border-b dark:border-neutral-500">
                      <td
                        colSpan={7}
                        className="text-right whitespace-nowrap border-r px-3 py-2 dark:border-neutral-500"
                      >
                        {commission?.commissionName &&
                          commission.commissionName}{' '}
                        {commission?.taux && commission.taux} <span>%</span>
                      </td>
                      <td className="flex justify-end whitespace-nowrap px-3 py-2 dark:border-neutral-500">
                        €
                        {subtotal *
                          (commission?.taux ? commission.taux * 0.01 : 0)}
                      </td>
                    </tr>
                    <tr className="border-b border-t-2">
                      <td
                        colSpan={7}
                        className="text-right whitespace-nowrap border-r px-3 py-2 font-bold"
                      >
                        TOTAL
                      </td>
                      <td
                        col-start-7="true"
                        className="flex justify-end px-3 py-2 font-bold"
                      >
                        €{' '}
                        {subtotal *
                          (commission?.taux ? commission.taux * 0.01 : 0) +
                          subtotal}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div>
          <OnePayment paymentId={facture.payment} />
        </div>
      </div>
    </div>
  )
}

export default OneFacture
