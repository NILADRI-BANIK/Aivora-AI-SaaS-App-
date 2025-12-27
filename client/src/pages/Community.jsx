import { useUser, useAuth } from "@clerk/clerk-react";
import React, { useEffect, useState } from "react";
import { Heart } from "lucide-react";
import axios from "../config/axios";
import toast from "react-hot-toast";

const Community = () => {
  const [creations, setCreations] = useState([]);
  const { user } = useUser();
  const { getToken } = useAuth();
  const [loading, setLoading] = useState(true);

  const fetchCreations = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("/api/user/published", {
        headers: {
          Authorization: `Bearer ${await getToken()}`,
        },
      });
      if (data.success) {
        setCreations(data.creations || []);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Fetch error:", error);
      toast.error(error?.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async (creationId) => {
    try {
      const { data } = await axios.post(
        "/api/user/like",
        { creationId },
        {
          headers: {
            Authorization: `Bearer ${await getToken()}`,
          },
        }
      );

      if (data.success) {
        setCreations((prev) =>
          prev.map((creation) =>
            creation.id === creationId
              ? { ...creation, likes: data.likes }
              : creation
          )
        );
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Like error:", error);
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    if (user) {
      fetchCreations();
    }
  }, [user]);

  return !loading ? (
    <div
      className="flex-1 h-full flex flex-col gap-6 p-6 bg-black pt-24
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
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
      `}</style>

      <h2
        className="relative z-10 text-3xl font-bold text-white"
        style={{
          textShadow: "0 0 20px rgba(228, 30, 30, 0.5)",
          letterSpacing: "0.5px",
        }}
      >
        Community Creations
      </h2>

      <div
        className="relative z-10 h-full w-full rounded-2xl overflow-y-scroll p-6 border-2 border-[#E41E1E]/30"
        style={{
          background: "rgba(0, 0, 0, 0.6)",
          backdropFilter: "blur(10px)",
          boxShadow: "0 8px 32px rgba(228, 30, 30, 0.2)",
          scrollbarWidth: "thin",
          scrollbarColor: "#E41E1E #1a1a1a",
        }}
      >
        {loading ? (
          <div className="flex justify-center items-center h-full">
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
          <div className="flex flex-col items-center justify-center h-full text-gray-400">
            <div
              className="w-24 h-24 rounded-full flex items-center justify-center mb-6"
              style={{
                background:
                  "linear-gradient(135deg, rgba(228, 30, 30, 0.2) 0%, rgba(139, 0, 0, 0.2) 100%)",
                boxShadow: "0 0 40px rgba(228, 30, 30, 0.3)",
                animation: "float 3s ease-in-out infinite",
              }}
            >
              <Heart className="w-12 h-12 text-[#E41E1E]" />
            </div>
            <p className="text-xl text-gray-300 mb-2">
              No creations published yet
            </p>
            <p className="text-sm text-gray-500">
              Be the first to share your work!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {creations.map((creation, index) => (
              <div
                key={creation.id || index}
                className="group relative rounded-xl overflow-hidden border-2 border-[#E41E1E]/20 transition-all duration-300 hover:border-[#E41E1E] hover:-translate-y-2 hover:scale-105"
                style={{
                  background: "rgba(0, 0, 0, 0.5)",
                  boxShadow: "0 4px 20px rgba(228, 30, 30, 0.2)",
                }}
              >
                <div className="relative aspect-square overflow-hidden">
                  <img
                    src={creation.content}
                    alt={creation.prompt || "Creation"}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    style={{
                      filter: "brightness(0.9)",
                    }}
                  />

                  {/* Gradient Overlay */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      background:
                        "linear-gradient(to top, rgba(0, 0, 0, 0.95) 0%, rgba(0, 0, 0, 0.7) 40%, transparent 100%)",
                    }}
                  />

                  {/* Content Overlay */}
                  <div className="absolute inset-0 flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <p
                      className="text-white text-sm mb-3 line-clamp-2 leading-relaxed"
                      style={{
                        textShadow: "0 2px 10px rgba(0, 0, 0, 0.8)",
                      }}
                    >
                      {creation.prompt || "No description"}
                    </p>

                    {/* Like Button */}
                    <div className="flex items-center gap-2">
                      <div
                        className="flex items-center gap-2 px-3 py-1.5 rounded-full transition-all duration-300 cursor-pointer hover:scale-110"
                        onClick={() => handleLike(creation.id)}
                        style={{
                          background:
                            Array.isArray(creation.likes) &&
                            creation.likes.includes(user?.id?.toString())
                              ? "linear-gradient(135deg, rgba(228, 30, 30, 0.4) 0%, rgba(139, 0, 0, 0.4) 100%)"
                              : "rgba(0, 0, 0, 0.6)",
                          backdropFilter: "blur(10px)",
                          border:
                            Array.isArray(creation.likes) &&
                            creation.likes.includes(user?.id?.toString())
                              ? "2px solid #E41E1E"
                              : "2px solid rgba(255, 255, 255, 0.3)",
                          boxShadow:
                            Array.isArray(creation.likes) &&
                            creation.likes.includes(user?.id?.toString())
                              ? "0 0 20px rgba(228, 30, 30, 0.4)"
                              : "none",
                        }}
                      >
                        <Heart
                          className={`w-5 h-5 transition-all duration-300 ${
                            Array.isArray(creation.likes) &&
                            creation.likes.includes(user?.id?.toString())
                              ? "fill-[#E41E1E] text-[#E41E1E]"
                              : "text-white"
                          }`}
                          style={{
                            filter:
                              Array.isArray(creation.likes) &&
                              creation.likes.includes(user?.id?.toString())
                                ? "drop-shadow(0 0 5px rgba(228, 30, 30, 0.8))"
                                : "none",
                          }}
                        />
                        <span
                          className="text-sm font-semibold"
                          style={{
                            color:
                              Array.isArray(creation.likes) &&
                              creation.likes.includes(user?.id?.toString())
                                ? "#E41E1E"
                                : "white",
                            textShadow:
                              Array.isArray(creation.likes) &&
                              creation.likes.includes(user?.id?.toString())
                                ? "0 0 10px rgba(228, 30, 30, 0.5)"
                                : "0 2px 4px rgba(0, 0, 0, 0.5)",
                          }}
                        >
                          {Array.isArray(creation.likes)
                            ? creation.likes.length
                            : 0}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Top Corner Glow */}
                  <div
                    className="absolute top-0 right-0 w-20 h-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                    style={{
                      background:
                        "radial-gradient(circle at top right, rgba(228, 30, 30, 0.3) 0%, transparent 70%)",
                      filter: "blur(20px)",
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  ) : (
    <div className="flex justify-center items-center h-full bg-black">
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
  );
};

export default Community;
