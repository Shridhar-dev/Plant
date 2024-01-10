"use client"

import Navbar from '@/components/interface/Navbar'
import Footer from '@/components/interface/Footer'
import {
    Table,
    TableBody,
    TableFooter,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import Image from 'next/image'
import { useContext } from 'react'
import { SiteConfig } from '../layout'
import { Trash2Icon } from 'lucide-react'
  
interface CartItemProps {
    name: string,
    excerpt: string,
    price: number,
    image:string,
    id: number
}

export default function Home() {
  const { cartItems }:any = useContext(SiteConfig);

  return (
    <div>
        <Navbar />
        <section className='px-10 sm:px-20 py-10'>
            <p className='text-4xl font-bold mb-5'>Shopping Cart</p>
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
                    {
                        cartItems.length > 0 &&
                        cartItems.map((item:CartItemProps, i: number)=>(
                            <TableRow key={i}>
                                <TableCell className="font-medium">
                                <Image 
                                    src={item.image}
                                    loader={({src})=>src}
                                    width={1}
                                    height={0}
                                    className='w-32 h-32 rounded-lg'
                                    alt={"Header Image showcasing gadgets"}
                                />
                                </TableCell>
                                <TableCell className='w-[600px]'>{item.name}</TableCell>
                                <TableCell className='w-[200px]'>{item.price}</TableCell>
                                <TableCell>{item.price}</TableCell>
                                <TableCell className="text-right">{item.price}</TableCell>
                                <TableCell className=" w-[100px]">
                                    <Trash2Icon className='h-4 w-4 text-red-400 mx-auto'/>
                                </TableCell>
                            </TableRow>
                        ))
                    }
                    
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TableCell colSpan={4}>Total</TableCell>
                        <TableCell className="text-right">$2,500.00</TableCell>
                    </TableRow>
                </TableFooter>
            </Table>

        </section>
        <Footer />
    </div>
  )
}
