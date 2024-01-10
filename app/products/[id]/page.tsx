"use client"
import Navbar from '@/components/interface/Navbar'
import Image from 'next/image'
import React, { ContextType, useContext, useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { SiteConfig } from '@/app/layout'
interface ProductCardProps {
  id: number;
  name: string;
  image: string;
  excerpt: string;
  description: string;
  price: number;
  rating: number;
}

function ProductPage({params}:{params:any}) {


  const [product, setProduct] = useState<ProductCardProps | undefined>()
  const [currentProductImage, setCurrentProductImage] = useState<string>("")
  const [quantity, setQuantity] = useState(1)
  const { addItemToCart }:any = useContext(SiteConfig);
  const { toast } = useToast();

  const getProduct = async () => {
    let product = await fetch(`/api/product?id=${params.id}`);
    let objProduct = await product.json();
    setProduct(objProduct.products[0])
    setCurrentProductImage(objProduct.products[0].image)
  }

  const addCartItems = () => {
    if(!product) return;
    let item = {
      name:product.name,
      price:product.price*quantity,
      desc: product.excerpt,
      image:product.image,
      rating:product.rating,
      id:1,
    }
    addItemToCart(item)
 
      toast({
        title: product.name,
        description: "Has been added to cart!",
      })
  
  }

  useEffect(()=>{
    getProduct()
  },[])

  return (
    <div className='flex flex-col h-screen overflow-hidden'>
      <Navbar isFixed={false}/>
      <div className='grid grid-cols-5 px-20'>
        <div className='col-span-2 pt-10'>
          {product && <Image 
                            src={currentProductImage}
                            loader={({src})=>src}
                            width={1}
                            height={0}
                            className='w-[30rem] h-[30rem] rounded-lg'
                            alt={"Header Image showcasing gadgets"}
                        />
          }
          <div className='flex items-center gap-3 mt-4'>
              <FocusImage image={product?.image} setFocusImage={setCurrentProductImage}/>
              <FocusImage image={product?.image} setFocusImage={setCurrentProductImage}/>
              <FocusImage image={product?.image} setFocusImage={setCurrentProductImage}/>
              <FocusImage image={product?.image} setFocusImage={setCurrentProductImage}/>
              <FocusImage image={product?.image} setFocusImage={setCurrentProductImage}/>
          </div>
        </div>
        <div className='col-span-3 flex h-screen flex-col gap-3 pt-10 overflow-auto scrollbar-hide'>
          <p className=' text-4xl font-semibold'>{product?.name}</p>
          <p className=''>{product?.excerpt}</p>
          <p className='mb-5'>{product?.description}</p>
          <hr />
          <p className=' text-4xl font-semibold'>₹{(product?.price || 0)*quantity} <span className='text-lg opacity-50 inline font-normal'>for {quantity} pieces</span></p>
          <div className='flex gap-2'>
            <input className='border p-1 pl-3' value={quantity} onChange={(e)=>setQuantity(parseInt(e.target.value))} autoFocus type="number" id="tentacles" name="tentacles" min="1" max="100" />
            <Button variant="secondary">Buy Now</Button>
            <Button variant="outline" onClick={addCartItems}>Add to Cart</Button>
          </div>
          <div className='mt-10'>
            <p className='text-2xl font-semibold'>Reviews ⭐</p>
            <div className='flex flex-col gap-5 py-2'>
              <Review image={product?.image} setFocusImage={setCurrentProductImage}/>
              <Review image={product?.image} setFocusImage={setCurrentProductImage}/>

              <Review image={product?.image} setFocusImage={setCurrentProductImage}/>

              <Review image={product?.image} setFocusImage={setCurrentProductImage}/>

              <Review image={product?.image} setFocusImage={setCurrentProductImage}/>

              <Review image={product?.image} setFocusImage={setCurrentProductImage}/>


            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function FocusImage({image, setFocusImage}:any) {
  
  return(
    <Image 
      src={image}
      loader={({src})=>src}
      width={1}
      height={0}
      className='w-16 h-16 rounded-lg cursor-pointer hover:brightness-150'
      alt={"Header Image showcasing gadgets"}
      onClick={()=>setFocusImage(image)}
    />
  )
}

function Review({image, setFocusImage}:any) {
  
  return(
    <div className='flex items-center gap-3'>
      <Image 
        src={image}
        loader={({src})=>src}
        width={1}
        height={0}
        className='w-14 h-14 rounded-full cursor-pointer hover:brightness-150'
        alt={"Header Image showcasing gadgets"}
        onClick={()=>setFocusImage(image)}
      />
      <div>
        <p className='text-lg font-semibold'>Jo Do</p>
        <p>Really good! Fertile, really loved the packaging</p>
      </div>
    </div>
  )
}


export default ProductPage