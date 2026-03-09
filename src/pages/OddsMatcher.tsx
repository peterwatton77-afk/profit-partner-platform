import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChevronLeft, ChevronRight, Filter } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";

const allBookmakers = ["Bet365", "William Hill", "Paddy Power", "Ladbrokes", "Sky Bet", "Coral", "Betfair Sportsbook", "BetVictor", "888sport", "Unibet"];

const mockRows = [
  { match: "Man City vs Arsenal", sport: "Football", bookmaker: "Bet365", backOdds: 2.10, exchange: "Betfair", layOdds: 2.12, rating: 98.2, profit: 8.50, tier: "Core" },
  { match: "Liverpool vs Chelsea", sport: "Football", bookmaker: "William Hill", backOdds: 3.50, exchange: "Smarkets", layOdds: 3.54, rating: 97.8, profit: 6.20, tier: "Core" },
  { match: "14:30 Cheltenham R3", sport: "Horse Racing", bookmaker: "Paddy Power", backOdds: 5.00, exchange: "Betfair", layOdds: 5.10, rating: 97.5, profit: 12.40, tier: "Advanced" },
  { match: "Tottenham vs Man Utd", sport: "Football", bookmaker: "Ladbrokes", backOdds: 1.85, exchange: "Betfair", layOdds: 1.87, rating: 97.3, profit: 4.80, tier: "Core" },
  { match: "15:00 Ascot R5", sport: "Horse Racing", bookmaker: "Sky Bet", backOdds: 8.00, exchange: "Smarkets", layOdds: 8.20, rating: 96.9, profit: 15.00, tier: "Advanced" },
  { match: "Djokovic vs Alcaraz", sport: "Tennis", bookmaker: "Coral", backOdds: 1.72, exchange: "Betfair", layOdds: 1.74, rating: 96.7, profit: 3.90, tier: "Core" },
  { match: "Everton vs West Ham", sport: "Football", bookmaker: "Betfair Sportsbook", backOdds: 2.90, exchange: "Smarkets", layOdds: 2.96, rating: 96.5, profit: 5.50, tier: "Essential" },
  { match: "16:10 York R6", sport: "Horse Racing", bookmaker: "BetVictor", backOdds: 4.50, exchange: "Betfair", layOdds: 4.60, rating: 96.2, profit: 9.30, tier: "Advanced" },
  { match: "Sinner vs Medvedev", sport: "Tennis", bookmaker: "888sport", backOdds: 1.55, exchange: "Betfair", layOdds: 1.57, rating: 95.8, profit: 2.10, tier: "Essential" },
  { match: "Newcastle vs Brighton", sport: "Football", bookmaker: "Unibet", backOdds: 2.25, exchange: "Smarkets", layOdds: 2.30, rating: 95.5, profit: 7.00, tier: "Core" },
];

const tierColors: Record<string, string> = {
  Core: "bg-primary/10 text-primary",
  Advanced: "bg-amber-500/10 text-amber-400",
  Essential: "bg-blue-400/10 text-blue-400",
};

const OddsMatcher = () => {
  const [sport, setSport] = useState("All");
  const [bookmaker, setBookmaker] = useState("All");
  const [minOdds, setMinOdds] = useState("");
  const [maxOdds, setMaxOdds] = useState("");
  const [minRating, setMinRating] = useState("");
  const [page, setPage] = useState(1);
  const perPage = 5;

  const filtered = useMemo(() => {
    return mockRows.filter((r) => {
      if (sport !== "All" && r.sport !== sport) return false;
      if (bookmaker !== "All" && r.bookmaker !== bookmaker) return false;
      if (minOdds && r.backOdds < parseFloat(minOdds)) return false;
      if (maxOdds && r.backOdds > parseFloat(maxOdds)) return false;
      if (minRating && r.rating < parseFloat(minRating)) return false;
      return true;
    });
  }, [sport, bookmaker, minOdds, maxOdds, minRating]);

  const totalPages = Math.ceil(filtered.length / perPage);
  const paged = filtered.slice((page - 1) * perPage, page * perPage);

  return (
    <DashboardLayout premium>
      <div className="max-w-6xl mx-auto space-y-6">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="font-display text-xl sm:text-2xl font-bold mb-1">OddsMatcher</h1>
          <p className="text-muted-foreground text-sm mb-6">Find the best matched betting opportunities in real-time.</p>
        </motion.div>

        {/* Filter Bar */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="glass-card p-4"
        >
          <div className="flex items-center gap-2 mb-3 text-sm text-muted-foreground">
            <Filter size={14} />
            <span className="font-medium">Filters</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            <Select value={sport} onValueChange={(v) => { setSport(v); setPage(1); }}>
              <SelectTrigger className="h-9 bg-secondary/50 border-border text-sm">
                <SelectValue placeholder="Sport" />
              </SelectTrigger>
              <SelectContent>
                {["All", "Football", "Horse Racing", "Tennis"].map((s) => (
                  <SelectItem key={s} value={s}>{s}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={bookmaker} onValueChange={(v) => { setBookmaker(v); setPage(1); }}>
              <SelectTrigger className="h-9 bg-secondary/50 border-border text-sm">
                <SelectValue placeholder="Bookmaker" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Bookmakers</SelectItem>
                {allBookmakers.map((b) => (
                  <SelectItem key={b} value={b}>{b}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Input
              placeholder="Min odds"
              type="number"
              step="0.01"
              value={minOdds}
              onChange={(e) => { setMinOdds(e.target.value); setPage(1); }}
              className="h-9 bg-secondary/50 border-border text-sm"
            />
            <Input
              placeholder="Max odds"
              type="number"
              step="0.01"
              value={maxOdds}
              onChange={(e) => { setMaxOdds(e.target.value); setPage(1); }}
              className="h-9 bg-secondary/50 border-border text-sm"
            />
            <Input
              placeholder="Min rating %"
              type="number"
              step="0.1"
              value={minRating}
              onChange={(e) => { setMinRating(e.target.value); setPage(1); }}
              className="h-9 bg-secondary/50 border-border text-sm"
            />
          </div>
        </motion.div>

        {/* Results Table */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-xs text-muted-foreground">
                  <th className="text-left py-3 px-4 font-medium">Match</th>
                  <th className="text-left py-3 px-4 font-medium hidden md:table-cell">Bookmaker</th>
                  <th className="text-right py-3 px-4 font-medium">Back</th>
                  <th className="text-right py-3 px-4 font-medium">Lay</th>
                  <th className="text-right py-3 px-4 font-medium">Rating</th>
                  <th className="text-right py-3 px-4 font-medium hidden sm:table-cell">Profit</th>
                  <th className="text-center py-3 px-4 font-medium hidden lg:table-cell">Tier</th>
                </tr>
              </thead>
              <tbody>
                {paged.map((row, i) => (
                  <tr key={i} className="border-b border-border/50 last:border-0 hover:bg-muted/30 transition-colors">
                    <td className="py-3 px-4">
                      <p className="font-medium text-xs">{row.match}</p>
                      <p className="text-[10px] text-muted-foreground md:hidden">{row.bookmaker}</p>
                    </td>
                    <td className="py-3 px-4 text-xs text-muted-foreground hidden md:table-cell">{row.bookmaker}</td>
                    <td className="py-3 px-4 text-xs text-right text-primary font-semibold">{row.backOdds.toFixed(2)}</td>
                    <td className="py-3 px-4 text-xs text-right">
                      <span className="text-muted-foreground">{row.layOdds.toFixed(2)}</span>
                      <span className="text-[10px] text-muted-foreground/60 ml-1 hidden md:inline">({row.exchange})</span>
                    </td>
                    <td className="py-3 px-4 text-xs text-right font-bold text-primary">{row.rating.toFixed(1)}%</td>
                    <td className="py-3 px-4 text-xs text-right font-semibold hidden sm:table-cell">£{row.profit.toFixed(2)}</td>
                    <td className="py-3 px-4 text-center hidden lg:table-cell">
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${tierColors[row.tier]}`}>
                        {row.tier}
                      </span>
                    </td>
                  </tr>
                ))}
                {paged.length === 0 && (
                  <tr>
                    <td colSpan={7} className="py-12 text-center text-sm text-muted-foreground">
                      No matches found. Try adjusting your filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between px-4 py-3 border-t border-border">
              <span className="text-xs text-muted-foreground">
                Showing {(page - 1) * perPage + 1}–{Math.min(page * perPage, filtered.length)} of {filtered.length}
              </span>
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  disabled={page === 1}
                  onClick={() => setPage(page - 1)}
                >
                  <ChevronLeft size={16} />
                </Button>
                {Array.from({ length: totalPages }, (_, i) => (
                  <Button
                    key={i}
                    variant={page === i + 1 ? "default" : "ghost"}
                    size="icon"
                    className={`h-8 w-8 text-xs ${page === i + 1 ? "bg-primary text-primary-foreground" : ""}`}
                    onClick={() => setPage(i + 1)}
                  >
                    {i + 1}
                  </Button>
                ))}
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  disabled={page === totalPages}
                  onClick={() => setPage(page + 1)}
                >
                  <ChevronRight size={16} />
                </Button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default OddsMatcher;
