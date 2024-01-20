import db from "@/lib/db";
import { productImages, products } from "@/lib/schemas";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
    const data = await req.json();
    data.rating = 0;
    
    const product = await db
        .insert(products)
        .values({
            name: data.name,
            description: data.desc,
            excerpt: data.excerpt,
            image: data.images[0],
            price: parseFloat(data.price),
            rating: data.rating,
            userId: data.id,
            category: data.category,
        })
        .returning({ id: products.id });

    let images = data.images.map((image: string) => ({
        image: image,
        productId: product[0].id,
    }));
    const image = await db.insert(productImages).values(images).execute();

    return NextResponse.json({ message: "Product added successfully!" });
}
