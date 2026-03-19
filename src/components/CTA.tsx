import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Upload, Phone } from "lucide-react";

const CTA = () => {
  return (
    <section className="py-24 md:py-32">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative rounded-2xl overflow-hidden p-12 md:p-20 text-center"
          style={{ background: "var(--gradient-hero)" }}
        >
          {/* Decorative circles */}
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-white/5 -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-white/5 translate-y-1/2 -translate-x-1/2" />

          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-6 text-primary-foreground">
              Need a lab test?
              <br />
              Book now in 60 seconds
            </h2>
            <p className="text-lg text-primary-foreground/80 max-w-lg mx-auto mb-10">
              Upload your prescription or browse our test catalog. Free home
              collection with every booking.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="text-base px-8 py-6 bg-primary-foreground text-primary font-display font-semibold hover:bg-primary-foreground/90 transition-all duration-300"
              >
                <Upload className="mr-2 w-5 h-5" />
                Upload Prescription
              </Button>
              <Button
                size="lg"
                className="text-base px-8 py-6 bg-transparent border-2 border-primary-foreground/50 text-primary-foreground font-display font-medium hover:bg-primary-foreground/10 transition-all duration-300"
              >
                <Phone className="mr-2 w-5 h-5" />
                Call Us
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;
