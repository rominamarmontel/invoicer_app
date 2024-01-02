import { connectMongoDB } from "@/lib/mongodb"
import Company from '@/models/company'
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server"
import { authOptions } from "../auth/auth";

export const GET = async(req:Request) => {
  await connectMongoDB()
  const companies = await Company.find().sort({ createdAt: -1 });
  return NextResponse.json({companies})
}

export const POST = async(req:Request) => {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({error: "Not authenticated"}, {status: 401})
  }

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
  const newCompany = await Company.create({
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
  await newCompany.save()
  return NextResponse.json({res:newCompany})
}