import { connectMongoDB } from "@/lib/mongodb"
import Category from "@/models/category"
import { NextResponse } from "next/server"

export const GET = async(req:Request,{params}:{params: {id:string}}) => {
  const {id} = params
  await connectMongoDB()
  const category = await Category.findOne({_id: id})
  return NextResponse.json({category}, {status: 200})
}