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
  rating: number;
}

function ProductCard({
  name,
  image,
  excerpt,
  price,
  rating,
  id,
  username,
}: ProductCardProps) {
  const { addCartItem }: any = useContext(SiteConfig);
  
  const router = useRouter();

  const addCartItems = async() => {
    const session = await getSession()
    
    if(!session) router.push("/login");
    else{
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
    }
  };

  return (
    <div className=" rounded-lg overflow-hidden">
      <Link href={`/products/${id}`}>
        <div className="relative">
          <Image
            src={image}
            width={500}
            height={500}
            className="w-full object-cover h-72 rounded-lg flex-1"
            alt={"Header Image showcasing gadgets"}
          />
          {/*<button className="bg-white absolute right-3 top-3 rounded-full h-8 w-8 text-sm flex items-center justify-center">
            <Heart size={16} />
  </button>*/}
        </div>
        <div className="flex items-center justify-between font-semibold text-xl mt-2">
          <p>{name}</p>
          <p>₹{price}</p>
        </div>
        <p className="text-sm font-medium text-gray-600 line-clamp-1">
          {excerpt}
        </p>
        <p className="text-xs font-medium text-gray-600 line-clamp-1 mt-1">
          By {username}
        </p>
      </Link>
      <button
        onClick={addCartItems}
        className="border-2 border-black font-semibold hover:bg-black hover:text-white duration-300 text-sm py-1 px-4 rounded-full mt-4"
      >
        Add to Cart
      </button>
    </div>
  );
}

export default ProductCard;
