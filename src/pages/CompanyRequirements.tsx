import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import AnimatedBackground from "@/components/AnimatedBackground";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GlassCard from "@/components/GlassCard";
import AnimatedSection from "@/components/AnimatedSection";

const designs = [
    {
        src: "/projects/paradise-elite-construction.jpg",
        title: "Paradise Elite Construction – Services Poster",
        category: "Corporate Design",
    },
    {
        src: "/projects/udghosh-sports.jpg",
        title: "Udghosh – Sports Event Design",
        category: "Event Design",
    },
    {
        src: "/projects/esan-aquarium-logo.jpg",
        title: "Esan Aquarium – Logo Design (Dark)",
        category: "Logo Design",
    },
    {
        src: "/projects/esan-aquarium-blue.jpg",
        title: "Esan Aquarium – Brand Identity (Blue)",
        category: "Logo Design",
    },
    {
        src: "/projects/esan-aquarium-white.png",
        title: "Esan Aquarium – Brand Identity (White)",
        category: "Logo Design",
    },
    {
        src: "/projects/esan-badge-logo.png",
        title: "Esan Aquarium – Badge Logo",
        category: "Logo Design",
    },
    {
        src: "/projects/esan-trident-dark.png",
        title: "Esan Aquarium – Trident Logo (Dark)",
        category: "Logo Design",
    },
    {
        src: "/projects/esan-trident-white.jpg",
        title: "Esan Aquarium – Trident Logo (White)",
        category: "Logo Design",
    },
    {
        src: "/projects/bumble-bee-poster.jpg",
        fullSrc: "/projects/bumble-bee-banner.png",
        title: "Bumble Bee Premium Auto Care – Poster",
        category: "Poster Design",
    },
    {
        src: "/projects/dna-clearance-sale.png",
        title: "DNA Mens Clothing – Clearance Sale Poster",
        category: "Promotional Design",
    },
    {
        src: "/projects/ns200-poster.jpg",
        title: "Bajaj Pulsar NS200 – Action Poster",
        category: "Automotive Design",
    }
];


const CompanyRequirements = () => {
    const navigate = useNavigate();
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    return (
        <div className="relative min-h-screen overflow-x-hidden">
            <AnimatedBackground />
            <Navbar />

            {/* Hero Header */}
            <section className="relative pt-32 pb-12 px-6">
                <div className="container mx-auto text-center max-w-4xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <span className="text-primary text-sm font-medium tracking-wider uppercase">
                            Portfolio Gallery
                        </span>
                        <h1 className="font-display text-4xl md:text-6xl font-bold text-foreground mt-4 mb-6">
                            Corporate <span className="text-primary">Design</span>
                        </h1>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            Professional designs crafted for business needs including profiles, layouts, and requirements presentations.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Gallery Grid */}
            <AnimatedSection className="container mx-auto pb-20 px-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                    {designs.map((design, index) => (
                        <motion.div
                            key={index}
                            className="w-full"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <GlassCard className="group overflow-hidden p-0 h-full" delay={index * 0.1}>
                                <div className="relative overflow-hidden cursor-pointer aspect-[4/5]" onClick={() => setSelectedImage(design.fullSrc || design.src)}>
                                    <motion.img
                                        src={design.src}
                                        alt={design.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        initial={{ opacity: 0, scale: 1.1 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        viewport={{ once: false }}
                                        transition={{ duration: 0.5 }}
                                    />

                                    {/* Hover Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
                                        <span className="text-primary text-[10px] font-semibold uppercase tracking-[0.2em] mb-1">
                                            {design.category}
                                        </span>
                                        <h3 className="text-white font-display text-base font-bold leading-tight">
                                            {design.title}
                                        </h3>
                                    </div>
                                </div>

                                {/* Card Footer - Always Visible */}
                                <div className="p-4">
                                    <h3 className="text-white font-display text-sm font-semibold leading-tight truncate">
                                        {design.title}
                                    </h3>
                                    <span className="text-muted-foreground text-xs mt-1 block">
                                        @{design.category.toLowerCase().replace(/\s+/g, '')}
                                    </span>
                                </div>
                            </GlassCard>
                        </motion.div>
                    ))}
                </div>
            </AnimatedSection>

            {/* Navigation Footer */}
            <section className="container mx-auto px-6 pb-20 text-center">
                <p className="text-muted-foreground mb-6">Ready to start your own project?</p>
                <button
                    onClick={() => {
                        navigate("/", { state: { scrollTo: 'works' } });
                    }}
                    className="btn-glow text-white px-8 py-3 rounded-full text-sm font-medium"
                >
                    Close Gallery
                </button>
            </section>

            <Footer />

            {/* Full View Modal - Isolated overlay for perfect image display */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[9999] isolate"
                        style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}
                    >
                        {/* Black backdrop - completely opaque */}
                        <div
                            className="absolute inset-0 bg-black/95 backdrop-blur-xl"
                            onClick={() => setSelectedImage(null)}
                        />

                        {/* Close button */}
                        <motion.button
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            onClick={() => setSelectedImage(null)}
                            className="absolute top-6 right-6 p-3 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-colors z-[10000] border border-white/10"
                        >
                            <X size={28} />
                        </motion.button>

                        {/* Image container - centered, no interference */}
                        <div className="absolute inset-0 flex items-center justify-center p-6 md:p-12 pointer-events-none">
                            <motion.img
                                src={selectedImage}
                                alt="Full view"
                                className="max-h-[92vh] max-w-[92vw] w-auto h-auto object-contain rounded-lg shadow-[0_0_80px_rgba(0,0,0,0.8)] pointer-events-auto"
                                initial={{ scale: 0.85, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.85, opacity: 0 }}
                                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                                onClick={(e) => e.stopPropagation()}
                                draggable={false}
                            />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default CompanyRequirements;
