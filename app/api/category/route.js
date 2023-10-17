import {mongooseConnect} from "@/lib/mongoose";
import {Category} from '@/models/Category'
import {NextResponse} from "next/server";

export async function GET(request) {
    await mongooseConnect()
    const categoryDocument = await Category.find().populate('parent')
    return NextResponse.json(categoryDocument, {status: 200})
}

export async function POST(request) {
    await mongooseConnect()
    const requestBody = await request.json()
    const categoryDocument = Category.create({...requestBody})
    return NextResponse.json(categoryDocument, {status: 200})
}

export async function PUT(request) {
    await mongooseConnect()
    const requestBody = await request.json()
    const {_id, ...restFormBody} = requestBody;
    console.log(_id, restFormBody)
    const categoryDocument = await Category.updateOne({_id}, {...restFormBody})
    return NextResponse.json(categoryDocument, {status: 200})

}