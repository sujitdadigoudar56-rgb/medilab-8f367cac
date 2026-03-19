import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Stethoscope, Heart, Baby, Brain, Eye, Pill, Ear, Apple } from "lucide-react";

const specialists = [
  { name: "General Physicians", icon: Stethoscope, available: 120 },
  { name: "Cardiologists", icon: Heart, available: 45 },
  { name: "Dermatologists", icon: Eye, available: 60 },
  { name: "Pediatricians", icon: Baby, available: 55 },
  { name: "Gynecologists", icon: Heart, available: 50 },
  { name: "Diabetologists", icon: Pill, available: 35 },
  { name: "ENT Specialists", icon: Ear, available: 40 },
  { name: "Dietitians", icon: Apple, available: 30 },
];

const Specialists = () => {
  return (
    <section id="specialists" className="py-24 md:py-32 bg-secondary/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="text-sm font-semibold text-primary uppercase tracking-wider">Consult Specialists</span>
          <h2 className="text-3xl md:text-5xl font-display font-bold mt-3 mb-4">
            Talk to <span className="text-gradient">Expert Doctors</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Online consultations with top specialists. Get prescriptions and health advice from home.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
          {specialists.map((spec, i) => (
            <motion.div
              key={spec.name}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="group bg-card rounded-xl p-6 border border-border/50 card-shadow hover:card-shadow-hover hover:border-primary/30 transition-all duration-300 text-center cursor-pointer"
            >
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                <spec.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-display font-semibold text-foreground mb-1 text-sm">{spec.name}</h3>
              <p className="text-xs text-muted-foreground">{spec.available}+ doctors available</p>
              <Button variant="ghost" size="sm" className="mt-3 text-primary text-xs hover:bg-primary/10">
                Consult Now
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Specialists;
