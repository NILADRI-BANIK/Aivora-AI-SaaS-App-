import React, { useState } from "react";
import { Sparkles, Edit, Zap } from "lucide-react";
import axios from "../config/axios";
import { useAuth } from "@clerk/clerk-react";
import toast from "react-hot-toast";
import Markdown from "react-markdown";

const WriteArticle = () => {
const articleLength = [
  { length: "short", text: "Short (500-800 words)" },      // Changed from 800 to "short"
  { length: "medium", text: "Medium (800-1200 words)" },   // Changed from 1200 to "medium"
  { length: "long", text: "Long (1200+ words)" },          // Changed from 1600 to "long"
];

  const [selectedLength, setSelectedLength] = React.useState(articleLength[0]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("");
  const { getToken } = useAuth();

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (!input.trim()) {
      toast.error("Please enter a topic");
      return;
    }

    try {
      setLoading(true);
      setContent(""); // Clear previous content

      const prompt = `Write an article about ${input} in ${selectedLength.text}`;

      console.log("Sending request:", {
        prompt,
        length: selectedLength.length,
      });

      const token = await getToken();
      console.log("Token obtained:", !!token);

      const { data } = await axios.post(
        "/api/ai/generate-article",
        {
          prompt,
          length: selectedLength.length,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Response received:", data);

      if (data.success) {
        if (data.content && data.content.trim() !== "") {
          setContent(data.content);
          toast.success("Article generated successfully!");
        } else {
          toast.error("No content was generated. Please try again.");
          console.error("Empty content received");
        }
      } else {
        toast.error(data.message || "Failed to generate article");
        console.error("API returned success: false", data);
      }
    } catch (error) {
      console.error("Error generating article:", error);

      // Better error messages
      let errorMessage = "Failed to generate article";

      if (error.response) {
        // Server responded with error
        console.error("Error response:", error.response.data);
        errorMessage =
          error.response.data?.message ||
          `Server error: ${error.response.status}`;
      } else if (error.request) {
        // Request made but no response
        console.error("No response received:", error.request);
        errorMessage = "No response from server. Please check your connection.";
      } else {
        // Error setting up request
        console.error("Error setting up request:", error.message);
        errorMessage = error.message;
      }

      toast.error(errorMessage);
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
                boxShadow: "0 0 22px rgba(228, 30, 30, 0.65)",
              }}
            >
              <svg viewBox="0 0 100 100" className="w-6 h-6" fill="none">
                {/* Outer aggressive ring */}
                <path
                  d="M50 6
         C72 6 90 28 90 50
         C90 72 72 94 50 94
         C28 94 10 72 10 50
         C10 28 28 6 50 6Z"
                  stroke="#fff"
                  strokeWidth="4"
                  opacity="0.9"
                />

                {/* Dragon / fang slash */}
                <path
                  d="M62 28
         C48 32 44 44 50 54
         C56 64 44 76 32 78
         C54 80 78 60 74 38
         C72 30 66 26 62 28Z"
                  fill="#ffffff"
                />

                {/* Inner cut for sharpness */}
                <path
                  d="M58 36
         C50 40 48 48 52 54
         C56 60 50 66 44 68"
                  stroke="#8B0000"
                  strokeWidth="2"
                />
              </svg>
            </div>

            <h1
              className="text-2xl font-bold text-white"
              style={{
                textShadow: "0 0 20px rgba(228, 30, 30, 0.5)",
              }}
            >
              Article Configuration
            </h1>
          </div>

          <p className="mt-6 text-sm font-medium text-gray-300 mb-2">
            Article Topic
          </p>
          <input
            onChange={(e) => setInput(e.target.value)}
            value={input}
            type="text"
            className="w-full p-3 px-4 outline-none text-sm rounded-lg border-2 border-[#E41E1E]/30 transition-all duration-300 focus:border-[#E41E1E] text-white"
            style={{
              background: "rgba(0, 0, 0, 0.5)",
              boxShadow: "inset 0 2px 10px rgba(0, 0, 0, 0.5)",
            }}
            placeholder="the future of artificial intelligence is..."
            required
          />

          <p className="mt-6 text-sm font-medium text-gray-300 mb-3">
            Article Length
          </p>

          <div className="flex gap-3 flex-wrap">
            {articleLength.map((item, index) => (
              <span
                onClick={() => setSelectedLength(item)}
                className={`text-xs px-5 py-2 border-2 rounded-full cursor-pointer transition-all duration-300 ${
                  selectedLength.text === item.text
                    ? "text-white border-[#E41E1E] hover:scale-105"
                    : "text-gray-400 border-[#E41E1E]/30 hover:border-[#E41E1E]/60 hover:text-gray-200"
                }`}
                style={
                  selectedLength.text === item.text
                    ? {
                        background:
                          "linear-gradient(135deg, rgba(228, 30, 30, 0.3) 0%, rgba(139, 0, 0, 0.3) 100%)",
                        boxShadow:
                          "0 0 20px rgba(228, 30, 30, 0.4), inset 0 1px 0 rgba(228, 30, 30, 0.2)",
                      }
                    : { background: "rgba(0, 0, 0, 0.4)" }
                }
                key={index}
              >
                {item.text}
              </span>
            ))}
          </div>

          <button
            type="submit"
            disabled={loading || !input.trim()}
            className={`group relative w-full flex justify-center items-center gap-3 px-6 py-3 mt-8 text-sm font-medium rounded-full border-2 border-white/30 transition-all duration-500 overflow-hidden ${
              loading || !input.trim()
                ? "opacity-40 cursor-not-allowed"
                : "hover:border-white hover:scale-105 cursor-pointer"
            }`}
            style={{
              background: "rgba(0, 0, 0, 0.4)",
              backdropFilter: "blur(10px)",
              boxShadow: "0 4px 20px rgba(228, 30, 30, 0.3)",
            }}
            onMouseEnter={(e) => {
              if (!loading && input.trim()) {
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
            {!loading && input.trim() && (
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
                <Edit className="w-5 text-white relative z-10" />
                <span className="text-white relative z-10 uppercase tracking-wider">
                  Generate Article
                </span>
              </>
            )}
          </button>
        </form>

        {/* Right Column - Generated Article */}
        <div
          className="w-full max-w-lg p-6 rounded-2xl flex flex-col border-2 border-[#E41E1E]/30 min-h-96 max-h-[600px] transition-all duration-300 hover:border-[#E41E1E]"
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
              <Edit className="w-5 text-white" />
            </div>
            <h1
              className="text-2xl font-bold text-white"
              style={{
                textShadow: "0 0 20px rgba(228, 30, 30, 0.5)",
              }}
            >
              Generated Article
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
                  <Edit className="w-10 h-10 text-[#E41E1E]" />
                </div>
                <p className="text-center text-sm">
                  {loading
                    ? "Generating your article..."
                    : 'Enter a topic and click "Generate Article" to get started'}
                </p>
              </div>
            </div>
          ) : (
            <div
              className="mt-3 h-full overflow-y-scroll text-sm pr-2"
              style={{
                scrollbarWidth: "thin",
                scrollbarColor: "#E41E1E #1a1a1a",
              }}
            >
              <style>{`
                .prose-custom h1, .prose-custom h2, .prose-custom h3 {
                  color: #ffffff;
                  text-shadow: 0 0 10px rgba(228, 30, 30, 0.3);
                }
                .prose-custom p {
                  color: #d1d5db;
                  line-height: 1.8;
                }
                .prose-custom strong {
                  color: #E41E1E;
                  font-weight: 600;
                }
                .prose-custom ul, .prose-custom ol {
                  color: #d1d5db;
                }
                .prose-custom li {
                  margin: 0.5rem 0;
                }
                .prose-custom a {
                  color: #E41E1E;
                  text-decoration: underline;
                }
                .prose-custom code {
                  background: rgba(228, 30, 30, 0.1);
                  color: #E41E1E;
                  padding: 0.2rem 0.4rem;
                  border-radius: 0.25rem;
                }
              `}</style>
              <div className="prose-custom prose-sm max-w-none">
                <Markdown>{content}</Markdown>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WriteArticle;
