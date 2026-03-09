import { motion } from "framer-motion";
import { UserPlus, Search, Calculator, PoundSterling } from "lucide-react";

const steps = [
  {
    icon: UserPlus,
    title: "Sign Up Free",
    description: "Create your free account in seconds. No card required. Get instant access to beginner guides and limited tools.",
  },
  {
    icon: Search,
    title: "Find Offers",
    description: "Our OddsMatcher scans thousands of odds in real-time to find the most profitable bookmaker offers for you.",
  },
  {
    icon: Calculator,
    title: "Place Your Bets",
    description: "Use our calculators to work out the exact stakes. Back at the bookmaker, lay at the exchange. Lock in your profit.",
  },
  {
    icon: PoundSterling,
    title: "Collect Profit",
    description: "Withdraw your risk-free profit. Track earnings in your Profit Tracker. Rinse and repeat with reload offers.",
  },
];

const HowItWorksSection = () => {
  return (
    <section id="how-it-works" className="section-padding relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,hsl(152_72%_46%/0.04),transparent_50%)]" />
      <div className="relative mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-semibold uppercase tracking-wider">How It Works</span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mt-3 mb-4">
            Profit in Four Simple Steps
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Matched betting is a proven technique that uses free bets and promotions to generate guaranteed profit.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="glass-card p-6 sm:p-8 relative group hover:border-primary/30 transition-colors"
            >
              <span className="absolute top-4 right-4 text-6xl font-display font-bold text-foreground/[0.03]">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-5">
                <step.icon size={22} className="text-primary" />
              </div>
              <h3 className="font-display text-lg font-semibold mb-2">{step.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
