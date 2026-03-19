import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Heart, Activity, Droplets, Brain, Baby, Shield, Bone, Dna, Microscope, Leaf } from "lucide-react";
import { useState } from "react";

const categories = [
  { id: "recommended", label: "Doctor Recommended" },
  { id: "special", label: "Special Packages" },
];

const packages: Record<string, { name: string; icon: React.ElementType; tests: number; price: number; originalPrice: number; tag?: string }[]> = {
  recommended: [
    { name: "Full Body Checkup", icon: Activity, tests: 72, price: 1499, originalPrice: 3500, tag: "Bestseller" },
    { name: "Diabetes Care", icon: Droplets, tests: 24, price: 799, originalPrice: 1800 },
    { name: "Heart Health Package", icon: Heart, tests: 38, price: 1299, originalPrice: 2800 },
    { name: "Thyroid Profile", icon: Shield, tests: 8, price: 499, originalPrice: 1200 },
    { name: "Vitamin Deficiency", icon: Leaf, tests: 15, price: 999, originalPrice: 2200 },
    { name: "Kidney Function Tests", icon: Activity, tests: 12, price: 599, originalPrice: 1400 },
    { name: "Liver Function Tests", icon: Activity, tests: 14, price: 649, originalPrice: 1500 },
    { name: "Blood Tests Panel", icon: Droplets, tests: 30, price: 899, originalPrice: 2000 },
  ],
  special: [
    { name: "Women's Health Package", icon: Heart, tests: 55, price: 1799, originalPrice: 4000, tag: "Popular" },
    { name: "Senior Citizen Health Check", icon: Shield, tests: 80, price: 2499, originalPrice: 5500 },
    { name: "Fever & Infection Panel", icon: Microscope, tests: 18, price: 699, originalPrice: 1600 },
    { name: "Hormone Screening", icon: Dna, tests: 20, price: 1199, originalPrice: 2600 },
    { name: "PCOD/PCOS Screening", icon: Heart, tests: 22, price: 1399, originalPrice: 3000 },
    { name: "Cancer Screening", icon: Microscope, tests: 35, price: 2999, originalPrice: 6500, tag: "Comprehensive" },
    { name: "Bone & Joint Health", icon: Bone, tests: 16, price: 899, originalPrice: 2000 },
    { name: "Fertility & Reproductive", icon: Baby, tests: 28, price: 1599, originalPrice: 3500 },
    { name: "Immunity Booster Tests", icon: Shield, tests: 12, price: 799, originalPrice: 1800 },
    { name: "Allergy Testing", icon: Brain, tests: 40, price: 1999, originalPrice: 4500 },
  ],
};

const HealthPackages = () => {
  const [active, setActive] = useState("recommended");
  const activePackages = packages[active] || [];

  return (
    <section id="packages" className="py-24 md:py-32 bg-secondary/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-sm font-semibold text-primary uppercase tracking-wider">Health Check Packages</span>
          <h2 className="text-3xl md:text-5xl font-display font-bold mt-3 mb-4">
            Preventive <span className="text-gradient">Health Packages</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Comprehensive health packages designed by expert doctors. Early detection saves lives.
          </p>
        </motion.div>

        {/* Category tabs */}
        <div className="flex justify-center gap-3 mb-10 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActive(cat.id)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 ${
                active === cat.id
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "bg-card border border-border text-muted-foreground hover:text-foreground hover:border-primary/30"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {activePackages.map((pkg, i) => (
            <motion.div
              key={pkg.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="group bg-card rounded-xl p-5 border border-border/50 card-shadow hover:card-shadow-hover hover:border-primary/30 transition-all duration-300 relative"
            >
              {pkg.tag && (
                <span className="absolute top-3 right-3 text-xs font-semibold px-2.5 py-1 rounded-full bg-primary/10 text-primary">
                  {pkg.tag}
                </span>
              )}
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
                <pkg.icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-display font-semibold text-foreground mb-1">{pkg.name}</h3>
              <p className="text-xs text-muted-foreground mb-3">{pkg.tests} tests included</p>
              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-xl font-display font-bold text-foreground">₹{pkg.price}</span>
                <span className="text-sm text-muted-foreground line-through">₹{pkg.originalPrice}</span>
                <span className="text-xs font-semibold text-primary">
                  {Math.round((1 - pkg.price / pkg.originalPrice) * 100)}% off
                </span>
              </div>
              <Button variant="outline" size="sm" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                Book Now
              </Button>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Button variant="hero" size="lg">
            View All Packages <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HealthPackages;
