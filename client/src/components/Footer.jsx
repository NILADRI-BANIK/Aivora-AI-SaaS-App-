import React from "react";
import logo from "../assets/logo.png";

const Footer = () => {
  return (
    <footer
      className="px-6 md:px-16 lg:px-24 xl:px-32 pt-12 pb-0 w-full relative overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, rgba(0, 0, 0, 0.95) 0%, rgba(0, 0, 0, 1) 100%)",
        borderTop: "2px solid rgba(228, 30, 30, 0.3)",
      }}
    >
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute -bottom-20 left-1/4 w-96 h-96 rounded-full opacity-10"
          style={{
            background: "radial-gradient(circle, #E41E1E 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />
        <div
          className="absolute -bottom-20 right-1/4 w-80 h-80 rounded-full opacity-10"
          style={{
            background: "radial-gradient(circle, #E41E1E 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-12 border-b border-[#E41E1E]/30 pb-8">
        
        {/* LEFT: Logo & Description */}
        <div className="md:max-w-96 -mt-13">
          <div className="mb-4 -ml-9">
            <img src={logo} alt="logo" className="h-40 w-auto mb-4" />
          </div>

          <p className="text-sm text-gray-400 leading-relaxed">
            Experience the power of AI with Aivora. Experience the power of AI
            with QuickAi.
            <br />
            <span className="text-gray-500">
              Transform your content creation with our suite of premium AI
              tools. Write articles, generate images, and enhance your workflow.
            </span>
          </p>
        </div>

        {/* MIDDLE: Company Links */}
        <div className="max-w-xs mx-auto text-left">
          <h2
            className="font-semibold mb-5 text-white"
            style={{ textShadow: "0 0 10px rgba(228, 30, 30, 0.3)" }}
          >
            Company
          </h2>

          <ul className="text-sm space-y-3">
            {["Home", "About us", "Contact us", "Privacy policy"].map(
              (item, i) => (
                <li key={i}>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-[#E41E1E] transition-all duration-300 hover:translate-x-1 inline-block"
                    onMouseEnter={(e) =>
                      (e.target.style.textShadow =
                        "0 0 10px rgba(228, 30, 30, 0.5)")
                    }
                    onMouseLeave={(e) =>
                      (e.target.style.textShadow = "none")
                    }
                  >
                    {item}
                  </a>
                </li>
              )
            )}
          </ul>
        </div>

        {/* RIGHT: Newsletter */}
        <div className="w-full max-w-md ml-auto">
          <h2
            className="font-semibold text-white mb-5"
            style={{ textShadow: "0 0 10px rgba(228, 30, 30, 0.3)" }}
          >
            Subscribe to our newsletter
          </h2>

          <p className="text-sm text-gray-400 mb-4">
            The latest news, articles, and resources, sent to your inbox weekly.
          </p>

          <div className="flex items-center gap-3">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 h-10 rounded-lg px-3 bg-black/50 border-2 border-[#E41E1E]/30 text-white placeholder-gray-600 outline-none transition-all duration-300"
              style={{
                boxShadow: "inset 0 2px 10px rgba(0,0,0,0.5)",
              }}
              onFocus={(e) =>
                (e.target.style.boxShadow =
                  "0 0 20px rgba(228,30,30,0.3), inset 0 2px 10px rgba(0,0,0,0.5)")
              }
              onBlur={(e) =>
                (e.target.style.boxShadow =
                  "inset 0 2px 10px rgba(0,0,0,0.5)")
              }
            />

            <button
              className="relative group overflow-hidden rounded-lg p-[2px]"
              style={{
                background:
                  "linear-gradient(135deg, rgb(228,30,30), rgb(181,18,18))",
                boxShadow:
                  "0 0 12px rgba(228,30,30,0.35), 0 0 24px rgba(228,30,30,0.2)",
              }}
            >
              <div className="relative z-10 px-6 py-2 bg-[#0b0000] rounded-md text-white font-semibold transition-all duration-300 group-hover:bg-[#150000] group-hover:scale-[1.03]">
                subscribe
              </div>

              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{
                  background:
                    "radial-gradient(circle, rgba(228,30,30,0.18) 0%, transparent 70%)",
                  filter: "blur(14px)",
                }}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <p className="relative z-10 pt-6 text-center text-xs md:text-sm pb-6 text-gray-500 bg-black">
        Copyright 2025 ©{" "}
        <span className="text-[#E41E1E] font-semibold">Aivora</span>. All Right
        Reserved.
      </p>
    </footer>
  );
};

export default Footer;
