import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Lock,
  TrendingUp,
  BookOpen,
  CheckCircle,
  Circle,
  Crown,
  Zap,
  Square,
  CheckSquare,
} from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import { useAuth } from "@/contexts/AuthContext";

const journeySteps = [
  { title: "Understand matched betting", description: "Learn the fundamentals of how matched betting works", done: false, active: true },
  { title: "Open a bookmaker account", description: "Sign up with your first bookmaker using our recommended offer", done: false, active: false },
  { title: "Place your first qualifying bet", description: "Place a back bet at the bookmaker to qualify for the free bet", done: false, active: false },
  { title: "Place your lay bet on an exchange", description: "Cover your back bet by laying on a betting exchange", done: false, active: false },
  { title: "Withdraw your profit", description: "Cash out your guaranteed profit from the offer", done: false, active: false },
];

const mockOddsRows = [
  { event: "Man City vs Arsenal", bookie: "Bet365", back: "2.10", exchange: "Betfair", lay: "2.12", rating: "98.2%" },
  { event: "Liverpool vs Chelsea", bookie: "William Hill", back: "3.50", exchange: "Smarkets", lay: "3.54", rating: "97.8%" },
  { event: "Tottenham vs Man Utd", bookie: "Paddy Power", back: "1.85", exchange: "Betfair", lay: "1.87", rating: "97.5%" },
];

const guides = [
  { title: "What is Matched Betting?", description: "A complete beginner's guide to making risk-free profit from bookmaker offers.", time: "5 min read", free: true },
  { title: "How to Use a Betting Exchange", description: "Learn how lay betting works and why exchanges are essential for matched betting.", time: "7 min read", free: true },
  { title: "Your First Matched Bet Walkthrough", description: "Step-by-step guide to placing your very first matched bet and locking in profit.", time: "10 min read", free: true },
];

const AnimatedProfit = ({ target }: { target: number }) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const duration = 1500;
    const steps = 40;
    const inc = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += inc;
      if (current >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(current * 100) / 100);
    }, duration / steps);
    return () => clearInterval(timer);
  }, [target]);
  return <span className="text-gradient font-display text-4xl font-bold">£{count.toFixed(2)}</span>;
};

const Dashboard = () => {
  const { user } = useAuth();
  const userName = user?.name || "John";
  const completedSteps = 0;
  const progressPercent = (completedSteps / journeySteps.length) * 100;

  const [checklist, setChecklist] = useState([
    { id: "profile", label: "Complete your profile", done: false },
    { id: "firstbet", label: "Make your first matched bet", done: false },
    { id: "calculator", label: "Use the calculator", done: false },
    { id: "track", label: "Track your first profit", done: false },
  ]);

  const toggleCheck = (id: string) => {
    setChecklist((prev) => prev.map((c) => c.id === id ? { ...c, done: !c.done } : c));
  };

  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Upgrade Banner */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card glow-border p-4 flex flex-col sm:flex-row items-center justify-between gap-3"
        >
          <div className="flex items-center gap-3">
            <Crown size={20} className="text-primary" />
            <p className="text-sm font-medium">
              Upgrade to <span className="text-primary font-semibold">Premium</span> for full access to all tools and offers
            </p>
          </div>
          <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold gap-1 shrink-0">
            Upgrade Now <ArrowRight size={14} />
          </Button>
        </motion.div>

        {/* Welcome + Profit */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card p-6 sm:p-8 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(var(--primary)/0.06),transparent_60%)]" />
            <div className="relative">
              <h1 className="font-display text-xl sm:text-2xl font-bold mb-1">
                Welcome back, {userName}! 👋
              </h1>
              <p className="text-muted-foreground text-sm">
                Start your matched betting journey and make your first risk-free profit.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="glass-card p-6 sm:p-8 text-center relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--primary)/0.05),transparent_60%)]" />
            <div className="relative">
              <p className="text-xs text-muted-foreground mb-2 uppercase tracking-wider font-medium">Total Profit</p>
              <AnimatedProfit target={0} />
              <p className="text-xs text-muted-foreground mt-2">Start earning with your first matched bet</p>
            </div>
          </motion.div>
        </div>

        {/* Checklist */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08 }}
          className="glass-card p-6"
        >
          <h2 className="font-display text-lg font-semibold mb-4 flex items-center gap-2">
            <CheckSquare size={18} className="text-primary" />
            Getting Started Checklist
          </h2>
          <div className="space-y-2">
            {checklist.map((item) => (
              <button
                key={item.id}
                onClick={() => toggleCheck(item.id)}
                className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors text-left ${item.done ? "opacity-60" : "hover:bg-secondary/50"}`}
              >
                {item.done ? (
                  <CheckSquare size={18} className="text-primary shrink-0" />
                ) : (
                  <Square size={18} className="text-muted-foreground/40 shrink-0" />
                )}
                <span className={`text-sm ${item.done ? "line-through text-muted-foreground" : "font-medium"}`}>
                  {item.label}
                </span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Getting Started Journey */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card p-6 sm:p-8"
        >
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-display text-lg font-semibold flex items-center gap-2">
              <Zap size={18} className="text-primary" />
              Getting Started
            </h2>
            <span className="text-xs text-muted-foreground font-medium">
              {completedSteps}/{journeySteps.length} complete
            </span>
          </div>

          <div className="h-2 bg-muted rounded-full mb-6 overflow-hidden">
            <div
              className="h-full bg-primary rounded-full transition-all duration-500"
              style={{ width: `${Math.max(progressPercent, 4)}%` }}
            />
          </div>

          <div className="space-y-3">
            {journeySteps.map((step, i) => (
              <div
                key={i}
                className={`flex items-start gap-3 p-3 rounded-lg transition-colors ${
                  step.active ? "bg-primary/5 border border-primary/20" : step.done ? "opacity-60" : "opacity-40"
                }`}
              >
                <div className="mt-0.5 shrink-0">
                  {step.done ? (
                    <CheckCircle size={18} className="text-primary" />
                  ) : (
                    <Circle size={18} className={step.active ? "text-primary" : "text-muted-foreground/30"} />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-medium ${step.active ? "text-foreground" : ""}`}>
                    Step {i + 1}: {step.title}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">{step.description}</p>
                </div>
                {step.active && (
                  <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90 text-xs h-8 gap-1 shrink-0">
                    Start <ArrowRight size={12} />
                  </Button>
                )}
              </div>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Taster OddsMatcher */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-card p-6 relative overflow-hidden"
          >
            <h2 className="font-display text-lg font-semibold mb-4 flex items-center gap-2">
              <Lock size={16} className="text-muted-foreground/50" />
              OddsMatcher Preview
            </h2>

            <div className="relative">
              <div className="blur-[3px] pointer-events-none select-none">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="border-b border-border text-muted-foreground">
                      <th className="text-left py-2 font-medium">Event</th>
                      <th className="text-left py-2 font-medium">Back</th>
                      <th className="text-left py-2 font-medium">Lay</th>
                      <th className="text-right py-2 font-medium">Rating</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockOddsRows.map((row, i) => (
                      <tr key={i} className="border-b border-border/50">
                        <td className="py-2.5 font-medium">{row.event}</td>
                        <td className="py-2.5 text-primary">{row.back}</td>
                        <td className="py-2.5">{row.lay}</td>
                        <td className="py-2.5 text-right text-primary font-medium">{row.rating}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="absolute inset-0 flex items-center justify-center bg-card/60 backdrop-blur-[1px] rounded-lg">
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold gap-2 shadow-lg">
                  <Crown size={16} />
                  Unlock with Premium
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Profit Potential */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="glass-card p-6 relative overflow-hidden flex flex-col justify-between"
          >
            <div>
              <h2 className="font-display text-lg font-semibold mb-2 flex items-center gap-2">
                <TrendingUp size={18} className="text-primary" />
                Your Profit Potential
              </h2>
              <p className="text-muted-foreground text-sm mb-6">
                Our members are making real, risk-free money every single month.
              </p>
            </div>

            <div className="glass-card p-5 text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--primary)/0.05),transparent_60%)]" />
              <div className="relative">
                <p className="text-gradient font-display text-4xl font-bold mb-1">£500+</p>
                <p className="text-xs text-muted-foreground">Average first-month profit</p>
              </div>
            </div>

            <Button className="mt-5 w-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold gap-2">
              <Crown size={16} />
              Start Free Trial
            </Button>
          </motion.div>
        </div>

        {/* Beginner Guides */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="font-display text-lg font-semibold mb-4 flex items-center gap-2">
            <BookOpen size={18} className="text-primary" />
            Free Beginner Guides
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {guides.map((guide, i) => (
              <div key={i} className="glass-card p-5 hover:border-primary/20 transition-colors cursor-pointer group">
                <span className="inline-block text-[10px] font-semibold uppercase tracking-wider text-primary bg-primary/10 px-2 py-0.5 rounded-full mb-3">
                  Free
                </span>
                <h3 className="font-display text-sm font-semibold mb-1.5 group-hover:text-primary transition-colors">
                  {guide.title}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed mb-3">{guide.description}</p>
                <span className="text-xs text-muted-foreground">{guide.time}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Upsell Banner */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="glass-card glow-border p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_left,hsl(var(--primary)/0.06),transparent_50%)]" />
          <div className="relative text-center sm:text-left">
            <h3 className="font-display text-lg font-bold mb-1">
              Unlock Full Access
            </h3>
            <p className="text-sm text-muted-foreground">
              Get every tool, offer, and guide from just <span className="text-primary font-semibold">£17.99/month</span>
            </p>
          </div>
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold gap-2 shrink-0 relative">
            <Crown size={16} />
            Start Free Trial
            <ArrowRight size={16} />
          </Button>
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
