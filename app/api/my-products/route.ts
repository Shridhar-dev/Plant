import { NextRequest, NextResponse } from "next/server";
import db from "../../../lib/db";
import { products, users } from "@/lib/schemas";
import { asc, eq, inArray, isNotNull } from "drizzle-orm";

export async function GET(req: NextRequest, res: NextResponse) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  const fields = {
    id: products.id,
    name: products.name,
    image: products.image,
    description: products.description,
    excerpt: products.excerpt,
    userId: products.userId,
    price: products.price,
    deal_price: products.deal_price,
    rating: products.rating,
    category: products.category,
    user_name: users.name,
    user_image: users.image,
  }

  let result = await db.select(fields).from(products).leftJoin(users, eq(products.userId, users.id)).where(eq(products.userId, id!));
  
  return NextResponse.json({ products: result || [] });
}

/*CREATE TABLE products(
	id SERIAL NOT NULL,
    name VARCHAR(50),
	image VARCHAR,
	category VARCHAR,
	description VARCHAR,
	excerpt VARCHAR(80),
	price INTEGER NOT NULL,
	rating INTEGER	
)

CREATE TABLE product_images(
	id SERIAL NOT NULL,
	product_id INT,
	image VARCHAR,
	CONSTRAINT fk_product
		FOREIGN KEY(product_id) REFERENCES products(id)	
)

CREATE TABLE reviews(
	id SERIAL NOT NULL,
	product_id INT,
	CONSTRAINT fk_product
		FOREIGN KEY(product_id) REFERENCES products(id)	
)


*/
