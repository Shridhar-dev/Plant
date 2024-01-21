import db from "@/lib/db";
import { cartitems } from "@/lib/schemas";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  const data = await req.json();

  const cartitem = await db
    .insert(cartitems)
    .values({
      quantity: data.quantity || 1,
      productId: data.productId,
      userId: data.id,
    })
    .returning({ id: cartitems.id });

  return NextResponse.json({
    message: "Item added to cart!",
    id: cartitem[0].id,
  });
}
