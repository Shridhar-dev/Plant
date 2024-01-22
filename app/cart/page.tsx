"use client";

import Navbar from "@/components/interface/Navbar";
import Footer from "@/components/interface/Footer";
import {
  Table,
  TableBody,
  TableFooter,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import { SiteConfig } from "../layout";
import { Trash2Icon } from "lucide-react";
import { loadStripe } from "@stripe/stripe-js";
import { getSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

interface CartItemProps {
  name: string;
  excerpt: string;
  price: number;
  quantity: number;
  image: string;
  id: number;
}

export default function Home() {
  const { cartItems, removeCartItem, changeQuantity }: any =
    useContext(SiteConfig);
  const [total, setTotal] = useState(0);

  const calculateTotal = () => {
    let sum = 0;
    if (cartItems.length > 0) {
      cartItems.forEach((item: CartItemProps) => {
        sum = sum + item.quantity * item.price;
      });
    }
    setTotal(sum);
  };

  const createCheckOutSession = async () => {
    const stripe = await stripePromise;
    const session: any = await getSession();

    await fetch("/api/create-checkout-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        items: cartItems,
        email: session?.email,
      }),
    })
      .then((response) => response.json())
      .then(async (data) => {
        await fetch("/api/clear-cart", {
          method: "POST",
          body: JSON.stringify({ id: session?.id }),
        });
        const result = await stripe?.redirectToCheckout({
          sessionId: data.id,
        });

        if (result?.error) {
          alert(result.error.message);
        }
      })
      .catch((error) => console.error("Error:", error));
  };

  useEffect(() => {
    calculateTotal();
  }, [cartItems]);

  return (
    <div>
      <Navbar />
      <section className="px-10 sm:px-20 py-10">
        <p className="text-4xl font-bold mb-5">Shopping Cart</p>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead className="text-right">Total</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {cartItems.length > 0 &&
              cartItems.map((item: CartItemProps, i: number) => (
                <TableRow key={i}>
                  <TableCell className="font-medium">
                    <Image
                      src={item.image}
                      width={96}
                      height={96}
                      className="w-24 h-24 rounded-lg"
                      alt={"Header Image showcasing gadgets"}
                    />
                  </TableCell>
                  <TableCell className="w-[600px]">{item.name}</TableCell>
                  <TableCell className="w-[200px]">{item.price}</TableCell>
                  <TableCell>
                    {/* We are passing i instead of item.id cause we are removing it from array by index */}
                    <input
                      className="border p-1 pl-3"
                      value={item.quantity}
                      onChange={(e) =>
                        changeQuantity(i, parseInt(e.target.value))
                      }
                      autoFocus
                      type="number"
                      id="tentacles"
                      name="tentacles"
                      min="1"
                      max="100"
                    />
                  </TableCell>
                  <TableCell className="text-right">
                    {item.quantity * item.price}
                  </TableCell>
                  <TableCell className=" w-[100px] text-center">
                    {/* We are passing i instead of item.id cause we are removing it from array by index */}
                    <button
                      className="h-4 w-4 "
                      onClick={() => removeCartItem(i)}
                    >
                      <Trash2Icon className="h-4 w-4 text-red-400" />
                    </button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={5}>Total</TableCell>
              <TableCell colSpan={1} className="text-center">
                Rs. {total}
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
        <Button className="mt-5" onClick={createCheckOutSession}>
          Proceed {"->"}
        </Button>
      </section>
      <Footer />
    </div>
  );
}
