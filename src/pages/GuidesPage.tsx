import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { BookOpen, CheckCircle, Circle, Play, Clock, Award } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";

interface Guide {
  id: string;
  title: string;
  description: string;
  time: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  completed: boolean;
}

const initialGuides: Guide[] = [
  { id: "1", title: "Understanding Matched Betting", description: "Learn the fundamentals of matched betting, how it works, and why it's risk-free when done correctly.", time: "10 min", difficulty: "Beginner", completed: false },
  { id: "2", title: "Setting Up Exchange Accounts", description: "Step-by-step guide to creating accounts on Betfair, Smarkets and other betting exchanges you'll need.", time: "15 min", difficulty: "Beginner", completed: false },
  { id: "3", title: "Your First Qualifying Bet", description: "Place your first qualifying bet with confidence. We walk you through every click, from the bookmaker to the exchange.", time: "20 min", difficulty: "Beginner", completed: false },
  { id: "4", title: "Your First Free Bet", description: "Convert your free bet into guaranteed cash. Learn the SNR (Stake Not Returned) method and lock in profit.", time: "15 min", difficulty: "Beginner", completed: false },
  { id: "5", title: "Casino Offers", description: "Discover how to extract value from casino bonuses using low-risk wagering strategies and EV calculations.", time: "25 min", difficulty: "Intermediate", completed: false },
  { id: "6", title: "Reload Offers & Long-Term Profit", description: "Keep earning month after month with reload offers, acca insurance, and other ongoing promotions.", time: "20 min", difficulty: "Advanced", completed: false },
];

const difficultyColor = (d: string) =>
  d === "Beginner" ? "bg-primary/10 text-primary" :
  d === "Intermediate" ? "bg-amber-500/10 text-amber-400" :
  "bg-destructive/10 text-destructive";

const GuidesPage = () => {
  const [guides, setGuides] = useState<Guide[]>(initialGuides);

  const completedCount = guides.filter(g => g.completed).length;
  const progress = Math.round((completedCount / guides.length) * 100);

  const toggleComplete = (id: string) => {
    setGuides(prev => prev.map(g => g.id === id ? { ...g, completed: !g.completed } : g));
  };

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
              <span className="text-xs text-muted-foreground font-medium">{completedCount}/{guides.length} completed</span>
            </div>
            <div className="h-3 bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-primary rounded-full transition-all duration-500" style={{ width: `${Math.max(progress, 3)}%` }} />
            </div>
            <p className="text-xs text-muted-foreground mt-2">{progress}% complete — {progress === 100 ? "Amazing! You've mastered the basics!" : "Keep going, you're doing great!"}</p>
          </div>

          {/* Guide Cards */}
          <div className="space-y-4">
            {guides.map((guide, i) => (
              <motion.div
                key={guide.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className={`glass-card p-6 transition-all ${guide.completed ? "opacity-70" : "hover:border-primary/30"}`}
              >
                <div className="flex flex-col sm:flex-row gap-4">
                  {/* Video thumbnail placeholder */}
                  <div className="w-full sm:w-48 h-28 rounded-lg bg-secondary/50 flex items-center justify-center shrink-0 relative overflow-hidden group cursor-pointer">
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--primary)/0.08),transparent_60%)]" />
                    <div className="relative flex flex-col items-center gap-1">
                      <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                        <Play size={18} className="text-primary ml-0.5" />
                      </div>
                      <span className="text-[10px] text-muted-foreground">Watch guide</span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs text-muted-foreground font-medium">Step {i + 1}</span>
                          <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${difficultyColor(guide.difficulty)}`}>{guide.difficulty}</span>
                        </div>
                        <h3 className={`font-display text-lg font-semibold ${guide.completed ? "line-through text-muted-foreground" : ""}`}>
                          {guide.title}
                        </h3>
                      </div>
                      {guide.completed ? (
                        <CheckCircle size={22} className="text-primary shrink-0 mt-1" />
                      ) : (
                        <Circle size={22} className="text-muted-foreground/30 shrink-0 mt-1" />
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-3">{guide.description}</p>
                    <div className="flex items-center gap-4">
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clock size={12} /> {guide.time}
                      </span>
                      <Button
                        size="sm"
                        variant={guide.completed ? "outline" : "default"}
                        className={`h-8 text-xs ${guide.completed ? "border-border text-muted-foreground" : "bg-primary text-primary-foreground hover:bg-primary/90"}`}
                        onClick={() => toggleComplete(guide.id)}
                      >
                        {guide.completed ? "Mark Incomplete" : "Mark as Complete"}
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default GuidesPage;
