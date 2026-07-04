import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Send, Sparkles, ChevronDown } from "lucide-react";
import AnimatedBackground from "@/components/AnimatedBackground";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GlassCard from "@/components/GlassCard";
import AnimatedSection from "@/components/AnimatedSection";

const StartProject = () => {
    const [formData, setFormData] = useState({
        designType: "",
        email: "",
        references: "",
        details: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const designOptions = [
        "Poster (Digital Designs)",
        "Banner / Website Banner",
        "Festival Wishes & Thanking Creatives",
        "Branding Packages",
        "Promotional Advertising Designs",
    ];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        const subject = `New Project Request: ${formData.designType}`;
        const body = `
New Project Request from Website:

1. Design Requirement:
${formData.designType}

2. Client Email:
${formData.email}

3. References / Ideas:
${formData.references}

4. Project Details:
${formData.details}
        `;

        const mailtoLink = `mailto:designdynamobha77@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

        window.location.href = mailtoLink;

        // Show success state after a brief delay to allow the mail client to open
        setTimeout(() => {
            setIsSubmitting(false);
            setIsSuccess(true);
            setFormData({ designType: "", email: "", references: "", details: "" });
        }, 1000);
    };

    return (
        <div className="relative min-h-screen overflow-x-hidden">
            <AnimatedBackground />
            <Navbar />

            <section className="relative pt-32 pb-20 px-6">
                <div className="container mx-auto max-w-4xl">
                    <AnimatedSection className="text-center mb-12">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-6"
                        >
                            <Sparkles className="w-4 h-4 text-accent" />
                            <span className="text-sm text-muted-foreground">Start Your Journey</span>
                        </motion.div>

                        <h1 className="font-display text-4xl md:text-6xl font-bold text-foreground mb-6">
                            Start Your <span className="text-gradient">Premium Design</span> Project
                        </h1>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            Share your requirements, and we’ll craft a stunning visual experience tailored exclusively for your brand.
                        </p>
                        <p className="text-sm text-muted-foreground mt-4 italic">
                            Provide your details below and our team will connect with you shortly with concepts, timelines, and pricing.
                        </p>
                    </AnimatedSection>

                    <GlassCard className="p-8 md:p-12 relative overflow-hidden" hover={false}>
                        {isSuccess ? (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="text-center py-12"
                            >
                                <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <Sparkles className="w-10 h-10 text-primary" />
                                </div>
                                <h3 className="font-display text-3xl font-bold text-foreground mb-4">
                                    Your request has been successfully submitted!
                                </h3>
                                <p className="text-muted-foreground text-lg">
                                    Our team will contact you soon with premium design concepts tailored to your brand.
                                </p>
                                <button
                                    onClick={() => setIsSuccess(false)}
                                    className="mt-8 text-primary hover:underline"
                                >
                                    Submit another request
                                </button>
                            </motion.div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-8">
                                {/* 1. Design Type */}
                                <div className="space-y-2">
                                    <label className="text-lg font-semibold text-foreground flex items-center gap-2">
                                        1. Select Your Design Requirement
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <p className="text-sm text-muted-foreground mb-2">Choose the category that best matches your project need.</p>
                                    <div className="relative">
                                        <button
                                            type="button"
                                            onClick={() => setIsOpen(!isOpen)}
                                            className="w-full px-6 py-4 bg-secondary/30 border border-border rounded-xl text-foreground text-left flex justify-between items-center focus:outline-none focus:border-primary transition-colors relative z-20"
                                        >
                                            <span className={!formData.designType ? "text-muted-foreground" : ""}>
                                                {formData.designType || "Select a design type..."}
                                            </span>
                                            <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
                                        </button>

                                        <AnimatePresence>
                                            {isOpen && (
                                                <motion.div
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, y: 10 }}
                                                    transition={{ duration: 0.2 }}
                                                    className="absolute top-full left-0 right-0 mt-4 p-6 bg-[#03002e]/95 backdrop-blur-xl border border-white/10 rounded-2xl z-50 shadow-2xl overflow-y-auto max-h-[60vh]"
                                                >
                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                        {designOptions.map((option) => (
                                                            <div
                                                                key={option}
                                                                onClick={() => {
                                                                    setFormData({ ...formData, designType: option });
                                                                    setIsOpen(false);
                                                                }}
                                                                className="group relative overflow-hidden p-6 rounded-xl border border-white/5 bg-white/5 hover:bg-white/10 transition-all duration-300 cursor-pointer flex flex-col gap-2"
                                                            >
                                                                {/* Hover Shine Effect */}
                                                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

                                                                <div className="flex items-center gap-3 mb-2">
                                                                    <div className="p-2 bg-primary/20 rounded-lg group-hover:bg-primary/30 transition-colors">
                                                                        <Sparkles className="w-5 h-5 text-primary" />
                                                                    </div>
                                                                    <h4 className="font-semibold text-white/90 group-hover:text-white transition-colors text-sm">
                                                                        {option}
                                                                    </h4>
                                                                </div>

                                                                <p className="text-xs text-muted-foreground line-clamp-2 mb-3">
                                                                    {{
                                                                        "Poster (Digital Designs)": "High-impact digital posters for social media & marketing.",
                                                                        "Banner / Website Banner": "Eye-catching banners for headers, sliders, or ads.",
                                                                        "Festival Wishes & Thanking Creatives": "Warm designs for festivals & special occasions.",
                                                                        "Branding Packages": "Brochures, flyers & corporate branding materials.",
                                                                        "Promotional Advertising Designs": "Strategic ad designs to drive sales & conversions.",
                                                                    }[option]}
                                                                </p>

                                                                <div className="mt-auto self-start">
                                                                    <span className="inline-block px-3 py-1.5 bg-primary/20 hover:bg-primary/30 text-primary text-xs font-semibold rounded-lg border border-primary/20 transition-colors">
                                                                        Starting from {{
                                                                            "Poster (Digital Designs)": "₹799",
                                                                            "Banner / Website Banner": "₹1,499",
                                                                            "Festival Wishes & Thanking Creatives": "₹699",
                                                                            "Branding Packages": "₹4,999",
                                                                            "Promotional Advertising Designs": "₹1,999",
                                                                        }[option]}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>

                                    {formData.designType && (
                                        <motion.div
                                            key={formData.designType}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.5, ease: "circOut" }}
                                            className="mt-6 p-6 bg-gradient-to-br from-white/5 to-white/10 border border-white/10 rounded-xl relative overflow-hidden group"
                                        >
                                            <motion.div
                                                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
                                                initial={{ x: '-100%' }}
                                                animate={{ x: '200%' }}
                                                transition={{ duration: 1.5, ease: "easeInOut" }}
                                            />

                                            <div className="relative z-10 flex items-start gap-4">
                                                <div className="p-3 bg-primary/20 rounded-lg shadow-inner shadow-primary/10">
                                                    <Sparkles className="w-6 h-6 text-primary" />
                                                </div>
                                                <div>
                                                    <h4 className="text-lg font-semibold text-white mb-2">{formData.designType}</h4>
                                                    <p className="text-muted-foreground text-sm leading-relaxed">
                                                        {{
                                                            "Poster (Digital Designs)": "High-impact digital posters for social media, events, or marketing campaigns. Optimized for varying screen sizes and platforms to maximize engagement.",
                                                            "Banner / Website Banner": "Eye-catching banners for your website headers, sliders, or ad spaces. Designed to fit perfectly and capture attention instantly.",
                                                            "Festival Wishes & Thanking Creatives": "Warm and creative designs for festivals and special occasions to connect with your audience on a personal level.",
                                                            "Branding Packages": "Professional corporate designs including brochures, flyers, and reports that reflect your brand's identity and values.",
                                                            "Promotional Advertising Designs": "Strategic designs aimed at promoting sales, offers, and new launches. Built to convert viewers into customers.",
                                                        }[formData.designType] || "Tell us more about your design needs."}
                                                    </p>
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}
                                </div>

                                {/* 2. Email */}
                                <div className="space-y-2">
                                    <label className="text-lg font-semibold text-foreground flex items-center gap-2">
                                        2. Your Email Address
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <p className="text-sm text-muted-foreground mb-2">We’ll use this email to share concepts, updates, and delivery files.</p>
                                    <input
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        required
                                        placeholder="Enter your business or personal email..."
                                        className="relative z-10 w-full px-6 py-4 bg-secondary/30 border border-border rounded-xl text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary transition-colors"
                                    />
                                </div>

                                {/* 3. References */}
                                <div className="space-y-2">
                                    <label className="text-lg font-semibold text-foreground">
                                        3. Share Your References or Ideas
                                    </label>
                                    <p className="text-sm text-muted-foreground mb-2">Links, sample images, brand assets, or a short description helps us design exactly what you imagine.</p>
                                    <textarea
                                        value={formData.references}
                                        onChange={(e) => setFormData({ ...formData, references: e.target.value })}
                                        rows={4}
                                        placeholder="Paste links, list ideas, or describe the style you're looking for..."
                                        className="relative z-10 w-full px-6 py-4 bg-secondary/30 border border-border rounded-xl text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary transition-colors resize-none"
                                    />
                                </div>

                                {/* 4. Details */}
                                <div className="space-y-2">
                                    <label className="text-lg font-semibold text-foreground">
                                        4. Project Details / Additional Message
                                    </label>
                                    <textarea
                                        value={formData.details}
                                        onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                                        rows={4}
                                        placeholder="Tell us about your brand, project goals, and what you want to feature..."
                                        className="relative z-10 w-full px-6 py-4 bg-secondary/30 border border-border rounded-xl text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary transition-colors resize-none"
                                    />
                                </div>

                                <div className="pt-4">
                                    <motion.button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full btn-glow text-white text-lg flex flex-col items-center justify-center gap-1 py-4"
                                        whileHover={{ scale: 1.01 }}
                                        whileTap={{ scale: 0.99 }}
                                    >
                                        <div className="flex items-center gap-2">
                                            <span className="relative z-10">{isSubmitting ? "Sending..." : "Send Project Request"}</span>
                                            {!isSubmitting && <Send className="w-5 h-5 relative z-10" />}
                                        </div>
                                    </motion.button>
                                    <p className="text-center text-sm text-muted-foreground mt-3">Our team will review your request and get back to you shortly.</p>
                                </div>
                            </form>
                        )}
                    </GlassCard>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default StartProject;
