import { useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Crown, RefreshCw, ExternalLink, Lock, ChevronDown, Timer } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import { useAuth } from "@/contexts/AuthContext";

const ALL_BOOKMAKERS = ["Bet365", "William Hill", "Paddy Power", "Ladbrokes", "Coral", "SkyBet", "Betway", "888sport"];

const mockData = [
  { event: "Man City vs Arsenal", time: "15:00", sport: "Football", bookmaker: "Bet365", backOdds: 2.1, exchange: "Betfair", layOdds: 2.12, rating: 98.2, profit: 4.85 },
  { event: "Liverpool vs Chelsea", time: "17:30", sport: "Football", bookmaker: "William Hill", backOdds: 3.5, exchange: "Smarkets", layOdds: 3.54, rating: 97.8, profit: 3.2 },
  { event: "Tottenham vs Man Utd", time: "12:30", sport: "Football", bookmaker: "Paddy Power", backOdds: 1.85, exchange: "Betfair", layOdds: 1.87, rating: 97.5, profit: 6.1 },
  { event: "Wolves vs Everton", time: "15:00", sport: "Football", bookmaker: "Ladbrokes", backOdds: 2.4, exchange: "Smarkets", layOdds: 2.44, rating: 96.9, profit: 2.9 },
  { event: "Newcastle vs Brighton", time: "20:00", sport: "Football", bookmaker: "Coral", backOdds: 1.95, exchange: "Betfair", layOdds: 1.98, rating: 96.5, profit: 5.4 },
  { event: "Ascot 14:20 — Thunder Storm", time: "14:20", sport: "Horse Racing", bookmaker: "SkyBet", backOdds: 5.0, exchange: "Betfair", layOdds: 5.1, rating: 95.8, profit: 8.2 },
  { event: "Cheltenham 15:40 — Silver Arrow", time: "15:40", sport: "Horse Racing", bookmaker: "Bet365", backOdds: 3.25, exchange: "Smarkets", layOdds: 3.3, rating: 95.2, profit: 4.6 },
  { event: "Kempton 16:10 — Lucky Strike", time: "16:10", sport: "Horse Racing", bookmaker: "Betway", backOdds: 7.0, exchange: "Betfair", layOdds: 7.2, rating: 94.5, profit: 6.8 },
  { event: "Djokovic vs Alcaraz", time: "13:00", sport: "Tennis", bookmaker: "888sport", backOdds: 1.65, exchange: "Betfair", layOdds: 1.67, rating: 94.1, profit: 7.3 },
  { event: "Sinner vs Medvedev", time: "15:30", sport: "Tennis", bookmaker: "Unibet", backOdds: 2.2, exchange: "Smarkets", layOdds: 2.24, rating: 93.8, profit: 3.5 },
  { event: "Aston Villa vs West Ham", time: "15:00", sport: "Football", bookmaker: "Betway", backOdds: 2.8, exchange: "Betfair", layOdds: 2.86, rating: 93.2, profit: 2.1 },
  { event: "Crystal Palace vs Fulham", time: "15:00", sport: "Football", bookmaker: "888sport", backOdds: 2.15, exchange: "Smarkets", layOdds: 2.2, rating: 92.7, profit: 4.0 },
  { event: "Aintree 13:50 — Brave Heart", time: "13:50", sport: "Horse Racing", bookmaker: "Coral", backOdds: 4.5, exchange: "Betfair", layOdds: 4.6, rating: 92.1, profit: 5.5 },
  { event: "Sabalenka vs Swiatek", time: "11:00", sport: "Tennis", bookmaker: "Bet365", backOdds: 1.9, exchange: "Betfair", layOdds: 1.94, rating: 91.5, profit: 6.0 },
  { event: "Bournemouth vs Nottm Forest", time: "15:00", sport: "Football", bookmaker: "Unibet", backOdds: 2.6, exchange: "Smarkets", layOdds: 2.68, rating: 90.8, profit: 1.8 },
  { event: "York 14:40 — Golden Dawn", time: "14:40", sport: "Horse Racing", bookmaker: "William Hill", backOdds: 6.0, exchange: "Betfair", layOdds: 6.2, rating: 89.5, profit: 7.1 },
  { event: "Brentford vs Leicester", time: "17:30", sport: "Football", bookmaker: "SkyBet", backOdds: 1.75, exchange: "Smarkets", layOdds: 1.79, rating: 88.2, profit: 5.8 },
  { event: "Fritz vs Rune", time: "16:00", sport: "Tennis", bookmaker: "Paddy Power", backOdds: 2.05, exchange: "Betfair", layOdds: 2.12, rating: 86.5, profit: 2.4 },
  { event: "Burnley vs Southampton", time: "20:00", sport: "Football", bookmaker: "Ladbrokes", backOdds: 2.3, exchange: "Betfair", layOdds: 2.38, rating: 84.1, profit: 1.5 },
  { event: "Newmarket 15:10 — Flash Point", time: "15:10", sport: "Horse Racing", bookmaker: "Betway", backOdds: 8.0, exchange: "Smarkets", layOdds: 8.4, rating: 82.0, profit: 3.9 },
  { event: "Sheffield Utd vs Luton", time: "15:00", sport: "Football", bookmaker: "Coral", backOdds: 1.6, exchange: "Betfair", layOdds: 1.66, rating: 78.5, profit: 0.9 },
  { event: "Doncaster 16:30 — Night Fury", time: "16:30", sport: "Horse Racing", bookmaker: "888sport", backOdds: 11.0, exchange: "Betfair", layOdds: 11.8, rating: 72.3, profit: 2.2 },
];

const getRatingColor = (r: number) => r >= 85 ? "bg-primary/20 text-primary" : r >= 70 ? "bg-amber-500/20 text-amber-400" : "bg-destructive/20 text-destructive";

const OddsMatcherPage = () => {
  const { isPremium } = useAuth();
  const [sport, setSport] = useState("All");
  const [ratingFilter, setRatingFilter] = useState([60]);
  const [dateTab, setDateTab] = useState("Today");
  const [selectedBookmakers, setSelectedBookmakers] = useState<string[]>(ALL_BOOKMAKERS);
  const [refreshTimer, setRefreshTimer] = useState(165);

  useEffect(() => {
    if (!isPremium) return;
    const interval = setInterval(() => setRefreshTimer(t => (t <= 0 ? 180 : t - 1)), 1000);
    return () => clearInterval(interval);
  }, [isPremium]);

  const toggleBookmaker = (bk: string) => {
    setSelectedBookmakers(prev => prev.includes(bk) ? prev.filter(b => b !== bk) : [...prev, bk]);
  };

  const filtered = useMemo(() => {
    return mockData
      .filter(r => sport === "All" || r.sport === sport)
      .filter(r => r.rating >= ratingFilter[0])
      .filter(r => selectedBookmakers.includes(r.bookmaker))
      .sort((a, b) => b.rating - a.rating);
  }, [sport, ratingFilter, selectedBookmakers]);

  const totalMatches = 847;
  const visibleRows = isPremium ? filtered : filtered.slice(0, 5);
  const lockedCount = filtered.length - 5;
  const mins = Math.floor(refreshTimer / 60);
  const secs = refreshTimer % 60;

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto space-y-6">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="font-display text-2xl font-bold">OddsMatcher</h1>
              <p className="text-sm text-muted-foreground">Find the best matched betting opportunities in real-time</p>
            </div>
            {isPremium && (
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground bg-secondary/50 px-3 py-1.5 rounded-full">
                  <Timer size={12} className="text-primary" />
                  Next refresh: {mins}:{secs.toString().padStart(2, "0")}
                </div>
                <div className="flex items-center gap-1.5 text-xs text-primary">
                  <RefreshCw size={14} className="animate-spin" style={{ animationDuration: "3s" }} />
                  Auto-refreshing
                </div>
              </div>
            )}
          </div>

          {/* Filters */}
          <div className="glass-card p-4 mb-6">
            <div className="flex flex-wrap gap-4 items-end">
              {/* Sport filter tabs */}
              <div>
                <label className="text-xs text-muted-foreground mb-1.5 block">Sport</label>
                <div className="flex gap-1">
                  {["All", "Football", "Horse Racing", "Tennis", "Cricket"].map(s => (
                    <button
                      key={s}
                      onClick={() => setSport(s)}
                      className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${sport === s ? "bg-primary text-primary-foreground" : "bg-secondary/50 text-muted-foreground hover:text-foreground"}`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Bookmaker multi-select */}
              <div>
                <label className="text-xs text-muted-foreground mb-1.5 block">Bookmaker</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" size="sm" className="h-8 text-xs bg-secondary/50 border-border gap-1.5 min-w-[140px] justify-between">
                      {selectedBookmakers.length === ALL_BOOKMAKERS.length ? "All Bookmakers" : `${selectedBookmakers.length} selected`}
                      <ChevronDown size={12} />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-52 p-2" align="start">
                    <div className="space-y-1">
                      {ALL_BOOKMAKERS.map(bk => (
                        <label key={bk} className="flex items-center gap-2 px-2 py-1.5 rounded hover:bg-secondary/50 cursor-pointer text-sm">
                          <Checkbox checked={selectedBookmakers.includes(bk)} onCheckedChange={() => toggleBookmaker(bk)} />
                          {bk}
                        </label>
                      ))}
                    </div>
                  </PopoverContent>
                </Popover>
              </div>

              {/* Rating slider */}
              <div className="w-44">
                <label className="text-xs text-muted-foreground mb-1.5 block">Min Rating: {ratingFilter[0]}%</label>
                <Slider value={ratingFilter} onValueChange={setRatingFilter} min={60} max={100} step={1} className="mt-2" />
              </div>

              {/* Date tabs */}
              <div>
                <label className="text-xs text-muted-foreground mb-1.5 block">Date</label>
                <div className="flex gap-1">
                  {["Today", "Tomorrow", "This Week"].map(d => (
                    <button
                      key={d}
                      onClick={() => setDateTab(d)}
                      className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${dateTab === d ? "bg-primary text-primary-foreground" : "bg-secondary/50 text-muted-foreground hover:text-foreground"}`}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>

              <div className="text-xs text-muted-foreground ml-auto self-end">
                Showing {filtered.length} of {totalMatches} matches
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="glass-card overflow-hidden rounded-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-secondary/30">
                    <th className="text-left p-3 font-medium text-muted-foreground">Match / Event</th>
                    <th className="text-left p-3 font-medium text-muted-foreground">Time</th>
                    <th className="text-left p-3 font-medium text-muted-foreground">Bookmaker</th>
                    <th className="text-center p-3 font-medium text-muted-foreground">Back</th>
                    <th className="text-center p-3 font-medium text-muted-foreground">Lay</th>
                    <th className="text-center p-3 font-medium text-muted-foreground">Rating</th>
                    <th className="text-right p-3 font-medium text-muted-foreground">Profit Est.</th>
                    <th className="text-center p-3 font-medium text-muted-foreground">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {visibleRows.map((row, i) => (
                    <tr key={i} className="border-b border-border/50 hover:bg-secondary/20 transition-colors">
                      <td className="p-3">
                        <span className="font-medium">{row.event}</span>
                        <span className="block text-[10px] text-muted-foreground">{row.sport}</span>
                      </td>
                      <td className="p-3 text-muted-foreground">{row.time}</td>
                      <td className="p-3 font-medium">{row.bookmaker}</td>
                      <td className="p-3 text-center text-primary font-semibold">{row.backOdds.toFixed(2)}</td>
                      <td className="p-3 text-center">{row.layOdds.toFixed(2)}<span className="block text-[10px] text-muted-foreground">{row.exchange}</span></td>
                      <td className="p-3 text-center">
                        <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-semibold ${getRatingColor(row.rating)}`}>
                          {row.rating.toFixed(1)}%
                        </span>
                      </td>
                      <td className="p-3 text-right font-semibold text-primary">£{row.profit.toFixed(2)}</td>
                      <td className="p-3 text-center">
                        <Button size="sm" variant="outline" className="h-7 text-xs gap-1 border-primary/30 text-primary hover:bg-primary/10">
                          Open <ExternalLink size={10} />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {!isPremium && lockedCount > 0 && (
              <div className="relative">
                <div className="blur-[4px] pointer-events-none select-none">
                  <table className="w-full text-sm">
                    <tbody>
                      {filtered.slice(5, 8).map((row, i) => (
                        <tr key={i} className="border-b border-border/50">
                          <td className="p-3">{row.event}</td>
                          <td className="p-3">{row.time}</td>
                          <td className="p-3">{row.bookmaker}</td>
                          <td className="p-3 text-center">{row.backOdds}</td>
                          <td className="p-3 text-center">{row.layOdds}</td>
                          <td className="p-3 text-center">{row.rating}%</td>
                          <td className="p-3 text-right">£{row.profit}</td>
                          <td className="p-3 text-center">Open</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="absolute inset-0 flex items-center justify-center bg-card/70 backdrop-blur-[2px]">
                  <div className="text-center">
                    <Lock size={24} className="text-muted-foreground mx-auto mb-2" />
                    <p className="font-display font-semibold mb-1">Upgrade to see all {filtered.length} matches</p>
                    <p className="text-xs text-muted-foreground mb-3">Free users can see 5 results</p>
                    <Button className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold gap-2">
                      <Crown size={16} /> Unlock All Results
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default OddsMatcherPage;
