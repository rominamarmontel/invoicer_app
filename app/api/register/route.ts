import { NextResponse } from 'next/server'
import {connectMongoDB} from '@/lib/mongodb'
import User from '@/models/user'
import bcrypt from 'bcryptjs'

export const POST = async(req: Request) => {
    try {
      const { name, email, password } = await req.json()
      await connectMongoDB()
      const hashPassword = await bcrypt.hash(password, 10)
      await User.create({name, email, password: hashPassword })
      return NextResponse.json({message: 'User registered'}, {status: 201})
    } catch (error) {
      return NextResponse.json({message:"An error occurred while registering the user."}, {status: 500})
    }
}

