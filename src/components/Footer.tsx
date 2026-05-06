import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Linkedin, Instagram } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t border-border/20 py-16 px-6">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-3 mb-6">
              <motion.img 
                src="/logo.png" 
                alt="DESIGN DYNAMO Logo" 
                className="h-12 w-auto object-contain"
                whileHover={{ 
                  scale: 1.05,
                  filter: "drop-shadow(0 0 15px rgba(34, 211, 238, 0.8))"
                }}
                whileTap={{ 
                  scale: 0.95,
                  filter: "drop-shadow(0 0 25px rgba(34, 211, 238, 1))"
                }}
              />
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Crafting digital experiences that inspire and innovate. Your vision, our expertise.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-semibold text-foreground mb-4">Navigation</h4>
            <ul className="space-y-2">
              {["Home", "About", "Services", "Works", "Contact"].map((item) => (
                <li key={item}>
                  <Link
                    to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                    className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-display font-semibold text-foreground mb-4">Services</h4>
            <ul className="space-y-2">
              {["UI/UX Design", "Branding", "Digital Marketing", "Automation"].map((item) => (
                <li key={item}>
                  <span className="text-muted-foreground text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-semibold text-foreground mb-4">Connect</h4>
            <p className="text-muted-foreground text-sm mb-4">designdynamobha77@gmail.com</p>
            <div className="flex gap-4">
              {[
                { icon: Linkedin, href: "https://www.linkedin.com/in/dezigno-531a96384/" },
                { icon: Instagram, href: "https://www.instagram.com/designdynamobha77/" },
                {
                   icon: ({ size = 24, className }: { size?: number, className?: string }) => (
                     <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" /><path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1" /></svg>
                   ),
                   href: "https://wa.me/919363730177"
                }
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg glass-card flex items-center justify-center text-muted-foreground hover:text-foreground transition-all"
                  whileHover={{ y: -3, backgroundColor: "rgba(34, 211, 238, 0.1)" }}
                  whileTap={{ scale: 0.95 }}
                >
                  <social.icon size={18} />
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border/20 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-sm">
            © {currentYear} DEZIGNO. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
