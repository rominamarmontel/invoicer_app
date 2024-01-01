import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "../../auth/auth"
import { connectMongoDB } from "@/lib/mongodb"
import Client from "@/models/client"
import { Types } from 'mongoose';

export const PUT = async(req:Request,{params}:{params: {id:string}}) => {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({error: "Not authenticated"}, {status: 401})
  }

  const {id} = params

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

  await Client.findByIdAndUpdate(id, {
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
  return NextResponse.json({message:"Client updated"}, {status: 200})
}

export const GET = async(req:Request,{params}:{params: {id:string}}) => {
  const {id} = params
  await connectMongoDB()
  const client = await Client.findOne({_id: id})
  return NextResponse.json({client}, {status: 200})
}

export const DELETE = async(req:Request,{params}:{params:{id:string}}) => {
  const {id} = params
  await connectMongoDB()
  await Client.findByIdAndDelete({_id: id})
  return NextResponse.json({message:"Client deleted"}, {status:200})
}