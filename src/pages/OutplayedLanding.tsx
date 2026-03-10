import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, TrendingUp, Shield, Zap, Crosshair, Activity, Calculator, BarChart3, Check, X, Star } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useBrand } from "@/contexts/BrandContext";

const AnimatedCounter = ({ target, prefix = "", suffix = "" }: { target: number; prefix?: string; suffix?: string }) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const dur = 2000;
    const steps = 60;
    const inc = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += inc;
      if (current >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(current));
    }, dur / steps);
    return () => clearInterval(timer);
  }, [target]);
  return <span className="text-gradient font-display text-3xl sm:text-4xl font-bold">{prefix}{count.toLocaleString()}{suffix}</span>;
};

const tools = [
  { icon: Crosshair, name: "OddsMatcher", description: "Real-time odds matching across all major bookmakers and exchanges.", tag: "Core" },
  { icon: Activity, name: "Racing Matcher", description: "Specialised horse racing matcher with BOG and extra place integration.", tag: "Core" },
  { icon: Calculator, name: "Calculator Suite", description: "Matched betting, each way, arbitrage and early payout calculators.", tag: "Essential" },
  { icon: BarChart3, name: "Profit Tracker", description: "Log every bet and track per-bookie performance with detailed breakdowns.", tag: "Essential" },
];

const plans = [
  { name: "Free", price: "£0", period: "forever", features: [{ text: "Beginner guides", ok: true }, { text: "Limited OddsMatcher", ok: true }, { text: "Basic calculator", ok: true }, { text: "Full tools access", ok: false }], highlighted: false },
  { name: "Premium", price: "£17.99", period: "/month", features: [{ text: "All tools unlimited", ok: true }, { text: "Daily reload offers", ok: true }, { text: "Profit Tracker", ok: true }, { text: "Priority support", ok: true }], highlighted: true },
];

const testimonials = [
  { name: "Alex R.", profit: "£3,600", period: "in 2 months", text: "Outplayed made matched betting feel like a game. The tools are slick and the community is great.", avatar: "AR" },
  { name: "Priya S.", profit: "£1,200", period: "first month", text: "I switched from another platform and the difference is night and day. So much easier to use.", avatar: "PS" },
  { name: "Tom H.", profit: "£8,400", period: "in 4 months", text: "The racing matcher alone has paid for my subscription ten times over. Incredible value.", avatar: "TH" },
];

const OutplayedLanding = () => {
  const { brand, otherBrand } = useBrand();

  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 h-16">
          <Link to={brand.homeRoute} className="font-display text-xl font-bold tracking-tight text-gradient">{brand.logoText}</Link>
          <div className="hidden md:flex items-center gap-8">
            {["How It Works", "Tools", "Pricing"].map((l) => (
              <a key={l} href={`#op-${l.toLowerCase().replace(/ /g, "-")}`} className="text-sm text-muted-foreground hover:text-foreground transition-colors">{l}</a>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground" asChild><Link to="/login">Log In</Link></Button>
            <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold" asChild><Link to="/register">Start Free</Link></Button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative min-h-screen flex items-center overflow-hidden pt-16">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(var(--primary)/0.08),transparent_50%)]" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-primary/5 blur-[120px]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
          <div className="text-center max-w-4xl mx-auto">
            <motion.span initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary text-sm font-medium mb-8">
              <Zap size={14} /> {brand.tagline}
            </motion.span>
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
              className="font-display text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight leading-[1.1] mb-6">
              {brand.heroHeadline.split(" ").slice(0, -1).join(" ")}{" "}<span className="text-gradient">{brand.heroHeadline.split(" ").pop()}</span>
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
              {brand.heroSubtitle}
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold text-base px-8 h-12 gap-2" asChild>
                <Link to="/register">Get Started Free <ArrowRight size={18} /></Link>
              </Button>
              <Button size="lg" variant="outline" className="border-border text-foreground hover:bg-secondary font-semibold text-base px-8 h-12">
                See How It Works
              </Button>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 max-w-2xl mx-auto">
              <div className="glass-card p-6 text-center"><AnimatedCounter target={parseInt(brand.members.replace(/\D/g, ""))} suffix="+" /><p className="text-sm text-muted-foreground mt-1">Active Members</p></div>
              <div className="glass-card p-6 text-center"><AnimatedCounter target={parseInt(brand.avgProfit.replace(/\D/g, ""))} prefix="£" suffix="+" /><p className="text-sm text-muted-foreground mt-1">Avg. Monthly Profit</p></div>
              <div className="glass-card p-6 text-center"><AnimatedCounter target={parseInt(brand.totalProfit.replace(/\D/g, ""))} suffix="M+" /><p className="text-sm text-muted-foreground mt-1">Total Profit Made (£)</p></div>
            </motion.div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
              className="flex flex-wrap justify-center gap-6 mt-10 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5"><Shield size={14} className="text-primary" /> Risk-Free</span>
              <span className="flex items-center gap-1.5"><TrendingUp size={14} className="text-primary" /> Tax-Free Earnings</span>
              <span className="flex items-center gap-1.5"><Zap size={14} className="text-primary" /> Cancel Anytime</span>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Tools */}
      <section id="op-tools" className="section-padding relative">
        <div className="relative mx-auto max-w-7xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <span className="text-primary text-sm font-semibold uppercase tracking-wider">Powerful Tools</span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mt-3 mb-4">Everything You Need</h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">Professional-grade tools for finding and locking in profit.</p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {tools.map((t, i) => (
              <motion.div key={t.name} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="glass-card p-6 group hover:border-primary/30 transition-all">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <t.icon size={20} className="text-primary" />
                </div>
                <h3 className="font-display text-lg font-semibold mb-2">{t.name}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{t.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding relative">
        <div className="relative mx-auto max-w-7xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <span className="text-primary text-sm font-semibold uppercase tracking-wider">Testimonials</span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mt-3 mb-4">Real Members, Real Profit</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div key={t.name} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="glass-card p-6 sm:p-8">
                <div className="flex gap-1 mb-4">{[...Array(5)].map((_, j) => <Star key={j} size={16} className="fill-primary text-primary" />)}</div>
                <p className="text-sm text-muted-foreground leading-relaxed mb-6">"{t.text}"</p>
                <div className="flex items-center gap-3 pt-4 border-t border-border">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary text-sm font-bold">{t.avatar}</div>
                  <div><p className="text-sm font-semibold">{t.name}</p><p className="text-xs text-primary font-medium">{t.profit} profit {t.period}</p></div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="op-pricing" className="section-padding relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--primary)/0.04),transparent_50%)]" />
        <div className="relative mx-auto max-w-5xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <span className="text-primary text-sm font-semibold uppercase tracking-wider">Pricing</span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mt-3 mb-4">Simple Pricing</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {plans.map((plan, i) => (
              <motion.div key={plan.name} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className={`glass-card p-8 relative ${plan.highlighted ? "glow-border" : ""}`}>
                {plan.highlighted && <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs font-semibold bg-primary text-primary-foreground px-4 py-1 rounded-full">Most Popular</span>}
                <h3 className="font-display text-xl font-bold">{plan.name}</h3>
                <div className="mt-4 mb-6"><span className="font-display text-4xl font-bold">{plan.price}</span><span className="text-muted-foreground text-sm ml-1">{plan.period}</span></div>
                <Button className={`w-full h-11 font-semibold gap-2 ${plan.highlighted ? "bg-primary text-primary-foreground hover:bg-primary/90" : "bg-secondary text-secondary-foreground hover:bg-secondary/80"}`}>
                  {plan.highlighted ? "Start Free Trial" : "Sign Up Free"} <ArrowRight size={16} />
                </Button>
                <div className="mt-6 space-y-3">
                  {plan.features.map((f) => (
                    <div key={f.text} className="flex items-center gap-3 text-sm">
                      {f.ok ? <Check size={16} className="text-primary shrink-0" /> : <X size={16} className="text-muted-foreground/40 shrink-0" />}
                      <span className={f.ok ? "text-foreground" : "text-muted-foreground/50"}>{f.text}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <Link to={brand.homeRoute} className="font-display text-xl font-bold text-gradient">{brand.logoText}</Link>
            <div className="flex items-center gap-4">
              <Link to={otherBrand.homeRoute} className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                Switch to {otherBrand.name} →
              </Link>
              <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} {brand.name}. 18+ only. Please gamble responsibly.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default OutplayedLanding;
