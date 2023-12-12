import Link from 'next/link'
import React, { useState } from 'react'

const ClientDetails = () => {
  const [showFacture, setShowFacture] = useState(false)
  const [name, setName] = useState('Hiromi Varnier')
  const [address, setAdress] = useState('8 rue Marmontel 75015 Paris')
  const [phone, setPhone] = useState('12345678')
  const [email, setEmail] = useState('romi@test.com')
  const [website, setWebsite] = useState('https://romi.com')
  const [siret, setSiret] = useState('12345678987239')
  const [tva, setTva] = useState('flasdkfjafdsal')
  const [clientName, setClientName] = useState('SARL COMPANY')
  const [attenName, setAttenName] = useState('Kate Bush')
  const [clientAddress, setClientAddress] = useState('17 av Hoche 75001 Paris')
  const [clientPhone, setClientPhone] = useState('1233857403')
  const [clientSiret, setClientSiret] = useState('fdas;lfkdjaslkf')
  const [clientTva, setClientTva] = useState('fjdsalfajs')
  const [factureDate, setFactureDate] = useState('10/17/2023')
  const [factureNumber, setFactureNumber] = useState('123455')
  const [conditionPayment, setConditionPayment] = useState('15')
  const [dueDate, setDueDate] = useState('20/10/2023')
  const [bankName, setBankName] = useState('LCL')
  const [bankCode, setBankCode] = useState('1234')
  const [accountNumber, setAccountNumber] = useState('12344584739')
  const [bic, setBic] = useState('CRLYFRPP')
  const [iban, setIban] = useState('FR00 0000 0000 0000 0000 0000 A00')
  const [accountName, setAccountName] = useState('Hiromi Varnier')
  return (
    <section className="flex flex-col items-center">
      <Link
        href="/create-clientinfo"
        className="w-[30%] mt-5 bg-blue-500 text-white font-bold py-2 px-8 rounded shadow border-2 border-blue-500 hover:bg-transparent hover:text-blue-500 transition-all duration-300"
      >
        Edit client information
      </Link>
      <div>
        <span>À l’attention de :</span>
        <h2>Client name</h2>
        <p>Attention:</p>
        <p>Client address</p>
        <p>SIRET: </p>
        <p>TVA: </p>
      </div>
    </section>
  )
}

export default ClientDetails
