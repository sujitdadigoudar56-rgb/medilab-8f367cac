import { motion } from "framer-motion";
import { useApiData } from "@/hooks/useApiData";
import { getIcon } from "@/lib/iconMap";

interface Feature {
  _id?: string;
  iconName: string;
  title: string;
  description: string;
}

const fallbackFeatures: Feature[] = [
  { iconName: "TestTube", title: "Wide Range of Tests", description: "500+ lab tests including blood tests, urine tests, thyroid panels, diabetes screening, and more." },
  { iconName: "Truck", title: "Home Sample Collection", description: "Trained phlebotomists collect samples from your home at your preferred time slot." },
  { iconName: "FileText", title: "Digital Reports", description: "Get accurate lab reports delivered digitally to your phone and email within 24 hours." },
  { iconName: "Clock", title: "Quick Turnaround", description: "Most test results are ready within 12-24 hours with real-time status tracking." },
  { iconName: "ShieldCheck", title: "NABL Accredited Labs", description: "All tests processed in NABL accredited laboratories ensuring highest accuracy." },
  { iconName: "Smartphone", title: "Track Your Order", description: "Real-time tracking from sample collection to report delivery with live status updates." },
];

const Features = () => {
  const { data: features } = useApiData<Feature[]>("/data/content/features", fallbackFeatures);

  return (
    <section id="services" className="py-24 md:py-32 bg-secondary/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-semibold text-primary uppercase tracking-wider">Our Services</span>
          <h2 className="text-3xl md:text-5xl font-display font-bold mt-3 mb-4">
            Healthcare Made <span className="text-gradient">Simple</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            From booking to report delivery — we handle everything so you can focus on your health.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => {
            const Icon = getIcon(feature.iconName);
            return (
            <motion.div
              key={feature._id || feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group bg-card rounded-xl p-6 border border-border/50 card-shadow hover:card-shadow-hover hover:border-primary/30 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <Icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-display font-semibold mb-2 text-foreground">
                {feature.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;
