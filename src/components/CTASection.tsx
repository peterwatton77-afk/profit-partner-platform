import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const CTASection = () => {
  return (
    <section className="section-padding relative">
      <div className="relative mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card glow-border p-10 sm:p-16 text-center relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(152_72%_46%/0.08),transparent_60%)]" />
          <div className="relative">
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              Ready to Start <span className="text-gradient">Profiting?</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-lg mx-auto mb-8">
              Join 45,000+ members already making risk-free profit with OddsMonkey. Start your free account today — no card required.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold text-base px-8 h-12 gap-2">
                Get Started Free
                <ArrowRight size={18} />
              </Button>
              <Button size="lg" variant="outline" className="border-border text-foreground hover:bg-secondary font-semibold text-base px-8 h-12">
                View Pricing
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
