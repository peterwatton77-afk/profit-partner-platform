import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { ArrowRight, Crosshair, Calculator, BarChart3, Star, Shield, TrendingUp, Zap, Check } from "lucide-react";
import type { BrandId } from "@/contexts/BrandContext";

const brandConfigs = {
  oddsmonkey: {
    name: "OddsMonkey",
    logo: () => <span className="font-display text-lg font-bold">Odds<span className="text-gradient">Monkey</span></span>,
    headline: "Turn Bookmaker Offers Into Guaranteed Profit",
    badge: "The UK's #1 Matched Betting Platform",
    cssClass: "",
  },
  outplayed: {
    name: "Outplayed",
    logo: () => <span className="font-display text-lg font-bold text-gradient">Outplayed</span>,
    headline: "Turn Sports Knowledge Into Profit",
    badge: "Smart Betting. Real Profit.",
    cssClass: "brand-outplayed",
  },
};

const PreviewCard = ({ brandId }: { brandId: BrandId }) => {
  const b = brandConfigs[brandId];
  return (
    <div className={`${b.cssClass} flex-1 min-w-0`}>
      <div className="glass-card overflow-hidden">
        {/* Mini navbar */}
        <div className="h-12 border-b border-border bg-card/80 flex items-center justify-between px-4">
          {b.logo()}
          <div className="flex gap-2">
            <Button variant="ghost" size="sm" className="text-xs text-muted-foreground h-7 px-2">Log In</Button>
            <Button size="sm" className="text-xs bg-primary text-primary-foreground h-7 px-3">Start Free</Button>
          </div>
        </div>

        {/* Mini hero */}
        <div className="p-6 sm:p-8 relative">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(var(--primary)/0.08),transparent_50%)]" />
          <div className="relative text-center">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-[10px] font-medium mb-4">
              <Zap size={10} /> {b.badge}
            </span>
            <h3 className="font-display text-lg sm:text-xl font-bold leading-tight mb-3">
              {b.headline.split(" ").slice(0, -1).join(" ")}{" "}
              <span className="text-gradient">{b.headline.split(" ").slice(-1)}</span>
            </h3>
            <div className="flex justify-center gap-2 mb-5">
              <Button size="sm" className="bg-primary text-primary-foreground text-xs h-8 gap-1">
                Get Started <ArrowRight size={12} />
              </Button>
            </div>

            {/* Mini stats */}
            <div className="grid grid-cols-3 gap-2">
              {[{ v: "45K+", l: "Members" }, { v: "£1.5K+", l: "Avg Profit" }, { v: "£28M+", l: "Total" }].map((s, i) => (
                <div key={i} className="glass-card p-3 text-center">
                  <p className="text-gradient font-display text-sm font-bold">{s.v}</p>
                  <p className="text-[9px] text-muted-foreground">{s.l}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mini tools */}
        <div className="px-6 pb-4">
          <div className="grid grid-cols-2 gap-2">
            {[
              { icon: Crosshair, name: "OddsMatcher" },
              { icon: Calculator, name: "Calculators" },
              { icon: BarChart3, name: "Profit Tracker" },
              { icon: Shield, name: "Risk-Free" },
            ].map((t, i) => (
              <div key={i} className="flex items-center gap-2 p-2.5 rounded-lg border border-border/50 bg-background/30">
                <div className="w-7 h-7 rounded bg-primary/10 flex items-center justify-center shrink-0">
                  <t.icon size={13} className="text-primary" />
                </div>
                <span className="text-[10px] font-medium truncate">{t.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Mini testimonial */}
        <div className="px-6 pb-6">
          <div className="glass-card p-4">
            <div className="flex gap-0.5 mb-2">{[...Array(5)].map((_, j) => <Star key={j} size={10} className="fill-primary text-primary" />)}</div>
            <p className="text-[10px] text-muted-foreground leading-relaxed mb-2">"Incredible platform. Made £1,800 in my first month."</p>
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center text-primary text-[8px] font-bold">SK</div>
              <span className="text-[10px] font-medium">Sarah K.</span>
            </div>
          </div>
        </div>

        {/* Mini pricing */}
        <div className="px-6 pb-6">
          <div className="flex gap-2">
            <div className="flex-1 glass-card p-3 text-center">
              <p className="text-xs font-semibold">Free</p>
              <p className="font-display text-lg font-bold">£0</p>
              <div className="mt-2 space-y-1">
                {["Guides", "Limited tools"].map((f) => (
                  <div key={f} className="flex items-center gap-1 text-[9px] text-muted-foreground"><Check size={8} className="text-primary" />{f}</div>
                ))}
              </div>
            </div>
            <div className="flex-1 glass-card glow-border p-3 text-center">
              <p className="text-xs font-semibold">Premium</p>
              <p className="font-display text-lg font-bold">£24.99</p>
              <div className="mt-2 space-y-1">
                {["All tools", "Full access"].map((f) => (
                  <div key={f} className="flex items-center gap-1 text-[9px] text-muted-foreground"><Check size={8} className="text-primary" />{f}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const BrandDemo = () => {
  const [showOutplayed, setShowOutplayed] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 sticky top-0 z-50 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h1 className="font-display text-lg font-bold">Multi-Brand White-Label Demo</h1>
            <p className="text-xs text-muted-foreground">Toggle between OddsMonkey and Outplayed themes</p>
          </div>
          <div className="flex items-center gap-3 bg-secondary/50 border border-border rounded-lg px-4 py-2">
            <Label className={`text-sm font-medium transition-colors ${!showOutplayed ? "text-[hsl(152_72%_46%)]" : "text-muted-foreground"}`}>
              OddsMonkey
            </Label>
            <Switch checked={showOutplayed} onCheckedChange={setShowOutplayed} />
            <Label className={`text-sm font-medium transition-colors ${showOutplayed ? "text-[hsl(245_58%_63%)]" : "text-muted-foreground"}`}>
              Outplayed
            </Label>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Side by side */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h2 className="font-display text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">Side-by-Side Comparison</h2>
          <div className="flex flex-col lg:flex-row gap-6">
            <PreviewCard brandId="oddsmonkey" />
            <PreviewCard brandId="outplayed" />
          </div>
        </motion.div>

        {/* Live toggle preview */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h2 className="font-display text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">
            Live Theme Toggle — Currently: <span className={showOutplayed ? "text-[hsl(245_58%_63%)]" : "text-[hsl(152_72%_46%)]"}>{showOutplayed ? "Outplayed" : "OddsMonkey"}</span>
          </h2>
          <PreviewCard brandId={showOutplayed ? "outplayed" : "oddsmonkey"} />
        </motion.div>

        {/* Architecture info */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-8 glass-card p-6"
        >
          <h3 className="font-display text-sm font-semibold mb-3">How It Works</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-muted-foreground">
            <div className="space-y-1">
              <p className="font-medium text-foreground">CSS Variables</p>
              <p>Brand themes override <code className="text-primary">--primary</code>, <code className="text-primary">--gradient-hero</code>, and glow tokens via a single CSS class.</p>
            </div>
            <div className="space-y-1">
              <p className="font-medium text-foreground">BrandProvider Context</p>
              <p>React context provides brand config (name, copy, logo) to all components. Switch brands with a single state change.</p>
            </div>
            <div className="space-y-1">
              <p className="font-medium text-foreground">White-Label Ready</p>
              <p>Add new brands by defining a CSS class + config object. Same codebase, infinite brand deployments.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default BrandDemo;
