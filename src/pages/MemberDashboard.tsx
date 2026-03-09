import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Flame,
  TrendingUp,
  ArrowRight,
  BarChart3,
  Target,
  Zap,
  Clock,
} from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";

const activeOffers = [
  { bookmaker: "Bet365", type: "Sign Up Offer", profit: "£32.50", description: "Bet £10 Get £30 in Free Bets" },
  { bookmaker: "William Hill", type: "Reload Offer", profit: "£8.20", description: "Acca Insurance — 5+ legs" },
  { bookmaker: "Paddy Power", type: "Weekly Bet Club", profit: "£5.00", description: "Bet £10 on any sport, get £5 free" },
  { bookmaker: "Betfair", type: "Enhanced Odds", profit: "£12.40", description: "Price Boost on Premier League" },
];

const recentBets = [
  { date: "Today, 14:32", event: "Man City vs Arsenal", bookmaker: "Bet365", stake: "£10.00", outcome: "Won", profit: "+£8.50" },
  { date: "Today, 11:15", event: "14:30 Cheltenham R3", bookmaker: "William Hill", stake: "£25.00", outcome: "Won", profit: "+£12.20" },
  { date: "Yesterday", event: "Liverpool vs Chelsea", bookmaker: "Paddy Power", stake: "£10.00", outcome: "Lost", profit: "-£0.42" },
  { date: "Yesterday", event: "15:00 Ascot R5", bookmaker: "Ladbrokes", stake: "£15.00", outcome: "Won", profit: "+£6.80" },
  { date: "2 days ago", event: "Tottenham vs Man Utd", bookmaker: "Sky Bet", stake: "£10.00", outcome: "Won", profit: "+£9.10" },
];

const MemberDashboard = () => {
  return (
    <DashboardLayout premium>
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Welcome + Streak */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-6 sm:p-8 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(152_72%_46%/0.06),transparent_60%)]" />
          <div className="relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="font-display text-xl sm:text-2xl font-bold mb-1">
                Welcome back, John! 👋
              </h1>
              <p className="text-muted-foreground text-sm">
                You're on a roll — keep the momentum going.
              </p>
            </div>
            <div className="flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-lg px-4 py-2.5 shrink-0">
              <Flame size={20} className="text-primary" />
              <div>
                <p className="text-sm font-bold text-primary">Day 7 Streak!</p>
                <p className="text-[10px] text-muted-foreground">Keep going 🔥</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {[
            { label: "Profit This Month", value: "£1,247.50", icon: TrendingUp, accent: true },
            { label: "Bets Placed", value: "87", icon: Target, accent: false },
            { label: "Win Rate", value: "94.2%", icon: BarChart3, accent: false },
            { label: "Avg Profit / Bet", value: "£14.34", icon: Zap, accent: false },
          ].map((stat, i) => (
            <div key={i} className="glass-card p-5">
              <div className="flex items-center gap-2 mb-2">
                <stat.icon size={16} className={stat.accent ? "text-primary" : "text-muted-foreground"} />
                <span className="text-xs text-muted-foreground">{stat.label}</span>
              </div>
              <p className={`font-display text-xl sm:text-2xl font-bold ${stat.accent ? "text-gradient" : ""}`}>
                {stat.value}
              </p>
            </div>
          ))}
        </motion.div>

        {/* Active Offers */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card p-6"
        >
          <h2 className="font-display text-lg font-semibold mb-4 flex items-center gap-2">
            <Zap size={18} className="text-primary" />
            Active Offers
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {activeOffers.map((offer, i) => (
              <div
                key={i}
                className="flex items-center justify-between gap-3 p-4 rounded-lg border border-border bg-background/50 hover:border-primary/20 transition-colors"
              >
                <div className="min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-sm font-semibold">{offer.bookmaker}</span>
                    <span className="text-[10px] text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
                      {offer.type}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground truncate">{offer.description}</p>
                  <p className="text-sm font-bold text-primary mt-1">{offer.profit} profit</p>
                </div>
                <Button size="sm" variant="outline" className="shrink-0 border-border text-foreground hover:bg-primary/10 hover:text-primary hover:border-primary/30 text-xs h-8 gap-1">
                  View <ArrowRight size={12} />
                </Button>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="glass-card p-6"
        >
          <h2 className="font-display text-lg font-semibold mb-4 flex items-center gap-2">
            <Clock size={18} className="text-primary" />
            Recent Activity
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-muted-foreground text-xs">
                  <th className="text-left py-2.5 font-medium">Date</th>
                  <th className="text-left py-2.5 font-medium">Event</th>
                  <th className="text-left py-2.5 font-medium hidden sm:table-cell">Bookmaker</th>
                  <th className="text-right py-2.5 font-medium">Stake</th>
                  <th className="text-right py-2.5 font-medium">Profit</th>
                </tr>
              </thead>
              <tbody>
                {recentBets.map((bet, i) => (
                  <tr key={i} className="border-b border-border/50 last:border-0">
                    <td className="py-2.5 text-muted-foreground text-xs">{bet.date}</td>
                    <td className="py-2.5 font-medium text-xs">{bet.event}</td>
                    <td className="py-2.5 text-xs text-muted-foreground hidden sm:table-cell">{bet.bookmaker}</td>
                    <td className="py-2.5 text-xs text-right">{bet.stake}</td>
                    <td className={`py-2.5 text-xs text-right font-semibold ${bet.profit.startsWith("+") ? "text-primary" : "text-destructive"}`}>
                      {bet.profit}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default MemberDashboard;
