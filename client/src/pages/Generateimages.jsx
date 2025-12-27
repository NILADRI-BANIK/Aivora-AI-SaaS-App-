import React, { useState } from "react";
import { Sparkles, Image } from "lucide-react";
import axios from "../config/axios";
import toast from "react-hot-toast";
import { useAuth } from "@clerk/clerk-react";

const GenerateImages = () => {
  const imageStyle = [
    "Realistic",
    "Ghibli style",
    "Anime style",
    "Cartoon style",
    "Fantasy style",
    "Realistic style",
    "3D style",
    "Portrait style",
  ];
  const [selectedStyle, setSelectedStyle] = useState("Realistic");
  const [input, setInput] = useState("");
  const [publish, setPublish] = useState(false);
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("");

  const { getToken } = useAuth();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      const prompt = `Generate an image of ${input} in the style ${selectedStyle}`;
      const { data } = await axios.post(
        "/api/ai/generate-image",
        { prompt, publish },
        {
          headers: {
            Authorization: `Bearer ${await getToken()}`,
          },
        }
      );
      if (data.success) {
        setContent(data.content);
        toast.success("Image generated successfully!");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      // Handle error response from server
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Failed to generate image. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

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
            box-shadow: 0 0 20px rgba(228, 30, 30, 0.4),
                        0 0 40px rgba(228, 30, 30, 0.2),
                        inset 0 0 20px rgba(228, 30, 30, 0.1);
          }
          50% { 
            box-shadow: 0 0 40px rgba(228, 30, 30, 0.8),
                        0 0 80px rgba(228, 30, 30, 0.5),
                        inset 0 0 30px rgba(228, 30, 30, 0.3);
          }
        }
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>

      <div className="relative z-10 flex items-start flex-wrap gap-6">
        {/* Left Column - Configuration */}
        <form
          onSubmit={onSubmitHandler}
          className="w-full max-w-lg p-6 rounded-2xl border-2 border-[#E41E1E]/30 transition-all duration-300 hover:border-[#E41E1E]"
          style={{
            background: "rgba(0, 0, 0, 0.6)",
            backdropFilter: "blur(10px)",
            boxShadow: "0 8px 32px rgba(228, 30, 30, 0.2)",
          }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center"
              style={{
                background: "linear-gradient(135deg, #E41E1E 0%, #8B0000 100%)",
                boxShadow: "0 0 20px rgba(228, 30, 30, 0.5)",
              }}
            >
              <Sparkles className="w-5 text-white" />
            </div>
            <h1
              className="text-2xl font-bold text-white"
              style={{
                textShadow: "0 0 20px rgba(228, 30, 30, 0.5)",
              }}
            >
              AI Image Generator
            </h1>
          </div>

          <p className="mt-6 text-sm font-medium text-gray-300 mb-2">
            Describe Your Image
          </p>
          <textarea
            onChange={(e) => setInput(e.target.value)}
            value={input}
            rows={4}
            className="w-full p-3 px-4 outline-none text-sm rounded-lg border-2 border-[#E41E1E]/30 transition-all duration-300 focus:border-[#E41E1E] text-white resize-none"
            style={{
              background: "rgba(0, 0, 0, 0.5)",
              boxShadow: "inset 0 2px 10px rgba(0, 0, 0, 0.5)",
            }}
            placeholder="Describe what you want to see in the image..."
            required
          />

          <p className="mt-6 text-sm font-medium text-gray-300 mb-3">Style</p>

          <div className="flex gap-3 flex-wrap">
            {imageStyle.map((item) => (
              <span
                onClick={() => setSelectedStyle(item)}
                className={`text-xs px-5 py-2 border-2 rounded-full cursor-pointer transition-all duration-300 ${
                  selectedStyle === item
                    ? "text-white border-[#E41E1E] hover:scale-105"
                    : "text-gray-400 border-[#E41E1E]/30 hover:border-[#E41E1E]/60 hover:text-gray-200"
                }`}
                style={
                  selectedStyle === item
                    ? {
                        background:
                          "linear-gradient(135deg, rgba(228, 30, 30, 0.3) 0%, rgba(139, 0, 0, 0.3) 100%)",
                        boxShadow:
                          "0 0 20px rgba(228, 30, 30, 0.4), inset 0 1px 0 rgba(228, 30, 30, 0.2)",
                      }
                    : { background: "rgba(0, 0, 0, 0.4)" }
                }
                key={item}
              >
                {item}
              </span>
            ))}
          </div>

          <div className="my-6 flex items-center gap-3">
            <label className="relative cursor-pointer">
              <input
                type="checkbox"
                onChange={(e) => setPublish(e.target.checked)}
                checked={publish}
                className="sr-only peer"
              />
              <div
                className="w-11 h-6 rounded-full transition-all duration-300 border-2"
                style={{
                  background: publish
                    ? "linear-gradient(135deg, #E41E1E 0%, #8B0000 100%)"
                    : "rgba(100, 100, 100, 0.3)",
                  borderColor: publish ? "#E41E1E" : "rgba(228, 30, 30, 0.3)",
                  boxShadow: publish
                    ? "0 0 20px rgba(228, 30, 30, 0.4)"
                    : "none",
                }}
              ></div>

              <span
                className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-all duration-300"
                style={{
                  transform: publish ? "translateX(20px)" : "translateX(0)",
                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.3)",
                }}
              ></span>
            </label>
            <p className="text-sm text-gray-300">Make this image public</p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`group relative w-full flex justify-center items-center gap-3 px-6 py-3 mt-6 text-sm font-medium rounded-full border-2 border-white/30 transition-all duration-500 overflow-hidden ${
              loading
                ? "opacity-40 cursor-not-allowed"
                : "hover:border-white hover:scale-105 cursor-pointer"
            }`}
            style={{
              background: "rgba(0, 0, 0, 0.4)",
              backdropFilter: "blur(10px)",
              boxShadow: "0 4px 20px rgba(228, 30, 30, 0.3)",
            }}
            onMouseEnter={(e) => {
              if (!loading) {
                e.currentTarget.style.animation =
                  "glowPulse 1.5s ease-in-out infinite";
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.animation = "none";
            }}
          >
            {/* Glow effect on hover */}
            <div
              className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{
                background:
                  "radial-gradient(circle at center, rgba(228, 30, 30, 0.3) 0%, transparent 70%)",
                filter: "blur(20px)",
              }}
            />

            {/* Shimmer effect */}
            {!loading && (
              <div
                className="absolute inset-0 w-full h-full opacity-0 group-hover:opacity-30 transition-opacity duration-300"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, rgba(228, 30, 30, 0.5), transparent)",
                  animation: "shimmer 2s infinite",
                }}
              />
            )}

            {loading ? (
              <>
                <span
                  className="w-5 h-5 rounded-full border-2 border-t-transparent animate-spin"
                  style={{ borderColor: "#E41E1E" }}
                ></span>
                <span className="text-white relative z-10">Generating...</span>
              </>
            ) : (
              <>
                <Image className="w-5 text-white relative z-10" />
                <span className="text-white relative z-10 uppercase tracking-wider">
                  Generate Image
                </span>
              </>
            )}
          </button>
        </form>

        {/* Right Column - Generated Image */}
        <div
          className="w-full max-w-lg p-6 rounded-2xl flex flex-col border-2 border-[#E41E1E]/30 min-h-96 transition-all duration-300 hover:border-[#E41E1E]"
          style={{
            background: "rgba(0, 0, 0, 0.6)",
            backdropFilter: "blur(10px)",
            boxShadow: "0 8px 32px rgba(228, 30, 30, 0.2)",
          }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center"
              style={{
                background: "linear-gradient(135deg, #E41E1E 0%, #8B0000 100%)",
                boxShadow: "0 0 20px rgba(228, 30, 30, 0.5)",
              }}
            >
              <Image className="w-5 text-white" />
            </div>
            <h1
              className="text-2xl font-bold text-white"
              style={{
                textShadow: "0 0 20px rgba(228, 30, 30, 0.5)",
              }}
            >
              Generated Image
            </h1>
          </div>

          {!content ? (
            <div className="flex-1 flex justify-center items-center">
              <div className="flex flex-col items-center gap-5 text-gray-400">
                <div
                  className="w-20 h-20 rounded-full flex items-center justify-center"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(228, 30, 30, 0.2) 0%, rgba(139, 0, 0, 0.2) 100%)",
                    boxShadow: "0 0 30px rgba(228, 30, 30, 0.3)",
                  }}
                >
                  <Image className="w-10 h-10 text-[#E41E1E]" />
                </div>
                <p className="text-center text-sm">
                  {loading
                    ? "Generating your image..."
                    : 'Enter a description and click "Generate Image" to get started'}
                </p>
              </div>
            </div>
          ) : (
            <div
              className="mt-3 h-full rounded-lg overflow-hidden border-2 border-[#E41E1E]/20"
              style={{
                boxShadow:
                  "0 0 30px rgba(228, 30, 30, 0.2), inset 0 0 20px rgba(0, 0, 0, 0.5)",
              }}
            >
              <img
                src={content}
                alt="Generated AI image"
                className="w-full h-full object-contain"
                style={{
                  filter: "drop-shadow(0 0 10px rgba(228, 30, 30, 0.3))",
                }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GenerateImages;
