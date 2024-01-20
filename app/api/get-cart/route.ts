import { NextRequest, NextResponse } from "next/server";
import db from "../../../lib/db";
import { cartitems, productImages, products, reviews, users } from "@/lib/schemas";
import { eq, sql } from "drizzle-orm";

export async function GET(req: NextRequest, res: NextResponse) {
    const { searchParams } = new URL(req.url);
    const param = searchParams.get("id");
    const result = await db
        .select({
            cartitem_id: cartitems.id,
            quantity: cartitems.quantity,
            product_id: products.id,
            product_name: products.name,
            description: products.description,
            price: products.price,
            category: products.category,
        })
        .from(cartitems)
        .fullJoin(products, eq(cartitems.productId, products.id))
        .where(eq(cartitems.userId, param))


    return NextResponse.json({items: result});
}
