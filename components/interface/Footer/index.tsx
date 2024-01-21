import { Input } from "@/components/ui/input";
import { FacebookIcon, InstagramIcon } from "lucide-react";
import Image from "next/image";
import React from "react";
import FooterPlant from "../../../assets/footerplant.png";

function Footer() {
  return (
    <div>
      <div className="w-full grid grid-cols-6 gap-20 bg-black px-28 py-20 text-white">
        <div className="col-span-6 md:col-span-2  rounded-full">
          <p className="text-3xl font-bold">Plant.co</p>
          <p>Plants. Thats all</p>
          <div className="flex items-center gap-2 mt-2">
            <InstagramIcon />
            <FacebookIcon />
          </div>
        </div>
        <div className="col-span-3 md:col-span-1">
          <p className="text-white text-xl font-semibold">Shop</p>
          <ul className="mt-5">
            <li>Indoor</li>
            <li>Outdoor</li>
            <li>Bonsai</li>
            <li>Cactus</li>
            <li>Herbs</li>
            <li>Tropical</li>
          </ul>
        </div>
        <div className="col-span-3 md:col-span-1">
          <p className="text-white text-xl font-semibold">Company</p>
          <ul className="mt-5">
            <li>Important Ordering Information</li>
            <li>Our Story</li>
            <li>Contact</li>
            <li>Shipping & Returns</li>
          </ul>
        </div>
        <div className="col-span-6 md:col-span-2">
          <p className="text-white text-xl font-semibold">
            Get the latest news & offers
          </p>
          <div className="mt-5 text-black">
            <Input
              placeholder="Email Address"
              className="rounded-none h-full px-3"
            />
            <button className="mt-2 bg-white w-full py-3 text-sm">
              Subscribe
            </button>
          </div>
        </div>
      </div>
      <div className="pb-10 bg-black text-white text-center">
        Plantco. All Rights Reserved. 2024
      </div>
    </div>
  );
}

export default Footer;
