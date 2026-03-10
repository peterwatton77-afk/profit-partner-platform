import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { BarChart3, Plus, Download, TrendingUp, Target, Award } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import DashboardLayout from "@/components/DashboardLayout";

interface Transaction {
  id: number;
  date: string;
  bookmaker: string;
  type: "Qualifying" | "Free Bet" | "Casino" | "Refund";
  amount: number;
  notes: string;
}

const initialTransactions: Transaction[] = [
  { id: 1, date: "2026-03-01", bookmaker: "Bet365", type: "Qualifying", amount: -0.85, notes: "Man City vs Arsenal" },
  { id: 2, date: "2026-03-01", bookmaker: "Bet365", type: "Free Bet", amount: 25.40, notes: "Free bet converted" },
  { id: 3, date: "2026-03-03", bookmaker: "William Hill", type: "Qualifying", amount: -1.20, notes: "Liverpool match" },
  { id: 4, date: "2026-03-03", bookmaker: "William Hill", type: "Free Bet", amount: 24.80, notes: "£30 free bet" },
  { id: 5, date: "2026-03-05", bookmaker: "Paddy Power", type: "Qualifying", amount: -0.65, notes: "Tennis qualifier" },
  { id: 6, date: "2026-03-05", bookmaker: "Paddy Power", type: "Free Bet", amount: 16.50, notes: "£20 free bet" },
  { id: 7, date: "2026-03-06", bookmaker: "Coral", type: "Casino", amount: 45.00, notes: "Slots bonus wagered" },
  { id: 8, date: "2026-03-07", bookmaker: "SkyBet", type: "Qualifying", amount: -1.10, notes: "Horse racing" },
  { id: 9, date: "2026-03-07", bookmaker: "SkyBet", type: "Free Bet", amount: 33.20, notes: "£40 in free bets" },
  { id: 10, date: "2026-03-09", bookmaker: "Betfair", type: "Refund", amount: 198.90, notes: "Accumulator refund offer" },
];

const chartData = [
  { date: "Mar 1", profit: 24.55 },
  { date: "Mar 3", profit: 48.15 },
  { date: "Mar 5", profit: 64.00 },
  { date: "Mar 6", profit: 109.00 },
  { date: "Mar 7", profit: 141.10 },
  { date: "Mar 9", profit: 340.00 },
];

const ProfitTracker = () => {
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions);
  const [filterType, setFilterType] = useState("All");
  const [modalOpen, setModalOpen] = useState(false);
  const [newTx, setNewTx] = useState({ date: "2026-03-10", bookmaker: "Bet365", type: "Free Bet" as Transaction["type"], amount: "", notes: "" });

  const totalProfit = useMemo(() => transactions.reduce((s, t) => s + t.amount, 0), [transactions]);
  const totalBets = transactions.length;
  const winRate = useMemo(() => { const pos = transactions.filter(t => t.amount > 0).length; return totalBets ? Math.round((pos / totalBets) * 100) : 0; }, [transactions, totalBets]);
  const roi = totalProfit > 0 ? ((totalProfit / (totalBets * 10)) * 100).toFixed(0) : "0";

  const filtered = useMemo(() => transactions.filter(t => filterType === "All" || t.type === filterType).sort((a, b) => b.date.localeCompare(a.date)), [transactions, filterType]);

  const runningTotals = useMemo(() => {
    let running = 0;
    const sorted = [...transactions].sort((a, b) => a.date.localeCompare(b.date));
    return sorted.map(t => { running += t.amount; return { ...t, running }; });
  }, [transactions]);

  const addTransaction = () => {
    const amt = parseFloat(newTx.amount);
    if (!amt) return;
    setTransactions(prev => [...prev, { id: Date.now(), date: newTx.date, bookmaker: newTx.bookmaker, type: newTx.type, amount: amt, notes: newTx.notes }]);
    setNewTx({ date: "2026-03-10", bookmaker: "Bet365", type: "Free Bet", amount: "", notes: "" });
    setModalOpen(false);
  };

  const exportCSV = () => {
    const header = "Date,Bookmaker,Type,Amount,Notes\n";
    const rows = transactions.map(t => `${t.date},${t.bookmaker},${t.type},${t.amount},${t.notes.replace(/,/g, ";")}`).join("\n");
    const blob = new Blob([header + rows], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url; a.download = "profit-tracker.csv"; a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto space-y-6">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="font-display text-2xl font-bold flex items-center gap-2"><BarChart3 size={24} className="text-primary" /> Profit Tracker</h1>
              <p className="text-sm text-muted-foreground">Track every bet and watch your profit grow</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="text-xs gap-1 border-border" onClick={exportCSV}><Download size={14} /> Export CSV</Button>
              <Dialog open={modalOpen} onOpenChange={setModalOpen}>
                <DialogTrigger asChild><Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90 text-xs gap-1"><Plus size={14} /> Add Transaction</Button></DialogTrigger>
                <DialogContent className="bg-card border-border">
                  <DialogHeader><DialogTitle className="font-display">Add Transaction</DialogTitle></DialogHeader>
                  <div className="space-y-4 pt-2">
                    <div className="grid grid-cols-2 gap-4">
                      <div><Label className="text-xs mb-1 block">Date</Label><Input type="date" value={newTx.date} onChange={e => setNewTx({ ...newTx, date: e.target.value })} className="h-9 bg-secondary/50 border-border" /></div>
                      <div><Label className="text-xs mb-1 block">Bookmaker</Label><Select value={newTx.bookmaker} onValueChange={v => setNewTx({ ...newTx, bookmaker: v })}><SelectTrigger className="h-9 bg-secondary/50 border-border"><SelectValue /></SelectTrigger><SelectContent>{["Bet365", "William Hill", "Paddy Power", "Coral", "SkyBet", "Betfair", "Betway", "888sport"].map(b => <SelectItem key={b} value={b}>{b}</SelectItem>)}</SelectContent></Select></div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div><Label className="text-xs mb-1 block">Type</Label><Select value={newTx.type} onValueChange={v => setNewTx({ ...newTx, type: v as Transaction["type"] })}><SelectTrigger className="h-9 bg-secondary/50 border-border"><SelectValue /></SelectTrigger><SelectContent>{["Qualifying", "Free Bet", "Casino", "Refund"].map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent></Select></div>
                      <div><Label className="text-xs mb-1 block">Amount (£)</Label><Input type="number" step="0.01" value={newTx.amount} onChange={e => setNewTx({ ...newTx, amount: e.target.value })} placeholder="-1.20 or 25.40" className="h-9 bg-secondary/50 border-border" /></div>
                    </div>
                    <div><Label className="text-xs mb-1 block">Notes</Label><Textarea value={newTx.notes} onChange={e => setNewTx({ ...newTx, notes: e.target.value })} className="bg-secondary/50 border-border" rows={2} /></div>
                    <Button onClick={addTransaction} className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold">Add Transaction</Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="glass-card p-5 text-center"><TrendingUp size={18} className="text-primary mx-auto mb-2" /><p className="text-xs text-muted-foreground mb-1">Total Profit</p><p className={`font-display text-2xl font-bold ${totalProfit >= 0 ? "text-primary" : "text-destructive"}`}>£{totalProfit.toFixed(2)}</p></div>
            <div className="glass-card p-5 text-center"><Target size={18} className="text-primary mx-auto mb-2" /><p className="text-xs text-muted-foreground mb-1">Total Bets</p><p className="font-display text-2xl font-bold">{totalBets}</p></div>
            <div className="glass-card p-5 text-center"><Award size={18} className="text-primary mx-auto mb-2" /><p className="text-xs text-muted-foreground mb-1">Win Rate</p><p className="font-display text-2xl font-bold">{winRate}%</p></div>
            <div className="glass-card p-5 text-center"><BarChart3 size={18} className="text-primary mx-auto mb-2" /><p className="text-xs text-muted-foreground mb-1">ROI</p><p className="font-display text-2xl font-bold text-primary">{roi}%</p></div>
          </div>

          <div className="glass-card p-6 mb-6">
            <h3 className="font-display text-sm font-semibold mb-4">Cumulative Profit</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 14% 18%)" />
                  <XAxis dataKey="date" tick={{ fontSize: 12, fill: "hsl(220 10% 55%)" }} stroke="hsl(220 14% 18%)" />
                  <YAxis tick={{ fontSize: 12, fill: "hsl(220 10% 55%)" }} stroke="hsl(220 14% 18%)" tickFormatter={v => `£${v}`} />
                  <Tooltip contentStyle={{ background: "hsl(220 18% 10%)", border: "1px solid hsl(220 14% 18%)", borderRadius: "8px", fontSize: "12px" }} formatter={(value: number) => [`£${value.toFixed(2)}`, "Profit"]} />
                  <Line type="monotone" dataKey="profit" stroke="hsl(152 72% 46%)" strokeWidth={2} dot={{ fill: "hsl(152 72% 46%)", r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="glass-card overflow-hidden rounded-xl">
            <div className="p-4 border-b border-border flex flex-wrap items-center gap-2">
              <span className="text-xs text-muted-foreground">Filter:</span>
              {["All", "Qualifying", "Free Bet", "Casino", "Refund"].map(t => (
                <button key={t} onClick={() => setFilterType(t)} className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${filterType === t ? "bg-primary text-primary-foreground" : "bg-secondary/50 text-muted-foreground hover:text-foreground"}`}>{t}</button>
              ))}
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead><tr className="border-b border-border bg-secondary/30">
                  <th className="text-left p-3 font-medium text-muted-foreground">Date</th>
                  <th className="text-left p-3 font-medium text-muted-foreground">Bookmaker</th>
                  <th className="text-left p-3 font-medium text-muted-foreground">Type</th>
                  <th className="text-right p-3 font-medium text-muted-foreground">Amount</th>
                  <th className="text-right p-3 font-medium text-muted-foreground">Running Total</th>
                  <th className="text-left p-3 font-medium text-muted-foreground">Notes</th>
                </tr></thead>
                <tbody>
                  {filtered.map(t => {
                    const rt = runningTotals.find(r => r.id === t.id);
                    return (
                      <tr key={t.id} className="border-b border-border/50 hover:bg-secondary/20 transition-colors">
                        <td className="p-3 text-muted-foreground">{t.date}</td>
                        <td className="p-3 font-medium">{t.bookmaker}</td>
                        <td className="p-3"><span className={`text-xs px-2 py-0.5 rounded-full font-medium ${t.type === "Qualifying" ? "bg-amber-500/10 text-amber-400" : t.type === "Free Bet" ? "bg-primary/10 text-primary" : t.type === "Casino" ? "bg-purple-500/10 text-purple-400" : "bg-blue-500/10 text-blue-400"}`}>{t.type}</span></td>
                        <td className={`p-3 text-right font-semibold ${t.amount >= 0 ? "text-primary" : "text-destructive"}`}>{t.amount >= 0 ? "+" : ""}£{Math.abs(t.amount).toFixed(2)}</td>
                        <td className="p-3 text-right font-medium">£{rt?.running.toFixed(2)}</td>
                        <td className="p-3 text-xs text-muted-foreground">{t.notes}</td>
                      </tr>
                    );
                  })}
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
