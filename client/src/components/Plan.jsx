import React from 'react'
import { PricingTable } from '@clerk/clerk-react'

const Plan = () => {
    return (
        <div className='relative min-h-screen bg-black overflow-hidden'>
            {/* Animated Background Effects */}
            <div className='absolute inset-0 pointer-events-none'>
                {/* Pulsing Red Circles */}
                <div 
                    className='absolute top-20 left-1/4 w-96 h-96 rounded-full opacity-20'
                    style={{
                        background: 'radial-gradient(circle, #E41E1E 0%, transparent 70%)',
                        filter: 'blur(80px)',
                        animation: 'pulse 4s ease-in-out infinite'
                    }}
                />
                <div 
                    className='absolute bottom-20 right-1/4 w-96 h-96 rounded-full opacity-20'
                    style={{
                        background: 'radial-gradient(circle, #E41E1E 0%, transparent 70%)',
                        filter: 'blur(80px)',
                        animation: 'pulse 6s ease-in-out infinite'
                    }}
                />
                
                {/* Geometric Pattern Overlay */}
                <svg className='absolute inset-0 w-full h-full opacity-5' xmlns='http://www.w3.org/2000/svg'>
                    <defs>
                        <pattern id='grid' width='40' height='40' patternUnits='userSpaceOnUse'>
                            <path d='M 40 0 L 0 0 0 40' fill='none' stroke='#E41E1E' strokeWidth='0.5'/>
                        </pattern>
                    </defs>
                    <rect width='100%' height='100%' fill='url(#grid)' />
                </svg>
            </div>

            {/* Content Container */}
            <div className='relative max-w-6xl mx-auto px-4 sm:px-8 lg:px-12 py-12 z-10'>
                {/* Header Section */}
                <div className='text-center mb-12'>
                    {/* Decorative Top Line */}
                    <div className='flex items-center justify-center gap-3 mb-6'>
                        <div className='h-px w-12 bg-gradient-to-r from-transparent to-red-600'></div>
                        <div className='w-2 h-2 rounded-full bg-red-600' style={{
                            boxShadow: '0 0 10px #E41E1E, 0 0 20px #E41E1E'
                        }}></div>
                        <div className='h-px w-12 bg-gradient-to-l from-transparent to-red-600'></div>
                    </div>

                    {/* Main Heading */}
                    <h2 
                        className='text-white text-5xl sm:text-6xl font-bold mb-4'
                        style={{
                            textShadow: '0 0 20px rgba(228, 30, 30, 0.5), 0 0 40px rgba(228, 30, 30, 0.3)'
                        }}
                    >
                        Choose Your <span className='text-red-600'>Plan</span>
                    </h2>

                    {/* Subheading */}
                    <p className='text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed mb-6'>
                        Start for free and scale up as you grow. Find the perfect plan for your content creation needs.
                    </p>

                    {/* Decorative Bottom Line */}
                    <div className='flex items-center justify-center gap-2'>
                        <div className='w-1 h-1 rounded-full bg-red-600 opacity-50'></div>
                        <div className='w-1 h-1 rounded-full bg-red-600 opacity-70'></div>
                        <div className='w-2 h-2 rounded-full bg-red-600'></div>
                        <div className='w-1 h-1 rounded-full bg-red-600 opacity-70'></div>
                        <div className='w-1 h-1 rounded-full bg-red-600 opacity-50'></div>
                    </div>
                </div>

                {/* Pricing Table Container with Futuristic Border */}
                <div 
                    className='relative rounded-2xl p-4 sm:p-8 lg:p-12'
                    style={{
                        background: 'linear-gradient(135deg, rgba(228, 30, 30, 0.05) 0%, rgba(0, 0, 0, 0.8) 100%)',
                        border: '1px solid rgba(228, 30, 30, 0.3)',
                        boxShadow: '0 8px 32px rgba(228, 30, 30, 0.15), inset 0 1px 0 rgba(228, 30, 30, 0.1)',
                        maxWidth: '900px'
                    }}
                >
                    {/* Corner Decorations */}
                    <div className='absolute top-0 left-0 w-20 h-20 pointer-events-none'>
                        <svg width='100%' height='100%' viewBox='0 0 80 80'>
                            <path d='M 0 10 L 10 0 M 0 20 L 20 0' stroke='#E41E1E' strokeWidth='1' fill='none' opacity='0.5'/>
                        </svg>
                    </div>
                    <div className='absolute top-0 right-0 w-20 h-20 pointer-events-none'>
                        <svg width='100%' height='100%' viewBox='0 0 80 80'>
                            <path d='M 80 10 L 70 0 M 80 20 L 60 0' stroke='#E41E1E' strokeWidth='1' fill='none' opacity='0.5'/>
                        </svg>
                    </div>
                    <div className='absolute bottom-0 left-0 w-20 h-20 pointer-events-none'>
                        <svg width='100%' height='100%' viewBox='0 0 80 80'>
                            <path d='M 0 70 L 10 80 M 0 60 L 20 80' stroke='#E41E1E' strokeWidth='1' fill='none' opacity='0.5'/>
                        </svg>
                    </div>
                    <div className='absolute bottom-0 right-0 w-20 h-20 pointer-events-none'>
                        <svg width='100%' height='100%' viewBox='0 0 80 80'>
                            <path d='M 80 70 L 70 80 M 80 60 L 60 80' stroke='#E41E1E' strokeWidth='1' fill='none' opacity='0.5'/>
                        </svg>
                    </div>

                    {/* Pricing Table - Constrained Width */}
                    <div className='relative z-10'>
                        <div className="pricing-table-wrapper" style={{
                            maxWidth: '100%',
                            overflowX: 'auto',
                            padding: '0 10px 0 0'
                        }}>
                            <PricingTable />
                        </div>
                    </div>
                </div>
            </div>

            {/* Add custom CSS for Clerk Pricing Table */}
            <style>{`
                @keyframes pulse {
                    0%, 100% {
                        opacity: 0.15;
                        transform: scale(1);
                    }
                    50% {
                        opacity: 0.25;
                        transform: scale(1.1);
                    }
                }

                /* Target Clerk's Pricing Table specifically */
                .cl-pricing-table {
                    max-width: 100% !important;
                    width: 100% !important;
                }

                .cl-pricing-table-container {
                    max-width: 100% !important;
                    overflow: hidden !important;
                }

                /* Make table responsive on smaller screens */
                @media (max-width: 768px) {
                    .cl-pricing-table {
                        min-width: 600px !important;
                    }
                    .pricing-table-wrapper {
                        overflow-x: auto !important;
                        -webkit-overflow-scrolling: touch !important;
                        padding-bottom: 10px !important;
                    }
                }

                /* Ensure popups have enough space */
                .cl-modalContent {
                    z-index: 9999 !important;
                }
            `}</style>
        </div>
    )
}

export default Plan