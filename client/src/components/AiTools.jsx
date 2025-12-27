import React from "react";
import { AiToolsData } from "../assets/assets";
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import handImage from "../assets/hand.webp";

// Custom SVG Icon Components with Red/Black Theme - Each Unique and Descriptive
const CustomIcons = {
  // AI Article Writer - Pen writing on document with AI spark
  ArticleWriter: () => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
    >
      <rect
        x="4"
        y="2"
        width="16"
        height="20"
        rx="2"
        fill="#E41E1E"
        stroke="#000"
        strokeWidth="0.5"
      />
      <path
        d="M8 6H16M8 10H16M8 14H13"
        stroke="#000"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M14 16L16 14L22 20L20 22L14 16Z"
        fill="#000"
        stroke="#E41E1E"
        strokeWidth="0.5"
      />
      <circle
        cx="18"
        cy="4"
        r="2"
        fill="#E41E1E"
        stroke="#000"
        strokeWidth="0.5"
      />
      <path
        d="M17 3L19 5"
        stroke="#000"
        strokeWidth="1"
        strokeLinecap="round"
      />
    </svg>
  ),

  // Blog Title Generator - Lightbulb with text lines
  TitleGenerator: () => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
    >
      <path
        d="M12 2C8.5 2 6 4.5 6 8C6 10.5 7 12 8 13.5V16C8 17 9 18 10 18H14C15 18 16 17 16 16V13.5C17 12 18 10.5 18 8C18 4.5 15.5 2 12 2Z"
        fill="#E41E1E"
        stroke="#000"
        strokeWidth="0.5"
      />
      <path
        d="M10 18V20C10 21 11 22 12 22C13 22 14 21 14 20V18"
        stroke="#000"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M9 8H15M9 11H15"
        stroke="#000"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <circle cx="12" cy="6" r="1.5" fill="#000" />
      <path
        d="M4 8H2M22 8H20M6 4L4.5 2.5M18 4L19.5 2.5"
        stroke="#E41E1E"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  ),

  // AI Image Generation - Palette with AI sparkles
  ImageGeneration: () => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
    >
      <path
        d="M12 2L15 8L22 9L17 14L18 21L12 18L6 21L7 14L2 9L9 8L12 2Z"
        fill="#E41E1E"
        stroke="#000"
        strokeWidth="0.5"
      />
      <rect
        x="6"
        y="10"
        width="12"
        height="10"
        rx="1"
        fill="#000"
        stroke="#E41E1E"
        strokeWidth="0.5"
      />
      <circle cx="10" cy="14" r="1.5" fill="#E41E1E" />
      <path
        d="M6 18L10 15L13 17L18 13"
        stroke="#E41E1E"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="8" cy="6" r="1" fill="#E41E1E" />
      <circle cx="16" cy="6" r="1" fill="#E41E1E" />
      <circle cx="12" cy="4" r="1" fill="#E41E1E" />
    </svg>
  ),

  // Background Removal - Image with eraser removing background
  BackgroundRemoval: () => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
    >
      <rect
        x="3"
        y="5"
        width="18"
        height="14"
        rx="2"
        fill="#000"
        stroke="#E41E1E"
        strokeWidth="0.5"
      />
      <circle
        cx="9"
        cy="11"
        r="3"
        fill="#E41E1E"
        stroke="#000"
        strokeWidth="0.5"
      />
      <path
        d="M14 8L18 12M14 12L18 8"
        stroke="#E41E1E"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M16 16L20 20L22 18L18 14"
        fill="#E41E1E"
        stroke="#000"
        strokeWidth="0.5"
      />
      <rect
        x="18"
        y="15"
        width="2"
        height="6"
        rx="1"
        fill="#E41E1E"
        stroke="#000"
        strokeWidth="0.5"
        transform="rotate(45 18 15)"
      />
      <path
        d="M5 7L7 9M5 9L7 7"
        stroke="#E41E1E"
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.5"
      />
    </svg>
  ),

  // Object Removal - Magic wand removing object
  ObjectRemoval: () => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
    >
      <rect
        x="2"
        y="4"
        width="20"
        height="16"
        rx="2"
        fill="#000"
        stroke="#E41E1E"
        strokeWidth="0.5"
      />
      <rect
        x="7"
        y="9"
        width="4"
        height="6"
        rx="1"
        fill="#E41E1E"
        stroke="#000"
        strokeWidth="0.5"
        opacity="0.3"
      />
      <path
        d="M8 10L10 12L8 14"
        stroke="#000"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.5"
      />
      <path
        d="M14 8L18 12L22 8"
        fill="#E41E1E"
        stroke="#000"
        strokeWidth="0.5"
      />
      <path
        d="M18 12V20"
        stroke="#E41E1E"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="16" cy="7" r="1" fill="#E41E1E" />
      <circle cx="20" cy="7" r="1" fill="#E41E1E" />
      <circle cx="18" cy="5" r="1" fill="#E41E1E" />
      <path
        d="M6 16L8 18L10 16"
        stroke="#E41E1E"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),

  // Resume Reviewer - Document with checkmarks and stars
  ResumeReviewer: () => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
    >
      <rect
        x="5"
        y="2"
        width="14"
        height="20"
        rx="2"
        fill="#E41E1E"
        stroke="#000"
        strokeWidth="0.5"
      />
      <circle cx="12" cy="7" r="2" fill="#000" />
      <path
        d="M9 11H15M9 14H15"
        stroke="#000"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M8 17L10 19L13 16"
        stroke="#000"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M20 5L21 6.5L22.5 7L21 7.5L20 9L19 7.5L17.5 7L19 6.5L20 5Z"
        fill="#E41E1E"
        stroke="#000"
        strokeWidth="0.3"
      />
      <path
        d="M21 15L22 16.5L23.5 17L22 17.5L21 19L20 17.5L18.5 17L20 16.5L21 15Z"
        fill="#E41E1E"
        stroke="#000"
        strokeWidth="0.3"
      />
    </svg>
  ),

  // Default Writer Icon (fallback)
  Writer: () => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
    >
      <path
        d="M3 21L4.5 15.5L18.5 1.5C19.5 0.5 21 0.5 22 1.5C23 2.5 23 4 22 5L8 19L3 21Z"
        fill="#E41E1E"
        stroke="#000"
        strokeWidth="0.5"
      />
      <path
        d="M16 4L20 8M6 18L8 20"
        stroke="#000"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M4 20L6 22"
        stroke="#E41E1E"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  ),
};

// Icon mapping based on exact tool titles
const getIconComponent = (title) => {
  const lowerTitle = title.toLowerCase();

  // Exact matches for your 6 tools
  if (lowerTitle.includes("article") && lowerTitle.includes("writer"))
    return CustomIcons.ArticleWriter;
  if (lowerTitle.includes("blog") && lowerTitle.includes("title"))
    return CustomIcons.TitleGenerator;
  if (lowerTitle.includes("image") && lowerTitle.includes("generation"))
    return CustomIcons.ImageGeneration;
  if (lowerTitle.includes("background") && lowerTitle.includes("removal"))
    return CustomIcons.BackgroundRemoval;
  if (lowerTitle.includes("object") && lowerTitle.includes("removal"))
    return CustomIcons.ObjectRemoval;
  if (lowerTitle.includes("resume") && lowerTitle.includes("review"))
    return CustomIcons.ResumeReviewer;

  // Fallback
  return CustomIcons.Writer;
};

const AiTools = () => {
  const navigate = useNavigate();
  const { user } = useUser();

  return (
    <div className="relative px-4 sm:px-20 xl:px-32 py-24 bg-black overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Subtle Pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='28' height='49' viewBox='0 0 28 49' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23E41E1E' fill-opacity='1' fill-rule='evenodd'%3E%3Cpath d='M13.99 9.25l13 7.5v15l-13 7.5L1 31.75v-15l12.99-7.5zM3 17.9v12.7l10.99 6.34 11-6.35V17.9l-11-6.34L3 17.9zM0 15l12.98-7.5V0h-2v6.35L0 12.69v2.3zm0 18.5L12.98 41v8h-2v-6.85L0 35.81v-2.3zM15 0v7.5L27.99 15H28v-2.31h-.01L17 6.35V0h-2zm0 49v-8l12.99-7.5H28v2.31h-.01L17 42.15V49h-2z'/%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: "28px 49px",
          }}
        />

        {/* Red Glow Effects */}
        <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-red-900/5 rounded-full blur-[120px] animate-pulse-slow" />
        <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-red-900/5 rounded-full blur-[100px] animate-pulse-slower" />
      </div>

      <div className="relative z-10">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h2 className="text-white text-5xl font-bold mb-4">
            Powerful{" "}
            <span
              className="relative inline-block"
              style={{
                color: "#E41E1E",
                textShadow:
                  "0 0 20px rgba(228, 30, 30, 0.5), 0 0 40px rgba(228, 30, 30, 0.3)",
              }}
            >
              AI Tools
            </span>
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-lg">
            Everything you need to create, enhance, and optimize your content
            with cutting-edge AI technology.
          </p>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {AiToolsData.map((tool, index) => {
            const IconComponent = getIconComponent(tool.title);

            return (
              <div
                key={index}
                className="group relative overflow-hidden cursor-pointer transition-all duration-400"
                style={{
                  background: "#000000",
                  border: "1px solid rgba(228, 30, 30, 0.2)",
                  borderRadius: "1rem",
                  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.5)",
                }}
                onClick={() => user && navigate(tool.path)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.border =
                    "1px solid rgba(228, 30, 30, 0.6)";
                  e.currentTarget.style.boxShadow =
                    "0 8px 32px rgba(228, 30, 30, 0.3), 0 0 60px rgba(228, 30, 30, 0.15)";
                  e.currentTarget.style.transform = "translateY(-8px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.border =
                    "1px solid rgba(228, 30, 30, 0.2)";
                  e.currentTarget.style.boxShadow =
                    "0 4px 20px rgba(0, 0, 0, 0.5)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                {/* Card Content */}
                <div className="relative bg-black rounded-[1rem] p-8 h-full">
                  {/* Custom SVG Icon Container */}
                  <div className="mb-6 relative">
                    <div
                      className="w-16 h-16 p-3 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300 relative overflow-hidden"
                      style={{
                        background:
                          "linear-gradient(135deg, #1a0000 0%, #0d0000 100%)",
                        boxShadow: "0 4px 20px rgba(228, 30, 30, 0.2)",
                      }}
                    >
                      <IconComponent />
                      {/* Icon glow effect */}
                      <div className="absolute inset-0 bg-gradient-to-br from-red-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-white text-xl font-semibold mb-3 group-hover:text-red-600 transition-colors duration-300">
                    {tool.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-500 text-sm leading-relaxed group-hover:text-gray-400 transition-colors duration-300">
                    {tool.description}
                  </p>

                  {/* Hover Arrow Indicator */}
                  <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                    <svg
                      className="w-6 h-6 text-red-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </svg>
                  </div>

                  {/* Glow Effect on Hover */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                    style={{
                      background:
                        "radial-gradient(circle at top right, rgba(228, 30, 30, 0.1) 0%, transparent 60%)",
                      borderRadius: "1rem",
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Hand Image - Full Width */}
        <div className="w-screen mt-16 -mx-4 sm:-mx-20 xl:-mx-32">
          <img
            src={handImage}
            alt="Hand Illustration"
            className="w-full h-auto object-cover"
            style={{
              filter: "drop-shadow(0 0 30px rgba(228, 30, 30, 0.5))",
              minHeight: "400px",
            }}
          />
        </div>
      </div>

      <style jsx>{`
        @keyframes pulse-slow {
          0%,
          100% {
            opacity: 0.3;
          }
          50% {
            opacity: 0.6;
          }
        }

        @keyframes pulse-slower {
          0%,
          100% {
            opacity: 0.2;
          }
          50% {
            opacity: 0.4;
          }
        }

        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }

        .animate-pulse-slower {
          animation: pulse-slower 6s ease-in-out infinite;
        }

        .pixelated {
          image-rendering: pixelated;
          image-rendering: -moz-crisp-edges;
          image-rendering: crisp-edges;
          filter: drop-shadow(0 0 20px rgba(228, 30, 30, 0.4));
        }
      `}</style>
    </div>
  );
};

export default AiTools;
