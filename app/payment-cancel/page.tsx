import Image from "next/image";

import Navbar from "@/components/interface/Navbar";
import Footer from "@/components/interface/Footer";
import HeaderImage from "@/assets/header.jpg";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function PaymentCancel() {
  return (
    <div>
      <main className="min-h-[70vh]">
        <header
          className={
            "w-screen relative overflow-hidden flex justify-center items-center h-[70vh]"
          }
        >
          <Image
            src={HeaderImage.src}
            width="0"
            height="0"
            sizes="100vw"
            className="w-screen"
            alt={"Header Image showcasing gadgets"}
          />
          <Navbar isFixed />
          <p className="text-3xl sm:text-5xl absolute z-10 top-40  font-extrabold px-10 py-5 bg-white text-black">
            Payment <span className="text-red-600">Cancelled!</span>
          </p>
          <p className="absolute mt-20 w-1/2 text-center">
            Uh Oh! Payment failed due to some issue, try again or continue
            shopping with us! We strive to provide you with a seamless and
            enjoyable shopping experience
          </p>
          <Link href="/" className="absolute mt-48 w-1/2 text-center">
            <Button>Continue Shopping</Button>
          </Link>
        </header>
      </main>
      <Footer />
    </div>
  );
}
