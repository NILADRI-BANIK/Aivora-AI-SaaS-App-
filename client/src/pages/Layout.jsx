import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { X, Menu } from "lucide-react";
import Sidebar from "../components/Sidebar";
import { SignIn, useUser } from "@clerk/clerk-react";

const Layout = () => {
  const navigate = useNavigate();
  const [sidebar, setSidebar] = useState(false);
  const { user } = useUser();

  return user ? (
    <div className="flex flex-col h-screen bg-black">
      
      {/* BLUR NAVBAR */}
      <nav
        className="fixed top-0 left-0 z-50 w-full px-8 min-h-14 flex items-center justify-between
        border-b border-[#E41E1E]/20"
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.85) 100%)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          boxShadow: "0 4px 30px rgba(228,30,30,0.08)",
        }}
      >
        {/* Logo */}
        <img
          className="cursor-pointer w-32 sm:w-44 transition-transform duration-300 hover:scale-105"
          src={assets.logo}
          alt="logo"
          style={{
            filter: "drop-shadow(0 0 10px rgba(228,30,30,0.35))",
          }}
          onClick={() => navigate("/")}
        />

        {/* Mobile Toggle */}
        {sidebar ? (
          <X
            onClick={() => setSidebar(false)}
            className="w-6 h-6 text-white sm:hidden cursor-pointer"
          />
        ) : (
          <Menu
            onClick={() => setSidebar(true)}
            className="w-6 h-6 text-white sm:hidden cursor-pointer"
          />
        )}
      </nav>

      {/* CONTENT */}
      <div className="flex-1 w-full flex pt-14 h-[calc(100vh-56px)]">
        <Sidebar sidebar={sidebar} setSidebar={setSidebar} />

        <div className="flex-1 bg-black">
          <Outlet />
        </div>
      </div>
    </div>
  ) : (
    <div className="flex items-center justify-center h-screen bg-black">
      <SignIn />
    </div>
  );
};

export default Layout;
