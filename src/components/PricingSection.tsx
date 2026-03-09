import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check, X, ArrowRight } from "lucide-react";

const plans = [
  {
    name: "Free",
    price: "£0",
    period: "forever",
    description: "Get started with matched betting basics and limited tool access.",
    features: [
      { text: "Beginner guides", included: true },
      { text: "Limited OddsMatcher results", included: true },
      { text: "Basic calculator", included: true },
      { text: "Community access", included: true },
      { text: "Full OddsMatcher", included: false },
      { text: "Each Way Pro", included: false },
      { text: "Profit Tracker", included: false },
      { text: "Premium offers", included: false },
    ],
    cta: "Sign Up Free",
    highlighted: false,
  },
  {
    name: "Premium",
    price: "£24.99",
    period: "/month",
    description: "Full access to every tool, offer, and feature. Everything you need to maximise profit.",
    features: [
      { text: "All beginner & advanced guides", included: true },
      { text: "Full OddsMatcher (unlimited)", included: true },
      { text: "All calculator tools", included: true },
      { text: "Each Way Pro & EV Tools", included: true },
      { text: "Racing Matcher & 2UP Matcher", included: true },
      { text: "Profit Tracker", included: true },
      { text: "Daily reload offers", included: true },
      { text: "Priority support", included: true },
    ],
    cta: "Start Free Trial",
    highlighted: true,
  },
];

const PricingSection = () => {
  return (
    <section id="pricing" className="section-padding relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(152_72%_46%/0.04),transparent_50%)]" />
      <div className="relative mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-semibold uppercase tracking-wider">Pricing</span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mt-3 mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Start free. Upgrade when you're ready to unlock your full earning potential.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className={`glass-card p-8 relative ${plan.highlighted ? "glow-border" : ""}`}
            >
              {plan.highlighted && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs font-semibold bg-primary text-primary-foreground px-4 py-1 rounded-full">
                  Most Popular
                </span>
              )}
              <h3 className="font-display text-xl font-bold">{plan.name}</h3>
              <div className="mt-4 mb-2">
                <span className="font-display text-4xl font-bold">{plan.price}</span>
                <span className="text-muted-foreground text-sm ml-1">{plan.period}</span>
              </div>
              <p className="text-sm text-muted-foreground mb-6">{plan.description}</p>

              <Button
                className={`w-full h-11 font-semibold gap-2 ${
                  plan.highlighted
                    ? "bg-primary text-primary-foreground hover:bg-primary/90"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                }`}
              >
                {plan.cta}
                <ArrowRight size={16} />
              </Button>

              <div className="mt-8 space-y-3">
                {plan.features.map((f) => (
                  <div key={f.text} className="flex items-center gap-3 text-sm">
                    {f.included ? (
                      <Check size={16} className="text-primary shrink-0" />
                    ) : (
                      <X size={16} className="text-muted-foreground/40 shrink-0" />
                    )}
                    <span className={f.included ? "text-foreground" : "text-muted-foreground/50"}>
                      {f.text}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
