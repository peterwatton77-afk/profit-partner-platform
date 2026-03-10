import { useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { BarChart3, Plus, Download, TrendingUp, Target, Award, CalendarIcon, Trash2, Star } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from "recharts";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import DashboardLayout from "@/components/DashboardLayout";

interface Transaction {
  id: number;
  date: string;
  bookmaker: string;
  type: "Qualifying Bet" | "Free Bet" | "Each-Way" | "Casino" | "Reload" | "Refund";
  amount: number;
  notes: string;
}

const BOOKMAKERS = ["Bet365", "William Hill", "Paddy Power", "Ladbrokes", "Coral", "SkyBet", "Betway", "888sport", "Betfair", "Other"];
const TYPES: Transaction["type"][] = ["Qualifying Bet", "Free Bet", "Each-Way", "Casino", "Reload", "Refund"];

const seedTransactions: Transaction[] = [
  { id: 1, date: "2026-01-05", bookmaker: "Bet365", type: "Qualifying Bet", amount: -0.85, notes: "Man City vs Arsenal qualifier" },
  { id: 2, date: "2026-01-05", bookmaker: "Bet365", type: "Free Bet", amount: 25.40, notes: "£30 free bet converted" },
  { id: 3, date: "2026-01-12", bookmaker: "William Hill", type: "Qualifying Bet", amount: -1.20, notes: "Liverpool vs Chelsea" },
  { id: 4, date: "2026-01-12", bookmaker: "William Hill", type: "Free Bet", amount: 24.80, notes: "£30 free bet converted" },
  { id: 5, date: "2026-01-20", bookmaker: "Paddy Power", type: "Reload", amount: 18.50, notes: "Money back special" },
  { id: 6, date: "2026-01-28", bookmaker: "Coral", type: "Casino", amount: 15.35, notes: "Slots bonus wagered through" },
  { id: 7, date: "2026-02-03", bookmaker: "SkyBet", type: "Qualifying Bet", amount: -1.10, notes: "Horse racing qualifier" },
  { id: 8, date: "2026-02-03", bookmaker: "SkyBet", type: "Free Bet", amount: 33.20, notes: "£40 in free bets" },
  { id: 9, date: "2026-02-10", bookmaker: "Betway", type: "Each-Way", amount: 42.00, notes: "Cheltenham each-way arb" },
  { id: 10, date: "2026-02-18", bookmaker: "Betfair", type: "Refund", amount: 85.00, notes: "Acca insurance refund" },
  { id: 11, date: "2026-02-25", bookmaker: "888sport", type: "Free Bet", amount: 20.90, notes: "£25 sign up free bet" },
  { id: 12, date: "2026-03-02", bookmaker: "Ladbrokes", type: "Qualifying Bet", amount: -0.90, notes: "Tennis qualifier" },
  { id: 13, date: "2026-03-02", bookmaker: "Ladbrokes", type: "Free Bet", amount: 28.40, notes: "£30 free bet" },
  { id: 14, date: "2026-03-06", bookmaker: "Coral", type: "Reload", amount: 22.00, notes: "Bet & get club" },
  { id: 15, date: "2026-03-09", bookmaker: "Bet365", type: "Each-Way", amount: 29.00, notes: "Aintree EW offer" },
];

const STORAGE_KEY = "om_profit_tracker";

const typeBadgeClass = (type: string) => {
  switch (type) {
    case "Qualifying Bet": return "bg-amber-500/10 text-amber-400 border-amber-500/20";
    case "Free Bet": return "bg-primary/10 text-primary border-primary/20";
    case "Each-Way": return "bg-cyan-500/10 text-cyan-400 border-cyan-500/20";
    case "Casino": return "bg-purple-500/10 text-purple-400 border-purple-500/20";
    case "Reload": return "bg-orange-500/10 text-orange-400 border-orange-500/20";
    case "Refund": return "bg-blue-500/10 text-blue-400 border-blue-500/20";
    default: return "bg-secondary text-muted-foreground";
  }
};

const AnimatedCount = ({ target, prefix = "£", decimals = 2 }: { target: number; prefix?: string; decimals?: number }) => {
  const [val, setVal] = useState(0);
  useEffect(() => {
    let frame: number;
    const start = performance.now();
    const dur = 800;
    const tick = (now: number) => {
      const p = Math.min((now - start) / dur, 1);
      setVal(target * p);
      if (p < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target]);
  return <span>{prefix}{val.toFixed(decimals)}</span>;
};

const ProfitTracker = () => {
  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : seedTransactions;
    } catch { return seedTransactions; }
  });
  const [modalOpen, setModalOpen] = useState(false);
  const [dateFilter, setDateFilter] = useState("All Time");
  const [bookmakerFilter, setBookmakerFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");
  const [newDate, setNewDate] = useState<Date | undefined>(new Date());
  const [newTx, setNewTx] = useState({ bookmaker: "Bet365", type: "Free Bet" as Transaction["type"], amount: "", notes: "" });

  useEffect(() => { localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions)); }, [transactions]);

  // Filtered transactions
  const filtered = useMemo(() => {
    const now = new Date();
    return transactions
      .filter(t => {
        if (dateFilter === "This Month") { const d = new Date(t.date); return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear(); }
        if (dateFilter === "Last Month") { const d = new Date(t.date); const lm = new Date(now.getFullYear(), now.getMonth() - 1); return d.getMonth() === lm.getMonth() && d.getFullYear() === lm.getFullYear(); }
        return true;
      })
      .filter(t => bookmakerFilter === "All" || t.bookmaker === bookmakerFilter)
      .filter(t => typeFilter === "All" || t.type === typeFilter)
      .sort((a, b) => a.date.localeCompare(b.date));
  }, [transactions, dateFilter, bookmakerFilter, typeFilter]);

  // Running totals on ALL sorted transactions
  const runningMap = useMemo(() => {
    let running = 0;
    const sorted = [...transactions].sort((a, b) => a.date.localeCompare(b.date));
    const map = new Map<number, number>();
    sorted.forEach(t => { running += t.amount; map.set(t.id, running); });
    return map;
  }, [transactions]);

  // Stats
  const totalProfit = useMemo(() => transactions.reduce((s, t) => s + t.amount, 0), [transactions]);
  const totalBets = transactions.length;
  const winRate = useMemo(() => { const pos = transactions.filter(t => t.amount > 0).length; return totalBets ? Math.round((pos / totalBets) * 100) : 0; }, [transactions, totalBets]);
  const roi = totalBets > 0 ? ((totalProfit / (totalBets * 10)) * 100) : 0;

  // Monthly summaries
  const monthlySummaries = useMemo(() => {
    const map = new Map<string, { month: string; profit: number; bets: number }>();
    transactions.forEach(t => {
      const d = new Date(t.date);
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
      const label = d.toLocaleDateString("en-GB", { month: "long", year: "numeric" });
      const existing = map.get(key) || { month: label, profit: 0, bets: 0 };
      existing.profit += t.amount;
      existing.bets += 1;
      map.set(key, existing);
    });
    return Array.from(map.values()).sort((a, b) => a.month.localeCompare(b.month));
  }, [transactions]);

  const bestMonth = monthlySummaries.reduce((best, m) => m.profit > best.profit ? m : best, { month: "—", profit: 0, bets: 0 });

  // Chart data — cumulative profit by date
  const chartData = useMemo(() => {
    let cumulative = 0;
    const sorted = [...transactions].sort((a, b) => a.date.localeCompare(b.date));
    const points: { date: string; profit: number }[] = [];
    sorted.forEach(t => {
      cumulative += t.amount;
      const label = format(new Date(t.date), "dd MMM");
      const existing = points.find(p => p.date === label);
      if (existing) existing.profit = cumulative;
      else points.push({ date: label, profit: Math.round(cumulative * 100) / 100 });
    });
    return points;
  }, [transactions]);

  const addTransaction = () => {
    const amt = parseFloat(newTx.amount);
    if (!amt || !newDate) return;
    const dateStr = format(newDate, "yyyy-MM-dd");
    setTransactions(prev => [...prev, { id: Date.now(), date: dateStr, bookmaker: newTx.bookmaker, type: newTx.type, amount: amt, notes: newTx.notes }]);
    setNewTx({ bookmaker: "Bet365", type: "Free Bet", amount: "", notes: "" });
    setNewDate(new Date());
    setModalOpen(false);
  };

  const deleteTransaction = (id: number) => setTransactions(prev => prev.filter(t => t.id !== id));

  const exportCSV = () => {
    const header = "Date,Bookmaker,Type,Amount,Notes\n";
    const rows = transactions
      .sort((a, b) => a.date.localeCompare(b.date))
      .map(t => `${t.date},${t.bookmaker},"${t.type}",${t.amount},"${t.notes.replace(/"/g, '""')}"`)
      .join("\n");
    const blob = new Blob([header + rows], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url; a.download = "profit-tracker.csv"; a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto space-y-6">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
            <div>
              <h1 className="font-display text-2xl font-bold flex items-center gap-2"><BarChart3 size={24} className="text-primary" /> Profit Tracker</h1>
              <p className="text-sm text-muted-foreground">Track every bet and watch your profit grow</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="text-xs gap-1.5 border-border" onClick={exportCSV}><Download size={14} /> Export CSV</Button>
              <Dialog open={modalOpen} onOpenChange={setModalOpen}>
                <DialogTrigger asChild><Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90 text-xs gap-1.5 font-semibold"><Plus size={14} /> Add Transaction</Button></DialogTrigger>
                <DialogContent className="bg-card border-border sm:max-w-md">
                  <DialogHeader><DialogTitle className="font-display">Add Transaction</DialogTitle></DialogHeader>
                  <div className="space-y-4 pt-2">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="text-xs text-muted-foreground mb-1.5 block">Date</Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button variant="outline" className={cn("w-full justify-start text-left font-normal h-9 text-xs bg-secondary/50 border-border", !newDate && "text-muted-foreground")}>
                              <CalendarIcon className="mr-2 h-3.5 w-3.5" />
                              {newDate ? format(newDate, "dd/MM/yyyy") : "Pick a date"}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar mode="single" selected={newDate} onSelect={setNewDate} initialFocus className={cn("p-3 pointer-events-auto")} />
                          </PopoverContent>
                        </Popover>
                      </div>
                      <div>
                        <Label className="text-xs text-muted-foreground mb-1.5 block">Bookmaker</Label>
                        <Select value={newTx.bookmaker} onValueChange={v => setNewTx({ ...newTx, bookmaker: v })}>
                          <SelectTrigger className="h-9 text-xs bg-secondary/50 border-border"><SelectValue /></SelectTrigger>
                          <SelectContent>{BOOKMAKERS.map(b => <SelectItem key={b} value={b}>{b}</SelectItem>)}</SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="text-xs text-muted-foreground mb-1.5 block">Offer Type</Label>
                        <Select value={newTx.type} onValueChange={v => setNewTx({ ...newTx, type: v as Transaction["type"] })}>
                          <SelectTrigger className="h-9 text-xs bg-secondary/50 border-border"><SelectValue /></SelectTrigger>
                          <SelectContent>{TYPES.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label className="text-xs text-muted-foreground mb-1.5 block">Amount (£)</Label>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">£</span>
                          <Input type="number" step="0.01" value={newTx.amount} onChange={e => setNewTx({ ...newTx, amount: e.target.value })} placeholder="-1.20 or 25.40" className="h-9 text-xs bg-secondary/50 border-border pl-7" />
                        </div>
                      </div>
                    </div>
                    <div>
                      <Label className="text-xs text-muted-foreground mb-1.5 block">Notes</Label>
                      <Textarea value={newTx.notes} onChange={e => setNewTx({ ...newTx, notes: e.target.value })} className="bg-secondary/50 border-border text-xs" rows={2} placeholder="e.g. Man City vs Arsenal free bet" />
                    </div>
                    <Button onClick={addTransaction} className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold">Add Transaction</Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          {/* Stats bar */}
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
            <div className="glass-card p-5 text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--primary)/0.06),transparent_60%)]" />
              <div className="relative">
                <TrendingUp size={18} className="text-primary mx-auto mb-2" />
                <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">Total Profit</p>
                <p className="font-display text-2xl sm:text-3xl font-bold text-primary"><AnimatedCount target={totalProfit} /></p>
              </div>
            </div>
            <div className="glass-card p-5 text-center">
              <Target size={18} className="text-primary mx-auto mb-2" />
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">Total Bets</p>
              <p className="font-display text-2xl font-bold">{totalBets}</p>
            </div>
            <div className="glass-card p-5 text-center">
              <Award size={18} className="text-primary mx-auto mb-2" />
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">Win Rate</p>
              <p className="font-display text-2xl font-bold">{winRate}%</p>
            </div>
            <div className="glass-card p-5 text-center">
              <BarChart3 size={18} className="text-primary mx-auto mb-2" />
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">ROI</p>
              <p className="font-display text-2xl font-bold text-primary">{roi.toFixed(1)}%</p>
            </div>
            <div className="glass-card p-5 text-center col-span-2 lg:col-span-1">
              <Star size={18} className="text-primary mx-auto mb-2" />
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">Best Month</p>
              <p className="font-display text-xl font-bold text-primary">£{bestMonth.profit.toFixed(0)}</p>
              <p className="text-[10px] text-muted-foreground">{bestMonth.month}</p>
            </div>
          </div>

          {/* Chart */}
          <div className="glass-card p-6 mb-6">
            <h3 className="font-display text-sm font-semibold mb-4 flex items-center gap-2"><TrendingUp size={16} className="text-primary" /> Your Profit Journey</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="profitGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(152 72% 46%)" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="hsl(152 72% 46%)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 14% 18%)" />
                  <XAxis dataKey="date" tick={{ fontSize: 11, fill: "hsl(220 10% 55%)" }} stroke="hsl(220 14% 18%)" />
                  <YAxis tick={{ fontSize: 11, fill: "hsl(220 10% 55%)" }} stroke="hsl(220 14% 18%)" tickFormatter={v => `£${v}`} />
                  <Tooltip contentStyle={{ background: "hsl(220 18% 10%)", border: "1px solid hsl(220 14% 18%)", borderRadius: "8px", fontSize: "12px" }} formatter={(value: number) => [`£${value.toFixed(2)}`, "Profit"]} />
                  <Area type="monotone" dataKey="profit" stroke="hsl(152 72% 46%)" strokeWidth={2.5} fill="url(#profitGradient)" dot={{ fill: "hsl(152 72% 46%)", r: 4, strokeWidth: 0 }} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Monthly summaries */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            {monthlySummaries.map(m => (
              <div key={m.month} className="glass-card p-5">
                <p className="text-xs text-muted-foreground font-medium mb-1">{m.month}</p>
                <p className="font-display text-xl font-bold text-primary">£{m.profit.toFixed(2)}</p>
                <p className="text-[10px] text-muted-foreground mt-0.5">{m.bets} bets</p>
              </div>
            ))}
          </div>

          {/* Filter bar + Table */}
          <div className="glass-card overflow-hidden rounded-xl">
            <div className="p-4 border-b border-border flex flex-wrap items-center gap-3">
              <div className="flex gap-1">
                {["All Time", "This Month", "Last Month"].map(d => (
                  <button key={d} onClick={() => setDateFilter(d)} className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${dateFilter === d ? "bg-primary text-primary-foreground" : "bg-secondary/50 text-muted-foreground hover:text-foreground"}`}>{d}</button>
                ))}
              </div>
              <Select value={bookmakerFilter} onValueChange={setBookmakerFilter}>
                <SelectTrigger className="h-8 w-36 text-xs bg-secondary/50 border-border"><SelectValue placeholder="Bookmaker" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Bookmakers</SelectItem>
                  {BOOKMAKERS.map(b => <SelectItem key={b} value={b}>{b}</SelectItem>)}
                </SelectContent>
              </Select>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="h-8 w-36 text-xs bg-secondary/50 border-border"><SelectValue placeholder="Type" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Types</SelectItem>
                  {TYPES.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                </SelectContent>
              </Select>
              <span className="text-[10px] text-muted-foreground ml-auto">{filtered.length} transactions</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-secondary/30">
                    <th className="text-left p-3 font-medium text-muted-foreground text-xs">Date</th>
                    <th className="text-left p-3 font-medium text-muted-foreground text-xs">Bookmaker</th>
                    <th className="text-left p-3 font-medium text-muted-foreground text-xs">Type</th>
                    <th className="text-right p-3 font-medium text-muted-foreground text-xs">Amount</th>
                    <th className="text-right p-3 font-medium text-muted-foreground text-xs">Running Total</th>
                    <th className="text-left p-3 font-medium text-muted-foreground text-xs">Notes</th>
                    <th className="p-3 w-10"></th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map(t => (
                    <tr key={t.id} className="border-b border-border/50 hover:bg-secondary/20 transition-colors group">
                      <td className="p-3 text-muted-foreground text-xs">{format(new Date(t.date), "dd MMM yyyy")}</td>
                      <td className="p-3 font-medium text-sm">{t.bookmaker}</td>
                      <td className="p-3"><span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold border ${typeBadgeClass(t.type)}`}>{t.type}</span></td>
                      <td className={`p-3 text-right font-semibold ${t.amount >= 0 ? "text-primary" : "text-destructive"}`}>{t.amount >= 0 ? "+" : "-"}£{Math.abs(t.amount).toFixed(2)}</td>
                      <td className="p-3 text-right font-medium text-sm">£{(runningMap.get(t.id) ?? 0).toFixed(2)}</td>
                      <td className="p-3 text-xs text-muted-foreground max-w-[200px] truncate">{t.notes}</td>
                      <td className="p-3">
                        <Button variant="ghost" size="icon" className="h-7 w-7 opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-destructive transition-opacity" onClick={() => deleteTransaction(t.id)}>
                          <Trash2 size={13} />
                        </Button>
                      </td>
                    </tr>
                  ))}
                  {filtered.length === 0 && (
                    <tr><td colSpan={7} className="p-8 text-center text-sm text-muted-foreground">No transactions match your filters</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default ProfitTracker;
