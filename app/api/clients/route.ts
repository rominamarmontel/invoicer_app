import { connectMongoDB } from '@/lib/mongodb'
import Client from '@/models/client'
import { NextResponse } from 'next/server'
import { getServerSession } from "next-auth/next"
import { authOptions } from "../auth/auth"

export const GET = async (req: Request) => {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({error: "Not authenticated"}, {status: 401})
  }
  await connectMongoDB()
  const clients = await Client.find().sort({ createdAt: -1 })
  return NextResponse.json({clients})
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
