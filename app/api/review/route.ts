import db from '@/lib/db';
import { reviews } from '@/lib/schemas';
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req:NextRequest,res:NextResponse) {
    const data = await req.json();

    const review = await db.insert(reviews)
                     .values({
                         review: data.review,
                         productId: data.productId,
                         userId: data.id,
                     }).execute()


    return NextResponse.json({ message:"Review added successfully!" })
}
