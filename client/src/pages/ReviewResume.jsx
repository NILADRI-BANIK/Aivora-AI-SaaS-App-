import React, { useState } from "react";
import { FileText, Sparkles } from "lucide-react";
import axios from "../config/axios";
import { useAuth } from "@clerk/clerk-react";
import toast from "react-hot-toast";
import Markdown from "react-markdown";

const ReviewResume = () => {
  const [input, setInput] = useState(null);
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("");

  const { getToken } = useAuth();

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (!input) {
      toast.error("Please select a PDF file");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("resume", input);

      const { data } = await axios.post("/api/ai/resume-review", formData, {
        headers: {
          Authorization: `Bearer ${await getToken()}`,
          "Content-Type": "multipart/form-data",
        },
      });

      if (data.success) {
        setContent(data.content);
        toast.success("Resume reviewed successfully!");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Upload error:", error);
      toast.error(error?.response?.data?.message || error.message);
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

        /* FIXED: Force all text to be visible with proper colors */
        .resume-markdown-content {
          color: #d1d5db !important;
        }
        .resume-markdown-content * {
          color: #d1d5db !important;
        }
        .resume-markdown-content h1,
        .resume-markdown-content h2,
        .resume-markdown-content h3,
        .resume-markdown-content h4,
        .resume-markdown-content h5,
        .resume-markdown-content h6 {
          color: #ffffff !important;
          text-shadow: 0 0 10px rgba(228, 30, 30, 0.3);
          margin-top: 1.5rem;
          margin-bottom: 0.75rem;
          font-weight: 700;
        }
        .resume-markdown-content h1 {
          font-size: 1.5rem;
          color: #E41E1E !important;
        }
        .resume-markdown-content h2 {
          font-size: 1.25rem;
        }
        .resume-markdown-content h3 {
          font-size: 1.1rem;
        }
        .resume-markdown-content p {
          color: #d1d5db !important;
          line-height: 1.8;
          margin-bottom: 1rem;
        }
        .resume-markdown-content strong,
        .resume-markdown-content b {
          color: #E41E1E !important;
          font-weight: 600;
        }
        .resume-markdown-content em,
        .resume-markdown-content i {
          color: #d1d5db !important;
          font-style: italic;
        }
        .resume-markdown-content ul,
        .resume-markdown-content ol {
          color: #d1d5db !important;
          padding-left: 1.5rem;
          margin: 1rem 0;
        }
        .resume-markdown-content li {
          color: #d1d5db !important;
          margin: 0.75rem 0;
          padding-left: 0.5rem;
          position: relative;
        }
        .resume-markdown-content li::marker {
          color: #E41E1E !important;
        }
        .resume-markdown-content a {
          color: #E41E1E !important;
          text-decoration: underline;
          transition: all 0.3s;
        }
        .resume-markdown-content a:hover {
          color: #ff4444 !important;
          text-shadow: 0 0 10px rgba(228, 30, 30, 0.5);
        }
        .resume-markdown-content code {
          background: rgba(228, 30, 30, 0.1) !important;
          color: #E41E1E !important;
          padding: 0.2rem 0.4rem;
          border-radius: 0.25rem;
          font-size: 0.9em;
        }
        .resume-markdown-content pre {
          background: rgba(0, 0, 0, 0.5) !important;
          border: 1px solid rgba(228, 30, 30, 0.3);
          border-radius: 0.5rem;
          padding: 1rem;
          overflow-x: auto;
          margin: 1rem 0;
        }
        .resume-markdown-content pre code {
          background: transparent !important;
          padding: 0;
        }
        .resume-markdown-content blockquote {
          border-left: 4px solid #E41E1E;
          padding-left: 1rem;
          color: #9ca3af !important;
          font-style: italic;
          margin: 1rem 0;
        }
        .resume-markdown-content blockquote * {
          color: #9ca3af !important;
        }
        .resume-markdown-content hr {
          border-color: rgba(228, 30, 30, 0.3) !important;
          margin: 1.5rem 0;
        }
        .resume-markdown-content table {
          border-collapse: collapse;
          width: 100%;
          margin: 1rem 0;
        }
        .resume-markdown-content th,
        .resume-markdown-content td {
          border: 1px solid rgba(228, 30, 30, 0.3);
          padding: 0.5rem;
          color: #d1d5db !important;
        }
        .resume-markdown-content th {
          background: rgba(228, 30, 30, 0.1);
          font-weight: 600;
          color: #ffffff !important;
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
              Resume Review
            </h1>
          </div>

          <p className="mt-6 text-sm font-medium text-gray-300 mb-2">
            Upload Resume
          </p>

          <div className="file-input-wrapper">
            <input
              id="file-upload-resume"
              onChange={(e) => setInput(e.target.files[0])}
              type="file"
              accept="application/pdf"
              required
            />
            <label
              htmlFor="file-upload-resume"
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
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <span className="text-sm">
                {input ? input.name : "Click to upload PDF resume"}
              </span>
            </label>
          </div>

          <p
            className="text-xs text-gray-500 mt-2 ml-1"
            style={{ letterSpacing: "0.3px" }}
          >
            Supports PDF resume only.
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
                <span className="text-white relative z-10">Analyzing...</span>
              </>
            ) : (
              <>
                <FileText className="w-5 text-white relative z-10" />
                <span className="text-white relative z-10 uppercase tracking-wider">
                  Review Resume
                </span>
              </>
            )}
          </button>
        </form>

        {/* Right Column - Analysis Results */}
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
              <FileText className="w-5 text-white" />
            </div>
            <h1
              className="text-2xl font-bold text-white"
              style={{
                textShadow: "0 0 20px rgba(228, 30, 30, 0.5)",
              }}
            >
              Analysis Results
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
                  <FileText className="w-10 h-10 text-[#E41E1E]" />
                </div>
                <p className="text-center text-sm px-4">
                  {loading
                    ? "Analyzing your resume..."
                    : 'Upload a resume and click "Review Resume" to get started'}
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
              <div className="resume-markdown-content">
                <Markdown>{content}</Markdown>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReviewResume;
