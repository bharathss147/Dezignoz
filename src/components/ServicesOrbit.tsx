import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Layers, Palette, Sparkles, PenTool } from 'lucide-react';

const services = [
    { id: 1, title: 'Branding', icon: Layers, desc: 'Crafting unique brand identities.' },
    { id: 2, title: 'Visual Concepts', icon: PenTool, desc: 'Developing striking visual ideas.' },
    { id: 3, title: 'Ad Creatives', icon: Sparkles, desc: 'High-conversion advertising assets.' },
    { id: 4, title: 'Digital Poster', icon: Palette, desc: 'Eye-catching digital posters.' }
];

const ServicesOrbit = () => {
    const [activeService, setActiveService] = useState<number | null>(null);

    const radius = 240; // Distance from center

    return (
        <div className="relative w-full max-w-[650px] h-[650px] flex items-center justify-center pointer-events-auto mx-auto mt-4">
            <style>{`
        @keyframes orbit-spin-services {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes orbit-counter-services {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        .animate-orbit-services { animation: orbit-spin-services 45s linear infinite; }
        .animate-orbit-counter-services { animation: orbit-counter-services 45s linear infinite; }
        .pause-animation { animation-play-state: paused !important; }
      `}</style>

            {/* Orbit Rings removed */}

            {/* Rotating Wrapper */}
            <div className={`absolute inset-0 animate-orbit-services ${activeService ? 'pause-animation' : ''}`}>

                {/* SVG lines */}
                <svg className="absolute top-0 left-0 w-full h-full pointer-events-none" viewBox="0 0 650 650">
                    {services.map((service, index) => {
                        const angle = (index * 90) - 90;
                        const rad = (angle * Math.PI) / 180;
                        const cx = 325 + Math.cos(rad) * radius;
                        const cy = 325 + Math.sin(rad) * radius;
                        const isActive = activeService === service.id;

                        // Always draw a faint line
                        return (
                            <g key={`line-group-${service.id}`}>
                                {/* Connecting lines removed */}
                            </g>
                        );
                    })}
                </svg>

                {/* Orbiting Nodes */}
                {services.map((service, index) => {
                    const angle = (index * 90) - 90;
                    const rad = (angle * Math.PI) / 180;
                    const x = Math.cos(rad) * radius;
                    const y = Math.sin(rad) * radius;
                    const isActive = activeService === service.id;

                    return (
                        <div
                            key={service.id}
                            className="absolute left-1/2 top-1/2 w-0 h-0 z-30"
                            style={{ transform: `translate(${x}px, ${y}px)` }}
                        >
                            {/* Counter-rotating container */}
                            <div
                                className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 animate-orbit-counter-services ${activeService ? 'pause-animation' : ''}`}
                            >
                                <div
                                    className={`w-32 h-32 rounded-full border-2 flex flex-col items-center justify-center cursor-pointer transition-all duration-500 backdrop-blur-md ${isActive ? 'bg-blue-900/80 border-blue-400 scale-110 shadow-[0_0_40px_rgba(96,165,250,0.5)] z-50' : 'bg-card/80 dark:bg-card/80 border-blue-500/30 hover:border-blue-400/50 hover:bg-blue-900/40 text-blue-400 dark:text-blue-200'}`}
                                    onMouseEnter={() => setActiveService(service.id)}
                                    onMouseLeave={() => setActiveService(null)}
                                >
                                    <service.icon className={`w-8 h-8 mb-2 transition-colors ${isActive ? 'text-blue-300 drop-shadow-[0_0_8px_rgba(96,165,250,0.8)]' : 'text-blue-400'}`} />
                                    <span className={`text-sm font-bold tracking-wider text-center px-2 ${isActive ? 'text-white' : ''}`}>{service.title}</span>

                                    {/* Tooltip */}
                                    <AnimatePresence>
                                        {isActive && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 15, scale: 0.9 }}
                                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                                exit={{ opacity: 0, y: 10, scale: 0.9 }}
                                                className="absolute top-[110%] w-56 p-4 bg-card/95 dark:bg-card/95 border border-blue-500/40 rounded-xl text-center shadow-[0_0_30px_rgba(96,165,250,0.2)] pointer-events-none"
                                            >
                                                <p className="text-sm text-blue-50 leading-relaxed font-medium">{service.desc}</p>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Central Core */}
            <div
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full border border-blue-400/20 flex flex-col items-center justify-center z-40 bg-card shadow-[0_0_60px_rgba(59,130,246,0.15)] overflow-hidden hover:shadow-[0_0_80px_rgba(59,130,246,0.3)] transition-shadow duration-500"
                onMouseEnter={() => setActiveService(null)}
            >
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/40 to-transparent mix-blend-screen" />
                <h3 className="text-2xl font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-b from-blue-100 to-blue-400 drop-shadow-[0_0_15px_rgba(59,130,246,0.6)] relative z-10 text-center uppercase">
                    Core<br />Offerings
                </h3>
            </div>
        </div>
    );
};

export default ServicesOrbit;
