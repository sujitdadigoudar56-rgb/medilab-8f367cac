import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useApiData } from "@/hooks/useApiData";
import { useAuth } from "@/hooks/useAuth";
import { getIcon } from "@/lib/iconMap";
import { getBookingPath } from "@/lib/booking";

interface Specialist {
  _id?: string;
  name: string;
  iconName: string;
  availableCount: number;
}

const fallbackSpecialists: Specialist[] = [
  { name: "General Physicians", iconName: "Stethoscope", availableCount: 120 },
  { name: "Cardiologists", iconName: "Heart", availableCount: 45 },
  { name: "Dermatologists", iconName: "Eye", availableCount: 60 },
  { name: "Pediatricians", iconName: "Baby", availableCount: 55 },
  { name: "Gynecologists", iconName: "Heart", availableCount: 50 },
  { name: "Diabetologists", iconName: "Pill", availableCount: 35 },
  { name: "ENT Specialists", iconName: "Ear", availableCount: 40 },
  { name: "Dietitians", iconName: "Apple", availableCount: 30 },
];

const Specialists = () => {
  const { data: specialists } = useApiData<Specialist[]>("/data/specialists", fallbackSpecialists);
  const navigate = useNavigate();
  const { user } = useAuth();

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
          {specialists.map((spec, i) => {
            const Icon = getIcon(spec.iconName);
            return (
            <motion.div
              key={spec._id || spec.name}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="group bg-card rounded-xl p-6 border border-border/50 card-shadow hover:card-shadow-hover hover:border-primary/30 transition-all duration-300 text-center cursor-pointer"
            >
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                <Icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-display font-semibold text-foreground mb-1 text-sm">{spec.name}</h3>
              <p className="text-xs text-muted-foreground">{spec.availableCount}+ doctors available</p>
              <Button
                variant="ghost"
                size="sm"
                className="mt-3 text-primary text-xs hover:bg-primary/10"
                onClick={() => navigate(getBookingPath(user), { state: { type: "consultation" } })}
              >
                Consult Now
              </Button>
            </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Specialists;
