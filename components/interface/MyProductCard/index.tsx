"use client";

import { SiteConfig } from "@/app/layout";
import { Heart } from "lucide-react";
import Image from "next/image";
import { useContext } from "react";
import Link from "next/link";
import { getSession } from "next-auth/react";
import { useRouter } from "next/navigation";

interface ProductCardProps {
  id: number;
  name: string;
  username: string;
  image: string;
  excerpt: string;
  price: number;
  deal_price: number | undefined;
  rating: number;
}

function MyProductCard({
  name,
  image,
  excerpt,
  price,
  deal_price,
  rating,
  id,
  username,
}: ProductCardProps) {
  return (
    <div className=" rounded-lg overflow-hidden">
      <Link href={`/sell/${id}`}>
        <div className="relative">
          <Image
            src={image}
            width={500}
            height={500}
            className="w-full object-cover h-72 rounded-lg flex-1"
            alt={"Header Image showcasing gadgets"}
          />
        </div>
        <div className="flex items-center justify-between font-semibold text-xl mt-2">
          <p>{name}</p>
          <p>
            ₹{deal_price || price}
            {deal_price && (
              <del className="text-red-500 text-sm ml-1">₹{price}</del>
            )}
          </p>
        </div>
        <p className="text-sm font-medium text-gray-600 line-clamp-1">
          {excerpt}
        </p>
      </Link>
    </div>
  );
}

export default MyProductCard;
