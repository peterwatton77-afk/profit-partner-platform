import { motion } from "framer-motion";
import { Shield, Lock, Users, Award } from "lucide-react";

const signals = [
  { icon: Shield, label: "FCA Compliant" },
  { icon: Lock, label: "SSL Secure" },
  { icon: Users, label: "45,000+ Members" },
  { icon: Award, label: "UK's #1 Rated" },
];

const TrustSignals = () => {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="border-y border-border bg-card/30"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-wrap justify-center gap-6 sm:gap-10 lg:gap-16">
          {signals.map((s) => (
            <div key={s.label} className="flex items-center gap-2 text-sm text-muted-foreground">
              <s.icon size={18} className="text-primary shrink-0" />
              <span className="font-medium">{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default TrustSignals;
