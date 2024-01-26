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

interface ProductItemProps {
  id: number;
  name: string;
  user_name: string;
  image: string;
  description: string;
  excerpt: string;
  price: number;
  deal_price: number | null;
  rating: number;
}

function ProductsSection({
  text = "Plants For You!",
  showFilters = true,
  category = "",
  deals = false,
}) {
  const [productItems, setProductsItems] = useState<ProductItemProps[] | null>(
    null
  );
  const [filters, setFilters] = useState({
    Indoor: false,
    Outdoor: false,
    Bonsai: false,
    Cactus: false,
    Herbs: false,
  });

  async function getProducts(queryString = `${deals ? "?deals=true" : ""}`) {
    setProductsItems(null);

    let products = await fetch(
      `/api/products${category ? `?categories=["${category.toLowerCase()}"]` : queryString}`
    );
    let objProducts = await products.json();
    setProductsItems(objProducts.products);
  }

  useEffect(() => {
    getProducts();
  }, []);

  const filterChanged = (e: SyntheticEvent, name: string, type: string) => {
    let oldFilters: any = { ...filters };
    oldFilters[name] = e;
    let queryString = `?${type}=`;
    let filtersArray: string[] = [];
    setFilters(oldFilters);
    Object.keys(oldFilters).forEach((filter: string) => {
      if (oldFilters[filter] === true) {
        filtersArray.push(`"${filter.toLowerCase()}"`);
      }
    });
    queryString = `${queryString}[${filtersArray}]${deals ? "&deals=true" : ""}`;

    if (filtersArray.length > 0) {
      getProducts(queryString);
    } else {
      getProducts();
    }
  };

  return (
    <div className="w-full  py-5">
      {showFilters && (
        <div className="flex items-center justify-between ">
          <div className="flex items-center gap-3">
            <Filter name="Categories">
              <CheckBoxOption
                handler={filterChanged}
                type="categories"
                name="Indoor"
                filters={filters}
              />
              <CheckBoxOption
                handler={filterChanged}
                type="categories"
                name="Outside"
                filters={filters}
              />
              <CheckBoxOption
                handler={filterChanged}
                type="categories"
                name="Bonsai"
                filters={filters}
              />
              <CheckBoxOption
                handler={filterChanged}
                type="categories"
                name="Cactus"
                filters={filters}
              />
              <CheckBoxOption
                handler={filterChanged}
                type="categories"
                name="Herbs"
                filters={filters}
              />
            </Filter>
          </div>
          <div>
            {/*
                          <Filter name="Sort By" type="outlined">
                              <RadioGroup value={order} onValueChange={(e)=>filterChanged(e)} defaultValue="option-one">
                                  <RadioOption name="Price" />
                                  <RadioOption name="Rating" />
                              </RadioGroup>
                          </Filter>
                      */}
          </div>
        </div>
      )}
      {text && <h3 className="text-2xl font-bold mt-10">{text}</h3>}
      <div className="grid grid-flow-row grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-5">
        {productItems === null && (
          <>
            <ProductCardSkeleton />
            <ProductCardSkeleton />
            <ProductCardSkeleton />
            <ProductCardSkeleton />
          </>
        )}
        {productItems?.map((product, i) => (
          <ProductCard
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

function Filter({
  name,
  type,
  children,
}: {
  name: string;
  type?: string;
  children: ReactNode;
}) {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger
            className={`rounded-full border ${type === "outlined" ? "border-green-800" : "bg-green-600 border-opacity-0 border-green-600"} bg-opacity-20 font-semibold h-auto`}
          >
            {name}
          </NavigationMenuTrigger>
          <NavigationMenuContent className="p-5 flex flex-col gap-y-2">
            {children}
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

function CheckBoxOption({
  name,
  type,
  handler,
  filters,
}: {
  name: string;
  type: string;
  handler: (e: any, name: string, type: string) => void;
  filters: any;
}) {
  return (
    <div className="flex items-center space-x-2 ">
      <Checkbox
        checked={filters[name]}
        onCheckedChange={(e) => handler(e, name, type)}
        id={`checkbox-${name}`}
      />
      <label
        htmlFor={`checkbox-${name}`}
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed whitespace-nowrap peer-disabled:opacity-70"
      >
        {name}
      </label>
    </div>
  );
}

function RadioOption({ name }: { name: string }) {
  return (
    <div className="flex items-center space-x-2">
      <RadioGroupItem value={`${name}`} id={`radio-${name}`} />
      <label
        htmlFor={`radio-${name}`}
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed whitespace-nowrap peer-disabled:opacity-70"
      >
        {name}
      </label>
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
  );
}
export default ProductsSection;
