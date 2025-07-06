import { cn } from "../../lib/utils";
import { HoverBorderGradient } from "../aceternity/Hover Border Gradient/hover-border-gradient.tsx";
import { HoverEffect } from "../aceternity/Card Hover Effect/card-hover-effect";
import { ColourfulText } from "../aceternity/Colorful Text/colourful-text";

const Hero2 = () => {
  return (
    <div className="mt-10">
      <div className="relative flex flex-col h-[50rem] w-full items-center justify-center bg-white dark:bg-black">
        <div
          className={cn(
            "absolute inset-0",
            "[background-size:20px_20px]",
            "[background-image:radial-gradient(#d4d4d4_1px,transparent_1px)]",
            "dark:[background-image:radial-gradient(#404040_1px,transparent_1px)]"
          )}
        />
        {/* Radial gradient for the container to give a faded look */}

        <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-black"></div>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center text-white relative z-2 font-sans ">
          Explore Books by
          <ColourfulText text=" Categories." />
        </h1>
        {/* cards  */}
        <div className="max-w-5xl mx-auto px-8">
          <HoverEffect items={projects} />
        </div>
        {/* Button */}
        <HoverBorderGradient
            containerClassName="rounded-full"
            as="button"
            className="dark:bg-black bg-white text-black dark:text-white flex items-center space-x-2"
          >
            <span>Explore All Categories</span>
          </HoverBorderGradient>
      </div>
    </div>
  );
};

export default Hero2;

const projects = [
  {
    title: "Fiction",
    description:
      "Dive into imaginative tales that transport you beyond reality and into unforgettable worlds.",
    link: "https://google.com",
  },
  {
    title: "Romance",
    description:
      "Feel the emotions of love, heartbreak, and connection through beautifully written romantic journeys.",
    link: "https://google.com",
  },
  {
    title: "Fantasy",
    description:
      "Step into realms of magic, mythical creatures, and epic adventures that stir the imagination.",
    link: "https://google.com",
  },
  {
    title: "Business & Finance",
    description:
      "Gain insights from top minds on building wealth, leadership, strategy, and entrepreneurial success.",
    link: "https://google.com",
  },
  {
    title: "Science & Technology",
    description:
      "Discover the latest innovations and timeless concepts that shape the modern and future world.",
    link: "https://google.com",
  },

  {
    title: "Academic & Study",
    description:
      "Support your educational goals with textbooks, reference guides, and study materials across subjects.",
    link: "https://google.com",
  },
];
