import { motion } from "framer-motion";
import { BookOpen, ArrowRight, DollarSign } from "lucide-react";

const steps = [
  {
    number: "1",
    title: "Back Bet",
    description: "Place a bet on an outcome at a bookmaker using their free bet or sign-up offer.",
    color: "bg-primary/10 text-primary",
  },
  {
    number: "2",
    title: "Lay Bet",
    description: "Place the opposite bet at a betting exchange to cover all outcomes. This removes the risk.",
    color: "bg-accent/10 text-accent",
  },
  {
    number: "3",
    title: "Profit",
    description: "No matter the result, you lock in a guaranteed profit from the bookmaker's free bet. Repeat with new offers.",
    color: "bg-primary/10 text-primary",
  },
];

const MatchedBettingExplainer = () => {
  return (
    <section className="section-padding relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(var(--primary)/0.04),transparent_50%)]" />
      <div className="relative mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-semibold uppercase tracking-wider">What Is Matched Betting?</span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mt-3 mb-4">
            Risk-Free Profit From Bookmaker Offers
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Matched betting uses bookmaker promotions and free bets to generate guaranteed profit. 
            By covering all outcomes, you eliminate risk entirely. It's maths, not gambling.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 relative">
          {/* Connection lines (desktop) */}
          <div className="hidden md:block absolute top-1/2 left-[33%] w-[34%] h-0.5 bg-gradient-to-r from-primary/20 via-primary/40 to-primary/20 -translate-y-1/2" />

          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
              className="glass-card p-8 text-center relative group hover:border-primary/30 transition-colors"
            >
              <div className={`w-14 h-14 rounded-full ${step.color} flex items-center justify-center mx-auto mb-5`}>
                <span className="font-display text-xl font-bold">{step.number}</span>
              </div>
              <h3 className="font-display text-xl font-semibold mb-3">{step.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
              {i < steps.length - 1 && (
                <div className="hidden md:flex absolute -right-3 top-1/2 -translate-y-1/2 z-10">
                  <ArrowRight size={20} className="text-primary/40" />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MatchedBettingExplainer;
