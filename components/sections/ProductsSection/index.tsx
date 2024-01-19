"use client"
import ProductCard from "@/components/interface/ProductCard"
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
  } from "@/components/ui/navigation-menu"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useEffect, type ReactNode, useState } from "react"

interface ProductItemProps {
    id: number,
    name: string,
	image: string,
	description: string,
	excerpt: string,
	price: number,
	rating: number	
}


function ProductsSection() {

  const [productItems, setProductsItems] = useState<ProductItemProps[]>([])

  async function getProducts() {
    let products = await fetch("/api/products");
    let objProducts = await products.json();
    setProductsItems(objProducts.products)
    
  }


  useEffect(()=>{
    getProducts()
  },[])

  return (
    <div className='w-full  py-5 mt-20'>
        <div className="flex items-center justify-between ">
            <div className="flex items-center gap-3">
                <Filter name="Categories">
                    <CheckBoxOption name="Indoor"/>
                    <CheckBoxOption name="Outdoor"/>
                    <CheckBoxOption name="Bonsai"/>
                    <CheckBoxOption name="Cactus"/>
                    <CheckBoxOption name="Herbs"/>
                    <CheckBoxOption name="Tropical"/>
                </Filter>
                <Filter name="Price">
                    <CheckBoxOption name="₹0 - ₹100"/>
                    <CheckBoxOption name="₹100 - ₹500"/>
                    <CheckBoxOption name="₹500 - ₹1000"/>
                </Filter>
                             
            </div>
            <div>
                <Filter name="Sort By" type="outlined">
                    <RadioGroup defaultValue="option-one">
                        <RadioOption name="Price"/>
                        <RadioOption name="Rating"/>
                    </RadioGroup>
                </Filter>
            </div>
        </div>
        
        <h3 className='text-2xl font-bold mt-10'>Plants For You!</h3>
        <div className='grid grid-flow-row grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-5'>
            {
                productItems.map((product,i)=>(
                    <ProductCard key={product.id} id={product.id} name={product.name} image={product.image} excerpt={product.excerpt} rating={product.rating} price={product.price} />
                ))
            }
            {
                productItems.length === 0 && 
                <p>No products found</p>
            }
   
        </div>
    </div>
  )
}

function Filter({ name , type, children }:{name:string, type?:string, children: ReactNode}){
    return(
        <NavigationMenu>
            <NavigationMenuList>
                <NavigationMenuItem>
                    <NavigationMenuTrigger className={`rounded-full border ${type === "outlined" ? "border-green-800" : "bg-green-600 border-opacity-0 border-green-600"} bg-opacity-20 font-semibold h-auto`}>{name}</NavigationMenuTrigger>
                    <NavigationMenuContent className="p-5 flex flex-col gap-y-2">
                        {children}
                    </NavigationMenuContent>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    )
}

function CheckBoxOption({ name } : { name:string }){
    return(
        <div className="flex items-center space-x-2 ">
            <Checkbox id={`checkbox-${name}`} />
            <label htmlFor={`checkbox-${name}`} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed whitespace-nowrap peer-disabled:opacity-70">
                {name}
            </label>
        </div>
    )
}

function RadioOption({ name } : { name:string }){
    return(
        <div className="flex items-center space-x-2">
            <RadioGroupItem value={`radio-${name}`}  id={`radio-${name}`}  />
            <label htmlFor={`radio-${name}`} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed whitespace-nowrap peer-disabled:opacity-70">
                {name}
            </label>
        </div>
    )
}

export default ProductsSection