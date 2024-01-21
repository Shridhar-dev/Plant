import { NextRequest, NextResponse } from "next/server";
import db from "../../../lib/db";
import { productImages, products, reviews, users } from "@/lib/schemas";
import { eq } from "drizzle-orm";

export async function GET(req: NextRequest, res: NextResponse) {
  const { searchParams } = new URL(req.url);
  const param = searchParams.get("id");
  const product = await db
    .select()
    .from(products)
    .where(eq(products.id, param));
  const images = await db
    .select()
    .from(productImages)
    .where(eq(productImages.productId, param));

  const review = await db
    .select({
      review_id: reviews.id,
      review: reviews.review,
      user_name: users.name,
      user_image: users.image,
    })
    .from(reviews)
    .fullJoin(users, eq(reviews.userId, users.id))
    .where(eq(reviews.productId, param));

  return NextResponse.json({
    product: product[0],
    images: images,
    reviews: review,
  });
}
