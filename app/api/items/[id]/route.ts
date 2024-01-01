import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "../../auth/auth"
import { connectMongoDB } from "@/lib/mongodb"
import Item from "@/models/item"

export const PUT = async(req:Request,{params}:{params: {id:string}}) => {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({error: "Not authenticated"}, {status: 401})
  }
  
  const {id} = params
  const {
    itemName
  } = await req.json()

  await connectMongoDB()
  await Item.findByIdAndUpdate(id, {
    itemName: {
      fr: itemName.fr,
      jp: itemName.jp
    },
  })
  return NextResponse.json({message:"Item updated"}, {status: 200})
}

export const GET = async (req:Request,{params}:{params: {id:string}}) => {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({error: "Not authenticated"}, {status: 401})
  }

  const {id} = params
  await connectMongoDB()
  const item = await Item.findOne({_id: id})
  return NextResponse.json({item}, {status: 200})
}


export const DELETE = async (req:Request,{params}:{params: {id:string}}) => {
  const {id} = params
  await connectMongoDB()
  await Item.findByIdAndDelete({_id: id})
  return NextResponse.json({message:"Item deleted"}, {status:200})
}