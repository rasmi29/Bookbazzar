import React from "react";
import { Vortex } from "../aceternity/Vortex Background/vortex";
import { PlaceholdersAndVanishInput } from "../aceternity/Vanish Input/vanish-input";

const Footer = () => {
  const placeholders = [
    "What's the first rule of Fight Club?",
    "Who is Tyler Durden?",
    "Where is Andrew Laeddis Hiding?",
    "Write a Javascript method to reverse a string",
    "How to assemble your own PC?",
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  };
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("submitted");
  };
  return (
    <>
      <div className="w-[calc(100%-4rem)] mx-auto rounded-md  h-[30rem] overflow-hidden">
        <Vortex
          backgroundColor="black"
          className="flex items-center flex-col justify-center px-2 md:px-10 py-4 w-full h-full"
        >
          <h2 className="text-white text-2xl md:text-6xl font-bold text-center">
            Subscribe to Book Bazaar
          </h2>
          <p className="text-white text-sm md:text-2xl max-w-xl mt-6 text-center">
            Stay ahead in your reading journey. Get early access to new
            arrivals, exclusive discounts, and curated book picks — straight to
            your inbox.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-4 mt-6">
            <PlaceholdersAndVanishInput
              placeholders={placeholders}
              onChange={handleChange}
              onSubmit={onSubmit}
            />
          </div>
        </Vortex>
      </div>
      
    </>
  );
};

export default Footer;
