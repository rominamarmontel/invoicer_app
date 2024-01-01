import { connectMongoDB } from "@/lib/mongodb"
import Payment from '@/models/payment'
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server"
import { authOptions } from "../auth/auth";

export const GET = async(req:Request) => {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({error: "Not authenticated"}, {status: 401})
  }
  
  await connectMongoDB()
  const payments = await Payment.find()
  return NextResponse.json({payments})
}

export const POST = async(req:Request) => {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({error: "Not authenticated"}, {status: 401})
  }

  const {
    bankName,
    bankCode,
    accountNumber,
    bic,
    iban,
    accountName,
  } = await req.json()

  await connectMongoDB()
  const newPayment = await Payment.create({
    bankName,
    bankCode,
    accountNumber,
    bic,
    iban,
    accountName,
  })
  await newPayment.save()
  return NextResponse.json({res:newPayment})
}