
import { motion } from "framer-motion";
import { CheckCircle, Home } from "lucide-react";
import { Link } from "react-router-dom";
import AnimatedBackground from "@/components/AnimatedBackground";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimatedSection from "@/components/AnimatedSection";

const AppointmentSuccess = () => {
    return (
        <div className="relative min-h-screen overflow-x-hidden">
            <AnimatedBackground />
            <Navbar />

            <section className="relative pt-32 pb-20 px-6 min-h-[80vh] flex items-center justify-center">
                <AnimatedSection className="container mx-auto text-center max-w-2xl">
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ type: "spring", duration: 0.5 }}
                        className="flex flex-col items-center"
                    >
                        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center mb-8 shadow-lg shadow-green-500/20">
                            <CheckCircle className="w-12 h-12 text-white" />
                        </div>

                        <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">
                            Appointment Confirmed!
                        </h1>

                        <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                            You have successfully booked the appointment for consulting of design.
                            We will contact you shortly to confirm the details.
                        </p>

                        <div className="bg-secondary/50 p-6 rounded-2xl mb-8 border border-white/5 w-full max-w-sm mx-auto backdrop-blur-sm">
                            <h3 className="text-sm font-medium text-primary uppercase tracking-wider mb-4">Working Hours</h3>
                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between text-muted-foreground">
                                    <span>Monday - Friday</span>
                                    <span className="text-foreground font-medium">6:00 PM - 11:00 PM</span>
                                </div>
                                <div className="flex justify-between text-muted-foreground">
                                    <span>Saturday</span>
                                    <span className="text-foreground font-medium">6:00 PM - 11:00 PM</span>
                                </div>
                                <div className="flex justify-between text-muted-foreground pt-2 border-t border-white/5">
                                    <span>Sunday</span>
                                    <span className="text-primary">By Appointment</span>
                                </div>
                            </div>
                        </div>

                        <Link to="/contact">
                            <motion.button
                                className="btn-glow px-8 py-3 rounded-full text-white flex items-center gap-2"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Home className="w-5 h-5" />
                                <span>Back to Contact</span>
                            </motion.button>
                        </Link>
                    </motion.div>
                </AnimatedSection>
            </section>

            <Footer />
        </div>
    );
};

export default AppointmentSuccess;
