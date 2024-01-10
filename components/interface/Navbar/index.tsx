'use client'

import React, { useContext, useState, useEffect, ChangeEvent } from 'react'
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuIndicator,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    NavigationMenuViewport,
  } from "@/components/ui/navigation-menu"
import { Input } from "@/components/ui/input"

import Link from 'next/link'
import { Search, ShoppingCart } from 'lucide-react'
import CartSideBar from '../CartSideBar'
import { SiteConfig } from '@/app/layout'
import CartItem, { SearchCartItem } from '../CartItem'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface CartItemProps {
  name: string,
  excerpt: string,
  price: number,
  image:string,
  id: number
}

function Navbar({isFixed=false}:{isFixed?:boolean}) {
  const { cartItems }:any = useContext(SiteConfig);
  const [bgColor, setbgColor] = useState("transparent");
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [searchItems, setSearchItems] = useState([])
  
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if(window.scrollY > 50){
        setbgColor("white")
      }
      else{
        setbgColor("transparent")
      }
    })

    return () => {
      window.removeEventListener("scroll", ()=>{})
    }
  }, [])
  
  const getSearchItems = async(e:ChangeEvent<HTMLInputElement>) => {
    if(e.target.value !== ""){
      console.log("E: ", e.target.value)
      let products = await fetch(`/api/products?name=${e.target.value}`);
      let objProducts = await products.json();
      if(e.target.value !== "") setSearchItems(objProducts.products)
    }
    else {
      setSearchItems([])
    }
  }

  return (
    <>
      <CartSideBar isCartOpen={isCartOpen} setIsCartOpen={setIsCartOpen} />
      <div className='top-0 flex w-full px-10 sm:px-20 py-4 z-50 duration-300' style={{background:bgColor, position:isFixed ? "fixed" : "static"}}>  
        <NavigationMenu className='max-w-full w-full justify-start  navbar-menu'>
            <NavigationMenuList className='flex items-center justify-between w-full '>
                <Link href="/" legacyBehavior passHref>
                    <NavigationMenuLink className='text-2xl font-semibold'>
                        Plant.co
                    </NavigationMenuLink>
                </Link>
                <NavigationMenu>
                  <NavigationMenuList className='flex items-center justify-between gap-5 w-full '>  
                    <Link href="/deals" legacyBehavior passHref>
                      <NavigationMenuItem className='cursor-pointer font-semibold'>
                        Deals
                      </NavigationMenuItem>
                    </Link>
                    <NavigationMenuItem className='cursor-pointer font-semibold'>
                      What's New
                    </NavigationMenuItem>
                    <NavigationMenuItem className='relative'>
                      <Input onChange={getSearchItems} placeholder={`Search`} logo={<Search className='text-gray-500' size={20}/>}/>
                      {
                        searchItems.length > 0 &&
                        <div className='absolute min-w-[320px] border rounded-md shadow-xs pl-1.5 pr-5 mt-3 right-0 bg-white'>
                          {
                            searchItems.map((searchItem:CartItemProps,i:number)=>(
                              <SearchCartItem key={i} id={i} name={searchItem.name} image={searchItem.image} excerpt={searchItem.excerpt} price={searchItem.price}/>
                            ))
                          }
                        </div>
                      }
                    </NavigationMenuItem>
                    <NavigationMenuItem className='cursor-pointer relative'>
                      <div className='bg-black flex items-center justify-center absolute -right-2 -top-3 h-4 w-4 rounded-full text-white text-[0.6rem]'>{cartItems.length}</div>
                      <ShoppingCart size={20} onClick={()=>setIsCartOpen(true)}/>
                    </NavigationMenuItem>
                    <Link href="/login">
                      <NavigationMenuItem className='cursor-pointer relative'>
                        <Avatar>
                          <AvatarImage src="https://github.com/shadcn.png" sizes='h-10 w-10'/>
                          <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                      </NavigationMenuItem>
                    </Link>
                  </NavigationMenuList>
                </NavigationMenu>
            </NavigationMenuList>
        </NavigationMenu>
      </div>
    </>
  )
}

export default Navbar