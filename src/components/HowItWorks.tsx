import { motion } from "framer-motion";
import { Search, CalendarCheck, Droplets, FileCheck } from "lucide-react";

const steps = [
  {
    icon: Search,
    step: "01",
    title: "Choose Your Test",
    description: "Browse our catalog of 500+ tests or upload a prescription to get started.",
  },
  {
    icon: CalendarCheck,
    step: "02",
    title: "Book a Slot",
    description: "Select a convenient time and date for home sample collection.",
  },
  {
    icon: Droplets,
    step: "03",
    title: "Sample Collection",
    description: "Our trained phlebotomist visits your home and collects samples safely.",
  },
  {
    icon: FileCheck,
    step: "04",
    title: "Get Reports",
    description: "Receive accurate digital reports within 24 hours on your phone.",
  },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-24 md:py-32">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-semibold text-primary uppercase tracking-wider">How It Works</span>
          <h2 className="text-3xl md:text-5xl font-display font-bold mt-3 mb-4">
            Simple <span className="text-gradient">4-Step</span> Process
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Getting lab tests done has never been easier. Here's how it works.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="relative text-center"
            >
              {/* Connector line */}
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-10 left-[60%] w-[80%] h-px bg-gradient-to-r from-primary/30 to-transparent" />
              )}

              <div className="w-20 h-20 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-5 relative">
                <step.icon className="w-8 h-8 text-primary" />
                <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center font-display">
                  {step.step}
                </span>
              </div>
              <h3 className="text-lg font-display font-semibold mb-2 text-foreground">
                {step.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-xs mx-auto">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
