/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-hooks/exhaustive-deps */
import { useRef, useEffect, useState } from "react";
import { motion, useSpring, useMotionValue, useTransform, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface PosterItem {
    src: string;
    title: string;
    category: string;
}

const row1: PosterItem[] = [
    { src: "/projects/poster-designs/poster-1.png", title: "Nothing Ear (2A)", category: "Product Launch" },
    { src: "/projects/poster-designs/poster-2.png", title: "Burger Combo Offer", category: "Food & Beverage" },
    { src: "/projects/poster-designs/poster-3.jpg", title: "New Arrival Sneaker", category: "Fashion" },
    { src: "/projects/poster-designs/poster-4.png", title: "Design Dynamo", category: "Branding" },
    { src: "/projects/poster-designs/red-wine.png", title: "Red Wine Collection", category: "Product Ad" },
    { src: "/projects/poster-designs/montblanc_poster.png", title: "Montblanc Legacy", category: "Luxury Ad" },
];

const row2: PosterItem[] = [
    { src: "/projects/poster-designs/eksa-headset.jpg", title: "EKSA E7000 Fenrir", category: "Gaming Gear" },
    { src: "/projects/poster-designs/poster-8.png", title: "Premium Design", category: "Branding" },
    { src: "/projects/poster-designs/waffle-love.png", title: "Love at First Bite", category: "Food Advertising" },
    { src: "/projects/poster-designs/poster-7.jpg", title: "CR7 Luxury Perfume", category: "Fragrance" },
    { src: "/projects/poster-designs/poster-5.png", title: "Radiance Aqualogica", category: "Cosmetics" },
    { src: "/projects/udghosh-dg.jpg", title: "Udghosh Event", category: "Festival Ad" },
];

const ScrollingRow = ({ items, speed, direction = "left", depth, onItemClick }: { items: PosterItem[], speed: number, direction?: "left" | "right", depth: number, onItemClick: (src: string) => void }) => {
    // Depth effects
    const blur = Math.abs(depth) * 2;
    const scale = 1 - Math.abs(depth) * 0.1;

    // Triple the items for perfect seamless looping
    const tripledItems = [...items, ...items, ...items];

    return (
        <div className="relative py-0 overflow-hidden group/row">
            <motion.div
                className="flex gap-10 whitespace-nowrap px-4"
                animate={{
                    x: direction === "left" ? ["0%", "-33.333%"] : ["-33.333%", "0%"]
                }}
                transition={{
                    duration: speed,
                    repeat: Infinity,
                    ease: "linear",
                    repeatType: "loop"
                }}
                style={{
                    scale,
                    filter: `blur(${blur}px)`,
                    opacity: 1 - Math.abs(depth) * 0.2
                }}
            >
                {tripledItems.map((item, idx) => (
                    <div key={idx} className="flex-shrink-0 w-[220px] md:w-[280px]">
                        <motion.div
                            whileHover={{ y: -5 }}
                            className="relative cursor-pointer group/card"
                            onClick={() => onItemClick(item.src)}
                        >
                            {/* Card Frame - Larger and more prominent */}
                            <div className="relative aspect-[4/5] rounded-[15px] overflow-hidden border border-white/5 bg-[#0a0f1e] mb-2 transition-all duration-500 group-hover/card:border-white/20 group-hover/card:shadow-[0_15px_35px_rgba(0,0,0,0.6)]">
                                <img
                                    src={item.src}
                                    alt={item.title}
                                    className="w-full h-full object-cover object-top transition-transform duration-700 group-hover/card:scale-110"
                                />
                                {/* Reflection Glide */}
                                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent -translate-x-full group-hover/card:translate-x-full transition-transform duration-1000" />
                            </div>

                            {/* Caption - Sized for larger cards */}
                            <div className="flex items-center gap-2 px-1">
                                <div className="w-5 h-5 rounded-full bg-white/5 flex items-center justify-center border border-white/5">
                                    <div className="w-2 h-2 rounded-full bg-primary/30 animate-pulse" />
                                </div>
                                <div className="flex flex-col overflow-hidden">
                                    <h3 className="text-white text-[11px] md:text-sm font-medium tracking-tight group-hover/card:text-primary transition-colors truncate">
                                        {item.title}
                                    </h3>
                                    <span className="text-white/30 text-[9px] md:text-[10px] font-medium tracking-wide lowercase">
                                        @{item.category.replace(/\s+/g, '')}
                                    </span>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                ))}
            </motion.div>
        </div>
    );
};

const PosterShowcase = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const smoothX = useSpring(mouseX, { damping: 50, stiffness: 200 });
    const smoothY = useSpring(mouseY, { damping: 50, stiffness: 200 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const { innerWidth, innerHeight } = window;
            mouseX.set((e.clientX / innerWidth) - 0.5);
            mouseY.set((e.clientY / innerHeight) - 0.5);
        };
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    // Parallax shifts based on mouse
    const parallaxX = useTransform(smoothX, [-0.5, 0.5], [-30, 30]);
    const parallaxY = useTransform(smoothY, [-0.5, 0.5], [-20, 20]);

    return (
        <section
            ref={containerRef}
            className="relative py-12 bg-transparent overflow-hidden flex flex-col items-center justify-center min-h-0"
        >
            {/* Content Container */}
            <div className="relative z-10 w-full flex flex-col items-center gap-16 md:gap-20">
                <div className="container mx-auto px-6 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 5 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="text-primary text-[10px] md:text-xs font-bold tracking-[0.4em] uppercase mb-2 block">Design Showcase</span>
                        <h2 className="text-2xl md:text-4xl font-display font-bold text-white mb-2">
                            Poster <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Gallery</span>
                        </h2>
                    </motion.div>
                </div>

                {/* Simultaneously Visible Dual Rows with Edge Fades */}
                <motion.div
                    style={{ x: parallaxX, y: parallaxY }}
                    className="relative z-20 w-full flex flex-col gap-8"
                >
                    {/* Left Edge Fade - Original Subtle Style */}
                    <div className="absolute top-0 left-0 h-full w-[25%] z-30 bg-gradient-to-r from-[#020617] via-[#020617]/80 to-transparent pointer-events-none" />
                    
                    {/* Right Edge Fade - Original Subtle Style */}
                    <div className="absolute top-0 right-0 h-full w-[25%] z-30 bg-gradient-to-l from-[#020617] via-[#020617]/80 to-transparent pointer-events-none" />

                    <ScrollingRow items={row1} speed={15} direction="left" depth={0} onItemClick={setSelectedImage} />
                    <ScrollingRow items={row2} speed={18} direction="right" depth={0} onItemClick={setSelectedImage} />
                </motion.div>
            </div>

            {/* Modal for Full View */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedImage(null)}
                        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4 md:p-10 backdrop-blur-xl"
                    >
                        <motion.button
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            onClick={() => setSelectedImage(null)}
                            className="absolute top-6 right-6 p-3 text-white/70 hover:text-white bg-white/5 hover:bg-white/10 rounded-full transition-all border border-white/10 z-[110]"
                        >
                            <X size={24} />
                        </motion.button>

                        <motion.div
                            initial={{ scale: 0.95, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.95, opacity: 0, y: 20 }}
                            transition={{ type: "spring", damping: 30, stiffness: 300 }}
                            className="relative max-h-full max-w-full flex items-center justify-center"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <img
                                src={selectedImage}
                                alt="Poster High Res"
                                className="max-h-[85vh] w-auto h-auto object-contain rounded-xl shadow-[0_0_50px_rgba(59,130,246,0.3)] border border-white/10"
                            />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default PosterShowcase;
