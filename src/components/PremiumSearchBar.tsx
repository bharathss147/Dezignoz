import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useSpring, useMotionValue, useTransform } from "framer-motion";
import { Search, Mic, SlidersHorizontal, X } from "lucide-react";

const PremiumSearchBar = () => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    const containerRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    // Parallax effect values
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { damping: 25, stiffness: 150 };
    const translateX = useSpring(useTransform(mouseX, [-0.5, 0.5], [-15, 15]), springConfig);
    const translateY = useSpring(useTransform(mouseY, [-0.5, 0.5], [-15, 15]), springConfig);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const { innerWidth, innerHeight } = window;
            mouseX.set(e.clientX / innerWidth - 0.5);
            mouseY.set(e.clientY / innerHeight - 0.5);
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [mouseX, mouseY]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsExpanded(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleExpand = () => {
        setIsExpanded(true);
        setTimeout(() => inputRef.current?.focus(), 100);
    };

    return (
        <div className="flex justify-center w-full my-12 relative z-20 px-4">
            {/* Glow highlight behind the bar */}
            <motion.div
                className="absolute w-64 h-24 bg-primary/20 blur-[80px] rounded-full pointer-events-none"
                animate={{
                    scale: isExpanded ? 1.5 : 1,
                    opacity: isExpanded ? 0.6 : 0.3,
                }}
            />

            <motion.div
                ref={containerRef}
                style={{ x: translateX, y: translateY }}
                initial={{ opacity: 0, y: 20 }}
                animate={{
                    opacity: 1,
                    y: [0, -8, 0],
                    width: isExpanded ? "min(100%, 600px)" : "min(100%, 300px)"
                }}
                transition={{
                    y: { duration: 5, repeat: Infinity, ease: "easeInOut" },
                    width: { type: "spring", stiffness: 300, damping: 30 },
                    opacity: { duration: 0.8, delay: 0.8 },
                }}
                className={`
          relative group flex items-center h-14 rounded-full 
          bg-white/5 backdrop-blur-xl border border-white/10
          shadow-[0_8px_32px_rgba(0,0,0,0.4)]
          transition-all duration-500
          ${isExpanded ? 'border-primary/50 shadow-[0_0_30px_rgba(59,130,246,0.2)]' : 'hover:border-white/20'}
        `}
                onClick={handleExpand}
            >
                {/* Shine Sweep Effect */}
                <div className="absolute inset-0 overflow-hidden rounded-full pointer-events-none">
                    <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full"
                        animate={{ translateX: ["100%", "-100%"] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "linear", repeatDelay: 5 }}
                    />
                </div>

                {/* Search Icon */}
                <div className="pl-5 pr-3 text-blue-200/50 group-hover:text-primary transition-colors duration-300">
                    <Search size={20} className={isExpanded ? "text-primary scale-110" : ""} />
                </div>

                {/* Input Field */}
                <input
                    ref={inputRef}
                    type="text"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    placeholder={isExpanded ? "What are you looking for?" : "Search our digital universe..."}
                    className="flex-1 bg-transparent border-none outline-none text-white text-sm placeholder:text-blue-200/30 flex-shrink min-w-0"
                />

                {/* Action Icons */}
                <div className="flex items-center gap-3 pr-4">
                    <AnimatePresence mode="wait">
                        {!isExpanded ? (
                            <motion.div
                                key="icons"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                className="flex items-center gap-3 text-blue-200/30"
                            >
                                <div className="w-px h-6 bg-white/10 hidden sm:block" />
                                <Mic size={18} className="hover:text-primary cursor-pointer transition-colors" />
                                <SlidersHorizontal size={18} className="hover:text-primary cursor-pointer transition-colors" />
                            </motion.div>
                        ) : (
                            <motion.button
                                key="close"
                                initial={{ opacity: 0, rotate: -90 }}
                                animate={{ opacity: 1, rotate: 0 }}
                                exit={{ opacity: 0, rotate: 90 }}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setSearchValue("");
                                    setIsExpanded(false);
                                }}
                                className="p-1 hover:bg-white/10 rounded-full text-blue-200/50 hover:text-white transition-all"
                            >
                                <X size={18} />
                            </motion.button>
                        )}
                    </AnimatePresence>
                </div>

                {/* Active Underline Glow */}
                <AnimatePresence>
                    {isExpanded && (
                        <motion.div
                            layoutId="underline"
                            className="absolute bottom-0 left-10 right-10 h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent blur-[1px]"
                            initial={{ opacity: 0, scaleX: 0 }}
                            animate={{ opacity: 1, scaleX: 1 }}
                            exit={{ opacity: 0, scaleX: 0 }}
                        />
                    )}
                </AnimatePresence>
            </motion.div>
        </div>
    );
};

export default PremiumSearchBar;
