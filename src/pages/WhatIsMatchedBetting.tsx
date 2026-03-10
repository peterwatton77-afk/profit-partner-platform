import { motion } from "framer-motion";
import { BookOpen, ArrowLeftRight, Building2, ShieldCheck, TrendingUp, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";

const concepts = [
  {
    icon: BookOpen,
    title: "Matched Betting",
    description: "A technique that uses free bets and promotions offered by bookmakers to generate guaranteed profit. By covering all possible outcomes of a sporting event, you remove the risk entirely.",
  },
  {
    icon: ArrowLeftRight,
    title: "Lay Betting",
    description: "Lay betting means betting AGAINST an outcome. If you 'lay' a team to win, you profit if they draw or lose. Betting exchanges like Betfair and Smarkets allow you to place lay bets.",
  },
  {
    icon: Building2,
    title: "Betting Exchanges",
    description: "Unlike bookmakers, exchanges match bets between individual users. This allows you to both back and lay outcomes. Exchanges charge a small commission (usually 2-5%) on winnings.",
  },
];

const benefits = [
  "Completely legal and tax-free in the UK",
  "No gambling knowledge required",
  "Proven technique used by 45,000+ members",
  "Average first-month profit of £500+",
  "Work from home, set your own hours",
  "Risk-free when done correctly",
];

const WhatIsMatchedBetting = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-16">
        {/* Hero */}
        <section className="section-padding text-center">
          <div className="mx-auto max-w-3xl">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <span className="text-primary text-sm font-semibold uppercase tracking-wider">Education</span>
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold mt-3 mb-6">
                What Is <span className="text-gradient">Matched Betting</span>?
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Matched betting is a risk-free technique that turns bookmaker promotions into guaranteed profit.
                It's not gambling — it's using maths to eliminate risk completely.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Key Concepts */}
        <section className="section-padding">
          <div className="mx-auto max-w-5xl">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-display text-3xl font-bold text-center mb-12"
            >
              Key Concepts
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {concepts.map((c, i) => (
                <motion.div
                  key={c.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="glass-card p-8"
                >
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-5">
                    <c.icon size={22} className="text-primary" />
                  </div>
                  <h3 className="font-display text-lg font-semibold mb-3">{c.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{c.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Example */}
        <section className="section-padding">
          <div className="mx-auto max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass-card glow-border p-8 sm:p-10"
            >
              <h3 className="font-display text-xl font-bold mb-4 flex items-center gap-2">
                <TrendingUp size={20} className="text-primary" />
                Example: Your First Matched Bet
              </h3>
              <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
                <p>A bookmaker offers a <span className="text-foreground font-medium">£20 free bet</span> when you sign up and place a £20 qualifying bet.</p>
                <p><span className="text-foreground font-medium">Step 1:</span> Place a £20 back bet at the bookmaker (e.g. Man City to win at 3.0).</p>
                <p><span className="text-foreground font-medium">Step 2:</span> Lay Man City to win on Betfair for the same stake. This covers you if City don't win.</p>
                <p><span className="text-foreground font-medium">Step 3:</span> You lose about £1 on the qualifying bet (this is normal). But you've unlocked a £20 free bet.</p>
                <p><span className="text-foreground font-medium">Step 4:</span> Use the £20 free bet the same way — back at the bookmaker, lay at the exchange.</p>
                <p className="text-foreground font-semibold text-base pt-2">Result: ~£16 guaranteed profit from one offer. Repeat across dozens of bookmakers.</p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Benefits */}
        <section className="section-padding">
          <div className="mx-auto max-w-3xl text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-display text-3xl font-bold mb-10"
            >
              Why Members Love It
            </motion.h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
              {benefits.map((b, i) => (
                <motion.div
                  key={b}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-center gap-3 glass-card p-4"
                >
                  <CheckCircle size={18} className="text-primary shrink-0" />
                  <span className="text-sm font-medium">{b}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="section-padding text-center">
          <div className="mx-auto max-w-2xl">
            <h2 className="font-display text-3xl font-bold mb-4">Start Making Risk-Free Profit</h2>
            <p className="text-muted-foreground mb-8">Create your free account and follow our step-by-step guides.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold h-12 px-8" asChild>
                <Link to="/register">Sign Up Free</Link>
              </Button>
              <Button size="lg" variant="outline" className="border-border font-semibold h-12 px-8" asChild>
                <Link to="/how-it-works">See How It Works</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default WhatIsMatchedBetting;
