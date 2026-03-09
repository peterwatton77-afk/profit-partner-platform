import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TrendingUp, Calendar, Trophy, Hash, Plus } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import DashboardLayout from "@/components/DashboardLayout";

const summaryCards = [
  { label: "Total Profit", value: "£4,832.60", icon: TrendingUp, accent: true },
  { label: "This Month", value: "£1,247.50", icon: Calendar, accent: false },
  { label: "Best Bookmaker", value: "Bet365", icon: Trophy, accent: false },
  { label: "Total Bets", value: "342", icon: Hash, accent: false },
];

const mockBets = [
  { date: "09 Mar 2026", bookmaker: "Bet365", type: "Matched", stake: "£10.00", outcome: "Won", profit: "+£8.50" },
  { date: "08 Mar 2026", bookmaker: "William Hill", type: "Each Way", stake: "£25.00", outcome: "Won", profit: "+£12.20" },
  { date: "07 Mar 2026", bookmaker: "Paddy Power", type: "Matched", stake: "£10.00", outcome: "Lost", profit: "-£0.42" },
  { date: "06 Mar 2026", bookmaker: "Ladbrokes", type: "Arb", stake: "£50.00", outcome: "Won", profit: "+£3.80" },
  { date: "05 Mar 2026", bookmaker: "Sky Bet", type: "Matched", stake: "£10.00", outcome: "Won", profit: "+£9.10" },
];

const chartData = [
  { month: "Oct", profit: 620 },
  { month: "Nov", profit: 840 },
  { month: "Dec", profit: 720 },
  { month: "Jan", profit: 950 },
  { month: "Feb", profit: 1100 },
  { month: "Mar", profit: 1248 },
];

const bookmakers = ["Bet365", "William Hill", "Paddy Power", "Ladbrokes", "Sky Bet", "Coral", "Betfair"];
const betTypes = ["Matched", "Each Way", "Arb", "2UP", "Price Boost"];

const ProfitTracker = () => {
  const [showForm, setShowForm] = useState(false);

  return (
    <DashboardLayout premium>
      <div className="max-w-5xl mx-auto space-y-6">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div>
              <h1 className="font-display text-xl sm:text-2xl font-bold mb-1">Profit Tracker</h1>
              <p className="text-muted-foreground text-sm">Track every bet and watch your profit grow.</p>
            </div>
            <Button
              className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold gap-2"
              onClick={() => setShowForm(!showForm)}
            >
              <Plus size={16} />
              Add Bet
            </Button>
          </div>
        </motion.div>

        {/* Summary Cards */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {summaryCards.map((card, i) => (
            <div key={i} className="glass-card p-5">
              <div className="flex items-center gap-2 mb-2">
                <card.icon size={16} className={card.accent ? "text-primary" : "text-muted-foreground"} />
                <span className="text-xs text-muted-foreground">{card.label}</span>
              </div>
              <p className={`font-display text-xl sm:text-2xl font-bold ${card.accent ? "text-gradient" : ""}`}>
                {card.value}
              </p>
            </div>
          ))}
        </motion.div>

        {/* Add Bet Form */}
        {showForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="glass-card p-6"
          >
            <h3 className="font-display text-sm font-semibold mb-4">Log a Bet</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              <div>
                <Label className="text-xs text-muted-foreground mb-1.5 block">Bookmaker</Label>
                <Select>
                  <SelectTrigger className="h-9 bg-secondary/50 border-border text-sm">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    {bookmakers.map((b) => <SelectItem key={b} value={b}>{b}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-xs text-muted-foreground mb-1.5 block">Bet Type</Label>
                <Select>
                  <SelectTrigger className="h-9 bg-secondary/50 border-border text-sm">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    {betTypes.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-xs text-muted-foreground mb-1.5 block">Stake (£)</Label>
                <Input type="number" placeholder="10.00" className="h-9 bg-secondary/50 border-border text-sm" />
              </div>
              <div>
                <Label className="text-xs text-muted-foreground mb-1.5 block">Back Odds</Label>
                <Input type="number" step="0.01" placeholder="3.00" className="h-9 bg-secondary/50 border-border text-sm" />
              </div>
              <div>
                <Label className="text-xs text-muted-foreground mb-1.5 block">Outcome</Label>
                <Select>
                  <SelectTrigger className="h-9 bg-secondary/50 border-border text-sm">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Won">Won</SelectItem>
                    <SelectItem value="Lost">Lost</SelectItem>
                    <SelectItem value="Void">Void</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-xs text-muted-foreground mb-1.5 block">Profit/Loss (£)</Label>
                <Input type="number" step="0.01" placeholder="8.50" className="h-9 bg-secondary/50 border-border text-sm" />
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-4">
              <Button variant="ghost" className="text-muted-foreground" onClick={() => setShowForm(false)}>Cancel</Button>
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold" onClick={() => setShowForm(false)}>Save Bet</Button>
            </div>
          </motion.div>
        )}

        {/* Profit Chart */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card p-6"
        >
          <h3 className="font-display text-sm font-semibold mb-4">Monthly Profit</h3>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 14% 18%)" />
                <XAxis dataKey="month" tick={{ fill: "hsl(220 10% 55%)", fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "hsl(220 10% 55%)", fontSize: 12 }} axisLine={false} tickLine={false} tickFormatter={(v) => `£${v}`} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(220 18% 10%)",
                    border: "1px solid hsl(220 14% 18%)",
                    borderRadius: "8px",
                    color: "hsl(0 0% 96%)",
                    fontSize: "12px",
                  }}
                  formatter={(value: number) => [`£${value}`, "Profit"]}
                />
                <Bar dataKey="profit" fill="hsl(152 72% 46%)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Bets Log */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="glass-card overflow-hidden"
        >
          <div className="px-6 py-4 border-b border-border">
            <h3 className="font-display text-sm font-semibold">Recent Bets</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-xs text-muted-foreground">
                  <th className="text-left py-3 px-6 font-medium">Date</th>
                  <th className="text-left py-3 px-4 font-medium">Bookmaker</th>
                  <th className="text-left py-3 px-4 font-medium hidden sm:table-cell">Type</th>
                  <th className="text-right py-3 px-4 font-medium">Stake</th>
                  <th className="text-center py-3 px-4 font-medium hidden sm:table-cell">Outcome</th>
                  <th className="text-right py-3 px-6 font-medium">Profit</th>
                </tr>
              </thead>
              <tbody>
                {mockBets.map((bet, i) => (
                  <tr key={i} className="border-b border-border/50 last:border-0 hover:bg-muted/30 transition-colors">
                    <td className="py-3 px-6 text-xs text-muted-foreground">{bet.date}</td>
                    <td className="py-3 px-4 text-xs font-medium">{bet.bookmaker}</td>
                    <td className="py-3 px-4 text-xs text-muted-foreground hidden sm:table-cell">{bet.type}</td>
                    <td className="py-3 px-4 text-xs text-right">{bet.stake}</td>
                    <td className="py-3 px-4 text-xs text-center hidden sm:table-cell">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                        bet.outcome === "Won" ? "bg-primary/10 text-primary" : "bg-destructive/10 text-destructive"
                      }`}>
                        {bet.outcome}
                      </span>
                    </td>
                    <td className={`py-3 px-6 text-xs text-right font-semibold ${
                      bet.profit.startsWith("+") ? "text-primary" : "text-destructive"
                    }`}>
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

export default ProfitTracker;
