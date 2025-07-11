import { useNavigate } from "react-router-dom";
import React from "react";
import { Label } from "../aceternity/SignUp/label.tsx";
import { Input } from "../aceternity/SignUp/input.tsx";
import { cn } from "../../lib/utils.ts";
import { ColourfulText } from "../aceternity/Colorful Text/colourful-text.tsx";
import { BackgroundLines } from "../aceternity/Background Lines/background-lines.tsx";
import { useRecoilState } from "recoil";
import authState from "../../state/authState.ts";
import isLoadingState from "../../state/isLoading.ts";
const apiUrl = import.meta.env.VITE_serverURL;

function SignupForm() {
  const navigate = useNavigate();
  const [auth, setAuth] = useRecoilState(authState);
  const [isLoading, setIsLoading] = useRecoilState(isLoadingState);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const formData = new FormData(e.currentTarget);
      const email = formData.get("email")?.toString().trim();
      const name = formData.get("name")?.toString().trim();
      const password = formData.get("password")?.toString().trim();

      //validation
      if (!email || !password || !name) {
        alert("all fields are required ");
        return;
      }
      setIsLoading(true);
      const response = await fetch(`${apiUrl}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email, password, name }),
      });

      const data = await response.json();
      if (data.success) {        
        navigate("/verify");
      } else {
        alert(data.message || "Login failed");
      }
    } catch (error) {
      console.error("Login Error:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="items-center  w-[80%] mx-auto flex flex-col lg:flex-row">
        <div className="w-[50%] z-[-1]">
          <BackgroundLines className="flex items-center justify-center w-full  px-4">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center text-white relative z-2 font-sans">
              Let the journey begin.
              <br /> <ColourfulText text="Sign up. Dive in." />
            </h1>
          </BackgroundLines>
        </div>
        <div className="w-[50%]">
          <div className="shadow-input mx-auto w-full max-w-md rounded-none bg-white p-4 md:rounded-2xl md:p-8 dark:bg-black/10 mt-10">
            <h2 className="text-xl font-bold text-neutral-800 dark:text-neutral-200 text-center">
              Welcome to Book Bazzar
            </h2>

            <form className="my-8" onSubmit={handleSubmit}>
              <LabelInputContainer className="mb-4">
                <Label htmlFor="name">Name</Label>
                <Input id="name" placeholder="Durden" type="text" name="name"/>
              </LabelInputContainer>
              <LabelInputContainer className="mb-4">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  placeholder="projectmayhem@fc.com"
                  type="email"
                  name="email"
                />
              </LabelInputContainer>
              <LabelInputContainer className="mb-4">
                <Label htmlFor="password">Password</Label>
                <Input id="password" placeholder="••••••••" type="password" name="password"/>
              </LabelInputContainer>

              <button
                className="group/btn relative block h-10 w-full rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset]"
                type="submit"
              >
                Sign up &rarr;
                <BottomGradient />
              </button>

              <div className="my-8 h-[1px] w-full bg-gradient-to-r from-transparent via-neutral-300 to-transparent dark:via-neutral-700" />

              <p className="mt-2 max-w-sm text-sm text-neutral-600 dark:text-neutral-300 text-center">
                Have an account, &nbsp;
                <span
                  className="font-bold underline cursor-pointer
"
                  onClick={() => navigate("/login")}
                >
                  click here
                </span>{" "}
                &nbsp; to Login.
              </p>
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

export default SignupForm;
