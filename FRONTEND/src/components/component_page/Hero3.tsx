import { cn } from "../../lib/utils";
import { motion } from "motion/react";
import { ContainerTextFlip } from "../aceternity/Container Text Flip/container-text-flip";
import { GlareCard } from "../aceternity/Glare card/glare-card";

const Hero3 = () => {
  const words = ["exciting", "magical", "inspiring"];

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

        <div className="relative z-10 flex flex-col items-center justify-center w-full h-full px-4">
          {/* heading  */}
          <div>
            <motion.h1
              initial={{
                opacity: 0,
              }}
              whileInView={{
                opacity: 1,
              }}
              className={cn(
                "relative mb-6 max-w-3xl text-left text-4xl leading-normal font-bold tracking-tight text-zinc-700 md:text-7xl dark:text-zinc-100 "
              )}
              layout
            >
              <div className="inline-block ">
                Make your reading journey 10×{" "}
                <ContainerTextFlip words={words} />
              </div>
            </motion.h1>
          </div>
          {/* cards  */}
          <div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-16 lg:mt-10">
              <GlareCard className="flex flex-col items-center justify-center">
                <svg
                  width="66"
                  height="65"
                  viewBox="0 0 66 65"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-14 w-14 text-white"
                >
                  <path
                    d="M8 8.05571C8 8.05571 54.9009 18.1782 57.8687 30.062C60.8365 41.9458 9.05432 57.4696 9.05432 57.4696"
                    stroke="currentColor"
                    strokeWidth="15"
                    strokeMiterlimit="3.86874"
                    strokeLinecap="round"
                  />
                </svg>
              </GlareCard>
              <GlareCard className="flex flex-col items-center justify-center">
                <img
                  className="h-full w-full absolute inset-0 object-cover"
                  src="https://images.unsplash.com/photo-1512618831669-521d4b375f5d?q=80&w=3388&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                />
              </GlareCard>
              <GlareCard className="flex flex-col items-start justify-end py-8 px-6">
                <p className="font-bold text-white text-lg">
                  The greatest trick
                </p>
                <p className="font-normal text-base text-neutral-200 mt-4">
                  The greatest trick the devil ever pulled was to convince the
                  world that he didn&apos;t exist.
                </p>
              </GlareCard>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero3;
