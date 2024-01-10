"use client"

import './globals.css'

import { Inter } from 'next/font/google'
import { Dispatch, SetStateAction, createContext, useState } from 'react'
import { Toaster } from '@/components/ui/toaster'
import { SessionProvider } from 'next-auth/react'

const inter = Inter({ subsets: ['latin'] })

interface SiteConfigType {
  cartItems?: any[]
  setCartItems?: Dispatch<SetStateAction<any>>
}

let SiteConfig: any = createContext({});



export default function RootLayout({
  children
}: {
  children: React.ReactNode,

}) {
  const [cartItems, setCartItems] = useState<any[]>([])
  
  const addItemToCart = async(newItem:any) =>{
    const uniqueItems = cartItems.filter(item => item.name !== newItem.name);
    setCartItems([...uniqueItems, newItem])
  }


  return (
      <SessionProvider>
        <SiteConfig.Provider value={{cartItems,setCartItems, addItemToCart}}>
          <html lang="en">
            <body className={inter.className}>
              <Toaster />
              {children}
            </body>
          </html>
        </SiteConfig.Provider>
      </SessionProvider>
  )
}

export { SiteConfig }