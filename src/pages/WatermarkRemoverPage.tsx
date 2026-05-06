import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimatedBackground from "@/components/AnimatedBackground";
import WatermarkRemover from "@/components/magic/WatermarkRemover";

const WatermarkRemoverPage = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen bg-[#020617] selection:bg-cyan-500/30">
      <div className="fixed inset-0 w-full h-full pointer-events-none" style={{ perspective: "1200px", zIndex: 0 }}>
        <AnimatedBackground />
      </div>
      <div className="relative z-10 pointer-events-auto">
        <Navbar />
      </div>
      <main className="container mx-auto pt-32 pb-20 px-6 relative z-10">
        <WatermarkRemover onBack={() => navigate('/magic')} />
      </main>
      <Footer />
    </div>
  );
};

export default WatermarkRemoverPage;
