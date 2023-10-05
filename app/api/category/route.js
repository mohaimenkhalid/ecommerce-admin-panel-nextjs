import {mongooseConnect} from "@/lib/mongoose";
import {Category} from '@/models/Category'
import {NextResponse} from "next/server";
export async function POST(request) {
    await mongooseConnect()
    const requestBody = await request.json()
    const categoryDocument = Category.create({...requestBody})
    return NextResponse.json(categoryDocument, {status: 200})
}