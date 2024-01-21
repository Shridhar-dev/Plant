import { NextRequest, NextResponse } from "next/server";
import db from "../../../lib/db";
import { products } from "@/lib/schemas";
import { asc, inArray } from "drizzle-orm";

export async function GET(req: NextRequest, res: NextResponse) {
  const { searchParams } = new URL(req.url);
  const name = searchParams.get("name");

  const orderBy = searchParams.get("orderBy");
  const categories = searchParams.get("categories");

  let result;
  if (name) {
    const query = `SELECT * FROM products WHERE name ILIKE '%${name}%'`;
    result = await db.query.products.findMany({
      where: (product, { ilike }) => ilike(product.name, `%${name}%`),
    });
  } else if (orderBy || categories) {
    var outputArray = JSON.parse(categories);

    if (categories && orderBy) {
      result = await db
        .select()
        .from(products)
        .where(inArray(products.category, outputArray))
        .orderBy(asc(products[orderBy]));
    }
    if (categories && !orderBy) {
      result = await db
        .select()
        .from(products)
        .where(inArray(products.category, outputArray));
    }
    if (!categories && !orderBy) {
      result = await db.select().from(products).orderBy(asc(products[orderBy]));
    }
  } else {
    result = await db.select().from(products);
  }

  return NextResponse.json({ products: result });
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
