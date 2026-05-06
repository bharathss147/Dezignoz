import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import AnimatedBackground from "@/components/AnimatedBackground";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GlassCard from "@/components/GlassCard";
import AnimatedSection from "@/components/AnimatedSection";

const wishes = [
    {
        src: "/projects/pec-fest.png",
        title: "Paradise Elite - Happy New Year 2026",
        category: "Festival Wishes",
        size: "tall"
    }
];


const FestivalWishes = () => {
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
                            Social Media Content
                        </span>
                        <h1 className="font-display text-4xl md:text-6xl font-bold text-foreground mt-4 mb-6">
                            Festival <span className="text-primary">Wishes</span>
                        </h1>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            Unique and festive creative designs to connect with your audience on special occasions.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Gallery Grid */}
            <AnimatedSection className="container mx-auto pb-20 px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 place-items-center">
                    {wishes.map((wish, index) => (
                        <div key={index} className="h-full w-full max-w-md">
                            <GlassCard className="group overflow-hidden p-0 h-full" delay={index * 0.1}>
                                <div className="relative overflow-hidden h-full cursor-pointer" onClick={() => setSelectedImage(wish.src)}>
                                    <motion.img
                                        src={wish.src}
                                        alt={wish.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                        initial={{ opacity: 0, scale: 1.1 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        viewport={{ once: false }}
                                        transition={{ duration: 0.5 }}
                                    />

                                    {/* Overlay Info */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                                        <span className="text-primary text-xs font-medium uppercase tracking-wider mb-1">
                                            {wish.category}
                                        </span>
                                        <h3 className="text-white font-display text-xl font-bold">
                                            {wish.title}
                                        </h3>
                                    </div>
                                </div>
                            </GlassCard>
                        </div>
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

            {/* Full View Modal */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedImage(null)}
                        className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 p-4 backdrop-blur-md"
                    >
                        <motion.button
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            onClick={() => setSelectedImage(null)}
                            className="absolute top-4 right-4 p-2 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-colors z-[70]"
                        >
                            <X size={24} />
                        </motion.button>
                        <motion.img
                            src={selectedImage}
                            alt="Full view"
                            className="max-h-[90vh] max-w-[90vw] object-contain rounded-lg shadow-2xl border border-white/5"
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                            onClick={(e) => e.stopPropagation()}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default FestivalWishes;
