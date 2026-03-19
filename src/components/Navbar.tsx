import { motion } from "framer-motion";
import { Menu, X, Phone, MapPin } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Health Packages", href: "#packages" },
  { label: "Lab Tests", href: "#tests" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Specialists", href: "#specialists" },
  { label: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-lg border-b border-border/50 shadow-sm"
    >
      {/* Top bar */}
      <div className="hidden lg:flex items-center justify-between bg-primary text-primary-foreground text-xs px-4 py-1.5">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> Available in 50+ Cities</span>
            <span className="flex items-center gap-1"><Phone className="w-3 h-3" /> 1-800-MEDILAB</span>
          </div>
          <span>📱 Download Our App — Android & iOS</span>
        </div>
      </div>

      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <a href="#" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-display font-bold text-sm">M+</span>
          </div>
          <span className="text-xl font-display font-bold text-foreground">
            Medi<span className="text-primary">Lab</span>
          </span>
        </a>

        <div className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200 font-medium"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-3">
          <Button variant="outline" size="sm" onClick={() => navigate("/login")}>
            Login
          </Button>
          <Button variant="hero" size="sm" onClick={() => navigate("/register")}>
            Book a Test
          </Button>
        </div>

        <button
          className="lg:hidden text-foreground"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="lg:hidden bg-card border-t border-border/50 px-4 pb-4"
        >
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="block py-3 text-sm text-muted-foreground hover:text-primary transition-colors font-medium"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <div className="flex flex-col gap-2 mt-2">
            <Button variant="outline" size="sm" onClick={() => navigate("/login")}>
              Login
            </Button>
            <Button variant="hero" size="sm" onClick={() => navigate("/register")}>
              Book a Test
            </Button>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;
