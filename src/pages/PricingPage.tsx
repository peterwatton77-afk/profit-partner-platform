import { motion } from "framer-motion";
import { Check, X, ArrowRight, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { useState } from "react";

const features = [
  { name: "OddsMatcher", free: "5 results", premium: "Unlimited" },
  { name: "Each Way Matcher", free: false, premium: true },
  { name: "BOG Matcher", free: false, premium: true },
  { name: "Acca Matcher", free: false, premium: true },
  { name: "Matched Bet Calculator", free: true, premium: true },
  { name: "Each Way Calculator", free: false, premium: true },
  { name: "Arbitrage Calculator", free: false, premium: true },
  { name: "Profit Tracker", free: false, premium: true },
  { name: "Beginner Guides", free: true, premium: true },
  { name: "Advanced Guides", free: false, premium: true },
  { name: "Daily Reload Offers", free: false, premium: true },
  { name: "Casino Offers", free: false, premium: true },
  { name: "Community Access", free: true, premium: true },
  { name: "Priority Support", free: false, premium: true },
  { name: "Exclusive Offers", free: false, premium: true },
];

const PricingPage = () => {
  const [annual, setAnnual] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-16">
        {/* Hero */}
        <section className="section-padding text-center">
          <div className="mx-auto max-w-3xl">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <span className="text-primary text-sm font-semibold uppercase tracking-wider">Pricing</span>
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold mt-3 mb-6">
                Simple, <span className="text-gradient">Transparent</span> Pricing
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
                Start free and upgrade when you're ready. Premium pays for itself within the first week.
              </p>
              {/* Billing toggle */}
              <div className="inline-flex items-center gap-3 bg-secondary/50 rounded-full p-1">
                <button
                  onClick={() => setAnnual(false)}
                  className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${!annual ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
                >
                  Monthly
                </button>
                <button
                  onClick={() => setAnnual(true)}
                  className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${annual ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
                >
                  Annual <span className="text-xs opacity-80">Save 17%</span>
                </button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Plans */}
        <section className="px-4 sm:px-6 lg:px-8 pb-16">
          <div className="mx-auto max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {/* Free */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass-card p-8"
            >
              <h3 className="font-display text-xl font-bold">Free</h3>
              <div className="mt-4 mb-2">
                <span className="font-display text-4xl font-bold">£0</span>
                <span className="text-muted-foreground text-sm ml-1">forever</span>
              </div>
              <p className="text-sm text-muted-foreground mb-6">Get started with matched betting basics.</p>
              <Button className="w-full h-11 bg-secondary text-secondary-foreground hover:bg-secondary/80 font-semibold gap-2" asChild>
                <Link to="/register">Sign Up Free <ArrowRight size={16} /></Link>
              </Button>
              <ul className="mt-8 space-y-3">
                <li className="flex items-center gap-3 text-sm"><Check size={16} className="text-primary shrink-0" /> OddsMatcher (5 results)</li>
                <li className="flex items-center gap-3 text-sm"><Check size={16} className="text-primary shrink-0" /> 1 Calculator</li>
                <li className="flex items-center gap-3 text-sm"><Check size={16} className="text-primary shrink-0" /> Beginner guides</li>
                <li className="flex items-center gap-3 text-sm"><Check size={16} className="text-primary shrink-0" /> Community access</li>
                <li className="flex items-center gap-3 text-sm text-muted-foreground/50"><X size={16} className="shrink-0" /> All matchers</li>
                <li className="flex items-center gap-3 text-sm text-muted-foreground/50"><X size={16} className="shrink-0" /> Profit Tracker</li>
                <li className="flex items-center gap-3 text-sm text-muted-foreground/50"><X size={16} className="shrink-0" /> Premium offers</li>
              </ul>
            </motion.div>

            {/* Premium */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="glass-card glow-border p-8 relative"
            >
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs font-semibold bg-primary text-primary-foreground px-4 py-1 rounded-full">
                Most Popular
              </span>
              <h3 className="font-display text-xl font-bold flex items-center gap-2">
                <Crown size={18} className="text-primary" /> Premium
              </h3>
              <div className="mt-4 mb-2">
                <span className="font-display text-4xl font-bold">{annual ? "£14.92" : "£17.99"}</span>
                <span className="text-muted-foreground text-sm ml-1">/month</span>
                {annual && <span className="text-primary text-xs font-medium ml-2">£179/year</span>}
              </div>
              <p className="text-sm text-muted-foreground mb-6">Full access to every tool, offer, and feature.</p>
              <Button className="w-full h-11 bg-primary text-primary-foreground hover:bg-primary/90 font-semibold gap-2" asChild>
                <Link to="/register">Start Free Trial <ArrowRight size={16} /></Link>
              </Button>
              <ul className="mt-8 space-y-3">
                <li className="flex items-center gap-3 text-sm"><Check size={16} className="text-primary shrink-0" /> Full OddsMatcher (unlimited)</li>
                <li className="flex items-center gap-3 text-sm"><Check size={16} className="text-primary shrink-0" /> All matchers (Each Way, BOG, Acca)</li>
                <li className="flex items-center gap-3 text-sm"><Check size={16} className="text-primary shrink-0" /> All calculators</li>
                <li className="flex items-center gap-3 text-sm"><Check size={16} className="text-primary shrink-0" /> Profit Tracker</li>
                <li className="flex items-center gap-3 text-sm"><Check size={16} className="text-primary shrink-0" /> Daily reload offers</li>
                <li className="flex items-center gap-3 text-sm"><Check size={16} className="text-primary shrink-0" /> Casino offers</li>
                <li className="flex items-center gap-3 text-sm"><Check size={16} className="text-primary shrink-0" /> Exclusive offers</li>
                <li className="flex items-center gap-3 text-sm"><Check size={16} className="text-primary shrink-0" /> Priority support</li>
              </ul>
            </motion.div>
          </div>
        </section>

        {/* Comparison Table */}
        <section className="section-padding">
          <div className="mx-auto max-w-4xl">
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-center mb-10">Full Feature Comparison</h2>
            <div className="glass-card overflow-hidden rounded-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left p-4 font-display font-semibold">Feature</th>
                      <th className="text-center p-4 font-display font-semibold w-32">Free</th>
                      <th className="text-center p-4 font-display font-semibold w-32 text-primary">Premium</th>
                    </tr>
                  </thead>
                  <tbody>
                    {features.map((f) => (
                      <tr key={f.name} className="border-b border-border/50 hover:bg-secondary/30 transition-colors">
                        <td className="p-4 font-medium">{f.name}</td>
                        <td className="p-4 text-center">
                          {f.free === true ? <Check size={16} className="text-primary mx-auto" /> :
                           f.free === false ? <X size={16} className="text-muted-foreground/40 mx-auto" /> :
                           <span className="text-muted-foreground text-xs">{f.free}</span>}
                        </td>
                        <td className="p-4 text-center">
                          {f.premium === true ? <Check size={16} className="text-primary mx-auto" /> :
                           <span className="text-primary text-xs font-medium">{f.premium}</span>}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="section-padding text-center">
          <div className="mx-auto max-w-2xl glass-card glow-border p-10">
            <h2 className="font-display text-2xl sm:text-3xl font-bold mb-3">Premium Pays for Itself</h2>
            <p className="text-muted-foreground mb-6">
              Most members make back the subscription cost within their first day. Start your free trial today.
            </p>
            <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold h-12 px-8 gap-2" asChild>
              <Link to="/register">Start Free Trial <ArrowRight size={16} /></Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default PricingPage;
