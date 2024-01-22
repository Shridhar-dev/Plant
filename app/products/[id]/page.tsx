"use client";
import Navbar from "@/components/interface/Navbar";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { SiteConfig } from "@/app/layout";
import { Input } from "@/components/ui/input";
import { getSession } from "next-auth/react";

interface ProductCardProps {
  id: number;
  name: string;
  image: string;
  excerpt: string;
  description: string;
  price: number;
  rating: number;
  reviews: any[];
  images: { image: string }[];
}

function ProductPage({ params }: { params: any }) {
  const [product, setProduct] = useState<ProductCardProps | undefined>();
  const [currentProductImage, setCurrentProductImage] = useState<string>("");
  const [quantity, setQuantity] = useState(1);
  const [review, setReview] = useState("");
  const { addCartItem }: any = useContext(SiteConfig);
  const { toast } = useToast();

  const getProduct = async () => {
    let product = await fetch(`/api/product?id=${params.id}`);
    let objProduct = await product.json();
    setProduct({
      ...objProduct.product,
      images: objProduct.images,
      reviews: objProduct.reviews,
    });
    setCurrentProductImage(objProduct.product.image);
  };

  const addCartItems = () => {
    if (!product) return;
    let item = {
      name: product.name,
      price: product.price,
      totalPrice: product.price * quantity,
      quantity: quantity,
      desc: product.description,
      excerpt: product.excerpt,
      image: product.image,
      rating: product.rating,
      id: product.id,
    };
    addCartItem(item);
  };

  const addReview = async () => {
    const user: any = await getSession();

    await fetch("/api/review", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        review,
        productId: product?.id,
        id: user ? user.id : 1,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        toast({
          title: "Review added successfully!",
        });
        getProduct();
      })
      .catch((error) => console.error("Error:", error));
  };

  useEffect(() => {
    getProduct();
  }, []);

  return (
    <div className="flex flex-col h-screen lg:overflow-hidden">
      <Navbar isFixed={false} />
      <div className="grid grid-cols-5 px-20">
        <div className="col-span-5 lg:col-span-2 pt-10">
          <div className="w-[30rem]">
            {product && (
              <Image
                src={currentProductImage}
                width={500}
                height={500}
                layout="responsive"
                className="w-full h-[30rem] rounded-lg"
                alt={"Header Image showcasing gadgets"}
              />
            )}
          </div>
          <div className="flex items-center gap-3 mt-4">
            {product?.images.map((imageObj: { image: string }, i: number) => (
              <FocusImage
                key={i}
                image={imageObj.image}
                setFocusImage={setCurrentProductImage}
              />
            ))}
          </div>
        </div>
        <div className="col-span-5 lg:col-span-3 flex h-[85vh] flex-col gap-3 pt-10 overflow-auto scrollbar-hide">
          <div className="sticky lg:static top-0 pt-5 lg:pt-0 bg-white z-10">
            <p className=" text-4xl font-semibold">{product?.name}</p>
            <p className="my-4">{product?.excerpt}</p>
            <p className="mb-5">{product?.description}</p>
            <hr />
          </div>
          <p className=" text-4xl font-semibold">
            ₹{(product?.price || 0) * quantity}{" "}
            <span className="text-lg opacity-50 inline font-normal">
              for {quantity} pieces
            </span>
          </p>
          <div className="flex gap-2">
            <input
              className="border p-1 pl-3"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value))}
              autoFocus
              type="number"
              id="tentacles"
              name="tentacles"
              min="1"
              max="100"
            />
            <Button variant="outline" onClick={addCartItems}>
              Add to Cart
            </Button>
          </div>
          <div className="mt-10">
            <p className="text-2xl font-semibold">Reviews ⭐</p>
            <div className="mb-5 mt-2 w-2/3 ml-1 flex items-center gap-2">
              <Input
                placeholder="Add your review!"
                onChange={(e) => setReview(e.target.value)}
              />
              <Button variant="secondary" onClick={addReview}>
                Submit
              </Button>
            </div>
            <div className="flex flex-col gap-5 py-2">
              {product?.reviews?.map((review, id) => (
                <Review
                  key={id}
                  review={review.review}
                  image={review.user_image}
                  name={review.user_name}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FocusImage({ image, setFocusImage }: any) {
  return (
    <Image
      src={image}
      width={200}
      height={200}
      className="w-16 h-16 rounded-lg cursor-pointer hover:brightness-150"
      alt={"Header Image showcasing gadgets"}
      onClick={() => setFocusImage(image)}
    />
  );
}

function Review({ image, review, name }: any) {
  return (
    <div className="flex items-center gap-3">
      <Image
        src={image}
        width={200}
        height={200}
        className="w-14 h-14 rounded-full"
        alt={"Header Image showcasing gadgets"}
      />
      <div>
        <p className="text-lg font-semibold">{name}</p>
        <p>{review}</p>
      </div>
    </div>
  );
}

export default ProductPage;
