import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Index from "./pages/Index";
import About from "./pages/About";
import Services from "./pages/Services";
import Works from "./pages/Works";
import Magic from "./pages/Magic";
import BackgroundRemoverPage from "./pages/BackgroundRemoverPage";
import WatermarkRemoverPage from "./pages/WatermarkRemoverPage";
import ImageSearchPage from "./pages/ImageSearchPage";

import StartProject from "./pages/StartProject";
import PosterDesigns from "./pages/PosterDesigns";
import BannerDesigns from "./pages/BannerDesigns";
import CompanyRequirements from "./pages/CompanyRequirements";
import PromotionalDesigns from "./pages/PromotionalDesigns";
import FestivalWishes from "./pages/FestivalWishes";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import AppointmentSuccess from "./pages/AppointmentSuccess";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

import { ThemeProvider } from "./components/theme-provider";
import ScrollToTop from "./components/ScrollToTop";

const queryClient = new QueryClient();

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isLoggedIn } = useAuth();
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<ProtectedRoute><About /></ProtectedRoute>} />
            <Route path="/services" element={<ProtectedRoute><Services /></ProtectedRoute>} />
            <Route path="/magic" element={<ProtectedRoute><Magic /></ProtectedRoute>} />
            <Route path="/magic/background-remover" element={<ProtectedRoute><BackgroundRemoverPage /></ProtectedRoute>} />
            <Route path="/magic/watermark-remover" element={<ProtectedRoute><WatermarkRemoverPage /></ProtectedRoute>} />
            <Route path="/magic/image-search" element={<ProtectedRoute><ImageSearchPage /></ProtectedRoute>} />
            <Route path="/works" element={<ProtectedRoute><Works /></ProtectedRoute>} />
            <Route path="/works/poster-designs" element={<ProtectedRoute><PosterDesigns /></ProtectedRoute>} />
            <Route path="/works/banner-designs" element={<ProtectedRoute><BannerDesigns /></ProtectedRoute>} />
            <Route path="/works/company-requirements" element={<ProtectedRoute><CompanyRequirements /></ProtectedRoute>} />

            <Route path="/works/promotional-designs" element={<ProtectedRoute><PromotionalDesigns /></ProtectedRoute>} />
            <Route path="/works/festival-wishes" element={<ProtectedRoute><FestivalWishes /></ProtectedRoute>} />
            <Route path="/contact" element={<ProtectedRoute><Contact /></ProtectedRoute>} />
            <Route path="/start-project" element={<StartProject />} />
            <Route path="/appointment-success" element={<ProtectedRoute><AppointmentSuccess /></ProtectedRoute>} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
