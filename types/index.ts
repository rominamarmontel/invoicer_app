export type PrinterProps = {
  handlePrint: () => void
}

export type UserProps = {
  name: string,
  email: string,
  password: string,
}

export type CompanyProps = {
  _id: string,
  name: string,
  address: string,
  zipcode: string,
  city: string,
  country?: string,
  phone?: string,
  email?: string,
  website?: string,
  siret?: string,
  tva?: string
}

export type ClientProps = {
  _id: string,
  clientName: string,
  personName?: string,
  clientAddress: string,
  clientZipcode: string,
  clientCity: string,
  clientCountry?: string,
  clientPhone?: string,
  clientEmail?: string,
  clientWebsite?: string,
  clientSiret?: string,
  clientTva?: string,
}

export type PaymentProps = {
  _id:string,
  bankName: string,
  bankCode: string,
  accountNumber: string,
  bic: string,
  iban: string,
  accountName: string,
}
export type CategoryProps = {
  _id: string,
  catName: string
}

export type ItemProps = {
  _id: string,
  itemName: {
    fr:string,
    jp:string
  }
}


export type FactureProps = {
  _id:string,
  company: CompanyProps,
  client: ClientProps,
  factureDate: string,
  factureNumber: string,
  conditionPayment: number,
  paymentDue:string,
  title:string,
  rows:RowProps[],
  note: string,
  payment: PaymentProps,
  commission: CommissionProps | null,
  createdAt: string
}

export type RowProps = {
  _id: string,
  category: { _id: string; catName: string },
  item: { _id: string; itemName: { fr: string; jp: string } },
  itemPlus?: string,
  qty: number,
  price: number,
  unit: string,
  total: number,
  [key: string]: any,
}

export type FactureNumberProps = {
  factureNumber: string
}

export type CommissionProps = {
  _id: string,
  commissionName: string,
  taux: number,
}