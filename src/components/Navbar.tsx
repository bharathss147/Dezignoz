import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronRight, LogOut } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { useAuth } from "@/context/AuthContext";

const publicNavItems = [
  { name: "Home", path: "/" },
  { name: "Login", path: "/login" },
  { name: "Sign Up", path: "/signup" },
];

const protectedNavItems = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Services", path: "/services" },
  { name: "Contact", path: "/contact" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [lastClickTime, setLastClickTime] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();
  const { isLoggedIn, logout } = useAuth();

  const navItems = isLoggedIn ? protectedNavItems : publicNavItems;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (path: string) => {
    if (location.pathname === path) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    setIsOpen(false);
  };

  const handleLogoClick = (e: React.MouseEvent) => {
    const currentTime = new Date().getTime();
    let newClickCount = clickCount;

    if (currentTime - lastClickTime > 800) {
      newClickCount = 1;
    } else {
      newClickCount += 1;
    }

    setClickCount(newClickCount);
    setLastClickTime(currentTime);

    if (newClickCount === 3) {
      e.preventDefault();
      navigate('/magic');
      setClickCount(0);
      setIsOpen(false);
      return;
    }

    if (location.pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    setIsOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 px-6 py-4 ${scrolled ? "bg-background/20 backdrop-blur-xl border-b border-white/5 py-3" : "bg-transparent py-5"
        }`}
    >
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo Section */}
        <Link
          to="/"
          className="flex items-center gap-2 group relative"
          onClick={handleLogoClick}
        >
          <div className="relative">
            <motion.img
              src="/logo.png"
              alt="Design Dynamo Logo"
              className="h-10 w-auto object-contain brightness-110 contrast-125 hover:brightness-125 transition-all duration-300"
              whileHover={{
                scale: 1.05,
                filter: "drop-shadow(0 0 15px rgba(34, 211, 238, 0.8))"
              }}
              whileTap={{ scale: 0.95 }}
            />
            <div className="absolute inset-0 bg-cyan-400/20 blur-xl rounded-full -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>

          {/* Transparent Popup Message */}
          <div className="absolute top-full mt-2 left-0 w-max px-4 py-2 opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 pointer-events-none transition-all duration-300 bg-transparent backdrop-blur-md border border-white/15 rounded-xl">
            <p className="text-xs font-medium text-white/80 tracking-wide">
              Tap 3 times to enter the Dimension
            </p>
          </div>
        </Link>

        {/* Desktop Nav - Glass Pill Style */}
        <div className="hidden md:flex items-center gap-6">
          <div className="flex items-center gap-3 p-1.5 bg-white/[0.05] dark:bg-white/[0.05] bg-black/[0.02] backdrop-blur-md rounded-[24px] border border-white/[0.08] dark:border-white/[0.08] border-black/[0.05]">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`relative px-5 py-2.5 rounded-[20px] text-sm font-semibold transition-all duration-300 group ${location.pathname === item.path
                    ? "text-primary dark:text-white bg-black/5 dark:bg-white/10 shadow-[0_0_15px_rgba(34,211,238,0.2)]"
                    : "text-muted-foreground hover:text-primary dark:hover:text-white"
                  }`}
                onClick={() => handleNavClick(item.path)}
              >
                {/* Hover Background & Glow */}
                <motion.div
                  className="absolute inset-0 rounded-[20px] bg-cyan-500/10 opacity-0 group-hover:opacity-100 group-hover:shadow-[0_0_20px_rgba(34,211,238,0.3)] transition-all duration-300 -z-10"
                  whileHover={{ y: -3 }}
                />

                <span className="relative z-10">{item.name}</span>

                {/* Subtle bottom indicator for active state */}
                {location.pathname === item.path && (
                  <motion.div
                    layoutId="activeTabIndicator"
                    className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 bg-cyan-400 rounded-full shadow-[0_0_8px_rgba(34,211,238,0.8)]"
                  />
                )}
              </Link>
            ))}
          </div>

            <div className="flex items-center gap-3">
              {isLoggedIn && (
                <button 
                  onClick={() => { logout(); navigate("/"); }} 
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 hover:bg-red-500/10 text-muted-foreground hover:text-red-400 border border-white/5 transition-colors"
                  title="Sign Out"
                >
                  <LogOut size={18} />
                </button>
              )}
              <ThemeToggle />
              <Link to={isLoggedIn ? "/start-project" : "/signup"}>
                <motion.button
                  className="px-8 py-3 rounded-[22px] bg-cyan-500 text-white text-sm font-bold shadow-[0_0_20px_rgba(34,211,238,0.3)] hover:shadow-[0_0_35px_rgba(34,211,238,0.6)] hover:bg-cyan-400 transition-all duration-300 active:scale-95"
                  whileHover={{ y: -3 }}
                >
                  Start Project
                </motion.button>
              </Link>
            </div>
        </div>

        {/* Mobile Actions */}
        <div className="md:hidden flex items-center gap-3">
          <ThemeToggle />
          <button
            className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 dark:bg-white/5 bg-black/5 border border-white/10 dark:border-white/10 border-black/5 text-foreground"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            className="md:hidden absolute top-full left-6 right-6 mt-4 bg-background/95 backdrop-blur-2xl border border-foreground/10 overflow-hidden rounded-[24px] shadow-2xl"
          >
            <div className="flex flex-col p-6 gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`text-base font-medium p-4 rounded-2xl flex items-center justify-between transition-all ${location.pathname === item.path
                      ? "bg-white/10 text-white"
                      : "text-foreground/70 hover:bg-white/5 hover:text-white"
                    }`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                  <ChevronRight size={18} className={location.pathname === item.path ? "text-cyan-400" : "opacity-0"} />
                </Link>
              ))}
              {isLoggedIn && (
                <button
                  onClick={() => { logout(); setIsOpen(false); navigate("/"); }}
                  className="text-base font-medium p-4 rounded-2xl flex items-center justify-between transition-all text-red-400 hover:bg-red-500/10"
                >
                  Sign Out
                  <LogOut size={18} />
                </button>
              )}
              <Link
                to={isLoggedIn ? "/start-project" : "/signup"}
                className="mt-2 bg-cyan-500 text-white text-center py-4 rounded-2xl font-bold shadow-[0_0_20px_rgba(34,211,238,0.3)]"
                onClick={() => setIsOpen(false)}
              >
                Start Project
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
