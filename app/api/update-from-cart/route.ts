import db from "@/lib/db";
import { cartitems } from "@/lib/schemas";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
    const data = await req.json();

    const cartitem = await db.update(cartitems).set({quantity:data.quantity}).where(eq(cartitems.userId, data.id) && eq(cartitems.productId, data.productId))

    return NextResponse.json({ message: "Item removed from cart!" });
}
