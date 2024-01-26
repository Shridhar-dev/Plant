import Image from "next/image";

import Navbar from "@/components/interface/Navbar";
import Footer from "@/components/interface/Footer";
import HeaderImage from "@/assets/header.jpg";
import MyProductsSection from "@/components/sections/MyProductsSection";
import { auth } from "@/lib/auth";

export default async function Home() {
  const session = await auth();

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
          <p className="text-5xl absolute z-10 top-20 left-20 font-extrabold px-10 py-5 bg-white text-black">
            My Products
          </p>
        </header>
      </main>
      <section className="px-10 sm:px-20 py-10">
        <MyProductsSection id={session.id}/>
      </section>
      <Footer />
    </div>
  );
}
