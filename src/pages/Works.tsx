import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence, useInView, animate } from "framer-motion";
import { ArrowUpRight, X } from "lucide-react";
import AnimatedBackground from "@/components/AnimatedBackground";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GlassCard from "@/components/GlassCard";
import AnimatedSection from "@/components/AnimatedSection";

const works = [
  {
    title: "Poster (Digital Designs)",
    category: "POSTER DESIGN",
    description: "Creative digital posters that capture attention and convey your message effectively.",
    gradient: "from-blue-500/20 to-purple-500/20",
    image: "/projects/poster-design-cover.jpg",
    link: "/works/poster-designs",
    aspect: "aspect-[4/5]"
  },
  {
    title: "Product Advertisement Poster",
    category: "Advertisement",
    description: "High-impact product posters designed to showcase features and drive sales.",
    gradient: "from-pink-500/20 to-orange-500/20",
    image: "/projects/product-advertisement.jpg",
    link: "https://drive.google.com/drive/folders/1K3XTOWMhhk6zwkpG_p-LXK90esXE3ECj?usp=drive_link",
    aspect: "aspect-video"
  },
  {
    title: "Banner / Website Banner",
    category: "Web Graphics",
    description: "Eye-catching banners for websites and social platforms that enhance engagement.",
    gradient: "from-green-500/20 to-teal-500/20",
    image: "/projects/banner-design-main.jpg",
    link: "/works/banner-designs",
    aspect: "aspect-video"
  },
  {
    title: "Festival Wishes & Thanking Creatives",
    category: "Social Media",
    description: "Unique and festive creative designs to connect with your audience on special occasions.",
    gradient: "from-cyan-500/20 to-blue-500/20",
    image: "/projects/Festival-thanking.png",
    link: "/works/festival-wishes",
    aspect: "aspect-square"
  },
  {
    title: "Company / Business Requirement Designs",
    category: "Corporate Design",
    description: "Professional designs for business needs including profiles, cards, and presentations.",
    gradient: "from-yellow-500/20 to-red-500/20",
    image: "/projects/business-requirements.png",
    link: "/works/company-requirements",
    aspect: "aspect-[16/10]"
  },
  {
    title: "Promotional Advertising Designs",
    category: "Marketing",
    description: "Strategic promotional designs aimed at broadening reach and boosting brand visibility.",
    gradient: "from-violet-500/20 to-indigo-500/20",
    image: "/projects/promotional-ads-v2.jpg",
    link: "/works/promotional-designs",
    aspect: "aspect-[16/10]"
  },
];

const Counter = ({ value }: { value: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const spanRef = useRef<HTMLSpanElement>(null);

  const numericValue = parseInt(value, 10);
  const suffix = value.replace(/[0-9]/g, '');

  useEffect(() => {
    if (isInView && spanRef.current) {
      const controls = animate(0, numericValue, {
        duration: 2,
        ease: "easeOut",
        onUpdate(v) {
          if (spanRef.current) {
            spanRef.current.textContent = Math.round(v) + suffix;
          }
        },
      });
      return () => controls.stop();
    }
  }, [isInView, numericValue, suffix]);

  return (
    <div ref={ref} className="font-display text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
      <span ref={spanRef}>0{suffix}</span>
    </div>
  );
};

const Works = () => {
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

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
            Our Work
          </motion.span>
          <motion.h1
            className="font-display text-5xl md:text-7xl font-bold text-foreground mt-4 mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            Grab Our{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Work
            </span>
          </motion.h1>
          <motion.p
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Explore our latest projects and see how we've helped businesses transform their digital
            presence.
          </motion.p>
        </div>
      </section>

      {/* Works Grid */}
      <AnimatedSection className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {works.map((work: any, index) => (
            <GlassCard key={index} className={`group overflow-hidden p-0 relative ${work.aspect || 'aspect-[4/5]'}`} delay={index * 0.1}>
              <div
                className="w-full h-full cursor-pointer relative z-0"
                onClick={() => {
                  if (work.link) {
                    if (work.link.startsWith('/')) {
                      navigate(work.link);
                    } else {
                      window.open(work.link, '_blank');
                    }
                  } else if (work.image) {
                    setSelectedImage(work.image);
                  }
                }}
              >
                {/* Image Container */}
                <div className="absolute inset-0 w-full h-full">
                  {work.image ? (
                    <img
                      src={work.image}
                      alt={work.title}
                      className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-110`}
                    />
                  ) : (
                    <div className={`w-full h-full bg-gradient-to-br ${work.gradient} flex items-center justify-center`}>
                      <span className="font-display text-4xl font-bold text-white/20">
                        {work.title.charAt(0)}
                      </span>
                    </div>
                  )}

                  {/* Permanent Gradient Protection for text */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent z-10" />

                  {/* Hover Brightness / Color Overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${work.gradient} opacity-0 group-hover:opacity-30 transition-opacity duration-500 z-11`} />
                </div>

                {/* Content Overlay */}
                <div className="relative z-20 h-full flex flex-col justify-end p-8">
                  <motion.span className="text-[10px] uppercase tracking-[0.2em] text-primary font-bold mb-3 block opacity-80 group-hover:opacity-100 transition-opacity">
                    {work.category}
                  </motion.span>
                  <h3 className="font-display text-2xl font-bold text-white mb-3 leading-tight group-hover:text-primary transition-colors">
                    {work.title}
                  </h3>
                  <p className="text-sm text-white/50 mb-6 line-clamp-2 group-hover:text-white/80 transition-colors">
                    {work.description}
                  </p>

                  <motion.div
                    className="btn-glow text-white text-sm py-3 w-full flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300 pointer-events-none mt-auto"
                  >
                    <span className="relative z-10">Explore Project</span>
                    <ArrowUpRight className="relative z-10 w-4 h-4" />
                  </motion.div>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      </AnimatedSection>

      {/* Image Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-5xl w-full max-h-[90vh] rounded-2xl overflow-hidden bg-transparent shadow-none"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute top-4 right-4 p-2 bg-black/50 hover:bg-black/70 rounded-full text-white transition-colors z-10"
                onClick={() => setSelectedImage(null)}
              >
                <X size={24} />
              </button>
              <img
                src={selectedImage}
                alt="Project Full View"
                className="w-full h-full object-contain max-h-[90vh]"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Stats */}
      <AnimatedSection className="container mx-auto">
        <GlassCard className="p-12 md:p-16" hover={false}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: "5+", label: "Clients" },
              { value: "20+", label: "Designs" },
              { value: "100%", label: "Satisfaction" },
              { value: "1+", label: "Year Experience" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ delay: index * 0.1 }}
              >
                <Counter value={stat.value} />
                <div className="text-muted-foreground text-sm mt-2">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </GlassCard>
      </AnimatedSection>

      <Footer />
    </div>
  );
};

export default Works;
