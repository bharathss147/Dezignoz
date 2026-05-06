import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Lightbulb, Palette, Rocket } from 'lucide-react';

const steps = [
    { id: 1, title: "Discovery", desc: "Understanding the brand orbit.", icon: Search },
    { id: 2, title: "Concept", desc: "Crafting digital constellations.", icon: Lightbulb },
    { id: 3, title: "Design", desc: "Forging spatial elements.", icon: Palette },
    { id: 4, title: "Launch", desc: "Propelling into the cosmos.", icon: Rocket }
];

const ProcessOrbit = () => {
    const [activeStep, setActiveStep] = useState<number | null>(null);

    const radius = 220; // Distance from center

    return (
        <div className="relative w-full max-w-[600px] h-[600px] flex items-center justify-center pointer-events-auto mx-auto mt-4">
            <style>{`
        @keyframes orbit-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes orbit-counter {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        .animate-orbit { animation: orbit-spin 40s linear infinite; }
        .animate-orbit-counter { animation: orbit-counter 40s linear infinite; }
        .pause-animation { animation-play-state: paused !important; }
      `}</style>

            {/* Orbit Rings - Background */}
            <div className="absolute w-[80%] h-[80%] rounded-full border border-blue-500/10 animate-[spin_30s_linear_infinite]" />
            <div className="absolute w-[60%] h-[60%] rounded-full border border-dashed border-blue-400/20 animate-[spin_40s_linear_infinite_reverse]" />
            <div className="absolute w-[40%] h-[40%] rounded-full border border-blue-300/10" />

            {/* Rotating Wrapper */}
            <div className={`absolute inset-0 animate-orbit ${activeStep ? 'pause-animation' : ''}`}>

                {/* SVG lines */}
                <svg className="absolute top-0 left-0 w-full h-full pointer-events-none" viewBox="0 0 600 600">
                    {steps.map((step, index) => {
                        const angle = (index * 360) / steps.length;
                        const rad = (angle * Math.PI) / 180;
                        const cx = 300 + Math.cos(rad) * radius;
                        const cy = 300 + Math.sin(rad) * radius;
                        const isActive = activeStep === step.id;

                        return isActive && (
                            <motion.line
                                key={`line-${step.id}`}
                                x1="300" y1="300" x2={cx} y2={cy}
                                stroke="#22d3ee"
                                strokeWidth="2"
                                strokeDasharray="6 6"
                                initial={{ pathLength: 0, opacity: 0 }}
                                animate={{ pathLength: 1, opacity: 1 }}
                                transition={{ duration: 0.5 }}
                            />
                        );
                    })}
                </svg>

                {/* Orbiting Nodes */}
                {steps.map((step, index) => {
                    const angle = (index * 360) / steps.length;
                    const rad = (angle * Math.PI) / 180;
                    const x = Math.cos(rad) * radius;
                    const y = Math.sin(rad) * radius;
                    const isActive = activeStep === step.id;

                    return (
                        <div
                            key={step.id}
                            className="absolute left-1/2 top-1/2 w-0 h-0 z-30"
                            style={{ transform: `translate(${x}px, ${y}px)` }}
                        >
                            {/* Counter-rotating container */}
                            <div
                                className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 animate-orbit-counter ${activeStep ? 'pause-animation' : ''}`}
                            >
                                <div
                                    className={`w-28 h-28 rounded-full border-2 flex flex-col items-center justify-center cursor-pointer transition-all duration-500 backdrop-blur-md ${isActive ? 'bg-cyan-950/80 border-cyan-400 scale-110 shadow-[0_0_40px_rgba(34,211,238,0.5)] z-50' : 'bg-card/80 dark:bg-card/80 border-blue-500/30 hover:border-cyan-400/50 hover:bg-blue-900/40 text-blue-400 dark:text-blue-200'}`}
                                    onMouseEnter={() => setActiveStep(step.id)}
                                    onMouseLeave={() => setActiveStep(null)}
                                >
                                    <step.icon className={`w-8 h-8 mb-2 transition-colors ${isActive ? 'text-cyan-300 drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]' : 'text-blue-400'}`} />
                                    <span className={`text-sm font-bold tracking-wider ${isActive ? 'text-white' : ''}`}>{step.title}</span>

                                    {/* Tooltip */}
                                    <AnimatePresence>
                                        {isActive && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 15, scale: 0.9 }}
                                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                                exit={{ opacity: 0, y: 10, scale: 0.9 }}
                                                className="absolute top-[110%] w-56 p-4 bg-card/95 dark:bg-card/95 border border-cyan-500/40 rounded-xl text-center shadow-[0_0_30px_rgba(34,211,238,0.2)] pointer-events-none"
                                            >
                                                <p className="text-sm text-cyan-50 leading-relaxed font-medium">{step.desc}</p>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Central Core: D Logo perfectly fitting the circle */}
            <div
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-52 h-52 rounded-full border border-cyan-400/20 flex items-center justify-center z-40 bg-card shadow-[0_0_60px_rgba(34,211,238,0.15)] overflow-hidden hover:shadow-[0_0_80px_rgba(34,211,238,0.3)] transition-shadow duration-500"
                onMouseEnter={() => setActiveStep(null)}
            >
                <div className="w-[125%] h-[125%] flex items-center justify-center relative">
                    <img
                        src="/first-circle-logo.jpg"
                        alt="DEZIGNO core"
                        className="w-full h-full object-cover mix-blend-screen opacity-90 transition-opacity hover:opacity-100"
                        style={{ objectPosition: 'center' }}
                    />
                </div>
            </div>
        </div>
    );
};

export default ProcessOrbit;
