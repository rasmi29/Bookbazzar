"use client";
import { Link, useNavigate } from "react-router-dom";
import authState from "../../state/authState.ts";
import { useRecoilState } from "recoil";
import { useState } from "react";
import isLoadingState from "../../state/isLoading";
import userState from "../../state/userState.ts";

const apiUrl = import.meta.env.VITE_serverURL;

import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "../aceternity/Navbar/resizable-navbar.tsx";

export function NavbarDemo() {
  const navItems = [
    {
      name: "All Books",
      link: "/AllBooks",
    },

    {
      name: "popular",
      link: "#popular",
    },
    {
      name: "About",
      link: "/about",
    },
    {
      name: "Contact",
      link: "/contact",
    },
  ];

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const [auth, setAuth] = useRecoilState(authState);
  const [isLoading, setIsLoading] = useRecoilState(isLoadingState);
  const [userData, setUserData] = useRecoilState(userState);

  return (
    <div className="relative w-full  z-50">
      <Navbar>
        {/* Desktop Navigation */}
        <NavBody>
          <NavbarLogo />
          <NavItems items={navItems} />
          <div className="flex items-center gap-4">
            {auth.isLoggedIn ? (
              <>
                <NavbarButton
                  variant="primary"
                  onClick={() =>
                    handleGetProfile(setIsLoading, navigate, auth, setUserData)
                  }
                >
                  Profile
                </NavbarButton>
                <NavbarButton
                  variant="gradient"
                  onClick={() => handleLogout(setIsLoading, setAuth, navigate)}
                >
                  Logout
                </NavbarButton>
              </>
            ) : (
              <>
                <NavbarButton
                  variant="primary"
                  onClick={() => navigate("/login")}
                >
                  Login
                </NavbarButton>
                <NavbarButton
                  variant="gradient"
                  onClick={() => navigate("/signup")}
                >
                  Register
                </NavbarButton>
              </>
            )}
          </div>
        </NavBody>

        {/* Mobile Navigation */}
        <MobileNav>
          <MobileNavHeader>
            <NavbarLogo />
            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
          </MobileNavHeader>

          <MobileNavMenu
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
          >
            {navItems.map((item, idx) => (
              <Link
                key={`mobile-link-${idx}`}
                to={item.link}
                onClick={() => setIsMobileMenuOpen(false)}
                className="relative text-neutral-600 dark:text-neutral-300"
              >
                <span className="block">{item.name}</span>
              </Link>
            ))}
            <div className="flex flex-col gap-2 mt-4">
              {auth.isLoggedIn ? (
                <>
                  <NavbarButton
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      handleGetProfile(
                        setIsLoading,
                        navigate,
                        auth,
                        setUserData
                      );
                    }}
                    variant="primary"
                    className="w-full"
                  >
                    Profile
                  </NavbarButton>
                  <NavbarButton
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      handleLogout(setIsLoading, setAuth, navigate);
                    }}
                    variant="gradient"
                    className="w-full"
                  >
                    Logout
                  </NavbarButton>
                </>
              ) : (
                <>
                  <NavbarButton
                    onClick={() => {
                      navigate("/login");
                      setIsMobileMenuOpen(false);
                    }}
                    variant="primary"
                    className="w-full"
                  >
                    Login
                  </NavbarButton>
                  <NavbarButton
                    onClick={() => {
                      navigate("/signup");
                      setIsMobileMenuOpen(false);
                    }}
                    variant="gradient"
                    className="w-full"
                  >
                    Register
                  </NavbarButton>
                </>
              )}
            </div>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>

      {/* Navbar */}
    </div>
  );
}

async function handleLogout(setIsLoading: any, setAuth: any, navigate: any) {
  try {
    setIsLoading(true);
    const response = await fetch(`${apiUrl}/auth/logout`, {
      method: "POST",
      credentials: "include",
    });

    if (response.ok) {
      setAuth({
        isLoggedIn: false,
        email: "",
      });
      navigate("/thankyou");
    } else {
      alert("Logout failed. Try again.");
    }
  } catch (error) {
    console.error("Logout Error:", error);
    alert("Something went wrong.");
  } finally {
    setIsLoading(false);
  }
}

async function handleGetProfile(
  setIsLoading: any,
  navigate: any,
  auth: any,
  setUserData: any
) {
  try {
    setIsLoading(true);
    if (!auth.isLoggedIn) {
      alert("login first to see profile");
      return;
    }
    const response = await fetch(`${apiUrl}/auth/me`, {
      method: "GET",
      credentials: "include",
    });
    const data = await response.json();
    setUserData(data.user);
    navigate("/profile");
  } catch (error) {
  } finally {
    setIsLoading(false);
  }
}
