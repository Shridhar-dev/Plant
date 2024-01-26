"use client";

import Image from "next/image";
import Overview1 from "@/assets/overview1.jpeg";
import Overview2 from "@/assets/overview2.jpg";

function OverviewSection() {
  return (
    <section className="mt-20">
      <div className="w-full flex flex-wrap items-start justify-between gap-16 sm:gap-36">
        <p className="text-6xl font-bold flex-1">
          Bringing You the Elements of Style
        </p>
        <p className="text-xl flex-1 text-gray-500">
          Circle back minimize backwards overflow yet products need full
          resourcing and support from a cross-functional team in order to be
          built, maintained, and evolved
        </p>
      </div>
      <div className="w-full flex flex-wrap md:flex-nowrap items-center justify-between gap-10 mt-10">
        <div className="w-full md:w-1/2 overflow-hidden">
          <Image
            src={Overview1.src}
            width={Overview1.width}
            height={Overview1.height}
            className="w-full h-72 hover:brightness-110 hover:scale-105 duration-500"
            alt={"Header Image showcasing gadgets"}
          />
        </div>
        <div className="w-full md:w-1/2 overflow-hidden">
          <Image
            src={Overview2.src}
            width={Overview2.width}
            height={Overview2.height}
            className="w-full h-72 hover:brightness-110 hover:scale-105 duration-500"
            alt={"Header Image showcasing gadgets"}
          />
        </div>
      </div>
    </section>
  );
}

export default OverviewSection;
