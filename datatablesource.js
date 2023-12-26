export const factureColumns = [
  { field: '_id', headerName: 'ID', width: 150 },
  {
    field: 'factureNumber',
    headerName: 'FACTURE NUMBER',
    width: 200,
  },
  {
    field: 'factureDate',
    headerName: 'FACTURE DATE',
    width: 200,
  },
  {
    field: 'clientName',
    headerName: 'CLIENT',
    width: 250,
  },
]

export const companyColumns = [
  {
    field: 'name',
    headerName: 'COMPANY NAME',
    width: 200,
  },
  {
    field: 'address',
    headerName: 'ADDRESS',
    width: 200,
  },
  {
    field: 'zipcode',
    headerName: 'ZIPCODE',
    width: 100,
  },
  {
    field: 'city',
    headerName: 'CITY',
    width: 100,
  },
  {
    field: 'siret',
    headerName: 'SIRET',
    width: 150,
  },
]

export const clientColumns = [
  {
    field: 'clientName',
    headerName: 'CLIENT NAME',
    width: 200,
  },
  {
    field: 'clientAddress',
    headerName: 'ADDRESS',
    width: 200,
  },
  { field: 'clientZipcode', headerName: 'ZIPCODE', width: 100 },
  { field: 'clientCity', headerName: 'CITY', width: 100 },
  {
    field: 'clientSiret',
    headerName: 'SIRET',
    width: 250,
  },
]

export const paymentColumns = [
  {
    field: 'bankName',
    headerName: 'BANK',
    width: 150,
  },
  {
    field: 'bankCode',
    headerName: 'CODE',
    width: 60,
  },
  { field: 'accountNumber', headerName: 'ACCOUNT NUMBER', width: 200 },
  { field: 'bic', headerName: 'BIC', width: 80 },
  {
    field: 'iban',
    headerName: 'IBAN',
    width: 120,
  },
  {
    field: 'accountName',
    headerName: 'ACCOUNT NAME',
    width: 150,
  },
]

export const categoryColumns = [
  { field: '_id', headerName: 'ID', width: 300 },
  {
    field: 'catName',
    headerName: 'CATEGORY NAME',
    width: 460,
  },
]

export const itemColumns = [
  { field: '_id', headerName: 'ID', width: 200 },
  {
    field: 'itemName.fr',
    headerName: 'DESCRIPTION (FRENCH)',
    width: 300,
    renderCell: (params) => {
      console.log('itemName.fr:', params.value)
      return params.value ? params.value : ''
    },
  },
  {
    field: 'itemName.jp',
    headerName: 'DESCRIPTION (JAPANESE)',
    width: 300,
    renderCell: (params) => {
      console.log('itemName.jp:', params.value)
      return params.value ? params.value : ''
    },
  },
]

export const commissionColumns = [
  { field: '_id', headerName: 'ID', width: 300 },
  {
    field: 'commissionName',
    headerName: 'COMMISSION DESCRIPTION',
    width: 300,
  },
  {
    field: 'taux',
    headerName: 'TAUX (%)',
    width: 200,
  },
]
