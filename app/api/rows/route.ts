import { connectMongoDB } from "@/lib/mongodb"
import Row from "@/models/row"
import { NextResponse } from "next/server"

export const GET = async(req:Request) => {
  await connectMongoDB()
  const rows = await Row.find().sort({ createdAt: -1 })
  return NextResponse.json({rows})
}