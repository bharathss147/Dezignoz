import { useNavigate } from "react-router-dom";
import AnimatedBackground from "@/components/AnimatedBackground";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PosterShowcase from "@/components/PosterShowcase";

const PosterDesigns = () => {
    const navigate = useNavigate();
    return (
        <div className="relative min-h-screen overflow-x-hidden">
            <AnimatedBackground />
            <Navbar />

            {/* Poster Showcase Integrated */}
            <PosterShowcase />

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
        </div>
    );
};

export default PosterDesigns;
