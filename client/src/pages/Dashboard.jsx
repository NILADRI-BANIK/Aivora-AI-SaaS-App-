import React, { useEffect, useState } from "react";
import { Gem, Sparkles, Zap, TrendingUp } from "lucide-react";
import { Protect, useAuth } from "@clerk/clerk-react";
import CreationItem from "../components/CreationItem";
import axios from "../config/axios";
import toast from "react-hot-toast";

const Dashboard = () => {
  const [creations, setCreations] = useState([]);
  const [loading, setLoading] = useState(false);
  const { getToken } = useAuth();

  const getDashboardData = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("/api/user/creations", {
        headers: {
          Authorization: `Bearer ${await getToken()}`,
        },
      });

      if (data.success) {
        setCreations(data.creations);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error fetching creations:", error);
      toast.error("Failed to load creations");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getDashboardData();
  }, []);

  return (
    <div
      className="h-full overflow-y-scroll p-6 bg-black pt-24
"
    >
      {/* Animated Background Effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute top-20 right-20 w-96 h-96 rounded-full opacity-20"
          style={{
            background: "radial-gradient(circle, #E41E1E 0%, transparent 70%)",
            filter: "blur(60px)",
            animation: "pulse 4s ease-in-out infinite",
          }}
        />
        <div
          className="absolute bottom-20 left-20 w-80 h-80 rounded-full opacity-15"
          style={{
            background: "radial-gradient(circle, #E41E1E 0%, transparent 70%)",
            filter: "blur(50px)",
            animation: "pulse 5s ease-in-out infinite 1s",
          }}
        />
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.15; transform: scale(1); }
          50% { opacity: 0.25; transform: scale(1.1); }
        }
        @keyframes glowPulse {
          0%, 100% { 
            box-shadow: 0 0 20px rgba(228, 30, 30, 0.3),
                        0 0 40px rgba(228, 30, 30, 0.2),
                        inset 0 0 20px rgba(228, 30, 30, 0.1);
          }
          50% { 
            box-shadow: 0 0 30px rgba(228, 30, 30, 0.6),
                        0 0 60px rgba(228, 30, 30, 0.4),
                        inset 0 0 30px rgba(228, 30, 30, 0.2);
          }
        }
        @keyframes shimmer {
          0% { background-position: -1000px 0; }
          100% { background-position: 1000px 0; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(5deg); }
        }
      `}</style>

      <div className="relative z-10 flex justify-start gap-4 flex-wrap">
        {/* Total Creations Card - Glassmorphism Style */}
        <div
          className="group relative flex items-center w-64 p-4 rounded-xl border-2 border-white/30 transition-all duration-500 hover:border-white hover:-translate-y-2 cursor-pointer overflow-hidden"
          style={{
            background: "rgba(0, 0, 0, 0.4)",
            backdropFilter: "blur(10px)",
            boxShadow: "0 8px 32px rgba(228, 30, 30, 0.2)",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.animation =
              "glowPulse 1.5s ease-in-out infinite")
          }
          onMouseLeave={(e) => (e.currentTarget.style.animation = "none")}
        >
          {/* Glow effect */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-xl"
            style={{
              background:
                "radial-gradient(circle at center, rgba(228, 30, 30, 0.3) 0%, transparent 70%)",
              filter: "blur(20px)",
            }}
          />

          {/* Logo */}
          <div
            className="absolute left-4 w-14 h-14 transition-all duration-500 group-hover:scale-110"
            style={{ animation: "float 3s ease-in-out infinite" }}
          >
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <defs>
                <linearGradient
                  id="logoGradX"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="#FF2A2A" />
                  <stop offset="100%" stopColor="#8B0000" />
                </linearGradient>

                <filter id="softGlow">
                  <feGaussianBlur stdDeviation="2.5" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Outer aggressive hex frame */}
              <path
                d="M50 6 L88 28 L88 72 L50 94 L12 72 L12 28 Z"
                fill="url(#logoGradX)"
                opacity="0.85"
                filter="url(#softGlow)"
              />

              {/* Inner dark cut for depth */}
              <path
                d="M50 18 L76 33 L76 67 L50 82 L24 67 L24 33 Z"
                fill="black"
                opacity="0.55"
              />

              {/* Rising bars = Total Creations */}
              <rect x="34" y="52" width="6" height="16" rx="1" fill="#FF2A2A" />
              <rect x="47" y="44" width="6" height="24" rx="1" fill="#FF2A2A" />
              <rect x="60" y="36" width="6" height="32" rx="1" fill="#FF2A2A" />

              {/* Center core dot */}
              <circle
                cx="50"
                cy="68"
                r="3"
                fill="#FF2A2A"
                filter="url(#softGlow)"
              />
            </svg>
          </div>

          {/* Text */}
          <div className="relative ml-16">
            <p className="text-xs text-white/70 uppercase tracking-wider mb-1">
              Total Creations
            </p>
            <h2 className="text-2xl font-bold text-white group-hover:text-[#E41E1E] transition-all">
              {creations.length}
            </h2>
          </div>
        </div>

        {/* Active Plan Card - Glassmorphism Style */}
        <div
          className="group relative flex items-center w-64 p-4 rounded-xl border-2 border-white/30 transition-all duration-500 hover:border-white hover:-translate-y-1 cursor-pointer overflow-hidden"
          style={{
            background: "rgba(0, 0, 0, 0.4)",
            backdropFilter: "blur(10px)",
            boxShadow: "0 8px 32px rgba(228, 30, 30, 0.2)",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.animation =
              "glowPulse 1.5s ease-in-out infinite")
          }
          onMouseLeave={(e) => (e.currentTarget.style.animation = "none")}
        >
          {/* Glow effect */}
          <div
            className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
            style={{
              background:
                "radial-gradient(circle at center, rgba(228, 30, 30, 0.25) 0%, transparent 70%)",
              filter: "blur(20px)",
            }}
          />

          {/* Logo */}
          <div
            className="absolute left-4 w-12 h-12 transition-all duration-500 group-hover:scale-110"
            style={{ animation: "float 3s ease-in-out infinite" }}
          >
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <defs>
                <linearGradient
                  id="logoGrad2"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="#E41E1E" />
                  <stop offset="100%" stopColor="#8B0000" />
                </linearGradient>
              </defs>
              <path
                d="M50 10 L35 45 L50 45 L40 90 L75 40 L55 40 Z"
                fill="url(#logoGrad2)"
              />
            </svg>
          </div>

          {/* Text */}
          <div className="relative ml-16">
            <p className="text-xs text-white/70 uppercase tracking-wider">
              Active Plan
            </p>
            <h2 className="text-2xl font-bold text-white group-hover:text-[#E41E1E]">
              <Protect plan="premium" fallback="Free">
                Premium
              </Protect>
            </h2>
          </div>
        </div>
      </div>

      <div className="relative z-10 space-y-4 mt-8">
        <h3
          className="relative inline-block text-2xl font-bold text-white mb-6 px-4 py-1"
          style={{
            letterSpacing: "0.8px",
            textShadow: `
      0 0 8px rgba(228, 30, 30, 0.8),
      0 0 16px rgba(228, 30, 30, 0.6),
      0 0 32px rgba(228, 30, 30, 0.4)
    `,
          }}
        >
          <span className="relative z-10">Recent Creations</span>

          {/* Red glow background */}
          <span
            className="absolute inset-0 rounded-lg blur-xl opacity-70"
            style={{
              background:
                "linear-gradient(90deg, rgba(228,30,30,0.6), rgba(139,0,0,0.6))",
            }}
          />
        </h3>

        {loading ? (
          <div className="flex justify-center items-center p-12">
            <div className="relative">
              <div
                className="w-16 h-16 rounded-full border-4 border-transparent animate-spin"
                style={{
                  borderTopColor: "#E41E1E",
                  borderRightColor: "#E41E1E",
                  boxShadow: "0 0 30px rgba(228, 30, 30, 0.5)",
                }}
              />
              <div
                className="absolute inset-0 w-16 h-16 rounded-full border-4 border-transparent animate-spin"
                style={{
                  borderTopColor: "#E41E1E",
                  borderRightColor: "#E41E1E",
                  opacity: 0.3,
                  animationDirection: "reverse",
                  animationDuration: "1.5s",
                }}
              />
            </div>
          </div>
        ) : creations.length === 0 ? (
          <div
            className="text-center p-12 rounded-xl border border-[#E41E1E]/20"
            style={{
              background:
                "linear-gradient(135deg, rgba(228, 30, 30, 0.05) 0%, rgba(0, 0, 0, 0.8) 100%)",
            }}
          >
            <div className="mb-4">
              <Sparkles
                className="w-16 h-16 mx-auto text-[#E41E1E] opacity-50"
                style={{
                  filter: "drop-shadow(0 0 20px rgba(228, 30, 30, 0.3))",
                }}
              />
            </div>
            <p className="text-gray-400 text-lg">
              No creations yet. Start creating!
            </p>
            <p className="text-gray-600 text-sm mt-2">
              Your masterpieces will appear here
            </p>
          </div>
        ) : (
          creations.map((item) => <CreationItem key={item.id} item={item} />)
        )}
      </div>
    </div>
  );
};

export default Dashboard;
