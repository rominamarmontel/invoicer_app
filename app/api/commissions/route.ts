import { connectMongoDB } from "@/lib/mongodb"
import Commission from '@/models/commission'
import { NextResponse } from "next/server"

export const GET = async(req:Request) => {
  await connectMongoDB()
  const commissions = await Commission.find()
  return NextResponse.json(commissions)
}

export const POST = async(req:Request) => {
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