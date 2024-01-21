"use client";

import { SiteConfig } from "@/app/layout";
import { Heart } from "lucide-react";
import Image from "next/image";
import { useContext } from "react";
import Link from "next/link";

interface ProductCardProps {
  id: number;
  name: string;
  image: string;
  excerpt: string;
  price: number;
  rating: number;
}

function ProductCard({
  name,
  image,
  excerpt,
  price,
  rating,
  id,
}: ProductCardProps) {
  const { addCartItem }: any = useContext(SiteConfig);

  const addCartItems = () => {
    let item = {
      name,
      totalPrice: price,
      price: price,
      quantity: 1,
      excerpt: excerpt,
      image,
      rating,
      id,
    };
    addCartItem(item);
  };

  return (
    <div className=" rounded-lg overflow-hidden">
      <Link href={`/products/${id}`}>
        <div className="relative">
          <Image
            src={image}
            loader={({ src }) => src}
            width={1}
            height={0}
            className="w-full object-cover h-72 rounded-lg flex-1"
            alt={"Header Image showcasing gadgets"}
          />
          <button className="bg-white absolute right-3 top-3 rounded-full h-8 w-8 text-sm flex items-center justify-center">
            <Heart size={16} />
          </button>
        </div>
        <div className="flex items-center justify-between font-semibold text-xl mt-2">
          <p>{name}</p>
          <p>₹{price}</p>
        </div>
        <p className="text-sm font-medium text-gray-600 line-clamp-1">
          {excerpt}
        </p>
      </Link>
      <button
        onClick={addCartItems}
        className="border-2 border-black font-semibold hover:bg-black hover:text-white duration-300 text-sm py-1 px-4 rounded-full mt-2"
      >
        Add to Cart
      </button>
    </div>
  );
}

export default ProductCard;
