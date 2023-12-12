import { connectMongoDB } from "@/lib/mongodb"
import Payment from '@/models/payment'
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server"
import { authOptions } from "../auth/auth";

export const GET = async(req:Request) => {
  await connectMongoDB()
  const banks = await Payment.find()
  return NextResponse.json(banks)
}

export const POST = async(req:Request) => {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({error: "Not authenticated"}, {status: 401})
  }

  const {
    bankName,
    accountNumber,
    bic,
    iban,
    accountName,
  } = await req.json()

  await connectMongoDB()
  const newPayment = await Payment.create({
    bankName,
    accountNumber,
    bic,
    iban,
    accountName,
  })
  await newPayment.save()
  return NextResponse.json({res:newPayment})
}