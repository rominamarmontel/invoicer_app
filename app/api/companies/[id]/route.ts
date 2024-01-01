import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "../../auth/auth"
import { connectMongoDB } from "@/lib/mongodb"
import Company from "@/models/company"
import { Types } from 'mongoose';

export const PUT = async(req:Request,{params}:{params: {id:string}}) => {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({error: "Not authenticated"}, {status: 401})
  }

  const {id} = params

  const {
    name,
    address,
    zipcode,
    city,
    country,
    phone,
    email,
    website,
    siret,
    tva,
  } = await req.json()

  await connectMongoDB()
  await Company.findByIdAndUpdate(id, {
    name,
    address,
    zipcode,
    city,
    country,
    phone,
    email,
    website,
    siret,
    tva,
  })
  return NextResponse.json({message:"Company updated"}, {status: 200})
}

export const GET = async(req:Request, {params}: {params: {id:string}}) => {
  const {id} = params
  await connectMongoDB()
  const company = await Company.findOne({_id: id})
  return NextResponse.json({company}, {status: 200})
}

export const DELETE = async(req:Request,{params}:{params:{id:string}}) => {
  const {id} = params
  await connectMongoDB()
  await Company.findByIdAndDelete({_id: id})
  return NextResponse.json({message:"Company deleted"}, {status:200})
}