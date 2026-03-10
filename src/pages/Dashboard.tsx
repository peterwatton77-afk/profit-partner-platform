import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  TrendingUp,
  Crown,
  Zap,
  Crosshair,
  Calculator,
  BarChart3,
  Activity,
  Gift,
  Clock,
} from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import { useAuth } from "@/contexts/AuthContext";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const topOffers = [
  { bookmaker: "Bet365", type: "Sign Up", offer: "Bet £10 Get £30 Free Bets", profit: "£25.40", urgency: "Ends today" },
  { bookmaker: "William Hill", type: "Reload", offer: "£5 Free Bet on Any Sport", profit: "£4.20", urgency: "Daily" },
  { bookmaker: "Paddy Power", type: "Sign Up", offer: "Bet £20 Get £20 Free", profit: "£16.80", urgency: "Ongoing" },
  { bookmaker: "Betfair", type: "Exchange", offer: "0% Commission This Week", profit: "£12.00", urgency: "3 days left" },
  { bookmaker: "Coral", type: "Reload", offer: "Acca Insurance 5+ Legs", profit: "£8.50", urgency: "Weekend" },
  { bookmaker: "SkyBet", type: "Sign Up", offer: "Bet £10 Get £40 Free Bets", profit: "£33.20", urgency: "Limited" },
];

const recentActivity = [
  { action: "Free bet placed", detail: "Bet365 — Man City vs Arsenal", time: "2 hours ago", amount: "+£12.40" },
  { action: "Qualifying bet", detail: "William Hill — Liverpool vs Chelsea", time: "5 hours ago", amount: "-£0.85" },
  { action: "Profit withdrawn", detail: "Paddy Power — Tennis offer", time: "Yesterday", amount: "+£16.80" },
  { action: "Casino offer completed", detail: "Coral — £5 free spins", time: "Yesterday", amount: "+£3.20" },
  { action: "New offer claimed", detail: "SkyBet — Sign up bonus", time: "2 days ago", amount: "+£33.20" },
];

const quickTools = [
  { icon: Crosshair, title: "OddsMatcher", description: "Find matches", url: "/dashboard/oddsmatcher" },
  { icon: Activity, title: "Each-Way Matcher", description: "Horse racing", url: "/dashboard/eachway" },
  { icon: Calculator, title: "Calculators", description: "Work out stakes", url: "/dashboard/calculators" },
  { icon: BarChart3, title: "Profit Tracker", description: "Log bets", url: "/dashboard/profit-tracker" },
];

const AnimatedProfit = ({ target }: { target: number }) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const steps = 50;
    const inc = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += inc;
      if (current >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(current * 100) / 100);
    }, 30);
    return () => clearInterval(timer);
  }, [target]);
  return <span>£{count.toLocaleString("en-GB", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>;
};

const Dashboard = () => {
  const { user, isPremium } = useAuth();
  const userName = user?.name || "User";
  const profitAmount = isPremium ? 1247.5 : 0;

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Welcome + Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:col-span-2 glass-card p-6 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(var(--primary)/0.06),transparent_60%)]" />
            <div className="relative">
              <h1 className="font-display text-xl sm:text-2xl font-bold mb-1">
                Welcome back, {userName}! 👋
              </h1>
              <p className="text-muted-foreground text-sm">
                {isPremium ? "You have full access to all tools and offers." : "Upgrade to unlock all tools and maximise your profit."}
              </p>
              {!isPremium && (
                <Button size="sm" className="mt-3 bg-primary text-primary-foreground hover:bg-primary/90 font-semibold gap-1">
                  <Crown size={14} /> Upgrade to Premium
                </Button>
              )}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="glass-card p-6 text-center relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--primary)/0.05),transparent_60%)]" />
            <div className="relative">
              <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium mb-2">Total Profit</p>
              <p className="text-gradient font-display text-3xl sm:text-4xl font-bold">
                <AnimatedProfit target={profitAmount} />
              </p>
              {isPremium && <p className="text-xs text-primary mt-1">+£340.00 this month</p>}
            </div>
          </motion.div>
        </div>

        {/* Quick Tools */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {quickTools.map((tool) => (
              <Link key={tool.title} to={tool.url}>
                <div className="glass-card p-4 hover:border-primary/30 transition-colors cursor-pointer group">
                  <tool.icon size={20} className="text-primary mb-3" />
                  <p className="font-display text-sm font-semibold group-hover:text-primary transition-colors">{tool.title}</p>
                  <p className="text-xs text-muted-foreground">{tool.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Today's Offers */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="lg:col-span-3 glass-card p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display text-lg font-semibold flex items-center gap-2">
                <Gift size={18} className="text-primary" /> Today's Top Offers
              </h2>
              <span className="text-xs text-muted-foreground">{topOffers.length} available</span>
            </div>
            <div className="space-y-3">
              {topOffers.map((offer, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-sm font-semibold">{offer.bookmaker}</span>
                      <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-primary/10 text-primary">{offer.type}</span>
                    </div>
                    <p className="text-xs text-muted-foreground truncate">{offer.offer}</p>
                  </div>
                  <div className="text-right shrink-0 ml-3">
                    <p className="text-sm font-bold text-primary">{offer.profit}</p>
                    <p className="text-[10px] text-muted-foreground">{offer.urgency}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2 glass-card p-6"
          >
            <h2 className="font-display text-lg font-semibold mb-4 flex items-center gap-2">
              <Clock size={18} className="text-primary" /> Recent Activity
            </h2>
            <div className="space-y-4">
              {recentActivity.map((item, i) => (
                <div key={i} className="flex items-start justify-between">
                  <div className="min-w-0">
                    <p className="text-sm font-medium">{item.action}</p>
                    <p className="text-xs text-muted-foreground truncate">{item.detail}</p>
                    <p className="text-[10px] text-muted-foreground mt-0.5">{item.time}</p>
                  </div>
                  <span className={`text-sm font-bold shrink-0 ml-2 ${item.amount.startsWith("+") ? "text-primary" : "text-destructive"}`}>
                    {item.amount}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
