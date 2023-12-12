import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "../../auth/auth"
import { connectMongoDB } from "@/lib/mongodb"
import Row from "@/models/row"

export const GET = async(req:Request, {params}:{params: {id:string}}) => {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({error: "Not authenticated"}, {status: 401})
  }
  const {id} = params
  await connectMongoDB()
  const row = await Row.findOne({_id: id})
  return NextResponse.json({row}, {status: 200})
}