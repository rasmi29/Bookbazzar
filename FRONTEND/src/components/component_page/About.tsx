import { CardSpotlight } from "../aceternity/Card Spotlight/card-spotlight.tsx";

const About = () => {
  return (
    <>

      <div className="flex flex-col md:flex-row md:flex-wrap justify-center items-center gap-8 w-[80%] mx-auto mt-24 ">
        <CardSpotlight className=" w-96 h-80  relative p-10 rounded-xl">
          <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 blur-xl opacity-35 z-[-1]"></div>
          <p className="text-xl font-bold relative z-20 mt-2 text-white">
            💡 Who We Are ?
          </p>
          <div className="text-neutral-200 mt-4 relative z-20">
            <ul className="list-none  mt-2">
              <Step title="At Book Bazaar, we believe that every book opens a door to a new world. We're an online marketplace dedicated to bringing readers closer to the stories, ideas, and knowledge they crave — all in one convenient, we’ve got something just for you." />
            </ul>
          </div>
        </CardSpotlight>

        <CardSpotlight className="p-10 w-96 relative rounded-xl h-80">
          <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 blur-xl opacity-35 z-[-1]"></div>
          <p className="text-xl font-bold relative z-20 mt-2 text-white">
            🤝 Why Choose Us?
          </p>
          <div className="text-neutral-200 mt-4 relative z-20">
            <ul className="list-none  mt-2 flex flex-col gap-5">
              <Step title="Trusted by thousands of book lovers" />
              <Step title="Carefully curated collections" />
              <Step title="Safe & secure transactions" />
              <Step title="Friendly customer support" />
            </ul>
          </div>
        </CardSpotlight>

        <CardSpotlight className="p-10 w-96 relative rounded-xl h-80">
          <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 blur-xl opacity-35 z-[-1]"></div>
          <p className="text-xl font-bold relative z-20 mt-2 text-white">
            🎯 Our Mission
          </p>
          <div className="text-neutral-200 mt-4 relative z-20">
            <ul className="list-none  mt-2">
              <Step title="Our mission is simple:To make books accessible, affordable, and enjoyable for everyone." />
              <Step title="We aim to create a space where readers can discover, explore, and buy books with ease — from timeless classics to the latest bestsellers, all at your fingertips." />
            </ul>
          </div>
        </CardSpotlight>

        <CardSpotlight className="p-10 w-96 relative rounded-xl h-96">
          <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 blur-xl opacity-35 z-[-1]"></div>
          <p className="text-xl font-bold relative z-20 mt-2 text-white">
            📚 What We Offer
          </p>
          <div className="text-neutral-200 mt-4 relative z-20">
            <ul className="list-none  mt-2 flex flex-col gap-5">
              <Step title="Affordable pricing with frequent offers and discounts" />
              <Step title="Fast, secure delivery to your doorstep." />
              <Step title="User-friendly experience with smart search and category filters." />
              <Step title="A commitment to quality and customer satisfaction." />
            </ul>
          </div>
        </CardSpotlight>

        <CardSpotlight className="p-10 w-96 relative rounded-xl h-96">
          <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 blur-xl opacity-35 z-[-1]"></div>
          <p className="text-xl font-bold relative z-20 mt-2 text-white">
            🌍 Join Our Journey
          </p>
          <div className="text-neutral-200 mt-4 relative z-20">
            <ul className="list-none  mt-2">
              <Step title="At Book Bazaar, we’re not just selling books — we’re building a community of readers and learners. Whether you're a lifelong bookworm or just starting your reading journey, we welcome you to be part of our growing family." />
              <Step title="📧 Got questions? Reach out to us anytime at [support@bookbazaar.com]." />
            </ul>
          </div>
        </CardSpotlight>
      </div>
    </>
  );
};

const Step = ({ title }: { title: string }) => {
  return (
    <li className="flex gap-2 items-start">
      <CheckIcon />
      <p className="text-white">{title}</p>
    </li>
  );
};

const CheckIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-4 w-4 text-blue-500 mt-1 shrink-0"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path
        d="M12 2c-.218 0 -.432 .002 -.642 .005l-.616 .017l-.299 .013l-.579 .034l-.553 .046c-4.785 .464 -6.732 2.411 -7.196 7.196l-.046 .553l-.034 .579c-.005 .098 -.01 .198 -.013 .299l-.017 .616l-.004 .318l-.001 .324c0 .218 .002 .432 .005 .642l.017 .616l.013 .299l.034 .579l.046 .553c.464 4.785 2.411 6.732 7.196 7.196l.553 .046l.579 .034c.098 .005 .198 .01 .299 .013l.616 .017l.642 .005l.642 -.005l.616 -.017l.299 -.013l.579 -.034l.553 -.046c4.785 -.464 6.732 -2.411 7.196 -7.196l.046 -.553l.034 -.579c.005 -.098 .01 -.198 .013 -.299l.017 -.616l.005 -.642l-.005 -.642l-.017 -.616l-.013 -.299l-.034 -.579l-.046 -.553c-.464 -4.785 -2.411 -6.732 -7.196 -7.196l-.553 -.046l-.579 -.034a28.058 28.058 0 0 0 -.299 -.013l-.616 -.017l-.318 -.004l-.324 -.001zm2.293 7.293a1 1 0 0 1 1.497 1.32l-.083 .094l-4 4a1 1 0 0 1 -1.32 .083l-.094 -.083l-2 -2a1 1 0 0 1 1.32 -1.497l.094 .083l1.293 1.292l3.293 -3.292z"
        fill="currentColor"
        strokeWidth="0"
      />
    </svg>
  );
};

export default About;
