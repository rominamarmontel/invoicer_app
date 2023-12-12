import { connectMongoDB } from '@/lib/mongodb';
import Category from '@/models/category';
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server"
import { authOptions } from "../auth/auth";

export const POST = async (req: Request) => {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({error: "Not authenticated"}, {status: 401})
  }
  try {
    const { catName } = await req.json();
    await connectMongoDB();
    await Category.create({ catName });
    return NextResponse.json({ message: 'Category created' }, { status: 201 });
  } catch (error) {
    return NextResponse.json('Error creating category', { status: 500 });
  }
}

export const GET = async() => {
  try {
    await connectMongoDB()
    const categories = await Category.find()
    return NextResponse.json(categories)
  } catch (error) {
    return NextResponse.json("Something went wrong.")
  }
}
