import { connectMongoDB } from '@/lib/mongodb'
import Client from '@/models/client'
import { NextResponse } from 'next/server'

export const GET = async (req: Request) => {
  await connectMongoDB()
  const clients = await Client.find()
  return NextResponse.json(clients)
}

export const POST = async (req: Request) => {
  const {
    clientName,
    personName,
    clientAddress,
    clientZipcode,
    clientCity,
    clientCountry,
    clientPhone,
    clientEmail,
    clientWebsite,
    clientSiret,
    clientTva,
  } = await req.json()

  await connectMongoDB()
  const newClient = await Client.create({
    clientName,
    personName,
    clientAddress,
    clientZipcode,
    clientCity,
    clientCountry,
    clientPhone,
    clientEmail,
    clientWebsite,
    clientSiret,
    clientTva,
  })
  await newClient.save()
  return NextResponse.json({ res: newClient })
}
