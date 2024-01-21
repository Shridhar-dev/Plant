import Image from "next/image";

//images
import Navbar from "@/components/interface/Navbar";
import OverviewSection from "@/components/sections/OverviewSection";
import ProductsSection from "@/components/sections/ProductsSection";
import Footer from "@/components/interface/Footer";
import HeaderImage from "@/assets/header.jpg";

export default function Home() {
  return (
    <div>
      <main className="min-h-screen relative">
        <header className={"w-screen relative overflow-hidden h-[75vh]"}>
          <Image
            src={HeaderImage.src}
            width="0"
            height="0"
            sizes="100vw"
            className="w-screen h-screen sm:h-auto"
            alt={"Header Image showcasing gadgets"}
          />
          <Navbar isFixed />
        </header>
        <section className="flex flex-wrap items-center text-black -mt-[100%] md:mt-0 sm:absolute  sm:bottom-20 lg:bottom-10 leading-none w-screen px-10 sm:px-20 relative z-30">
          <div className="w-full lg:w-[50%]">
            <p className="text-6xl sm:text-8xl lg:text-[9rem] font-extrabold whitespace-nowrap">
              Choose the <br /> best.
            </p>
          </div>
          <div className=" hidden md:block absolute rounded-full border-2 hover:translate-x-16 duration-300 -skew-y-12 border-green-950 h-80 w-80"></div>
          <div className="lg:w-[20%] mt-28 text-gray-500 text-lg">
            Our wide range of plants are the best way to bring you closer to
            nature
          </div>
          <div className="w-full lg:w-[30%]">
            <button className="bg-white p-10 w-full">Shop Now {"->"}</button>
            <button className="bg-black text-white p-10 w-full">
              See Promo {"->"}
            </button>
          </div>
        </section>
      </main>
      <section className="px-10 sm:px-20">
        <OverviewSection />
        <ProductsSection />
      </section>
      <Footer />
    </div>
  );
}
