import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "../../auth/auth"
import { connectMongoDB } from "@/lib/mongodb"
import Payment from "@/models/payment"
import { Types } from 'mongoose';

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

export const GET = async (req: Request, { params }: { params: { id: string } }) => {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({error: "Not authenticated"}, {status: 401})
  }
  
  try {
    const { id } = params;
    await connectMongoDB();
    if (!Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: 'Invalid payment ID' }, { status: 400 });
    }
    const payment = await Payment.findOne({ _id: id });

    if (!payment) {
      return NextResponse.json({ error: 'Payment not found' }, { status: 404 });
    }
    return NextResponse.json({ payment }, { status: 200 });
  } catch (error) {
    console.error('Error fetching payment:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
};

export const DELETE = async(req:Request,{params}:{params:{id:string}}) => {
  const {id} = params
  await connectMongoDB()
  await Payment.findByIdAndDelete({_id: id})
  return NextResponse.json({message:"Payment deleted"}, {status:200})
}