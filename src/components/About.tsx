import { motion } from "framer-motion";
import { Building2, Users, Award, Clock } from "lucide-react";

const stats = [
  { value: "50K+", label: "Happy Patients", icon: Users },
  { value: "500+", label: "Lab Tests Available", icon: Award },
  { value: "99.8%", label: "Report Accuracy", icon: Award },
  { value: "24hrs", label: "Avg Report Time", icon: Clock },
];

const About = () => {
  return (
    <section id="about" className="py-24 md:py-32">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">About MediLab</span>
            <h2 className="text-3xl md:text-5xl font-display font-bold mt-3 mb-6">
              Your trusted partner in
              <br />
              <span className="text-gradient">diagnostics</span>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-6">
              MediLab is revolutionizing healthcare diagnostics by bringing lab
              testing to your doorstep. Our NABL-accredited partner labs ensure
              the highest standards of accuracy and reliability.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-6">
              With a network of trained phlebotomists and state-of-the-art
              laboratories, we make preventive healthcare accessible,
              affordable, and convenient for everyone.
            </p>
            <div className="flex flex-wrap gap-3 text-sm">
              <span className="px-3 py-1.5 rounded-full bg-primary/10 text-primary font-medium">Partner Hospitals</span>
              <span className="px-3 py-1.5 rounded-full bg-primary/10 text-primary font-medium">Diagnostic Centers</span>
              <span className="px-3 py-1.5 rounded-full bg-primary/10 text-primary font-medium">Health Blogs</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-2 gap-4"
          >
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="bg-card rounded-xl p-6 text-center border border-border/50 card-shadow"
              >
                <div className="text-3xl md:text-4xl font-display font-bold text-gradient mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
