import { NextResponse } from 'next/server'
import {Product} from "@/models/Product"
import {mongooseConnect} from "@/lib/mongoose";


export async function POST(request) {
    await mongooseConnect()
    const requestBody = await request.json()
    const productDocument = await Product.create({...requestBody})
    return NextResponse.json(productDocument, {status: 200})
}

export async function GET() {
    await mongooseConnect()
    const productDocument = await Product.find()
    return NextResponse.json(productDocument, {status: 200})
}