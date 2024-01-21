"use client";

import Image from "next/image";

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
            src={
              "https://images.pexels.com/photos/923548/pexels-photo-923548.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            }
            loader={({ src }) => src}
            width={10}
            height={0}
            className="w-full h-72 hover:brightness-110 hover:scale-105 duration-500"
            alt={"Header Image showcasing gadgets"}
          />
        </div>
        <div className="w-full md:w-1/2 overflow-hidden">
          <Image
            src={
              "https://images.pexels.com/photos/213727/pexels-photo-213727.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            }
            loader={({ src }) => src}
            width={10}
            height={0}
            className="w-full h-72 hover:brightness-110 hover:scale-105 duration-500"
            alt={"Header Image showcasing gadgets"}
          />
        </div>
      </div>
    </section>
  );
}

export default OverviewSection;
