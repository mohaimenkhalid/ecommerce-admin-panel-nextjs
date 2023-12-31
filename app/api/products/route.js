import { NextResponse } from 'next/server'
import {Product} from "@/models/Product"
import {mongooseConnect} from "@/lib/mongoose";


export async function POST(request) {
    await mongooseConnect()
    const requestBody = await request.json()
    const productDocument = await Product.create({...requestBody})
    return NextResponse.json(productDocument, {status: 200})
}

export async function GET(request) {
    await mongooseConnect()
    let productDocument;
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    if(id) {
         productDocument = await Product.findOne({_id: id})
    } else {
         productDocument = await Product.find()
    }
    return NextResponse.json(productDocument, {status: 200})
}

export async function PUT(request) {
    await mongooseConnect()
    const requestBody = await request.json()
    const {_id, ...restPayload} = requestBody
    const productDocument = await Product.updateOne({_id}, {...restPayload})
    return NextResponse.json(productDocument, {status: 200})
}

export async function DELETE(request) {
    await mongooseConnect()
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    const findProduct = await Product.findOne({_id: id})
    if(findProduct) {
        await Product.deleteOne({_id: findProduct._id})
        return NextResponse.json({message: 'product deleted successfully!'}, {status: 200})
    }
    return NextResponse.json({message: 'Product not found'}, {status: 400})
}