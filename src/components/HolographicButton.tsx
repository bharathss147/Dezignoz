import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const HolographicButton = () => {
    const [isHovered, setIsHovered] = useState(false);
    const [isClicked, setIsClicked] = useState(false);
    const navigate = useNavigate();

    // Trigger animation when the component scrolls into view
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.3 });

    const handleClick = () => {
        setIsClicked(true);
        // Play the bright flash and explosion before navigating
        setTimeout(() => {
            navigate('/start-project');
        }, 850);
    };

    return (
        <div ref={ref} className="relative w-[350px] md:w-[500px] h-[350px] md:h-[500px] flex items-center justify-center mx-auto pointer-events-auto group mt-20">
            {/* Ambient Space Glow */}
            <motion.div
                className="absolute inset-0 rounded-full bg-cyan-600/10 blur-[100px]"
                animate={{
                    opacity: isClicked ? 0 : (isHovered ? 1 : 0.6),
                    scale: isHovered ? 1.2 : 1
                }}
                transition={{ duration: 0.8 }}
            />

            {/* Energy Ripple on Hover */}
            <motion.div
                className="absolute m-auto w-36 h-36 rounded-full border border-cyan-400/60 mix-blend-screen pointer-events-none"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={isHovered && !isClicked ? {
                    scale: [1, 2.5, 4.5],
                    opacity: [0.8, 0.4, 0]
                } : { scale: 0.8, opacity: 0 }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut" }}
            />

            {/* Assemble wrapper (Jarvis boot-up sequence) */}
            <motion.div
                className="absolute w-full h-full flex items-center justify-center pointer-events-none"
                initial={{ scale: 1.8, opacity: 0, rotate: -180 }}
                animate={isInView ? (isClicked ? { scale: 0, opacity: 0 } : { scale: 1, opacity: 1, rotate: 0 }) : { scale: 1.8, opacity: 0, rotate: -180 }}
                transition={{
                    duration: isClicked ? 0.6 : 1.8,
                    ease: isClicked ? "easeInOut" : [0.16, 1, 0.3, 1] // Custom spring-like easing for assemble
                }}
            >
                {/* HUD Ring 1 - Outer segmented (Iron Man style) */}
                <motion.div
                    className="absolute w-[95%] h-[95%] rounded-full opacity-70"
                    animate={{ rotate: 360 }}
                    transition={{ duration: isHovered ? 15 : 45, repeat: Infinity, ease: "linear" }}
                >
                    <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
                        {/* Micro dashed track */}
                        <circle cx="50" cy="50" r="49" fill="none" stroke="rgba(34,211,238,0.3)" strokeWidth="0.3" strokeDasharray="1 3" />
                        {/* Thick dynamic blocks */}
                        <circle cx="50" cy="50" r="47" fill="none" stroke="rgba(59,130,246,0.6)" strokeWidth="1.5" strokeDasharray="20 10 5 10" />
                        {/* Glowing point */}
                        <circle cx="50" cy="50" r="49" fill="none" stroke="rgba(34,211,238,1)" strokeWidth="1.5" strokeDasharray="1 99" />
                    </svg>
                </motion.div>

                {/* HUD Ring 2 - Middle complex and reverse rotating */}
                <motion.div
                    className="absolute w-[75%] h-[75%] rounded-full"
                    animate={{ rotate: -360 }}
                    transition={{ duration: isHovered ? 12 : 35, repeat: Infinity, ease: "linear" }}
                >
                    <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
                        {/* Fine inner border */}
                        <circle cx="50" cy="50" r="48" fill="none" stroke="#60a5fa" strokeWidth="0.5" strokeDasharray="3 5" className="opacity-40" />
                        {/* Scanning solid arc */}
                        <circle cx="50" cy="50" r="44" fill="none" stroke="rgba(34,211,238,0.8)" strokeWidth="0.8" strokeDasharray="40 60" />

                        {/* Crosshair indicators */}
                        <path d="M 50 2 L 50 6" stroke="#22d3ee" strokeWidth="1.5" strokeLinecap="round" />
                        <path d="M 50 94 L 50 98" stroke="#22d3ee" strokeWidth="1.5" strokeLinecap="round" />
                        <path d="M 2 50 L 6 50" stroke="#22d3ee" strokeWidth="1.5" strokeLinecap="round" />
                        <path d="M 94 50 L 98 50" stroke="#22d3ee" strokeWidth="1.5" strokeLinecap="round" />

                        {/* Triangle ticks */}
                        <path d="M 16 16 L 20 20" stroke="#60a5fa" strokeWidth="1" className="opacity-50" />
                        <path d="M 84 16 L 80 20" stroke="#60a5fa" strokeWidth="1" className="opacity-50" />
                        <path d="M 16 84 L 20 80" stroke="#60a5fa" strokeWidth="1" className="opacity-50" />
                        <path d="M 84 84 L 80 80" stroke="#60a5fa" strokeWidth="1" className="opacity-50" />
                    </svg>
                </motion.div>

                {/* HUD Ring 3 - Inner glowing solid ring responding to hover */}
                <motion.div
                    className="absolute w-[55%] h-[55%] rounded-full shadow-[inset_0_0_20px_rgba(34,211,238,0.15)]"
                    animate={{ rotate: 360, scale: isHovered ? 1.15 : 1 }}
                    transition={{
                        rotate: { duration: isHovered ? 8 : 25, repeat: Infinity, ease: "linear" },
                        scale: { duration: 0.5, ease: "easeOut" }
                    }}
                >
                    <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
                        {/* Bright segmented glow */}
                        <circle cx="50" cy="50" r="48" fill="none" stroke="rgba(34,211,238,0.7)" strokeWidth="1.5" strokeDasharray="60 40 10 90" />
                        <circle cx="50" cy="50" r="46" fill="none" stroke="#3b82f6" strokeWidth="0.5" className="opacity-60" />
                    </svg>
                </motion.div>

                {/* Data Arcs & Indicators (Static rotation base, internal moving parts) */}
                <motion.div
                    className="absolute w-[80%] h-[80%]"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                >
                </motion.div>

                {/* Micro floating particles within the rings */}
                {[...Array(8)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-full h-full"
                        initial={{ rotate: i * 45 }}
                        animate={{ rotate: (i % 2 === 0 ? 360 : -360) + (i * 45) }}
                        transition={{
                            duration: isHovered ? (8 + i * 2) : (20 + i * 4),
                            repeat: Infinity,
                            ease: "linear"
                        }}
                    >
                        <div
                            className={`absolute rounded-full shadow-[0_0_15px_rgba(34,211,238,0.9)] ${i % 2 === 0 ? 'bg-cyan-300 w-1 h-1' : 'bg-blue-400 w-1.5 h-1.5'}`}
                            style={{
                                top: `${15 + (i * 4)}%`,
                                left: `${50 + (i % 2 === 0 ? 3 : -3)}%`
                            }}
                        />
                    </motion.div>
                ))}
            </motion.div>

            {/* Hardware Scanning Line (Top to bottom) */}
            {isInView && (
                <motion.div
                    className="absolute w-[80%] h-[2px] bg-cyan-400/50 shadow-[0_0_15px_rgba(34,211,238,0.9),0_0_5px_rgba(255,255,255,0.8)] pointer-events-none rounded-full z-20"
                    animate={{ top: ['15%', '85%', '15%'] }}
                    transition={{ duration: isHovered ? 1.5 : 3, repeat: Infinity, ease: "linear" }}
                />
            )}

            {/* Bright Flash Animation (on click implosion) */}
            <AnimatePresence>
                {isClicked && (
                    <motion.div
                        className="absolute inset-0 m-auto w-40 h-40 bg-white rounded-full mix-blend-screen z-50 pointer-events-none"
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: [1, 25], opacity: [1, 0] }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    />
                )}
            </AnimatePresence>

            {/* The Central Button */}
            <motion.button
                onClick={handleClick}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className="relative z-30 font-display font-bold uppercase tracking-[0.2em] text-sm text-cyan-100 outline-none flex items-center justify-center"
                initial={{ scale: 0, opacity: 0 }}
                animate={isInView ? (isClicked ? { scale: 0, opacity: 0 } : { scale: 1, opacity: 1, zIndex: 50, y: isHovered ? -5 : 0 }) : { scale: 0, opacity: 0 }}
                transition={{
                    duration: isClicked ? 0.3 : 0.8,
                    delay: isInView && !isClicked && !isHovered ? 0.8 : 0, // Delay appearance until outer rings are forming
                    ease: "easeOut"
                }}
            >
                {/* Central Circle Button Background with Sci-fi Glassmorphism */}
                <motion.div
                    className="absolute inset-x-0 inset-y-0 m-auto w-40 h-40 md:w-44 md:h-44 rounded-full border-2 border-cyan-400/60 flex items-center justify-center -z-10 overflow-hidden"
                    animate={{
                        boxShadow: isHovered
                            ? "0 0 70px rgba(34,211,238,0.8), inset 0 0 40px rgba(34,211,238,0.5)"
                            : "0 0 35px rgba(34,211,238,0.4), inset 0 0 15px rgba(34,211,238,0.3)",
                        borderColor: isHovered ? "rgba(34,211,238,1)" : "rgba(34,211,238,0.6)",
                        background: isHovered ? "rgba(4, 18, 50, 0.8)" : "rgba(2, 6, 23, 0.6)",
                    }}
                    transition={{ duration: 0.3 }}
                >
                    {/* Inner glowing pulse core */}
                    <motion.div
                        className="w-[70%] h-[70%] rounded-full bg-cyan-400/20 blur-[8px]"
                        animate={{ scale: isHovered ? [1, 1.2, 1] : [1, 1.05, 1] }}
                        transition={{ duration: isHovered ? 1 : 2.5, repeat: Infinity, ease: "easeInOut" }}
                    />

                    {/* Hex grid subtle overlay pattern */}
                    <div
                        className="absolute inset-0 opacity-20 pointer-events-none mix-blend-overlay"
                        style={{
                            backgroundImage: `radial-gradient(rgba(34, 211, 238, 0.4) 1px, transparent 1px)`,
                            backgroundSize: '8px 8px'
                        }}
                    />
                </motion.div>

                {/* Text Layout */}
                <span className="relative z-10 flex flex-col items-center justify-center h-40 w-40 md:h-44 md:w-44 drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]">
                    <span className="mb-1 tracking-[0.4em] font-medium text-cyan-300 text-[10px] md:text-xs 
                                     opacity-70 transition-all duration-300"
                        style={{
                            textShadow: isHovered ? '0 0 8px rgba(34,211,238,0.8)' : 'none'
                        }}
                    >
                        INITIATE
                    </span>
                    <span className="text-xl md:text-2xl text-white font-bold tracking-wider transition-all duration-300"
                        style={{
                            textShadow: isHovered ? '0 0 15px rgba(255,255,255,1)' : '0 0 5px rgba(255,255,255,0.5)'
                        }}
                    >
                        PROJECT
                    </span>
                </span>
            </motion.button>
        </div>
    );
};

export default HolographicButton;
