import Image from "next/image";

import Navbar from "@/components/interface/Navbar";
import ProductsSection from "@/components/sections/ProductsSection";
import Footer from "@/components/interface/Footer";
import HeaderImage from "@/assets/header.jpg";

export default function Home() {
  return (
    <div>
      <main className="min-h-[50vh]">
        <header className={"w-screen relative overflow-hidden h-[50vh]"}>
          <Image
            src={HeaderImage.src}
            width="0"
            height="0"
            sizes="100vw"
            className="w-screen h-screen"
            alt={"Header Image showcasing gadgets"}
          />
          <Navbar isFixed />
          <p className="text-5xl absolute z-10 top-20 left-20 font-extrabold px-10 py-5 bg-white text-black">
            Amazing Deals
          </p>
          <p className="text-5xl absolute z-10 top-44 left-20 font-extrabold px-10 py-5 bg-white text-black">
            Just where you need em
          </p>
        </header>
      </main>
      <section className="px-10 sm:px-20 pb-10">
        <ProductsSection
          showFilters={false}
          text="Deals just for you!"
          deals={true}
        />
      </section>
      <Footer />
    </div>
  );
}
