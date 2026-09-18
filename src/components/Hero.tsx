import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Clock, ShieldCheck, Truck, MapPin } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { getBookingPath } from "@/lib/booking";
import heroBg from "@/assets/hero-bg.jpg";

const badges = [
  { icon: Clock, text: "Reports in 24hrs" },
  { icon: ShieldCheck, text: "NABL Certified Labs" },
  { icon: Truck, text: "Free Home Collection" },
];

const Hero = () => {
  const [pincode, setPincode] = useState("");
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden pt-24">
      <div className="absolute inset-0">
        <img src={heroBg} alt="Medical lab background" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/40" />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse-soft" />
            <span className="text-sm font-medium text-primary">
              Trusted by 50,000+ patients across India
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-4xl md:text-6xl lg:text-7xl font-display font-extrabold leading-tight mb-6"
          >
            Lab Tests at Your
            <br />
            <span className="text-gradient">Doorstep</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-lg md:text-xl text-muted-foreground max-w-lg mb-8 leading-relaxed"
          >
            Book lab tests online, get samples collected from home, and receive
            accurate digital reports — all with free doorstep collection.
          </motion.p>

          {/* Pincode checker */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="flex items-center gap-2 bg-card/90 backdrop-blur border border-border/50 rounded-full p-1.5 pl-5 max-w-md mb-6"
          >
            <MapPin className="w-4 h-4 text-primary shrink-0" />
            <input
              type="text"
              placeholder="Enter pincode to check availability"
              value={pincode}
              onChange={(e) => setPincode(e.target.value)}
              className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none"
            />
            <Button variant="hero" size="sm" className="rounded-full px-5">
              Check
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 mb-10"
          >
            <Button
              variant="hero"
              size="lg"
              className="text-base px-8 py-6"
              onClick={() => navigate(getBookingPath(user), { state: { type: "test" } })}
            >
              Book a Lab Test
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button variant="heroOutline" size="lg" className="text-base px-8 py-6">
              Upload Prescription
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-wrap gap-4"
          >
            {badges.map((badge) => (
              <div
                key={badge.text}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-card/80 backdrop-blur border border-border/50 card-shadow"
              >
                <badge.icon className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-foreground">{badge.text}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
