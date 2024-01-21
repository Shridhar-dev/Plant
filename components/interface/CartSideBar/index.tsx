"use client";

import { SiteConfig } from "@/app/layout";
import React, { useContext } from "react";
import OutsideClickHandler from "react-outside-click-handler";
import CartItem from "../CartItem";
import Link from "next/link";

interface CartSideBarProps {
  isCartOpen: boolean;
  setIsCartOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

interface CartItemProps {
  name: string;
  excerpt: string;
  totalPrice: number;
  image: string;
  id: number;
}

function CartSideBar({ isCartOpen, setIsCartOpen }: CartSideBarProps) {
  const { cartItems }: any = useContext(SiteConfig);

  return (
    <div
      className="z-[100] fixed top-0 right-0  duration-500 "
      style={{ width: isCartOpen ? "30%" : "0%" }}
    >
      <OutsideClickHandler
        onOutsideClick={() => {
          setIsCartOpen(false);
        }}
      >
        <div className="bg-white border p-5 flex flex-col  h-screen overflow-hidden">
          <p className="text-2xl font-semibold">Cart</p>
          {cartItems.length > 0 &&
            cartItems.map((item: CartItemProps, i: number) => (
              <CartItem
                key={i}
                id={i}
                name={item.name}
                excerpt={item.excerpt}
                price={item.totalPrice}
                image={item.image}
              />
            ))}
          <div className="flex-1 flex items-end self-start justify-self-end h-auto">
            <Link href="/cart">Proceed to checkout {"->"}</Link>{" "}
          </div>
        </div>
      </OutsideClickHandler>
    </div>
  );
}

export default CartSideBar;
