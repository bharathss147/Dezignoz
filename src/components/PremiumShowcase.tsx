import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import GlassCard from "./GlassCard";

const showcaseItems = [
    {
        id: 1,
        title: "Modern Branding",
        category: "Visual Identity",
        image: "/projects/poster-design-cover.jpg",
        color: "from-blue-600/20 to-cyan-500/20",
    },
    {
        id: 2,
        title: "Product Launch",
        category: "Advertising",
        image: "/projects/product-advertisement.jpg",
        color: "from-purple-600/20 to-pink-500/20",
    },
    {
        id: 3,
        title: "Digital Artistry",
        category: "Creative",
        image: "/projects/graphic-designing-v2.jpg",
        color: "from-indigo-600/20 to-blue-500/20",
    },
    {
        id: 4,
        title: "Event Promotion",
        category: "Marketing",
        image: "/projects/udghosh-dg.jpg",
        color: "from-emerald-600/20 to-teal-500/20",
    },
    {
        id: 5,
        title: "Luxury Campaign",
        category: "Premium",
        image: "/projects/promotional-ads-v2.jpg",
        color: "from-amber-600/20 to-orange-500/20",
    },
    {
        id: 6,
        title: "Tech Interface",
        category: "UI/UX",
        image: "/projects/banner-design-main.jpg",
        color: "from-blue-600/20 to-indigo-500/20",
    }
];

const ShowcaseCard = ({ item, index }: { item: typeof showcaseItems[0], index: number }) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;
        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
            }}
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{
                duration: 0.8,
                delay: index * 0.1,
                ease: [0.23, 1, 0.32, 1]
            }}
            whileHover={{ scale: 1.05, z: 50 }}
            className="relative group cursor-pointer"
        >
            <GlassCard className="h-[400px] w-full p-0 overflow-hidden border-border bg-card/40 backdrop-blur-xl transition-all duration-500 group-hover:border-primary/50 group-hover:shadow-[0_0_40px_rgba(59,130,246,0.2)]">
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                <div className="absolute inset-y-0 left-0 w-px bg-gradient-to-b from-transparent via-white/20 to-transparent" />

                <div className="relative h-full flex flex-col">
                    {/* Image Container with depth */}
                    <div className="relative h-2/3 overflow-hidden" style={{ transform: "translateZ(30px)" }}>
                        <div className={`absolute inset-0 bg-gradient-to-br ${item.color} mix-blend-overlay z-10`} />
                        <motion.img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent z-20" />
                    </div>

                    {/* Content Section */}
                    <div className="p-6 flex-1 flex flex-col justify-end" style={{ transform: "translateZ(40px)" }}>
                        <motion.span
                            className="text-[10px] uppercase tracking-[0.2em] text-primary font-bold mb-2 block"
                        >
                            {item.category}
                        </motion.span>
                        <h3 className="text-xl font-display font-bold text-foreground group-hover:text-primary transition-colors">
                            {item.title}
                        </h3>

                        {/* Interactive Shine */}
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none bg-gradient-to-tr from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full" />
                    </div>
                </div>
            </GlassCard>

            {/* Ambient Shadow */}
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-4/5 h-4 bg-primary/20 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </motion.div>
    );
};

const PremiumShowcase = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

    return (
        <section
            ref={containerRef}
            className="relative py-32 px-6 overflow-hidden bg-background"
        >
            {/* Cinematic Background Elements */}
            <motion.div
                style={{ y: backgroundY }}
                className="absolute inset-0 pointer-events-none"
            >
                <div className="absolute top-1/2 left-1/4 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px]" />
                <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[100px]" />
            </motion.div>

            {/* Vignette Overlay */}
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,var(--background)_100%)] opacity-80" />

            <div className="container mx-auto relative z-10">
                <div className="max-w-3xl mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <span className="text-primary text-sm font-bold tracking-[0.3em] uppercase mb-4 block">
                            Design Excellence
                        </span>
                        <h2 className="text-4xl md:text-6xl font-display font-bold text-foreground mb-6 leading-tight">
                            Elevating Brands through <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Digital</span> Design.
                        </h2>
                        <div className="w-20 h-1 bg-gradient-to-r from-primary to-transparent" />
                    </motion.div>
                </div>

                {/* Grid with Lateral Masking */}
                <motion.div
                    style={{ opacity }}
                    className="relative"
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 py-10">
                        {showcaseItems.map((item, index) => (
                            <ShowcaseCard key={item.id} item={item} index={index} />
                        ))}
                    </div>

                    {/* Masking Edges for horizontal feel if needed, but here it's a grid */}
                    <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-background to-transparent pointer-events-none z-20 md:hidden" />
                    <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-background to-transparent pointer-events-none z-20 md:hidden" />
                </motion.div>
            </div>

            {/* Ambient Motion Particles (CSS only for performance) */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {[...Array(20)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-1 h-1 bg-white/10 rounded-full animate-float-slow"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 5}s`,
                            opacity: Math.random() * 0.5
                        }}
                    />
                ))}
            </div>
        </section>
    );
};

export default PremiumShowcase;
