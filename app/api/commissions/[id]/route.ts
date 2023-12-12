import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "../../auth/auth"
import Commission from "@/models/commission"
import { connectMongoDB } from "@/lib/mongodb"

export const PUT = async(req:Request,{params}:{params: {id:string}}) => {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({error: "Not authenticated"}, {status: 401})
  }
  const {id} = params
  const {
    commissionName,
    taux
  } = await req.json()

  await Commission.findByIdAndUpdate(id, {
    commissionName,
    taux
  })
  return NextResponse.json({message:"Commission updated"}, {status: 200})
}

export const GET = async(req:Request,{params}:{params: {id:string}}) => {
  const {id} = params
  await connectMongoDB()
  const commission = await Commission.findOne({_id: id})
  return NextResponse.json({commission}, {status: 200})
}

export const DELETE = async(req:Request,{params}:{params:{id:string}}) => {
  const {id} = params
  await connectMongoDB()
  await Commission.findByIdAndDelete({_id: id})
  return NextResponse.json({message:"Commission deleted"}, {status:200})
}