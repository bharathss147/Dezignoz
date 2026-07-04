/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-hooks/exhaustive-deps */
import { useRef, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import GlassCard from "./GlassCard";

const showcaseWorks = [

    {
        id: 2,
        title: "Festival Wishes & Thanking Creatives",
        category: "Social Media",
        description: "Unique and festive creative designs to connect with your audience on special occasions.",
        link: "/works/festival-wishes",
        image: "/projects/Festival-thanking.png",
        color: "from-cyan-500/20 to-blue-600/20",
        x: 34,
        y: -22,
        z: -120,
        rotate: 10,
        scale: 1.1,
        delay: 0.4,
        objectFit: "cover",
        fullBleed: true,
        aspect: "aspect-[4/5]"
    },
    {
        id: 3,
        title: "Poster (Digital Designs)",
        category: "POSTER DESIGN",
        description: "Creative digital posters that capture attention and convey your message effectively.",
        link: "/works/poster-designs",
        image: "/projects/poster-design-cover.jpg",
        color: "from-indigo-600/20 to-pink-600/20",
        x: 0,
        y: -2,
        z: 80,
        rotate: 0,
        scale: 1.1,
        delay: 0,
        objectFit: "cover",
        fullBleed: true,
        aspect: "aspect-[4/5]"
    },
    {
        id: 4,
        title: "Banner / Website Banner",
        category: "WEB GRAPHICS",
        description: "Eye-catching banners for websites and social platforms that enhance engagement.",
        link: "/works/banner-designs",
        image: "/projects/banner-design-main.jpg",
        color: "from-violet-600/20 to-indigo-600/20",
        x: -28,
        y: 32,
        z: -50,
        rotate: 8,
        scale: 1.1,
        delay: 0.6,
        objectFit: "cover",
        fullBleed: true,
        aspect: "aspect-video"
    },
    {
        id: 5,
        title: "Product Advertising",
        category: "ADVERTISEMENT",
        description: "High-impact product posters designed to showcase features and drive sales.",
        link: "https://drive.google.com/drive/folders/1K3XTOWMhhk6zwkpG_p-LXK90esXE3ECj?usp=drive_link",
        image: "/projects/product-advertisement.jpg",
        color: "from-orange-600/20 to-red-600/20",
        x: 28,
        y: 30,
        z: -80,
        rotate: -8,
        scale: 1.1,
        delay: 0.8,
        objectFit: "cover",
        fullBleed: true,
        aspect: "aspect-[4/5]"
    },
    {
        id: 6,
        title: "Promotional Advertising Designs",
        category: "MARKETING",
        description: "Strategic promotional designs aimed at broadening reach and boosting brand visibility.",
        link: "/works/promotional-designs",
        image: "/projects/promotional-ads-v2.jpg",
        color: "from-amber-500/20 to-orange-500/20",
        x: -58,
        y: 10,
        z: -140,
        rotate: -5,
        scale: 1.1,
        delay: 0.9,
        objectFit: "cover",
        fullBleed: true,
        aspect: "aspect-[16/10]"
    }
];

const CinematicShowcase = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const smoothX = useSpring(mouseX, { damping: 50, stiffness: 200 });
    const smoothY = useSpring(mouseY, { damping: 50, stiffness: 200 });

    const handleMouseMove = (e: React.MouseEvent) => {
        const { clientX, clientY } = e;
        const { innerWidth, innerHeight } = window;
        // Normalize to -0.5 to 0.5
        mouseX.set((clientX / innerWidth) - 0.5);
        mouseY.set((clientY / innerHeight) - 0.5);
    };

    const handleCardClick = (link: string) => {
        if (link.startsWith('http')) {
            window.open(link, '_blank');
        } else {
            navigate(link);
        }
    };

    return (
        <section
            ref={containerRef}
            onMouseMove={handleMouseMove}
            className="relative min-h-[90vh] w-full flex items-center justify-center pt-24 pb-48"
        >
            <div className="container mx-auto px-6 relative z-30 flex flex-col items-center justify-center">
                {/* Section Heading */}
                <div className="absolute top-0 left-0 right-0 text-center z-50 pt-0">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.5 }}
                    >
                        <span className="text-blue-400 text-xs font-bold tracking-[0.4em] uppercase mb-4 block opacity-60">
                            Showcase Architecture
                        </span>
                        <h2 className="text-4xl md:text-6xl font-display font-bold text-white tracking-tight">
                            Grab to <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">View the Works</span>
                        </h2>
                    </motion.div>
                </div>

                {/* 3D Stage Container */}
                <div className="relative w-full h-[800px] flex items-center justify-center perspective-[2000px] transform-style:preserve-3d">
                    {showcaseWorks.map((work: any, index) => {
                        // Increased Parallax values
                        const depthFactor = (400 - Math.abs(work.z)) / 400;
                        const px = useTransform(smoothX, [-0.5, 0.5], [-160 * depthFactor, 160 * depthFactor]);
                        const py = useTransform(smoothY, [-0.5, 0.5], [-160 * depthFactor, 160 * depthFactor]);
                        const rx = useTransform(smoothY, [-0.5, 0.5], [20, -20]);
                        const ry = useTransform(smoothX, [-0.5, 0.5], [-20, 20]);

                        return (
                            <motion.div
                                key={work.id}
                                style={{
                                    x: px,
                                    y: py,
                                    rotateX: rx,
                                    rotateY: ry,
                                    zIndex: index === 2 ? 100 : 50 + work.z / 10,
                                    left: `${50 + work.x}%`,
                                    top: `${45 + work.y}%`,
                                    z: work.z,
                                    position: 'absolute',
                                }}
                                initial={{ opacity: 0, scale: 0.8, z: work.z - 200, rotateY: -180 }}
                                animate={{
                                    opacity: 1,
                                    scale: work.scale,
                                    z: work.z,
                                    rotateY: 0,
                                    y: [0, -40, 25, -35, 0], // Increased Antigravity Drift
                                    rotate: [work.rotate, work.rotate + 6, work.rotate - 6, work.rotate]
                                }}
                                transition={{
                                    scale: { type: "spring", stiffness: 100, damping: 20, delay: work.delay },
                                    rotateY: { duration: 1.5, ease: "easeOut", delay: work.delay },
                                    opacity: { duration: 1, delay: work.delay },
                                    z: { duration: 1.5, delay: work.delay },
                                    y: { duration: 6 + index * 1.5, repeat: Infinity, ease: "easeInOut" },
                                    rotate: { duration: 10 + index * 2, repeat: Infinity, ease: "easeInOut" }
                                }}
                                className="transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
                                onClick={() => handleCardClick(work.link || '/works')}
                            >
                                <div className="relative transform-style:preserve-3d transition-transform duration-500 group-hover:scale-105">
                                    {/* Rim Light Effect (Glow behind card) */}
                                    <motion.div
                                        className={`absolute inset-0 bg-gradient-to-br ${work.color} opacity-0 group-hover:opacity-40 blur-2xl transition-opacity duration-500 rounded-2xl`}
                                    />

                                    <GlassCard
                                        className={`
                                            w-[260px] md:w-[320px] ${work.aspect || 'aspect-[4/5]'}
                                            opacity-100 shadow-[0_20px_60px_rgba(0,0,0,0.5)]
                                            !bg-[#020617] !border-none backdrop-blur-none
                                            relative overflow-hidden p-0
                                        `}
                                        hover={false}
                                    >
                                        {/* Interior Composition - Strictly Edge-to-Edge Fill */}
                                        <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
                                            <img
                                                src={work.image}
                                                alt={work.title}
                                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                            />

                                            {/* Permanent Gradient Protection for text readability */}
                                            <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/40 to-transparent z-10" />

                                            {/* Light Reflection Sweep */}
                                            <motion.div
                                                animate={{ x: ['-200%', '200%'] }}
                                                transition={{ duration: 4, repeat: Infinity, ease: "linear", repeatDelay: 3 }}
                                                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-[-25deg] z-20 pointer-events-none"
                                            />
                                        </div>

                                        {/* Content Overlay */}
                                        <div className="absolute inset-x-0 bottom-0 z-20 p-5 md:p-6 flex flex-col justify-end">
                                            <motion.span className="text-[10px] md:text-[11px] uppercase tracking-[0.2em] text-blue-400 font-bold mb-2 block opacity-80 group-hover:opacity-100 transition-opacity">
                                                {work.category}
                                            </motion.span>
                                            <h3 className="text-base md:text-lg font-display font-bold text-white mb-1.5 md:mb-2 leading-tight group-hover:text-blue-300 transition-colors">
                                                {work.title}
                                            </h3>
                                            <p className="text-[10px] md:text-[11px] text-white/50 leading-relaxed group-hover:text-white/70 transition-colors line-clamp-2">
                                                {work.description}
                                            </p>
                                        </div>

                                        {/* Subtle Outer Rim Glow for the whole card - Fixed to actual edges */}
                                        <div className="absolute inset-0 rounded-2xl border border-white/5 group-hover:border-blue-500/30 transition-colors duration-500 pointer-events-none z-30" />
                                    </GlassCard>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default CinematicShowcase;
