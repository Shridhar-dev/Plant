import { auth } from "@/lib/auth";
import db from "@/lib/db";
import { productImages, products } from "@/lib/schemas";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  const data = await req.json();
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  const session = await auth();

  data.rating = 0;
  const product = await db
    .select()
    .from(products)
    .where(eq(products.id, parseInt(id!)));
  
  if(product[0].userId == session.id){
    let deal_price = null;
    let price = product[0].price;
    if(data.price < product[0].price){
      deal_price = data.price;
    }
    else{
      price = data.price
    }

    await db
      .update(products)
      .set({
        name: data.name,
        description: data.description,
        excerpt: data.excerpt,
        image: data.images[0],
        price: price,
        deal_price:deal_price,
        rating: data.rating,
        userId: data.id,
        category: data.category,
      })
      .where(eq(products.id, parseInt(id!)));
      return NextResponse.json({ message: "Product updated successfully!" });
  }
  else{
    return NextResponse.json({ message: "Error" });
  }
}
