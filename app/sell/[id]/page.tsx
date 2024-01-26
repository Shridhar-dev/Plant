"use client";
import Image from "next/image";

import Navbar from "@/components/interface/Navbar";
import Footer from "@/components/interface/Footer";
import HeaderImage from "@/assets/header.jpg";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import MultiImageInput from "@/components/interface/MultiImageInput";
import { ChangeEvent, useEffect, useState } from "react";
import { getSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";

import { uploadImages } from "@/lib/uploadImages";

export default function Sell({ params }: { params: any }) {
  const [formData, setFormData] = useState<any>({});
  const { toast } = useToast();
  const router = useRouter();

  const updateFormData = async (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | string,
    type: string
  ) => {
    let data = typeof e === "string" || Array.isArray(e) ? e : e?.target?.value;
    setFormData((prev: any) => ({
      ...prev,
      [type]: data,
    }));
  };

  const getUser = async () => {
    const session: any = await getSession();

    if (!session) {
      router.push("/");
    } else {
      getProduct(session.id);
    }
  };

  const getProduct = async (userId: string) => {
    let product = await fetch(`/api/product?id=${params.id}`);
    let objProduct = await product.json();
    if (objProduct.product.userId != userId) {
      router.push("/");
    } else {
      setFormData({
        ...objProduct.product,
        images: objProduct.images.map((img: any) => img.image),
        reviews: objProduct.reviews,
      });
    }
  };

  const updateItem = async () => {
    const user: any = await getSession();
    const links = await uploadImages(formData.images);

    await fetch(`/api/update-product?id=${params.id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...formData, images: links, id: user.id }),
    })
      .then((response) => response.json())
      .then((data) => {
        toast({
          title: "Product updated successfully!",
        });
        setTimeout(() => {
          router.push("/");
        }, 1000);
      })
      .catch((error) => console.error("Error:", error));
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div>
      <main className="min-h-[30vh]">
        <header className={"w-screen relative overflow-hidden h-[30vh]"}>
          <Image
            src={HeaderImage.src}
            width="0"
            height="0"
            sizes="100vw"
            className="w-screen h-screen"
            alt={"Header Image showcasing gadgets"}
          />
          <Navbar isFixed />
        </header>
      </main>
      <section className="px-20 py-10">
        <p className="text-4xl font-bold">Update your Product 🌱</p>
        <div className="grid grid-cols-2 gap-5 mt-5">
          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="font-semibold">
              Name
            </label>
            <Input
              id="name"
              type="text"
              placeholder="Name"
              value={formData.name}
              onChange={(e) => updateFormData(e, "name")}
            />
            <label htmlFor="description" className="font-semibold mt-2">
              Description
            </label>
            <Textarea
              id="description"
              placeholder="Add your description"
              value={formData.description}
              onChange={(e) => updateFormData(e, "description")}
            />
            <label htmlFor="excerpt" className="font-semibold mt-2">
              Excerpt
            </label>
            <Textarea
              id="excerpt"
              placeholder="Add your excerpt"
              value={formData.excerpt}
              onChange={(e) => updateFormData(e, "excerpt")}
            />
            <div className="flex justify-between items-center gap-5 mt-2">
              <div className="flex-1">
                <label htmlFor="price" className="font-semibold">
                  Actual Price
                </label>
                <Input
                  id="price"
                  type="text"
                  placeholder="price"
                  value={formData.price}
                  onChange={(e) => updateFormData(e, "price")}
                />
              </div>
              <div className="flex-1">
                <label htmlFor="category" className="font-semibold">
                  Category
                </label>
                <Select
                  value={formData.category}
                  onValueChange={(e: string) => updateFormData(e, "category")}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="indoor">Indoor</SelectItem>
                    <SelectItem value="outside">Outside</SelectItem>
                    <SelectItem value="bonsai">Bonsai</SelectItem>
                    <SelectItem value="cactus">Cactus</SelectItem>
                    <SelectItem value="herbs">Herbs</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="mt-5">
              <Button className="w-1/3" onClick={updateItem}>
                Submit
              </Button>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
