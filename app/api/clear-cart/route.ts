import db from "@/lib/db";
import { cartitems } from "@/lib/schemas";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  const data = await req.json();
  const cartitem = await db
    .delete(cartitems)
    .where(eq(cartitems.userId, data.id));

  return NextResponse.json({ message: "Cleared cart!" });
}
