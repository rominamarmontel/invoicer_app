import { connectMongoDB } from "@/lib/mongodb"
import Item from '@/models/item'
import { NextResponse } from "next/server"
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/auth";

export const GET = async (req: Request) => {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({error: "Not authenticated"}, {status: 401})
  }
  try {
    await connectMongoDB();
    const items = await Item.find().sort({ createdAt: -1 })
    return NextResponse.json({items})
  } catch (error) {
    console.error('Error fetching items:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
};

export const POST = async (req: Request) => {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
  }

  const { itemName } = await req.json()

  await connectMongoDB();
  const newItem = await Item.create({
    itemName: {
      fr: itemName.fr,
      jp: itemName.jp
    },
  });

  await newItem.save()

  return NextResponse.json({ res: newItem })
};