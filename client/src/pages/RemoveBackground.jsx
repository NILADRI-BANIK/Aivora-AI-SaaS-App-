import React, { useState } from "react";
import { Eraser, Sparkles } from "lucide-react";
import axios from "../config/axios";
import { useAuth } from "@clerk/clerk-react";
import toast from "react-hot-toast";

const RemoveBackground = () => {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("");
  const { getToken } = useAuth();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const fromData = new FormData();
      fromData.append("image", input);
      const { data } = await axios.post("/api/ai/remove-background", fromData, {
        headers: {
          Authorization: `Bearer ${await getToken()}`,
        },
      });
      if (data.success) {
        setContent(data.content);
        toast.success("Image generated successfully!");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
    setLoading(false);
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
        
        /* Custom file input styling */
        .file-input-wrapper {
          position: relative;
          overflow: hidden;
          display: inline-block;
          width: 100%;
        }
        .file-input-wrapper input[type=file] {
          position: absolute;
          left: -9999px;
        }
        .file-input-label {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          padding: 0.75rem 1rem;
          background: rgba(0, 0, 0, 0.5);
          border: 2px dashed rgba(228, 30, 30, 0.3);
          border-radius: 0.5rem;
          color: #9ca3af;
          cursor: pointer;
          transition: all 0.3s;
        }
        .file-input-label:hover {
          border-color: #E41E1E;
          color: #d1d5db;
          box-shadow: 0 0 20px rgba(228, 30, 30, 0.2);
        }
        .file-input-label.has-file {
          border-style: solid;
          color: #E41E1E;
          border-color: #E41E1E;
          box-shadow: 0 0 20px rgba(228, 30, 30, 0.3);
        }
      `}</style>

      <div className="relative z-10 flex items-start flex-wrap gap-6">
        {/* Left Column - Upload Configuration */}
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
              Background Removal
            </h1>
          </div>

          <p className="mt-6 text-sm font-medium text-gray-300 mb-2">
            Upload Image
          </p>

          <div className="file-input-wrapper">
            <input
              id="file-upload-bg"
              onChange={(e) => setInput(e.target.files[0])}
              type="file"
              accept="image/*"
              required
            />
            <label
              htmlFor="file-upload-bg"
              className={`file-input-label ${input ? "has-file" : ""}`}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                />
              </svg>
              <span className="text-sm">
                {input ? input.name : "Click to upload or drag and drop"}
              </span>
            </label>
          </div>

          <p
            className="text-xs text-gray-500 mt-2 ml-1"
            style={{ letterSpacing: "0.3px" }}
          >
            Supports JPG, PNG and other image formats
          </p>

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
                <span className="text-white relative z-10">Processing...</span>
              </>
            ) : (
              <>
                <Eraser className="w-5 text-white relative z-10" />
                <span className="text-white relative z-10 uppercase tracking-wider">
                  Remove Background
                </span>
              </>
            )}
          </button>
        </form>

        {/* Right Column - Processed Image */}
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
              <Eraser className="w-5 text-white" />
            </div>
            <h1
              className="text-2xl font-bold text-white"
              style={{
                textShadow: "0 0 20px rgba(228, 30, 30, 0.5)",
              }}
            >
              Processed Image
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
                  <Eraser className="w-10 h-10 text-[#E41E1E]" />
                </div>
                <p className="text-center text-sm px-4">
                  {loading
                    ? "Removing background from your image..."
                    : 'Upload an image and click "Remove Background" to get started'}
                </p>
              </div>
            </div>
          ) : (
            <div
              className="mt-3 flex-1 rounded-lg overflow-hidden border-2 border-[#E41E1E]/20 p-4"
              style={{
                boxShadow:
                  "0 0 30px rgba(228, 30, 30, 0.2), inset 0 0 20px rgba(0, 0, 0, 0.5)",
                background:
                  "repeating-conic-gradient(#1a1a1a 0% 25%, #2a2a2a 0% 50%) 50% / 20px 20px",
              }}
            >
              <img
                src={content}
                alt="Processed image with background removed"
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

export default RemoveBackground;
