import Image from "next/image";

import Navbar from "@/components/interface/Navbar";
import ProductsSection from "@/components/sections/ProductsSection";
import Footer from "@/components/interface/Footer";
import BonsaiImage from "@/assets/bonsai.jpg";

export default function Home() {
  return (
    <div>
      <main className="min-h-[50vh]">
        <header className={"w-screen relative overflow-hidden h-[50vh]"}>
          <Image
            src={BonsaiImage.src}
            width="0"
            height="0"
            sizes="100vw"
            className="w-screen h-screen"
            alt={"Header Image showcasing gadgets"}
          />
          <Navbar isFixed />
          <p className="text-6xl absolute z-10 top-20 left-20 font-extrabold px-10 py-5  text-black">
            Bonsai
          </p>
          <p className="text-3xl absolute z-10 top-44 left-20 px-10 py-5 text-black">
            Step into the world of tranquility with our exquisite range of
            Bonsai
          </p>
        </header>
      </main>
      <section className="px-10 sm:px-20 mb-20">
        <ProductsSection text="" showFilters={false} category="bonsai" />
      </section>
      <Footer />
    </div>
  );
}
