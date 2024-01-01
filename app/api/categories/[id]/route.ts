import { connectMongoDB } from "@/lib/mongodb"
import Category from "@/models/category"
import { NextResponse } from "next/server"
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/auth";

export const GET = async(req:Request,{params}:{params: {id:string}}) => {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({error: "Not authenticated"}, {status: 401})
  }
  const {id} = params
  await connectMongoDB()
  const category = await Category.findOne({_id: id})
  return NextResponse.json({category}, {status: 200})
}