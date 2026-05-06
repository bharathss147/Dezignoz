import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Mail, MapPin, Phone, Linkedin, Instagram } from "lucide-react";
import AnimatedBackground from "@/components/AnimatedBackground";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GlassCard from "@/components/GlassCard";
import AnimatedSection from "@/components/AnimatedSection";

import { useNavigate } from "react-router-dom";

const Contact = () => {
  const navigate = useNavigate();
  const [showAppointment, setShowAppointment] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const whatsappNumber = "919363730177";
    const text = `Name: ${formData.name}%0AEmail: ${formData.email}%0AMessage: ${formData.message}`;
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${text}`;

    window.open(whatsappUrl, '_blank');

    setIsSubmitting(false);
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <AnimatedBackground />
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-20 px-6">
        <div className="container mx-auto text-center max-w-4xl">
          <motion.span
            className="text-primary text-sm font-medium tracking-wider uppercase"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            Contact Us
          </motion.span>
          <motion.h1
            className="font-display text-5xl md:text-7xl font-bold text-foreground mt-4 mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            Let's{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Connect
            </span>
          </motion.h1>
          <motion.p
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Have a project in mind? We'd love to hear from you. Send us a message and we'll respond
            as soon as possible.
          </motion.p>
        </div>
      </section>

      {/* Contact Section */}
      <AnimatedSection className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <GlassCard className="p-8 md:p-10" hover={false}>
            <h3 className="font-display text-2xl font-bold text-foreground mb-6">
              Send us a Message
            </h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="relative">
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="peer w-full px-4 py-4 bg-secondary/50 border border-border rounded-xl text-foreground placeholder-transparent focus:outline-none focus:border-primary transition-colors"
                  placeholder="Your Name"
                />
                <label
                  htmlFor="name"
                  className="absolute left-4 -top-2.5 text-sm text-muted-foreground bg-card px-2 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-4 peer-placeholder-shown:bg-transparent peer-focus:-top-2.5 peer-focus:text-sm peer-focus:bg-card peer-focus:text-primary"
                >
                  Your Name
                </label>
              </div>

              <div className="relative">
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="peer w-full px-4 py-4 bg-secondary/50 border border-border rounded-xl text-foreground placeholder-transparent focus:outline-none focus:border-primary transition-colors"
                  placeholder="Your Email"
                />
                <label
                  htmlFor="email"
                  className="absolute left-4 -top-2.5 text-sm text-muted-foreground bg-card px-2 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-4 peer-placeholder-shown:bg-transparent peer-focus:-top-2.5 peer-focus:text-sm peer-focus:bg-card peer-focus:text-primary"
                >
                  Your Email
                </label>
              </div>

              <div className="relative">
                <textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  rows={5}
                  className="peer w-full px-4 py-4 bg-secondary/50 border border-border rounded-xl text-foreground placeholder-transparent focus:outline-none focus:border-primary transition-colors resize-none"
                  placeholder="Your Message"
                />
                <label
                  htmlFor="message"
                  className="absolute left-4 -top-2.5 text-sm text-muted-foreground bg-card px-2 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-4 peer-placeholder-shown:bg-transparent peer-focus:-top-2.5 peer-focus:text-sm peer-focus:bg-card peer-focus:text-primary"
                >
                  Your Message
                </label>
              </div>

              <motion.button
                type="submit"
                className="btn-glow w-full text-white flex items-center justify-center gap-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={isSubmitting}
              >
                <span className="relative z-10">
                  {isSubmitting ? "Sending..." : "Send Message"}
                </span>
                <Send className="relative z-10 w-5 h-5" />
              </motion.button>
            </form>
          </GlassCard>

          {/* Contact Info - Glass Identity Card */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, rotateY: -180, scale: 0.8, x: 50 }}
            animate={{ opacity: 1, rotateY: 0, scale: 1, x: 0 }}
            transition={{
              duration: 1.5,
              type: "spring",
              bounce: 0.4,
              delay: 0.4
            }}
            style={{ perspective: "2000px", transformStyle: "preserve-3d" }}
          >
            <div className="relative overflow-hidden rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-1 shadow-2xl shadow-primary/20 group">
              {/* Glowing Gradient Border */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-cyan-400 to-blue-500 opacity-50 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Card Content Container */}
              <div className="relative h-full bg-black/40 backdrop-blur-md rounded-[22px] p-8 overflow-hidden">
                {/* Decorative Shine */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />

                {/* Profile / Header Section */}
                <div className="flex items-center gap-6 mb-8 pb-8 border-b border-white/10">
                  {/* Removed Profile Image as per user request */}
                  <div>
                    <h3 className="text-2xl font-bold text-white tracking-wide">Dezigno <span className="text-transparent">Blozz</span></h3>
                    <p className="text-sm text-gray-400 font-medium tracking-wider">CREATIVE STUDIO</p>
                    <div className="flex gap-4 mt-3">
                      <div className="text-center">
                        <span className="block text-white font-bold text-lg">20+</span>
                        <span className="text-[10px] text-gray-500 uppercase tracking-wider">Projects</span>
                      </div>
                      <div className="w-px h-8 bg-white/10" />
                      <div className="text-center">
                        <span className="block text-white font-bold text-lg">5★</span>
                        <span className="text-[10px] text-gray-500 uppercase tracking-wider">Rating</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Contact Details List */}
                <div className="space-y-6 relative z-10">
                  {/* Email */}
                  <a href="mailto:designdynamobha77@gmail.com" className="flex items-center gap-5 group/item transition-transform hover:translate-x-2">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-white/10 to-transparent border border-white/5 flex items-center justify-center flex-shrink-0 shadow-lg shadow-purple-500/10 group-hover/item:shadow-purple-500/30 transition-all">
                      <Mail className="w-5 h-5 text-purple-400" />
                    </div>
                    <div>
                      <h4 className="text-xs text-gray-500 uppercase tracking-widest mb-1">Email</h4>
                      <p className="text-white font-medium text-sm group-hover/item:text-purple-300 transition-colors">designdynamobha77@gmail.com</p>
                      <p className="text-white/60 text-xs">blozz77ss@gmail.com</p>
                    </div>
                  </a>

                  {/* Phone */}
                  <a href="tel:+919363730177" className="flex items-center gap-5 group/item transition-transform hover:translate-x-2">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-white/10 to-transparent border border-white/5 flex items-center justify-center flex-shrink-0 shadow-lg shadow-pink-500/10 group-hover/item:shadow-pink-500/30 transition-all">
                      <Phone className="w-5 h-5 text-pink-400" />
                    </div>
                    <div>
                      <h4 className="text-xs text-gray-500 uppercase tracking-widest mb-1">Phone</h4>
                      <p className="text-white font-medium text-sm group-hover/item:text-pink-300 transition-colors">+91 9363730177</p>
                    </div>
                  </a>

                  {/* Location */}
                  <div className="flex items-center gap-5 group/item transition-transform hover:translate-x-2">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-white/10 to-transparent border border-white/5 flex items-center justify-center flex-shrink-0 shadow-lg shadow-cyan-500/10 group-hover/item:shadow-cyan-500/30 transition-all">
                      <MapPin className="w-5 h-5 text-cyan-400" />
                    </div>
                    <div>
                      <h4 className="text-xs text-gray-500 uppercase tracking-widest mb-1">Location</h4>
                      <p className="text-white font-medium text-sm">Coimbatore, India</p>
                      <p className="text-white/60 text-xs">641035</p>
                    </div>
                  </div>
                </div>

                {/* Social Profiles */}
                <div className="flex items-center gap-5 group/item transition-transform hover:translate-x-2 pt-2">

                  <div>
                    <h4 className="text-xs text-gray-500 uppercase tracking-widest mb-2">Social Profiles</h4>
                    <div className="flex gap-4">
                      <a href="https://www.linkedin.com/in/dezigno-531a96384/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 border border-white/5 flex items-center justify-center transition-colors group/social" title="LinkedIn">
                        <Linkedin className="w-5 h-5 text-white/70 group-hover/social:text-blue-400 transition-colors" />
                      </a>
                      <a href="https://www.instagram.com/designdynamobha77/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 border border-white/5 flex items-center justify-center transition-colors group/social" title="Instagram">
                        <Instagram className="w-5 h-5 text-white/70 group-hover/social:text-pink-400 transition-colors" />
                      </a>
                      <a href="https://wa.me/919363730177" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 border border-white/5 flex items-center justify-center transition-colors group/social" title="WhatsApp">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white/70 group-hover/social:text-green-400 transition-colors">
                          <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
                          <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>

                {/* Footer Quote */}

                {/* Working Hours Styled like Contact Items */}
                <div className="flex items-center gap-5 group/item transition-transform hover:translate-x-2 border-t border-white/10 pt-6 mt-2">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-white/10 to-transparent border border-white/5 flex items-center justify-center flex-shrink-0 shadow-lg shadow-green-500/10 group-hover/item:shadow-green-500/30 transition-all">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-400"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                  </div>
                  <div className="w-full">
                    <h4 className="text-xs text-gray-500 uppercase tracking-widest mb-1">Working Hours</h4>
                    <div className="flex justify-between items-center text-sm mb-1">
                      <span className="text-white font-medium">Monday - Friday</span>
                      <span className="text-green-300 font-bold">6:00 PM - 11:00 PM</span>
                    </div>
                    <div className="flex justify-between items-center text-sm mb-1">
                      <span className="text-white font-medium">Saturday</span>
                      <span className="text-green-300 font-bold">6:00 PM - 11:00 PM</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-white/60">Sunday</span>
                      <button
                        onClick={() => setShowAppointment(!showAppointment)}
                        className="text-white/80 hover:text-white hover:text-primary transition-colors underline decoration-dotted underline-offset-4"
                      >
                        By Appointment
                      </button>
                    </div>
                    <AnimatePresence>
                      {showAppointment && (
                        <motion.div
                          initial={{ opacity: 0, height: 0, marginTop: 0 }}
                          animate={{ opacity: 1, height: "auto", marginTop: 12 }}
                          exit={{ opacity: 0, height: 0, marginTop: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <h5 className="text-[10px] text-gray-500 uppercase tracking-widest mb-2 px-1">Available Slots</h5>
                          <motion.button
                            whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.15)" }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => {
                              const recipients = "designdynamobha77@gmail.com,blozz77ss@gmail.com";
                              const subject = "Booking Appointment for Design Consulting";
                              const body = "Hello,\n\nI would like to book an appointment for design consulting on Sunday between 5:00 PM - 6:00 PM.\n\nPlease confirm availability.\n\nThanks.";
                              window.location.href = `mailto:${recipients}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

                              // Slight delay to allow mail client to open before navigating
                              setTimeout(() => {
                                navigate("/appointment-success");
                              }, 500);
                            }}
                            className="w-full py-2.5 px-3 rounded-xl bg-white/10 border border-white/5 flex items-center justify-between group/slot"
                          >
                            <div className="flex items-center gap-2">
                              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                              <span className="text-sm font-medium text-white group-hover/slot:text-primary transition-colors">5:00 PM - 6:00 PM</span>
                            </div>
                            <div className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center">
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400 group-hover/slot:text-primary"><polyline points="9 18 15 12 9 6"></polyline></svg>
                            </div>
                          </motion.button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </div>


            {/* Working Hours Mini Card - Floating Below/Behind */}

          </motion.div>
        </div>
      </AnimatedSection >

      <Footer />
    </div >
  );
};

export default Contact;
