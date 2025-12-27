import React, { useState, useRef, useEffect } from "react";

// Mock assets - replace with your actual imports
const assets = {
  star_icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23E41E1E'%3E%3Cpath d='M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z'/%3E%3C/svg%3E",
  star_dull_icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23404040'%3E%3Cpath d='M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z'/%3E%3C/svg%3E"
};

const dummyTestimonialData = [
  {
    name: "Adam Levine",
    title: "Musician & Performer",
    content: "In the past, visualizing concepts for client pitches took days. The AI image generation here is startlingly distinct; it captures the mood and lighting I describe with nuanced precision. It has transformed our storyboarding process, allowing us to present bespoke visuals rather than generic placeholders. An essential tool for modern design.",
    rating: 4,
    image: "https://cdn.prod.website-files.com/6870d025f9791b2b2e1a0faa/68fdf000262acd5af07fc609_artisans-de-geneve-adam-levine-2023.png"
  },
  {
    name: "Lenny Kravitz",
    title: "Rock Icon",
    content: "I am usually skeptical of automated writing, but the article generator offers a surprising depth of context. It doesn’t just assemble sentences; it understands flow and structure. It has become indispensable for drafting heavy outlines, allowing me to focus my energy on the final creative polish rather than the blank page.",
    rating: 4,
    image: "https://cdn.prod.website-files.com/6870d025f9791b2b2e1a0faa/691c5fdd57069912635c41b9_%C2%A92016_MathieuBittonL1001560-Edit_HR.jpg"
  },
  {
    name: "Lance Armstrong",
    title: "Athlete & Entrepreneur",
    content: "For our product catalog, post-processing is usually a significant bottleneck. The background removal tool is exceptionally precise, handling fine details like hair and shadows without the jagged edges typical of other software. What used to take hours in complex design suites is now accomplished in moments, without sacrificing quality.",
    rating: 5,
    image: "https://cdn.prod.website-files.com/6870d025f9791b2b2e1a0faa/691c5f3586fc3bbc6cb12e72__Z2A2634.JPG"
  },
  {
    name: "John McEnroe",
    title: "Tennis Legend",
    content: "I used the resume review feature while pivoting industries. The feedback was not merely grammatical; it was structural and tonal. It helped me elevate my professional narrative from a list of duties to a compelling story of leadership. I walked into my interviews feeling significantly more confident in my personal branding.",
    rating: 5,
    image: "https://cdn.prod.website-files.com/6870d025f9791b2b2e1a0faa/691c60bd79da7ac50793a896_JME_14.jpg"
  },
  {
    name: "Spike Lee",
    title: "Filmmaker",
    content: "Creative block is inevitable, but the blog title generator acts as an excellent intellectual spark. It provides variations I hadn't considered, balancing SEO requirements with genuine linguistic hook. It is a subtle tool, but one that has significantly improved our click-through rates by offering fresh, compelling angles for our content.",
    rating: 5,
    image: "https://cdn.prod.website-files.com/6870d025f9791b2b2e1a0faa/691c61997734e4b097ab2a78_Spike_Lee_MHAG_04252017_03_460_dark.jpg"
  },
  {
    name: "Andrea Pirlo",
    title: "Football Legend",
    content: "The object removal feature is remarkably intuitive. I often need to sanitize images for corporate use, removing distracting elements or unwanted branding. The AI fills the void seamlessly, maintaining the original texture and lighting gradients. It allows me to salvage perfect shots that were otherwise ruined by background clutter.",
    rating: 5,
    image: "https://cdn.prod.website-files.com/6870d025f9791b2b2e1a0faa/691c411ffe0c2983e34e323a_Andrea%20Pirlo..webp"
  },
  {
    name: "Rubens Barrichello",
    title: "F1 Driver",
    content: "Efficiency is the ultimate luxury for a small team. This platform feels like having a dedicated creative assistant on standby. Whether I’m cleaning up a presentation slide or generating initial copy for a campaign, the interface is unobtrusive and elegant. It quietly empowers us to deliver agency-level work on a startup budget.",
    rating: 5,
    image: "https://cdn.prod.website-files.com/6870d025f9791b2b2e1a0faa/691c708920542f45bca4f5c1_ag_barri_story_portrait_001.jpg"
  },
  {
    name: "Juan Pablo Montoya",
    title: "Racing Champion",
    content: "I recommend this tool to many of my clients for the resume review function alone. It offers the kind of objective, sophisticated critique that usually costs hundreds of dollars. It strips away the fluff and ensures the language is active and impactful. A truly refined piece of software.",
    rating: 5,
    image: "https://cdn.prod.website-files.com/6870d025f9791b2b2e1a0faa/691c3f9bda2f0331fdc27262_Montoya.png"
  },
  {
    name: "Mika Häkkinen",
    title: "F1 World Champion",
    content: "Managing multiple accounts requires a constant stream of fresh assets. The ability to generate unique AI imagery and instantly remove backgrounds in the same window has streamlined my workflow immensely. It feels robust and reliable, not experimental. It is a sophisticated solution that respects a professional’s time.",
    rating: 4,
    image: "https://cdn.prod.website-files.com/6870d025f9791b2b2e1a0faa/691c76a0b4c691e6f8869dfe_Mika_Ha%CC%88kkinnen.jpg"
  }
];

const Testimonial = () => {
  const scrollContainerRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  const autoScrollIntervalRef = useRef(null);

  // Auto-scroll functionality
  useEffect(() => {
    if (!isAutoScrolling || !scrollContainerRef.current) return;

    autoScrollIntervalRef.current = setInterval(() => {
      const container = scrollContainerRef.current;
      if (!container) return;

      const maxScroll = container.scrollWidth - container.clientWidth;
      const currentScroll = container.scrollLeft;

      // Scroll by 1px for smooth continuous motion
      if (currentScroll >= maxScroll - 1) {
        // Reset to beginning smoothly
        container.scrollLeft = 0;
      } else {
        container.scrollLeft += 1;
      }
    }, 30); // 30ms interval for smooth 60fps animation

    return () => {
      if (autoScrollIntervalRef.current) {
        clearInterval(autoScrollIntervalRef.current);
      }
    };
  }, [isAutoScrolling]);

  // Handle mouse down
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setIsAutoScrolling(false);
    setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeft(scrollContainerRef.current.scrollLeft);
    scrollContainerRef.current.style.cursor = 'grabbing';
  };

  // Handle mouse leave
  const handleMouseLeave = () => {
    setIsDragging(false);
    scrollContainerRef.current.style.cursor = 'grab';
    // Resume auto-scroll after 3 seconds
    setTimeout(() => setIsAutoScrolling(true), 3000);
  };

  // Handle mouse up
  const handleMouseUp = () => {
    setIsDragging(false);
    scrollContainerRef.current.style.cursor = 'grab';
    // Resume auto-scroll after 3 seconds
    setTimeout(() => setIsAutoScrolling(true), 3000);
  };

  // Handle mouse move
  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Scroll speed multiplier
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
  };

  // Pause auto-scroll on hover
  const handleCardMouseEnter = (index) => {
    setHoveredIndex(index);
    setIsAutoScrolling(false);
  };

  const handleCardMouseLeave = () => {
    setHoveredIndex(null);
    // Resume auto-scroll after 2 seconds
    setTimeout(() => setIsAutoScrolling(true), 2000);
  };

  return (
    <div className='relative py-24 bg-black overflow-hidden'>
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23E41E1E' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: "60px 60px",
          }}
        />
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-red-900/5 rounded-full blur-[120px] animate-pulse-slow" />
        <div className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] bg-red-900/4 rounded-full blur-[100px] animate-pulse-slower" />
      </div>

      <div className='relative z-10'>
        {/* Header Section */}
        <div className='text-center mb-16 px-4 sm:px-20 xl:px-32'>
          <h2 className='text-white text-5xl font-bold mb-4'>
            Loved by{" "}
            <span
              className="relative inline-block"
              style={{
                color: "#E41E1E",
                textShadow:
                  "0 0 20px rgba(228, 30, 30, 0.5), 0 0 40px rgba(228, 30, 30, 0.3)",
              }}
            >
              Creators
            </span>
          </h2>
          <p className='text-gray-500 max-w-2xl mx-auto text-lg'>
            Don't just take our word for it. Here's what our users are saying about their experience.
          </p>
        </div>

        {/* Draggable Horizontal Carousel with Auto-Scroll */}
        <div 
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto scrollbar-hide px-4 sm:px-20 xl:px-32 pb-8"
          style={{
            cursor: 'grab',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            WebkitOverflowScrolling: 'touch',
          }}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
        >
          {/* Duplicate items for infinite scroll effect */}
          {[...dummyTestimonialData, ...dummyTestimonialData].map((testimonial, index) => (
            <div
              key={index}
              className="relative flex-shrink-0 group"
              style={{
                width: 'clamp(300px, 28vw, 420px)',
                height: 'clamp(450px, 42vw, 630px)',
              }}
              onMouseEnter={() => handleCardMouseEnter(index)}
              onMouseLeave={handleCardMouseLeave}
            >
              {/* Image Container */}
              <div 
                className="relative w-full h-full overflow-hidden rounded-2xl"
                style={{
                  border: '1px solid rgba(228, 30, 30, 0.15)',
                  boxShadow: hoveredIndex === index 
                    ? '0 20px 60px rgba(228, 30, 30, 0.3)' 
                    : '0 10px 40px rgba(0, 0, 0, 0.5)',
                  transition: 'box-shadow 0.6s ease',
                }}
              >
                {/* Background Image with Zoom Effect */}
                <div 
                  className="absolute inset-0 transition-transform duration-700 ease-out"
                  style={{
                    transform: hoveredIndex === index ? 'scale(1.08)' : 'scale(1)',
                  }}
                >
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-full h-full object-cover"
                    style={{
                      filter: 'grayscale(30%) brightness(0.85)',
                      pointerEvents: 'none',
                    }}
                    draggable="false"
                  />
                </div>

                {/* Dark Overlay on Hover */}
                <div 
                  className="absolute inset-0 transition-opacity duration-500"
                  style={{
                    background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.8) 100%)',
                    opacity: hoveredIndex === index ? 1 : 0,
                  }}
                />

                {/* Red Accent Border Glow on Hover */}
                <div 
                  className="absolute inset-0 rounded-2xl transition-opacity duration-500 pointer-events-none"
                  style={{
                    boxShadow: 'inset 0 0 80px rgba(228, 30, 30, 0.4)',
                    opacity: hoveredIndex === index ? 1 : 0,
                  }}
                />

                {/* Content Overlay - Slides Up on Hover */}
                <div 
                  className="absolute inset-0 flex flex-col justify-end p-8 transition-all duration-500"
                  style={{
                    transform: hoveredIndex === index ? 'translateY(0)' : 'translateY(20px)',
                    opacity: hoveredIndex === index ? 1 : 0,
                  }}
                >
                  {/* Quote Mark */}
                  <div 
                    className="text-red-600 mb-4"
                    style={{
                      fontSize: '60px',
                      lineHeight: 0.5,
                      fontFamily: 'Georgia, serif',
                      textShadow: '0 0 20px rgba(228, 30, 30, 0.6)',
                    }}
                  >
                    "
                  </div>

                  {/* Testimonial Text */}
                  <p className="text-white text-sm leading-relaxed mb-6 line-clamp-6 font-light">
                    {testimonial.content}
                  </p>

                  {/* Rating Stars */}
                  <div className="flex items-center gap-1 mb-4">
                    {Array(5).fill(0).map((_, starIndex) => (
                      <img
                        key={starIndex}
                        src={starIndex < testimonial.rating ? assets.star_icon : assets.star_dull_icon}
                        className='w-4 h-4'
                        alt="star"
                        style={{
                          filter: starIndex < testimonial.rating 
                            ? 'drop-shadow(0 0 8px rgba(228, 30, 30, 0.8))' 
                            : 'none'
                        }}
                        draggable="false"
                      />
                    ))}
                  </div>

                  {/* Author Info */}
                  <div>
                    <h3 
                      className="text-white text-xl font-bold mb-1"
                      style={{
                        textShadow: '0 0 20px rgba(228, 30, 30, 0.4)',
                      }}
                    >
                      {testimonial.name}
                    </h3>
                    <p className="text-gray-400 text-xs uppercase tracking-wider">
                      {testimonial.title}
                    </p>
                  </div>
                </div>

                {/* Name Badge - Always Visible at Bottom */}
                <div 
                  className="absolute bottom-0 left-0 right-0 p-6 transition-opacity duration-500"
                  style={{
                    background: 'linear-gradient(to top, rgba(0, 0, 0, 0.9) 0%, transparent 100%)',
                    opacity: hoveredIndex === index ? 0 : 1,
                  }}
                >
                  <h3 className="text-white text-xl font-bold">
                    {testimonial.name}
                  </h3>
                  <p className="text-gray-400 text-sm">
                    {testimonial.title}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Scroll Indicator */}
        <div className="flex justify-center items-center gap-3 mt-12 px-4">
          <div className="flex items-center gap-2 text-gray-500 text-sm">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
            </svg>
            <span>Auto-scrolling • Drag to explore</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </div>
        </div>

        {/* Bottom CTA Section */}
        <div className='text-center mt-20 px-4'>
          <p className='text-gray-500 mb-6 text-lg'>
            Join thousands of satisfied creators
          </p>
          {/* <button
            className='px-10 py-4 rounded-lg font-semibold transition-all duration-300 text-lg'
            style={{
              background: 'linear-gradient(135deg, #E41E1E 0%, #B01818 100%)',
              color: 'white',
              border: '1px solid rgba(228, 30, 30, 0.5)',
              boxShadow: '0 4px 20px rgba(228, 30, 30, 0.3)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-3px)';
              e.currentTarget.style.boxShadow = '0 8px 32px rgba(228, 30, 30, 0.5)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 20px rgba(228, 30, 30, 0.3)';
            }}
          >
            Start Creating Today
          </button> */}
        </div>
      </div>

      <style jsx>{`
        @keyframes pulse-slow {
          0%, 100% {
            opacity: 0.3;
          }
          50% {
            opacity: 0.5;
          }
        }

        @keyframes pulse-slower {
          0%, 100% {
            opacity: 0.2;
          }
          50% {
            opacity: 0.35;
          }
        }

        .animate-pulse-slow {
          animation: pulse-slow 5s ease-in-out infinite;
        }

        .animate-pulse-slower {
          animation: pulse-slower 7s ease-in-out infinite;
        }

        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }

        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        .line-clamp-6 {
          display: -webkit-box;
          -webkit-line-clamp: 6;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default Testimonial;