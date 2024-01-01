import { connectMongoDB } from "@/lib/mongodb"
import Commission from '@/models/commission'
import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "../auth/auth"

export const GET = async(req:Request) => {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({error: "Not authenticated"}, {status: 401})
  }
  await connectMongoDB()
  const commissions = await Commission.find()
  return NextResponse.json({commissions})
}

export const POST = async(req:Request) => {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({error: "Not authenticated"}, {status: 401})
  }
  const {
    commissionName,
    taux
  } = await req.json()

  await connectMongoDB()
  const newCommission = await Commission.create({
    commissionName,
    taux
  })
  await newCommission.save()
  return NextResponse.json({res:newCommission})
}