"use client";
import { Spotlight } from "./spotlight-new.tsx";
import { TextRevealCardPreview } from "../Text Reveal/text-reveal-card-component.tsx";
import Hero2 from "../../component_page/Hero2.tsx";
import Hero3 from "../../component_page/Hero3.tsx";

export function SpotlightNewDemo() {
  return (
    <>
      <div className="h-[40rem] w-full rounded-md flex flex-col md:items-center md:justify-center bg-black/[0.96] antialiased bg-grid-white/[0.02] relative overflow-hidden">
        <TextRevealCardPreview />
        <Spotlight />
        <div className=" p-4 max-w-6xl  mx-auto relative z-10  w-full pt-20 md:pt-0">
          <h1 className="text-4xl md:text-7xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50">
            Explore, Shop, and Enjoy Books Like Never Before.
          </h1>
          <p className="mt-4 font-normal text-base text-neutral-300 max-w-lg text-center mx-auto">
            Explore a world of stories, knowledge, and imagination in one place.
            From classics to contemporary bestsellers — your next read is just a
            click away.
          </p>
        </div>
      </div>
      <Hero2 />
      <Hero3 />
    </>
  );
}
