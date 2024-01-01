import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "../../auth/auth"
import { connectMongoDB } from "@/lib/mongodb"
import Row from "@/models/row"
import { Types } from 'mongoose';

export const GET = async (req: Request, { params }: { params: { id: string } }) => {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({error: "Not authenticated"}, {status: 401})
  }
  try {
    const { id } = params;
    await connectMongoDB();
    if (!Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: 'Invalid row ID' }, { status: 400 });
    }
    const row = await Row.findOne({ _id: id });

    if (!row) {
      return NextResponse.json({ error: 'Row not found' }, { status: 404 });
    }
    return NextResponse.json({ row }, { status: 200 });
  } catch (error) {
    console.error('Error fetching row:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
};