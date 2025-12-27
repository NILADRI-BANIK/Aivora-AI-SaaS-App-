import React from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useClerk, UserButton, useUser } from "@clerk/clerk-react";

const Navbar = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const { openSignIn } = useClerk();

  return (
    <div
      className="fixed top-0 z-50 w-full flex justify-between items-center
      py-2 px-4 sm:px-20 xl:px-32 border-b border-[#E41E1E]/20"
      style={{
        background: "rgba(0, 0, 0, 0.35)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        boxShadow: "0 8px 30px rgba(228,30,30,0.08)",
      }}
    >
      {/* Logo - Wrapped in flex container with reduced height */}
      <div className="flex items-center h-30 -ml-10 -mt-5">
        <img
          src={assets.logo}
          alt="logo"
          className="
      h-full w-auto cursor-pointer
      transition-transform duration-300
      hover:scale-105
    "
          style={{
            filter: "drop-shadow(0 0 12px rgba(228,30,30,0.45))",
            objectFit: "contain",
          }}
          onClick={() => navigate("/")}
        />
      </div>

      {/* Right Section */}
      {user ? (
        <div className="scale-110">
          <UserButton />
        </div>
      ) : (
        <button
          onClick={openSignIn}
          className="group relative overflow-hidden rounded-full"
          style={{
            padding: "2px",
            background: "linear-gradient(135deg, #E41E1E, #8B0000)",
            boxShadow:
              "0 0 14px rgba(228,30,30,0.35), inset 0 0 6px rgba(255,255,255,0.05)",
            transition: "all 0.35s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow =
              "0 0 24px rgba(228,30,30,0.6), 0 0 42px rgba(228,30,30,0.35)";
            e.currentTarget.style.transform = "scale(1.05)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow =
              "0 0 14px rgba(228,30,30,0.35), inset 0 0 6px rgba(255,255,255,0.05)";
            e.currentTarget.style.transform = "scale(1)";
          }}
        >
          {/* Button Body */}
          <div
            className="relative z-10 flex items-center gap-2 px-5 py-2 rounded-full"
            style={{
              background:
                "linear-gradient(180deg, rgba(10,0,0,0.9), rgba(20,0,0,0.9))",
            }}
          >
            <span className="font-semibold text-white tracking-wide">
              Get started
            </span>
            <ArrowRight className="w-4 h-4 text-white transition-transform duration-300 group-hover:translate-x-1" />
          </div>

          {/* Glow Effect */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
            style={{
              background:
                "radial-gradient(circle, rgba(228,30,30,0.25) 0%, transparent 70%)",
              filter: "blur(18px)",
            }}
          />
        </button>
      )}
    </div>
  );
};

export default Navbar;