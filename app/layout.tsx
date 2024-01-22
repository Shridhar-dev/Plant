"use client";

import "./globals.css";

import { Inter } from "next/font/google";
import {
  Dispatch,
  SetStateAction,
  createContext,
  useEffect,
  useState,
} from "react";
import { Toaster } from "@/components/ui/toaster";
import {
  addItemToCart,
  getCartItems,
  removeItemToCart,
  updateItemFromCart,
} from "@/lib/cart";

const inter = Inter({ subsets: ["latin"] });

interface SiteConfigType {
  cartItems?: any[];
  setCartItems?: Dispatch<SetStateAction<any>>;
}

let SiteConfig: any = createContext({});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [cartItems, setCartItems] = useState<any[]>([]);

  const addCartItem = async (newItem: any) => {
    addItemToCart(newItem);
    const uniqueItems = cartItems.filter((item) => item.name !== newItem.name);
    setCartItems([...uniqueItems, newItem]);
  };

  const removeCartItem = (id: number) => {
    let items = [...cartItems];
    removeItemToCart(items[id].id);
    items.splice(id, 1);
    setCartItems(items);
  };

  const clearCart = (id: number) => {
    setCartItems([]);
  };

  const changeQuantity = (id: number, quantity: number) => {
    let items = [...cartItems];
    updateItemFromCart(items[id].id, quantity);
    items[id].quantity = quantity;
    setCartItems(items);
  };

  const initialItems = async () => {
    const data = await getCartItems();
    if(!data) return;
    setCartItems(data.items);
  };

  useEffect(() => {
    initialItems();
  }, []);

  return (
    <SiteConfig.Provider
      value={{
        cartItems,
        removeCartItem,
        addCartItem,
        changeQuantity,
        clearCart,
      }}
    >
      <html lang="en">
        <body className={inter.className}>
          <Toaster />
          {children}
        </body>
      </html>
    </SiteConfig.Provider>
  );
}

export { SiteConfig };
