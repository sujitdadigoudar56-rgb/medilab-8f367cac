import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const tests = [
  { name: "Complete Blood Count (CBC)", price: 299, report: "6 hrs" },
  { name: "Liver Function Test (LFT)", price: 449, report: "12 hrs" },
  { name: "Kidney Function Test (KFT)", price: 499, report: "12 hrs" },
  { name: "Lipid Profile", price: 399, report: "12 hrs" },
  { name: "Thyroid Test (T3, T4, TSH)", price: 499, report: "24 hrs" },
  { name: "Blood Sugar (Fasting & PP)", price: 199, report: "6 hrs" },
  { name: "Urine Routine & Microscopy", price: 149, report: "6 hrs" },
  { name: "D-Dimer Test", price: 899, report: "24 hrs" },
  { name: "Widal Test", price: 249, report: "12 hrs" },
  { name: "RT-PCR / Viral Tests", price: 699, report: "24 hrs" },
  { name: "HbA1c (Glycated Hemoglobin)", price: 399, report: "12 hrs" },
  { name: "Vitamin D Test", price: 599, report: "24 hrs" },
];

const PopularTests = () => {
  return (
    <section id="tests" className="py-24 md:py-32">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="text-sm font-semibold text-primary uppercase tracking-wider">Popular Lab Tests</span>
          <h2 className="text-3xl md:text-5xl font-display font-bold mt-3 mb-4">
            Most Booked <span className="text-gradient">Lab Tests</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Accurate results from NABL accredited labs. Free home sample collection on all tests.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {tests.map((test, i) => (
            <motion.div
              key={test.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.04 }}
              className="group flex items-center justify-between bg-card rounded-xl p-4 border border-border/50 card-shadow hover:border-primary/30 transition-all duration-300"
            >
              <div className="flex-1 min-w-0">
                <h3 className="font-display font-semibold text-sm text-foreground truncate">{test.name}</h3>
                <div className="flex items-center gap-3 mt-1">
                  <span className="text-base font-bold text-foreground">₹{test.price}</span>
                  <span className="text-xs text-muted-foreground">Report: {test.report}</span>
                </div>
              </div>
              <Button variant="outline" size="sm" className="shrink-0 ml-3 group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                Book
              </Button>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Button variant="hero" size="lg">
            View All Tests <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PopularTests;
