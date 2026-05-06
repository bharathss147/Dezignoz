import { motion } from "framer-motion";
import { ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  hover?: boolean;
}

const GlassCard = ({ children, className = "", delay = 0, hover = true }: GlassCardProps) => {
  return (
    <motion.div
      className={`glass-card ${className}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, margin: "-50px" }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      whileHover={hover ? { y: -8, transition: { duration: 0.3 } } : undefined}
    >
      {children}
    </motion.div>
  );
};

export default GlassCard;
