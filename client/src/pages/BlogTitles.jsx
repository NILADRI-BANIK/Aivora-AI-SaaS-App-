import React, { useState } from "react";
import { Sparkles, Hash } from "lucide-react";
import axios from "../config/axios";
import toast from "react-hot-toast";
import Markdown from "react-markdown";
import { useAuth } from "@clerk/clerk-react";
import remarkGfm from "remark-gfm";

const BlogTitles = () => {
  const blogCategories = [
    "General",
    "Technology",
    "Business",
    "Health",
    "Lifestyle",
    "Education",
    "Travel",
    "Food",
  ];

  const [selectedCategory, setSelectedCategory] = useState("General");
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("");
  const { getToken } = useAuth();

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (!input.trim()) {
      toast.error("Please enter a keyword");
      return;
    }

    try {
      setLoading(true);
      setContent(""); // Clear previous content

      const prompt = `Generate 5 creative and engaging blog titles for the keyword "${input}" in the ${selectedCategory} category. Make them catchy and SEO-friendly.`;

      console.log("🚀 Sending request:", {
        prompt,
        timestamp: new Date().toISOString(),
      });

      const token = await getToken();

      const { data } = await axios.post(
        "/api/ai/generate-blog-title",
        { prompt },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Cache-Control": "no-cache",
            Pragma: "no-cache",
          },
        }
      );

      console.log(" Response received:", {
        success: data.success,
        hasContent: !!data.content,
        contentLength: data.content?.length,
        contentPreview: data.content?.substring(0, 100),
        timestamp: data.timestamp,
      });

      if (data.success) {
        if (data.content && data.content.trim() !== "") {
          console.log(" Setting content:", data.content.substring(0, 100));
          setContent(data.content);
          toast.success("Titles generated successfully!");
        } else {
          console.error("❌ Empty content received");
          toast.error("No titles were generated. Please try again.");
        }
      } else {
        console.error("❌ Request failed:", data.message);
        toast.error(data.message || "Failed to generate titles");
      }
    } catch (error) {
      console.error("❌ Error generating titles:", error);

      let errorMessage = "Failed to generate titles";
      if (error.response) {
        console.error("Response error:", error.response.data);
        errorMessage =
          error.response.data?.message ||
          `Server error: ${error.response.status}`;
      } else if (error.request) {
        console.error("Request error - no response received");
        errorMessage = "No response from server. Please check your connection.";
      } else {
        console.error("Setup error:", error.message);
        errorMessage = error.message;
      }

      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-full overflow-y-scroll p-6 bg-black pt-24">
      {/* Animated Background Effects */}
      <div className='fixed inset-0 pointer-events-none overflow-hidden'>
        <div 
          className='absolute top-20 right-20 w-96 h-96 rounded-full opacity-20'
          style={{
            background: 'radial-gradient(circle, #E41E1E 0%, transparent 70%)',
            filter: 'blur(60px)',
            animation: 'pulse 4s ease-in-out infinite'
          }}
        />
        <div 
          className='absolute bottom-20 left-20 w-80 h-80 rounded-full opacity-15'
          style={{
            background: 'radial-gradient(circle, #E41E1E 0%, transparent 70%)',
            filter: 'blur(50px)',
            animation: 'pulse 5s ease-in-out infinite 1s'
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
            background: 'rgba(0, 0, 0, 0.6)',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 8px 32px rgba(228, 30, 30, 0.2)'
          }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div 
              className="w-10 h-10 rounded-lg flex items-center justify-center"
              style={{
                background: 'linear-gradient(135deg, #E41E1E 0%, #8B0000 100%)',
                boxShadow: '0 0 20px rgba(228, 30, 30, 0.5)'
              }}
            >
              <Sparkles className="w-5 text-white" />
            </div>
            <h1 
              className="text-2xl font-bold text-white"
              style={{
                textShadow: '0 0 20px rgba(228, 30, 30, 0.5)'
              }}
            >
              AI Title Generator
            </h1>
          </div>

          <p className="mt-6 text-sm font-medium text-gray-300 mb-2">Keyword</p>
          <input
            onChange={(e) => setInput(e.target.value)}
            value={input}
            type="text"
            className="w-full p-3 px-4 outline-none text-sm rounded-lg border-2 border-[#E41E1E]/30 transition-all duration-300 focus:border-[#E41E1E] text-white"
            style={{
              background: 'rgba(0, 0, 0, 0.5)',
              boxShadow: 'inset 0 2px 10px rgba(0, 0, 0, 0.5)'
            }}
            placeholder="artificial intelligence, healthy recipes, travel tips..."
            required
          />

          <p className="mt-6 text-sm font-medium text-gray-300 mb-3">Category</p>

          <div className="flex gap-3 flex-wrap">
            {blogCategories.map((item) => (
              <span
                onClick={() => setSelectedCategory(item)}
                className={`text-xs px-5 py-2 border-2 rounded-full cursor-pointer transition-all duration-300 ${
                  selectedCategory === item
                    ? "text-white border-[#E41E1E] hover:scale-105"
                    : "text-gray-400 border-[#E41E1E]/30 hover:border-[#E41E1E]/60 hover:text-gray-200"
                }`}
                style={
                  selectedCategory === item
                    ? {
                        background: 'linear-gradient(135deg, rgba(228, 30, 30, 0.3) 0%, rgba(139, 0, 0, 0.3) 100%)',
                        boxShadow: '0 0 20px rgba(228, 30, 30, 0.4), inset 0 1px 0 rgba(228, 30, 30, 0.2)'
                      }
                    : { background: 'rgba(0, 0, 0, 0.4)' }
                }
                key={item}
              >
                {item}
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
              background: 'rgba(0, 0, 0, 0.4)',
              backdropFilter: 'blur(10px)',
              boxShadow: '0 4px 20px rgba(228, 30, 30, 0.3)'
            }}
            onMouseEnter={(e) => {
              if (!loading && input.trim()) {
                e.currentTarget.style.animation = 'glowPulse 1.5s ease-in-out infinite';
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.animation = 'none';
            }}
          >
            {/* Glow effect on hover */}
            <div 
              className='absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none'
              style={{
                background: 'radial-gradient(circle at center, rgba(228, 30, 30, 0.3) 0%, transparent 70%)',
                filter: 'blur(20px)'
              }}
            />
            
            {/* Shimmer effect */}
            {!loading && input.trim() && (
              <div 
                className='absolute inset-0 w-full h-full opacity-0 group-hover:opacity-30 transition-opacity duration-300'
                style={{
                  background: 'linear-gradient(90deg, transparent, rgba(228, 30, 30, 0.5), transparent)',
                  animation: 'shimmer 2s infinite'
                }}
              />
            )}

            {loading ? (
              <>
                <span 
                  className="w-5 h-5 rounded-full border-2 border-t-transparent animate-spin"
                  style={{ borderColor: '#E41E1E' }}
                ></span>
                <span className="text-white relative z-10">Generating...</span>
              </>
            ) : (
              <>
                <Hash className="w-5 text-white relative z-10" />
                <span className="text-white relative z-10 uppercase tracking-wider">Generate Titles</span>
              </>
            )}
          </button>
        </form>

        {/* Right Column - Generated Titles */}
        <div 
          className="w-full max-w-lg p-6 rounded-2xl flex flex-col border-2 border-[#E41E1E]/30 min-h-96 transition-all duration-300 hover:border-[#E41E1E]"
          style={{
            background: 'rgba(0, 0, 0, 0.6)',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 8px 32px rgba(228, 30, 30, 0.2)'
          }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div 
              className="w-10 h-10 rounded-lg flex items-center justify-center"
              style={{
                background: 'linear-gradient(135deg, #E41E1E 0%, #8B0000 100%)',
                boxShadow: '0 0 20px rgba(228, 30, 30, 0.5)'
              }}
            >
              <Hash className="w-5 text-white" />
            </div>
            <h1 
              className="text-2xl font-bold text-white"
              style={{
                textShadow: '0 0 20px rgba(228, 30, 30, 0.5)'
              }}
            >
              Generated Titles
            </h1>
          </div>

          {!content ? (
            <div className="flex-1 flex justify-center items-center">
              <div className="flex flex-col items-center gap-5 text-gray-400">
                <div 
                  className="w-20 h-20 rounded-full flex items-center justify-center"
                  style={{
                    background: 'linear-gradient(135deg, rgba(228, 30, 30, 0.2) 0%, rgba(139, 0, 0, 0.2) 100%)',
                    boxShadow: '0 0 30px rgba(228, 30, 30, 0.3)'
                  }}
                >
                  <Hash className="w-10 h-10 text-[#E41E1E]" />
                </div>
                <p className="text-center text-sm">
                  {loading
                    ? "Generating titles..."
                    : 'Enter a keyword and click "Generate Titles" to get started'}
                </p>
              </div>
            </div>
          ) : (
            <div 
              className="mt-3 flex-1 overflow-y-scroll text-sm pr-2"
              style={{
                scrollbarWidth: 'thin',
                scrollbarColor: '#E41E1E #1a1a1a'
              }}
            >
              <style>{`
                .prose-custom h1, .prose-custom h2, .prose-custom h3 {
                  color: #ffffff;
                  text-shadow: 0 0 10px rgba(228, 30, 30, 0.3);
                  margin-top: 1rem;
                  margin-bottom: 0.5rem;
                }
                .prose-custom p {
                  color: #d1d5db;
                  line-height: 1.8;
                  margin-bottom: 1rem;
                }
                .prose-custom strong {
                  color: #E41E1E;
                  font-weight: 600;
                }
                .prose-custom ul, .prose-custom ol {
                  color: #d1d5db;
                  padding-left: 1.5rem;
                }
                .prose-custom li {
                  margin: 0.75rem 0;
                  padding-left: 0.5rem;
                  position: relative;
                }
                .prose-custom li::marker {
                  color: #E41E1E;
                }
                .prose-custom a {
                  color: #E41E1E;
                  text-decoration: underline;
                  transition: all 0.3s;
                }
                .prose-custom a:hover {
                  color: #ff4444;
                  text-shadow: 0 0 10px rgba(228, 30, 30, 0.5);
                }
                .prose-custom code {
                  background: rgba(228, 30, 30, 0.1);
                  color: #E41E1E;
                  padding: 0.2rem 0.4rem;
                  border-radius: 0.25rem;
                  font-size: 0.9em;
                }
                .prose-custom blockquote {
                  border-left: 4px solid #E41E1E;
                  padding-left: 1rem;
                  color: #9ca3af;
                  font-style: italic;
                  margin: 1rem 0;
                }
              `}</style>
              <div className="prose-custom prose-sm max-w-none">
                <Markdown remarkPlugins={[remarkGfm]}>{content}</Markdown>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogTitles;