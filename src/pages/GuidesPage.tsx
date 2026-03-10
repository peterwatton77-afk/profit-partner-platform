import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { BookOpen, Play, Clock } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";

interface Guide {
  id: string;
  title: string;
  description: string;
  time: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
}

const guides: Guide[] = [
  { id: "intro", title: "Introduction to Matched Betting", description: "Learn the fundamentals of matched betting — what it is, how it works, and why thousands of UK members use it to earn risk-free profit every month.", time: "10 min", difficulty: "Beginner" },
  { id: "betfair", title: "Setting Up Your Betfair Account", description: "Step-by-step walkthrough of creating and verifying your Betfair exchange account, depositing funds, and understanding the exchange interface.", time: "15 min", difficulty: "Beginner" },
  { id: "first-qual", title: "Your First Qualifying Bet Step-by-Step", description: "Place your first qualifying bet with confidence. We walk you through every click — from the bookmaker to the exchange — so you can't go wrong.", time: "20 min", difficulty: "Beginner" },
  { id: "free-bets", title: "Turning Free Bets into Profit", description: "Convert your free bets into guaranteed cash using the SNR (Stake Not Returned) method. Learn how to lock in 70-80% of the free bet as profit.", time: "15 min", difficulty: "Beginner" },
  { id: "each-way", title: "Understanding Each-Way Betting", description: "Master each-way matched betting for horse racing. Learn about place terms, each-way arbs, and how to use the Each-Way Matcher to find profitable opportunities.", time: "25 min", difficulty: "Intermediate" },
  { id: "casino", title: "Casino Offers & Bonuses", description: "Discover how to extract value from casino bonuses using low-risk wagering strategies and expected value (EV) calculations for slots and table games.", time: "20 min", difficulty: "Intermediate" },
  { id: "reload", title: "Reload Offers & Advanced Techniques", description: "Keep earning month after month with reload offers, price boosts, and enhanced odds promotions. Learn advanced techniques for maximising long-term profit.", time: "30 min", difficulty: "Advanced" },
  { id: "acca", title: "Acca Insurance Offers", description: "Learn how to profit from accumulator insurance offers. Understand how to structure accas, calculate expected value, and use the Acca Matcher tool.", time: "25 min", difficulty: "Advanced" },
];

const STORAGE_KEY = "om_guides_completed";

const diffBadge = (d: string) =>
  d === "Beginner" ? "bg-primary/10 text-primary border-primary/20" :
  d === "Intermediate" ? "bg-amber-500/10 text-amber-400 border-amber-500/20" :
  "bg-destructive/10 text-destructive border-destructive/20";

const GuidesPage = () => {
  const [completed, setCompleted] = useState<Set<string>>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? new Set(JSON.parse(stored)) : new Set();
    } catch { return new Set(); }
  });
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...completed]));
  }, [completed]);

  const toggleComplete = (id: string) => {
    setCompleted(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };

  const filtered = filter === "All" ? guides : guides.filter(g => g.difficulty === filter);
  const progress = Math.round((completed.size / guides.length) * 100);

  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto space-y-6">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
          <div className="mb-6">
            <h1 className="font-display text-2xl font-bold flex items-center gap-2">
              <BookOpen size={24} className="text-primary" /> Matched Betting Guides
            </h1>
            <p className="text-sm text-muted-foreground">Your step-by-step journey to becoming a profitable matched bettor</p>
          </div>

          {/* Progress */}
          <div className="glass-card p-6 mb-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-display text-sm font-semibold">Your Progress</h3>
              <span className="text-xs text-muted-foreground font-medium">{completed.size}/{guides.length} completed</span>
            </div>
            <div className="h-3 bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-primary rounded-full transition-all duration-700 ease-out" style={{ width: `${Math.max(progress, 2)}%` }} />
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              {progress === 100 ? "🎉 Amazing! You've completed all guides!" : progress > 50 ? "Great progress — you're over halfway!" : "Keep going, you're doing great!"}
            </p>
          </div>

          {/* Filter tabs */}
          <div className="flex gap-1 mb-6">
            {["All", "Beginner", "Intermediate", "Advanced"].map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-1.5 rounded-md text-xs font-medium transition-colors ${filter === f ? "bg-primary text-primary-foreground" : "bg-secondary/50 text-muted-foreground hover:text-foreground"}`}
              >
                {f}
              </button>
            ))}
          </div>

          {/* Guide Cards - 2 per row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filtered.map((guide, i) => {
              const done = completed.has(guide.id);
              return (
                <motion.div
                  key={guide.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.04 }}
                  className={`glass-card overflow-hidden transition-all ${done ? "opacity-60" : "hover:border-primary/30"}`}
                >
                  {/* Video thumbnail */}
                  <div className="h-36 bg-secondary/50 flex items-center justify-center relative overflow-hidden group cursor-pointer">
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--primary)/0.08),transparent_60%)]" />
                    {done && <div className="absolute inset-0 bg-background/40" />}
                    <div className="relative flex flex-col items-center gap-1.5">
                      <div className="w-12 h-12 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                        <Play size={20} className="text-primary ml-0.5" />
                      </div>
                      <span className="text-[10px] text-muted-foreground">Watch guide</span>
                    </div>
                  </div>

                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold border ${diffBadge(guide.difficulty)}`}>{guide.difficulty}</span>
                      <span className="text-[10px] text-muted-foreground flex items-center gap-1"><Clock size={10} /> {guide.time}</span>
                    </div>
                    <h3 className={`font-display text-base font-semibold mb-2 ${done ? "line-through text-muted-foreground" : ""}`}>
                      {guide.title}
                    </h3>
                    <p className="text-xs text-muted-foreground leading-relaxed mb-4">{guide.description}</p>

                    <div className="flex items-center justify-between">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <Checkbox checked={done} onCheckedChange={() => toggleComplete(guide.id)} />
                        <span className="text-xs text-muted-foreground">{done ? "Completed" : "Mark Complete"}</span>
                      </label>
                      <Button size="sm" variant={done ? "outline" : "default"} className={`h-8 text-xs ${done ? "border-border" : "bg-primary text-primary-foreground hover:bg-primary/90"}`}>
                        {done ? "Review" : "Start Guide"}
                      </Button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default GuidesPage;
