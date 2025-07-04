import { useNavigate } from "react-router-dom";
import { ColourfulText } from "../Colorful Text/colourful-text.tsx";

import React from "react";
import { Label } from "./label.tsx";
import { Input } from "./input.tsx";
import { cn } from "../../../lib/utils";
import { BackgroundLines } from "../Background Lines/background-lines.tsx";

export function LoginFormDemo() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted");
  };
  const navigate = useNavigate();
  return (
    <>
      <div className="items-center  w-[80%] mx-auto flex flex-col lg:flex-row">
        <div className="w-[50%]">
          <BackgroundLines className="flex items-center justify-center w-full  px-4">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center text-white relative z-2 font-sans">
              Books. Imagination. You.
              <br /> <ColourfulText text="Let’s reconnect." />
            </h1>
          </BackgroundLines>
        </div>
        <div className="w-[50%]">
          <div className="shadow-input mx-auto w-full max-w-md rounded-none bg-white p-4 md:rounded-2xl md:p-8 dark:bg-black mt-10">
            <h2 className="text-xl font-bold text-neutral-800 dark:text-neutral-200 text-center">
              Welcome to Book Bazzar
            </h2>
            <div className="my-8 h-[1px] w-full bg-gradient-to-r from-transparent via-neutral-300 to-transparent dark:via-neutral-700" />

            <form className="my-8" onSubmit={handleSubmit}>
              <LabelInputContainer className="mb-4">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  placeholder="projectmayhem@fc.com"
                  type="email"
                />
              </LabelInputContainer>
              <LabelInputContainer className="mb-4">
                <Label htmlFor="password">Password</Label>
                <Input id="password" placeholder="••••••••" type="password" />
              </LabelInputContainer>

              <button
                className=" mt-8 group/btn relative block h-10 w-full rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset]"
                type="submit"
              >
                Login &rarr;
                <BottomGradient />
              </button>

              <p className="mt-8 max-w-sm text-sm text-neutral-600 dark:text-neutral-300 text-center">
                Don't have an account, &nbsp;
                <span
                  className="font-bold underline cursor-pointer"
                  onClick={() => navigate("/signup")}
                >
                  click here
                </span>{" "}
                &nbsp; to Signup
              </p>

              <div className="mt-10 h-[1px] w-full bg-gradient-to-r from-transparent via-neutral-300 to-transparent dark:via-neutral-700" />
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
      <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-blue-400 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex w-full flex-col space-y-2", className)}>
      {children}
    </div>
  );
};
