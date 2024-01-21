import { NextRequest, NextResponse } from "next/server";
import db from "../../../lib/db";
import { cartitems, products } from "@/lib/schemas";
import { eq } from "drizzle-orm";

export async function GET(req: NextRequest, res: NextResponse) {
  const { searchParams } = new URL(req.url);
  const param = searchParams.get("id");

  const result = await db
    .select({
      cartitemId: cartitems.id,
      quantity: cartitems.quantity,
      id: products.id,
      name: products.name,
      description: products.description,
      excerpt: products.excerpt,
      image: products.image,
      rating: products.rating,
      price: products.price,
      totalPrice: products.price,
      category: products.category,
    })
    .from(cartitems)
    .fullJoin(products, eq(cartitems.productId, products.id))
    .where(eq(cartitems.userId, param));

  return NextResponse.json({ items: result });
}
