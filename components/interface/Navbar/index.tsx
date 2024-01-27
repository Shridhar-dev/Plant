"use client";

import React, { useContext, useState, useEffect, ChangeEvent } from "react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Input } from "@/components/ui/input";

import Link from "next/link";
import { LogOut, Package, Search, ShoppingCart } from "lucide-react";
import CartSideBar from "../CartSideBar";
import { SiteConfig } from "@/app/layout";
import { SearchCartItem } from "../CartItem";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getSession } from "next-auth/react";
import { logout } from "@/lib/authAction";
import User from "@/assets/user.svg";

interface CartItemProps {
  name: string;
  excerpt: string;
  price: number;
  image: string;
  id: number;
}

function Navbar({ isFixed = false }: { isFixed?: boolean }) {
  const { cartItems }: any = useContext(SiteConfig);
  const [bgColor, setbgColor] = useState("transparent");
  const [profile, setProfile] = useState<any>({
    email: "",
    image: "",
    name: "",
  });
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchItems, setSearchItems] = useState([]);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 50) {
        setbgColor("white");
      } else {
        setbgColor("transparent");
      }
    });

    getProfile();
    return () => {
      window.removeEventListener("scroll", () => {});
    };
  }, []);

  const getSearchItems = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value !== "") {
      let products = await fetch(`/api/products?name=${e.target.value}`);
      let objProducts = await products.json();
      if (e.target.value !== "") setSearchItems(objProducts.products);
    } else {
      setSearchItems([]);
    }
  };

  const getProfile = async () => {
    const session = await getSession();
    setProfile(session?.user);
  };

  return (
    <>
      <CartSideBar isCartOpen={isCartOpen} setIsCartOpen={setIsCartOpen} />
      <div
        className="top-0 flex w-full px-10 sm:px-20 py-4 z-50 duration-300"
        style={{
          background: bgColor,
          position: isFixed ? "fixed" : "static",
        }}
      >
        <NavigationMenu className="max-w-full w-full justify-start  navbar-menu">
          <NavigationMenuList className="flex items-center justify-between w-full ">
            <Link href="/" legacyBehavior passHref>
              <NavigationMenuLink className="text-2xl font-semibold">
                Plantsco
              </NavigationMenuLink>
            </Link>
            <NavigationMenu>
              <NavigationMenuList className="flex items-center justify-between gap-5 w-full ">
                <Link href="/deals" legacyBehavior passHref>
                  <NavigationMenuItem className="cursor-pointer font-semibold">
                    Deals
                  </NavigationMenuItem>
                </Link>
                <NavigationMenuItem className="relative">
                  <Input
                    className="px-3"
                    onChange={getSearchItems}
                    placeholder={`Search`}
                    logo={<Search className="text-gray-500" size={20} />}
                  />
                  {searchItems.length > 0 && (
                    <div className="absolute min-w-[320px] border rounded-md shadow-xs pl-1.5 pr-5 mt-3 right-0 bg-white">
                      {searchItems.map(
                        (searchItem: CartItemProps, i: number) => (
                          <SearchCartItem
                            key={i}
                            id={searchItem.id}
                            name={searchItem.name}
                            image={searchItem.image}
                            excerpt={searchItem.excerpt}
                            price={searchItem.price}
                          />
                        )
                      )}
                    </div>
                  )}
                </NavigationMenuItem>
                <NavigationMenuItem className="cursor-pointer relative">
                  <div className="bg-black flex items-center justify-center absolute -right-2 -top-3 h-4 w-4 rounded-full text-white text-[0.6rem]">
                    {cartItems.length}
                  </div>
                  <ShoppingCart size={20} onClick={() => setIsCartOpen(true)} />
                </NavigationMenuItem>
                <NavigationMenuItem className="cursor-pointer relative">
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <Avatar>
                        <AvatarImage
                          src={profile?.image || User.src}
                          sizes="h-10 w-10"
                        />
                        <AvatarFallback>
                          {profile?.name.split(" ")[0][0] || "User"}
                        </AvatarFallback>
                      </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuLabel>My Account</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      {profile?.email && (
                        <>
                          <Link href="/my-products">
                            <DropdownMenuItem>
                              <Package className="mr-2 h-4 w-4" />
                              <span>My Products</span>
                            </DropdownMenuItem>
                          </Link>
                          <Link href="/sell">
                            <DropdownMenuItem>
                              <ShoppingCart className="mr-2 h-4 w-4" />
                              <span>Sell your plant</span>
                            </DropdownMenuItem>
                          </Link>
                        </>
                      )}
                      {profile?.email ? (
                        <DropdownMenuItem onClick={() => logout()}>
                          <LogOut className="mr-2 h-4 w-4" />
                          <span>Log out</span>
                        </DropdownMenuItem>
                      ) : (
                        <Link href="/login">
                          <DropdownMenuItem>
                            <LogOut className="mr-2 h-4 w-4" />
                            <span>Log in</span>
                          </DropdownMenuItem>
                        </Link>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </>
  );
}

export default Navbar;
