import { PaymentProps } from '@/types'
import DatatablePayment from './DatatablePayment'
import { paymentColumns } from '@/datatablesource'

const Payments = ({
  payments,
  setPayments,
}: {
  payments: PaymentProps[]
  setPayments: React.Dispatch<React.SetStateAction<PaymentProps[]>>
}) => {
  return (
    <div className="payments m-5 p-5 bg-white rounded shadow">
      <div className="payments_container">
        <div className="payments_header">
          <div className="payments_header-logo">
            <h3>Payments</h3>
          </div>
        </div>
        <DatatablePayment columns={paymentColumns} />
      </div>
    </div>
  )
}

export default Payments
