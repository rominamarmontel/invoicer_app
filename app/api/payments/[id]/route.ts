import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "../../auth/auth"
import { connectMongoDB } from "@/lib/mongodb"
import Payment from "@/models/payment"

export const PUT = async (req:Request,{params}:{params: {id:string}}) => {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({error: "Not authenticated"}, {status: 401})
  }

  const {id} = params

  const {
    bankName,
    bankCode,
    accountNumber,
    bic,
    iban,
    accountName,
  } = await req.json()

  await connectMongoDB()
  await Payment.findByIdAndUpdate(id, {
    bankName,
    bankCode,
    accountNumber,
    bic,
    iban,
    accountName,
  })
  return NextResponse.json({message:"Payment updated"}, {status: 200})
}

export const GET = async(req:Request, {params}: {params: {id:string}}) => {
  const {id} = params
  await connectMongoDB()
  const payment = await Payment.findOne({_id: id})
  return NextResponse.json({payment}, {status: 200})
}

export const DELETE = async(req:Request,{params}:{params:{id:string}}) => {
  const {id} = params
  await connectMongoDB()
  await Payment.findByIdAndDelete({_id: id})
  return NextResponse.json({message:"Payment deleted"}, {status:200})
}