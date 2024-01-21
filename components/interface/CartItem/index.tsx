"use client";

import { SiteConfig } from "@/app/layout";
import { X } from "lucide-react";
import Image from "next/image";
import { ServerContextJSONValue, useContext } from "react";

interface CartItem {
  name: string;
  excerpt: string;
  price: number;
  image: string;
  id: number;
}

function CartItem({ name, excerpt, price, image, id }: CartItem) {
  const {
    cartItems,
    removeCartItem,
  }: { cartItems: ServerContextJSONValue[]; removeCartItem: any } =
    useContext(SiteConfig);

  return (
    <div className="border rounded-md flex gap-3 items-start p-3 mt-5">
      <Image
        src={image}
        loader={({ src }) => src}
        width={1}
        height={0}
        className="w-20 h-20 rounded-lg"
        alt={"Header Image showcasing gadgets"}
      />
      <div className="flex-1 overflow-hidden">
        <div className="flex items-center justify-between font-semibold text-lg whitespace-nowrap">
          <p className="whitespace-nowrap">{name}</p>
          <button>
            <X size={18} onClick={() => removeCartItem(id)} />
          </button>
        </div>
        <p className="text-sm font-medium text-gray-600 line-clamp-1 mr-10 whitespace-nowrap">
          {excerpt}
        </p>
        <p className="mt-2 font-semibold">₹{price}</p>
      </div>
    </div>
  );
}

function SearchCartItem({ name, excerpt, price, image }: CartItem) {
  return (
    <div className=" flex gap-3 items-center p-3 cursor-pointer">
      <Image
        src={image}
        loader={({ src }) => src}
        width={1}
        height={0}
        className="w-14 h-14 rounded-lg"
        alt={"Header Image showcasing gadgets"}
      />
      <div className="w-fit">
        <div className="flex items-center justify-start font-semibold text-md whitespace-nowrap">
          <p className="whitespace-nowrap">{name}</p>
        </div>
        <p className="text-xs font-medium text-gray-600 line-clamp-1 whitespace-nowrap">
          {excerpt}
        </p>
        <p className="mt-1 text-xs font-semibold">₹{price}</p>
      </div>
    </div>
  );
}

export { SearchCartItem };
export default CartItem;
