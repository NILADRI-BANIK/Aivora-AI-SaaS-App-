import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import userGroupImage from "../assets/user_group.png";

const Hero = () => {
  const navigate = useNavigate();
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const seconds = time.getSeconds();
  const minutes = time.getMinutes();
  const hours = time.getHours() % 12;
  const day = time.getDay();
  const month = time.getMonth();

  const secondRotation = (seconds / 60) * 360;
  const minuteRotation = (minutes / 60) * 360;
  const hourRotation = ((hours + minutes / 60) / 12) * 360;
  const dayRotation = (day / 7) * 360;
  const monthRotation = (month / 12) * 360;

  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  return (
    <div className="w-full min-h-screen bg-black text-white relative overflow-hidden pt-20">
      {/* Animated Hexagon Pattern Background with Red Light Sweep */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Base Hexagon Pattern */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='28' height='49' viewBox='0 0 28 49' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='1' fill-rule='evenodd'%3E%3Cpath d='M13.99 9.25l13 7.5v15l-13 7.5L1 31.75v-15l12.99-7.5zM3 17.9v12.7l10.99 6.34 11-6.35V17.9l-11-6.34L3 17.9zM0 15l12.98-7.5V0h-2v6.35L0 12.69v2.3zm0 18.5L12.98 41v8h-2v-6.85L0 35.81v-2.3zM15 0v7.5L27.99 15H28v-2.31h-.01L17 6.35V0h-2zm0 49v-8l12.99-7.5H28v2.31h-.01L17 42.15V49h-2z'/%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: "28px 49px",
          }}
        />

        {/* Animated Red Light Sweep */}
        <div
          className="absolute inset-0 animate-light-sweep"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, rgba(228, 30, 30, 0.15) 40%, rgba(228, 30, 30, 0.3) 50%, rgba(228, 30, 30, 0.15) 60%, transparent 100%)",
            backgroundSize: "200% 100%",
            animation: "light-sweep 8s ease-in-out infinite",
          }}
        />

        {/* Additional Red Light Sweep (Opposite Direction) */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(-90deg, transparent 0%, rgba(228, 30, 30, 0.1) 40%, rgba(228, 30, 30, 0.2) 50%, rgba(228, 30, 30, 0.1) 60%, transparent 100%)",
            backgroundSize: "200% 100%",
            animation: "light-sweep-reverse 12s ease-in-out infinite",
          }}
        />
      </div>

      {/* Static Red Glow Effects */}
      <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-red-900/10 rounded-full blur-[150px] animate-pulse-slow" />
      <div className="absolute bottom-1/4 left-1/4 w-[500px] h-[500px] bg-red-900/8 rounded-full blur-[120px] animate-pulse-slower" />

      {/* Radial Gradient Vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at center, transparent 0%, rgba(0, 0, 0, 0.4) 100%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 py-28 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
        {/* ================= LEFT CONTENT ================= */}
        <div className="flex flex-col items-start space-y-8">
          <h1 className="text-5xl sm:text-6xl xl:text-7xl font-bold leading-[1.1]">
            Create amazing content{" "}
            <span className="relative inline-block">
              <span
                style={{
                  color: "#fff",
                  textShadow:
                    "0 0 .5rem #fff, 0 0 .5rem #ff013799, 0 0 3rem #ff013799, 0 0 7.5rem #e41e1e",
                }}
              >
                with
              </span>
              <div className="absolute -bottom-2 left-0 right-0 h-1 bg-red-600/40 blur-md" />
            </span>
            <br />
            <span
              style={{
                color: "#fff",
                textShadow:
                  "0 0 .5rem #fff, 0 0 .5rem #ff013799, 0 0 3rem #ff013799, 0 0 7.5rem #e41e1e",
              }}
            >
              AI tools
            </span>
          </h1>

          <p className="text-lg text-gray-300 max-w-lg leading-relaxed">
            An all-in-one AI SaaS platform that helps you generate high-quality
            articles, blog titles, and AI images, review resumes intelligently,
            and remove backgrounds or unwanted objects — all in seconds with
            powerful AI tools.
          </p>

          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => navigate("/ai")}
              className="group relative overflow-hidden"
              style={{
                background: "linear-gradient(135deg, #e41e1e, #b51212)",
                padding: "2px",
                borderRadius: "0.5rem",
                transition: "all 0.35s ease",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                border: "none",
                cursor: "pointer",
                boxShadow:
                  "0 0 12px rgba(228,30,30,0.35), 0 0 24px rgba(228,30,30,0.2)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow =
                  "0 0 18px rgba(228,30,30,0.55), 0 0 36px rgba(228,30,30,0.35)";
                e.currentTarget.style.transform = "scale(1.03)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow =
                  "0 0 12px rgba(228,30,30,0.35), 0 0 24px rgba(228,30,30,0.2)";
                e.currentTarget.style.transform = "scale(1)";
              }}
            >
              {/* Subtle Border Gradient */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(255,255,255,0.08), rgba(228,30,30,0.25))",
                  borderRadius: "0.5rem",
                }}
              />

              {/* Button Body */}
              <div
                className="relative z-10 px-8 py-4 rounded-[0.4rem]
    bg-[#0b0000] flex items-center justify-center
    transition-colors duration-300
    group-hover:bg-[#150000]"
              >
                <span className="font-semibold text-white">
                  Start creating now
                </span>
              </div>

              {/* Soft Hover Glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100
    transition-opacity duration-300 pointer-events-none"
                style={{
                  background:
                    "radial-gradient(circle, rgba(228,30,30,0.18) 0%, transparent 70%)",
                  filter: "blur(14px)",
                }}
              />
            </button>

            <button
              className="group relative overflow-hidden"
              style={{
                background: "linear-gradient(135deg, #e41e1e, #b51212)",
                padding: "2px",
                borderRadius: "0.5rem",
                transition: "all 0.35s ease",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                border: "none",
                cursor: "pointer",
                boxShadow:
                  "0 0 12px rgba(228,30,30,0.35), 0 0 24px rgba(228,30,30,0.2)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow =
                  "0 0 18px rgba(228,30,30,0.55), 0 0 36px rgba(228,30,30,0.35)";
                e.currentTarget.style.transform = "scale(1.03)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow =
                  "0 0 12px rgba(228,30,30,0.35), 0 0 24px rgba(228,30,30,0.2)";
                e.currentTarget.style.transform = "scale(1)";
              }}
            >
              {/* Subtle Border Gradient */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(255,255,255,0.08), rgba(228,30,30,0.25))",
                  borderRadius: "0.5rem",
                }}
              />

              {/* Button Body */}
              <div
                className="relative z-10 px-8 py-4 rounded-[0.4rem]
      bg-[#0b0000] flex items-center justify-center
      transition-colors duration-300
      group-hover:bg-[#150000]"
              >
                <span className="font-semibold text-white">Watch Demo</span>
              </div>

              {/* Soft Hover Glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100
      transition-opacity duration-300 pointer-events-none"
                style={{
                  background:
                    "radial-gradient(circle, rgba(228,30,30,0.18) 0%, transparent 70%)",
                  filter: "blur(14px)",
                }}
              />
            </button>
          </div>

          <div className="flex items-center gap-6 pt-4">
            <img src={userGroupImage} alt="User Group" />
            <div className="text-gray-300">
              <div className="font-semibold text-white">
                Trusted by enterprises
              </div>
              <div className="text-sm text-gray-400">
                help 10,000+ users worldwide
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 pt-6 w-full max-w-lg">
            <div className="space-y-1">
              <div className="text-3xl font-bold text-white">99.9%</div>
              <div className="text-xs text-gray-400">Accurate results</div>
            </div>

            <div className="space-y-1">
              <div className="text-3xl font-bold text-white">&lt;2s</div>
              <div className="text-xs text-gray-400">Response Time</div>
            </div>

            <div className="space-y-1">
              <div className="text-3xl font-bold text-white">24/7</div>
              <div className="text-xs text-gray-400">Monitoring</div>
            </div>
          </div>
        </div>

        {/* ================= RIGHT CLOCK ================= */}
        <div className="flex justify-center lg:justify-end">
          <div className="relative w-[350px] h-[350px] sm:w-[500px] sm:h-[500px]">
            {/* Outer Glow Ring */}
            <div className="absolute inset-0 rounded-full bg-red-900/10 blur-3xl animate-pulse-slow" />

            {/* Seconds Ring */}
            <ClockRing
              size={500}
              rotation={secondRotation}
              label={seconds}
              color="bg-black/80"
              speed="duration-1000"
              showTicks={60}
              tickInterval={6}
              borderColor="border-zinc-800/60"
            />

            {/* Minutes Ring */}
            <ClockRing
              size={400}
              rotation={minuteRotation}
              label={minutes}
              color="bg-black/70"
              speed="duration-2000"
              showTicks={60}
              tickInterval={6}
              borderColor="border-zinc-700/60"
            />

            {/* Hours Ring - Active */}
            <ClockRing
              size={310}
              rotation={hourRotation}
              label={hours === 0 ? 12 : hours}
              color="bg-black/60"
              speed="duration-3000"
              showTicks={12}
              tickInterval={30}
              isActive={true}
              borderColor="border-red-900/40"
            />

            {/* Day Ring */}
            <ClockRing
              size={230}
              rotation={dayRotation}
              label={days[day]}
              color="bg-black/50"
              speed="duration-[4000ms]"
              showTicks={7}
              tickInterval={51.4}
              borderColor="border-zinc-600/50"
            />

            {/* Month Ring */}
            <ClockRing
              size={160}
              rotation={monthRotation}
              label={months[month]}
              color="bg-black/40"
              speed="duration-[5000ms]"
              showTicks={12}
              tickInterval={30}
              borderColor="border-zinc-500/40"
            />

            {/* Center Year Display */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div
                className="relative w-24 h-24 rounded-full border-2 border-red-600
              flex items-center justify-center bg-black shadow-[0_0_60px_rgba(228,30,30,0.5)]
              hover:shadow-[0_0_80px_rgba(228,30,30,0.7)] transition-all duration-300"
              >
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-red-900/30 via-transparent to-transparent" />
                <div className="absolute inset-0 rounded-full animate-spin-slow bg-gradient-to-r from-red-900/20 to-transparent" />
                <span className="text-red-600 font-bold text-xl relative z-10 drop-shadow-[0_0_10px_rgba(228,30,30,0.8)]">
                  {time.getFullYear()}
                </span>
              </div>
            </div>

            {/* Orbiting Security Indicators */}
            <div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
              style={{ width: 520, height: 520 }}
            >
              <div
                className="absolute top-0 left-1/2 w-4 h-4 rounded-full bg-red-600 shadow-[0_0_20px_rgba(228,30,30,1)] animate-ping-slow"
                style={{
                  animation: "orbit 10s linear infinite",
                  transformOrigin: "0 260px",
                }}
              />
              <div
                className="absolute top-0 left-1/2 w-3 h-3 rounded-full bg-red-600 border-2 border-red-900"
                style={{
                  animation: "orbit 10s linear infinite",
                  transformOrigin: "0 260px",
                }}
              />
            </div>

            {/* Second Orbiting Dot (Opposite) */}
            <div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
              style={{ width: 420, height: 420 }}
            >
              <div
                className="absolute top-0 left-1/2 w-3 h-3 rounded-full bg-red-600 shadow-[0_0_15px_rgba(220,38,38,0.8)]"
                style={{
                  animation: "orbit-reverse 15s linear infinite",
                  transformOrigin: "0 210px",
                }}
              />
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes light-sweep {
          0%,
          100% {
            background-position: -100% 0;
          }
          50% {
            background-position: 200% 0;
          }
        }

        @keyframes light-sweep-reverse {
          0%,
          100% {
            background-position: 200% 0;
          }
          50% {
            background-position: -100% 0;
          }
        }

        @keyframes orbit {
          from {
            transform: translateX(-50%) translateY(-50%) rotate(0deg)
              translateY(-260px);
          }
          to {
            transform: translateX(-50%) translateY(-50%) rotate(360deg)
              translateY(-260px);
          }
        }

        @keyframes orbit-reverse {
          from {
            transform: translateX(-50%) translateY(-50%) rotate(360deg)
              translateY(-210px);
          }
          to {
            transform: translateX(-50%) translateY(-50%) rotate(0deg)
              translateY(-210px);
          }
        }

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

        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes ping-slow {
          0%,
          100% {
            opacity: 0;
            transform: scale(0.8);
          }
          50% {
            opacity: 0.5;
            transform: scale(1.2);
          }
        }

        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }

        .animate-pulse-slower {
          animation: pulse-slower 6s ease-in-out infinite;
        }

        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }

        .animate-ping-slow {
          animation: ping-slow 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

/* ================= ENHANCED CLOCK RING ================= */
const ClockRing = ({
  size,
  rotation,
  label,
  color = "bg-black/60",
  speed = "duration-1000",
  showTicks = 0,
  tickInterval = 6,
  isActive = false,
  borderColor = "border-gray-800/50",
}) => {
  return (
    <div
      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
      style={{ width: size, height: size }}
    >
      <div
        className={`absolute inset-0 rounded-full border-2 ${borderColor} 
        transition-all ${speed} ease-out backdrop-blur-sm
        ${isActive ? "shadow-[0_0_30px_rgba(228,30,30,0.3)]" : ""}`}
        style={{
          transform: `rotate(${rotation}deg)`,
        }}
      >
        {/* Inner dashed ring */}
        <div
          className={`absolute inset-[3px] rounded-full border border-dashed ${
            isActive ? "border-red-900/40" : "border-gray-700/20"
          } ${color} backdrop-blur-md`}
        />

        {/* Active indicator glow */}
        {isActive && (
          <div className="absolute inset-[-15px] rounded-full bg-red-900/5 blur-xl" />
        )}

        {/* Tick Marks */}
        {showTicks > 0 &&
          Array.from({ length: showTicks }).map((_, i) => {
            const isMajorTick = i % (showTicks / 4) === 0;
            return (
              <div
                key={i}
                className="absolute left-1/2 top-0 -translate-x-1/2"
                style={{
                  transform: `rotate(${i * tickInterval}deg)`,
                  transformOrigin: `0 ${size / 2}px`,
                  height: size / 2,
                }}
              >
                <div
                  className={`w-0.5 mx-auto rounded-full ${
                    isMajorTick
                      ? "bg-red-600/80 h-3 shadow-[0_0_5px_rgba(228,30,30,0.5)]"
                      : "bg-gray-600/30 h-1.5"
                  }`}
                />
              </div>
            );
          })}

        {/* Active Label */}
        <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-8">
          <div
            className={`px-3 py-1.5 rounded-full backdrop-blur-md ${
              isActive
                ? "bg-red-600 text-white font-bold shadow-[0_0_20px_rgba(228,30,30,0.6)] border-2 border-red-900/50"
                : "bg-black/60 text-red-600 font-semibold border border-gray-700/50"
            } text-sm transition-all duration-300 hover:scale-110`}
          >
            {label}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;