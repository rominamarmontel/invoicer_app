import DatatableClient from './DatatableClient'
import { clientColumns } from '@/datatablesource'

const clients = () => {
  return (
    <div className="clients m-5 p-5 bg-white rounded shadow">
      <div className="clients_container">
        <div className="clients_header">
          <div className="clients_header-logo">
            <h3>Clients</h3>
          </div>
        </div>
        <DatatableClient columns={clientColumns} />
      </div>
    </div>
  )
}

export default clients
