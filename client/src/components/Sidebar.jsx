import { Protect, useClerk, useUser } from "@clerk/clerk-react";
import {
  Eraser,
  FileText,
  Hash,
  House,
  Image,
  Scissors,
  SquarePen,
  Users,
  LogOut,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import React from "react";

const navItems = [
  { to: "/ai", label: "Dashboard", Icon: House },
  { to: "/ai/write-article", label: "Write Article", Icon: SquarePen },
  { to: "/ai/blog-titles", label: "Blog Titles", Icon: Hash },
  { to: "/ai/generate-images", label: "Generate Images", Icon: Image },
  { to: "/ai/remove-background", label: "Remove Background", Icon: Eraser },
  { to: "/ai/remove-object", label: "Remove Object", Icon: Scissors },
  { to: "/ai/review-resume", label: "Review Resume", Icon: FileText },
  { to: "/ai/community", label: "Community", Icon: Users },
];

const Sidebar = ({ sidebar, setSidebar }) => {
  const { user } = useUser();
  const { signOut, openUserProfile } = useClerk();

  return (
    <div
      className={`w-60 border-r border-[#E41E1E]/30 flex flex-col justify-between items-center max-sm:absolute top-14 bottom-0 ${
        sidebar ? "translate-x-0" : "max-sm:-translate-x-full"
      } transition-all duration-300 ease-in-out`}
      style={{
        background:
          "linear-gradient(180deg, rgba(0, 0, 0, 0.95) 0%, rgba(0, 0, 0, 0.98) 100%)",
        boxShadow: "4px 0 20px rgba(228, 30, 30, 0.1)",
      }}
    >
      <style>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0px) rotate(0deg); }
                    50% { transform: translateY(-8px) rotate(5deg); }
                }
                @keyframes pulseGlow {
                    0%, 100% { filter: drop-shadow(0 0 10px rgba(228, 30, 30, 0.5)); }
                    50% { filter: drop-shadow(0 0 20px rgba(228, 30, 30, 0.8)); }
                }
                @keyframes slideIn {
                    from { opacity: 0; transform: translateX(-10px); }
                    to { opacity: 1; transform: translateX(0); }
                }
            `}</style>

      <div
        className="my-7 w-full px-4 pt-16
"
      >
        {/* User Avatar */}
        <div className="relative mx-auto w-16 h-16 mb-3">
          <img
            src={user.imageUrl}
            alt="User avatar"
            className="w-full h-full rounded-full border-2 border-[#E41E1E] object-cover"
            style={{
              boxShadow: "0 0 20px rgba(228, 30, 30, 0.4)",
            }}
          />
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background:
                "radial-gradient(circle at center, transparent 60%, rgba(228, 30, 30, 0.2) 100%)",
              animation: "pulseGlow 3s ease-in-out infinite",
            }}
          />
        </div>

        <h1
          className="text-center text-white font-semibold"
          style={{
            textShadow: "0 0 10px rgba(228, 30, 30, 0.3)",
          }}
        >
          {user.fullName}
        </h1>

        {/* Navigation Items */}
        <div className="mt-6 text-sm font-medium space-y-1">
          {navItems.map(({ to, label, Icon }, index) => (
            <NavLink
              key={to}
              to={to}
              end={to === "/ai"}
              onClick={() => setSidebar(false)}
              className={({ isActive }) =>
                `px-3.5 py-2.5 flex items-center gap-3 rounded-lg transition-all duration-300 group ${
                  isActive ? "text-white" : "text-gray-400 hover:text-white"
                }`
              }
              style={({ isActive }) => ({
                background: isActive
                  ? "linear-gradient(135deg, rgba(228, 30, 30, 0.3) 0%, rgba(139, 0, 0, 0.3) 100%)"
                  : "transparent",
                border: isActive
                  ? "1px solid rgba(228, 30, 30, 0.5)"
                  : "1px solid transparent",
                boxShadow: isActive
                  ? "0 0 20px rgba(228, 30, 30, 0.3)"
                  : "none",
                animation: isActive ? "none" : "slideIn 0.3s ease-out",
                animationDelay: `${index * 0.05}s`,
                animationFillMode: "both",
              })}
            >
              {({ isActive }) => (
                <>
                  <Icon
                    className={`w-4 h-4 transition-all duration-300 ${
                      isActive
                        ? "text-[#E41E1E]"
                        : "text-gray-400 group-hover:text-[#E41E1E]"
                    }`}
                    style={{
                      filter: isActive
                        ? "drop-shadow(0 0 4px rgba(228, 30, 30, 0.6))"
                        : "none",
                    }}
                  />
                  <span className="group-hover:translate-x-1 transition-transform duration-300">
                    {label}
                  </span>
                </>
              )}
            </NavLink>
          ))}
        </div>
      </div>

      {/* Bottom User Section */}
      <div
        className="w-full border-t border-[#E41E1E]/30 p-4 px-4 flex items-center justify-between"
        style={{
          background: "rgba(0, 0, 0, 0.5)",
          backdropFilter: "blur(10px)",
        }}
      >
        <div
          onClick={openUserProfile}
          className="flex gap-2 items-center cursor-pointer group transition-all duration-300 hover:scale-105"
        >
          <div className="relative">
            <img
              src={user.imageUrl}
              className="w-9 h-9 rounded-full border border-[#E41E1E]/50 object-cover"
              alt=""
            />
            <div
              className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                boxShadow: "0 0 15px rgba(228, 30, 30, 0.5)",
              }}
            />
          </div>
          <div>
            <h1 className="text-sm font-medium text-white">{user.fullName}</h1>
            <p
              className="text-xs"
              style={{
                color: "#E41E1E",
                textShadow: "0 0 5px rgba(228, 30, 30, 0.3)",
              }}
            >
              <Protect plan="premium" fallback="Free">
                Premium
              </Protect>{" "}
              Plan
            </p>
          </div>
        </div>
        <div
          onClick={signOut}
          className="p-2 rounded-lg cursor-pointer transition-all duration-300 hover:scale-110 group"
          style={{
            background: "rgba(228, 30, 30, 0.1)",
            border: "1px solid rgba(228, 30, 30, 0.3)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(228, 30, 30, 0.2)";
            e.currentTarget.style.boxShadow = "0 0 15px rgba(228, 30, 30, 0.4)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "rgba(228, 30, 30, 0.1)";
            e.currentTarget.style.boxShadow = "none";
          }}
        >
          <LogOut className="w-4 h-4 text-[#E41E1E] group-hover:rotate-12 transition-transform duration-300" />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
