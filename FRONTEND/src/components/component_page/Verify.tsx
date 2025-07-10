import { cn } from "../../lib/utils";
import { useNavigate } from "react-router-dom";
import { HoverBorderGradient } from "../aceternity/Hover Border Gradient/hover-border-gradient";

const Verify = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="relative flex flex-col h-[50rem] w-full px-20 items-center justify-center bg-white dark:bg-black">
        <div
          className={cn(
            "absolute inset-0",
            "[background-size:40px_40px]",
            "[background-image:linear-gradient(to_right,#e4e4e7_1px,transparent_1px),linear-gradient(to_bottom,#e4e4e7_1px,transparent_1px)]",
            "dark:[background-image:linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)]"
          )}
        />
        {/* Radial gradient for the container to give a faded look */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-black"></div>
        <p className="relative z-20 bg-gradient-to-b from-neutral-200 to-neutral-500 bg-clip-text py-8 text-4xl font-bold text-transparent sm:text-7xl">
          Please verify your email to continue
        </p>
        <p className="z-20">
          Click on the "Verify Email" button in the mail to activate your
          account. <br />
          🔒 You won’t be able to log in until your email is verified. <br />
        </p>
        <div className=" m-10 flex justify-center text-center">
          <HoverBorderGradient
            containerClassName="rounded-full"
            as="button"
            className="dark:bg-black bg-white text-black dark:text-white flex items-center space-x-2"
            onClick={()=> navigate("/")}
          >
            <span>Go To Home</span>
          </HoverBorderGradient>
        </div>
      </div>
    </div>
  );
};

export default Verify;
