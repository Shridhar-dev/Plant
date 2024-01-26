"use client";
import ProductCard from "@/components/interface/ProductCard";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroupItem } from "@/components/ui/radio-group";
import { useEffect, type ReactNode, useState, SyntheticEvent } from "react";
import MyProductCard from "@/components/interface/MyProductCard";


interface ProductItemProps {
  id: number;
  name: string;
  user_name: string;
  image: string;
  description: string;
  excerpt: string;
  price: number;
  deal_price: number | undefined;
  rating: number;
}

function MyProductsSection({ id }: { id:string }) {
  const [productItems, setProductsItems] = useState<ProductItemProps[] | null>(null);
  async function getProducts() {
    setProductsItems(null); 
    let products = await fetch(`/api/my-products?id=${id}`);
    let objProducts = await products.json();
    setProductsItems(objProducts.products);
  }

  useEffect(() => {
    getProducts();
  }, []);



  return (
    <div className="w-full ">
      <div className="grid grid-flow-row grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {
          productItems === null &&
          <>
            <ProductCardSkeleton />
            <ProductCardSkeleton />
            <ProductCardSkeleton />
            <ProductCardSkeleton />
          </>
        }
        {productItems?.map((product, i) => (
          <MyProductCard
            key={product.id}
            id={product.id}
            name={product.name}
            username={product.user_name}
            image={product.image}
            excerpt={product.excerpt}
            rating={product.rating}
            price={product.price}
            deal_price={product.deal_price}
          />
        ))}
        {productItems?.length === 0 && <p>No products found</p>}
      </div>
    </div>
  );
}

function ProductCardSkeleton() {
  return (
    <div className=" rounded-lg overflow-hidden">
      <div>
        <div className="relative">
          <div className="w-full object-cover h-72 rounded-lg flex-1 bg-gray-200 animate-pulse"></div>
        </div>
        <div className="flex items-center justify-between font-semibold text-xl mt-2 bg-gray-200 animate-pulse h-3 rounded-lg"></div>
        <p className="bg-gray-200 animate-pulse h-3 w-1/2 rounded-lg mt-2 line-clamp-1"></p>
      </div>
      <div className="font-semibold bg-gray-200 animate-pulse text-sm h-5 w-1/3 rounded-full mt-2"></div>
    </div>
  )
}
export default MyProductsSection;
