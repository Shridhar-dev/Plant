import { NextRequest, NextResponse } from 'next/server'
import db from '../../../lib/db'

 
export async function GET(req:NextRequest,res:NextResponse) {
  const { searchParams } = new URL(req.url);
  const param = searchParams.get("id");

  let result:any = await db.query.products.findMany({
    where: (products, { eq }) => eq(products.id, parseInt(param || "1")),
  });
  
  return NextResponse.json({ products:result })
}