import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, TrendingUp, Shield, Zap } from "lucide-react";
import { useEffect, useState } from "react";

const AnimatedCounter = ({ target, prefix = "", suffix = "" }: { target: number; prefix?: string; suffix?: string }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [target]);

  return (
    <span className="text-gradient font-display text-3xl sm:text-4xl font-bold">
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  );
};

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-16">
      {/* Background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(152_72%_46%/0.08),transparent_50%)]" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-primary/5 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
        <div className="text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary text-sm font-medium mb-8">
              <Zap size={14} />
              The UK's #1 Matched Betting Platform
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight leading-[1.1] mb-6"
          >
            Turn Bookmaker Offers Into{" "}
            <span className="text-gradient">Guaranteed Profit</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10"
          >
            OddsMonkey gives you the tools, offers, and guidance to make
            risk-free profit from matched betting. Join thousands of members
            earning an extra income every month.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
          >
            <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold text-base px-8 h-12 gap-2">
              Start Free Today
              <ArrowRight size={18} />
            </Button>
            <Button size="lg" variant="outline" className="border-border text-foreground hover:bg-secondary font-semibold text-base px-8 h-12">
              See How It Works
            </Button>
          </motion.div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 max-w-2xl mx-auto"
          >
            <div className="glass-card p-6 text-center">
              <AnimatedCounter target={45000} suffix="+" />
              <p className="text-sm text-muted-foreground mt-1">Active Members</p>
            </div>
            <div className="glass-card p-6 text-center">
              <AnimatedCounter target={1500} prefix="£" suffix="+" />
              <p className="text-sm text-muted-foreground mt-1">Avg. Monthly Profit</p>
            </div>
            <div className="glass-card p-6 text-center">
              <AnimatedCounter target={28} suffix="M+" />
              <p className="text-sm text-muted-foreground mt-1">Total Profit Made (£)</p>
            </div>
          </motion.div>

          {/* Trust signals */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-wrap justify-center gap-6 mt-10 text-sm text-muted-foreground"
          >
            <span className="flex items-center gap-1.5"><Shield size={14} className="text-primary" /> Risk-Free</span>
            <span className="flex items-center gap-1.5"><TrendingUp size={14} className="text-primary" /> Tax-Free Earnings</span>
            <span className="flex items-center gap-1.5"><Zap size={14} className="text-primary" /> Cancel Anytime</span>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
