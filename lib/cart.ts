import { toast } from "@/components/ui/use-toast";
import { getSession } from "next-auth/react";

export const addItemToCart = async (item: any) => {
  const user: any = await getSession();
  await fetch("/api/add-to-cart", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      productId: item.id,
      quantity: item.quantity,
      id: user.id,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      toast({
        title: data.message,
      });
    })
    .catch((error) => console.error("Error:", error));
};

export const removeItemToCart = async (id: number) => {
  const user: any = await getSession();
  await fetch("/api/remove-from-cart", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ productId: id, id: user.id }),
  })
    .then((response) => response.json())
    .then((data) => {
      toast({
        title: data.message,
      });
    })
    .catch((error) => console.error("Error:", error));
};

export const updateItemFromCart = async (id: number, quantity: number) => {
  const user: any = await getSession();
  await fetch("/api/update-from-cart", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ productId: id, quantity: quantity, id: user.id }),
  })
    .then((response) => response.json())
    .then((data) => {
      toast({
        title: data.message,
      });
    })
    .catch((error) => console.error("Error:", error));
};

export const getCartItems = async () => {
  const user: any = await getSession();
  if (!user) return;
  const response = await fetch(`/api/get-cart?id=${user.id}`);
  const jsonres = await response.json();
  return await jsonres;
};
