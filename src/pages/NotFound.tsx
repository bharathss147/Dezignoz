import { motion } from "framer-motion";
import { Home, ArrowLeft } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import AnimatedBackground from "@/components/AnimatedBackground";
import Navbar from "@/components/Navbar";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <AnimatedBackground />
      <Navbar />

      <section className="relative min-h-screen flex items-center justify-center px-6">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="font-display text-[150px] md:text-[200px] font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent leading-none"
          >
            404
          </motion.div>
          
          <motion.h1
            className="font-display text-3xl md:text-4xl font-bold text-foreground mt-4 mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Page Not Found
          </motion.h1>
          
          <motion.p
            className="text-lg text-muted-foreground max-w-md mx-auto mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            The page you're looking for doesn't exist or has been moved.
          </motion.p>
          
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Link to="/">
              <motion.button
                className="btn-glow text-white flex items-center justify-center gap-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Home className="relative z-10 w-5 h-5" />
                <span className="relative z-10">Go Home</span>
              </motion.button>
            </Link>
            
            <motion.button
              onClick={() => window.history.back()}
              className="btn-outline-glass text-foreground flex items-center justify-center gap-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <ArrowLeft className="w-5 h-5" />
              Go Back
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default NotFound;
