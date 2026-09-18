import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useApiData } from "@/hooks/useApiData";
import { getIcon } from "@/lib/iconMap";

interface WellnessTopic {
  _id?: string;
  iconName: string;
  title: string;
  description: string;
}

const fallbackTopics: WellnessTopic[] = [
  { iconName: "Heart", title: "Pregnancy Care", description: "Comprehensive prenatal & postnatal care packages" },
  { iconName: "Baby", title: "Baby Care", description: "Newborn screening, vaccinations & growth tracking" },
  { iconName: "Apple", title: "Nutrition & Diet", description: "Personalized diet plans from certified dietitians" },
  { iconName: "Brain", title: "Mental Health", description: "Counseling & mental wellness assessments" },
  { iconName: "Syringe", title: "Vaccination Guidance", description: "Age-wise vaccination schedules & booking" },
];

const FamilyWellness = () => {
  const { data: topics } = useApiData<WellnessTopic[]>("/data/content/wellness", fallbackTopics);

  return (
    <section className="py-24 md:py-32">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="text-sm font-semibold text-primary uppercase tracking-wider">Family & Wellness</span>
          <h2 className="text-3xl md:text-5xl font-display font-bold mt-3 mb-4">
            Complete <span className="text-gradient">Family Care</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            From pregnancy to senior care — health solutions for every member of your family.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {topics.map((topic, i) => {
            const Icon = getIcon(topic.iconName);
            return (
            <motion.div
              key={topic._id || topic.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="group bg-card rounded-xl p-6 border border-border/50 card-shadow hover:card-shadow-hover hover:border-primary/30 transition-all duration-300 text-center"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                <Icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-display font-semibold text-foreground mb-2 text-sm">{topic.title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{topic.description}</p>
            </motion.div>
            );
          })}
        </div>

        <div className="text-center mt-10">
          <Button variant="heroOutline" size="lg">
            Explore Wellness Programs
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FamilyWellness;
