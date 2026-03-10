import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Crown, Lock, ExternalLink } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import { useAuth } from "@/contexts/AuthContext";

const mockRaces = [
  { race: "1:50 Ascot — Handicap", venue: "Ascot", time: "13:50", runners: 12, ewTerms: "1/4 odds, 3 places", backOdds: 5.0, layOdds: 5.1, ewRating: 97.2, profit: 8.40 },
  { race: "2:25 Cheltenham — Novice Hurdle", venue: "Cheltenham", time: "14:25", runners: 8, ewTerms: "1/5 odds, 2 places", backOdds: 3.5, layOdds: 3.55, ewRating: 96.5, profit: 6.20 },
  { race: "3:10 Kempton — Class 2 Flat", venue: "Kempton", time: "15:10", runners: 14, ewTerms: "1/4 odds, 3 places", backOdds: 7.0, layOdds: 7.2, ewRating: 95.8, profit: 9.80 },
  { race: "3:45 Aintree — Chase", venue: "Aintree", time: "15:45", runners: 10, ewTerms: "1/4 odds, 3 places", backOdds: 4.0, layOdds: 4.1, ewRating: 95.1, profit: 5.60 },
  { race: "4:20 York — Sprint", venue: "York", time: "16:20", runners: 16, ewTerms: "1/4 odds, 4 places", backOdds: 9.0, layOdds: 9.4, ewRating: 94.3, profit: 11.20 },
  { race: "1:15 Newmarket — Maiden", venue: "Newmarket", time: "13:15", runners: 9, ewTerms: "1/5 odds, 2 places", backOdds: 6.0, layOdds: 6.2, ewRating: 93.7, profit: 7.10 },
  { race: "2:50 Doncaster — Hurdle", venue: "Doncaster", time: "14:50", runners: 11, ewTerms: "1/4 odds, 3 places", backOdds: 4.5, layOdds: 4.6, ewRating: 92.9, profit: 5.90 },
  { race: "4:00 Sandown — Handicap Chase", venue: "Sandown", time: "16:00", runners: 13, ewTerms: "1/4 odds, 3 places", backOdds: 8.0, layOdds: 8.3, ewRating: 91.5, profit: 10.40 },
  { race: "3:30 Haydock — Class 3", venue: "Haydock", time: "15:30", runners: 7, ewTerms: "1/5 odds, 2 places", backOdds: 2.8, layOdds: 2.85, ewRating: 90.8, profit: 4.30 },
  { race: "2:00 Wetherby — Novice Chase", venue: "Wetherby", time: "14:00", runners: 6, ewTerms: "1/4 odds, 2 places", backOdds: 3.0, layOdds: 3.05, ewRating: 89.2, profit: 3.80 },
  { race: "4:40 Ascot — Feature", venue: "Ascot", time: "16:40", runners: 15, ewTerms: "1/4 odds, 4 places", backOdds: 12.0, layOdds: 12.6, ewRating: 88.0, profit: 13.50 },
  { race: "1:30 Lingfield — AW Sprint", venue: "Lingfield", time: "13:30", runners: 10, ewTerms: "1/5 odds, 2 places", backOdds: 5.5, layOdds: 5.7, ewRating: 86.4, profit: 6.70 },
  { race: "3:00 Catterick — Hurdle", venue: "Catterick", time: "15:00", runners: 8, ewTerms: "1/4 odds, 2 places", backOdds: 4.0, layOdds: 4.15, ewRating: 84.1, profit: 4.90 },
  { race: "2:30 Plumpton — Chase", venue: "Plumpton", time: "14:30", runners: 7, ewTerms: "1/4 odds, 2 places", backOdds: 3.5, layOdds: 3.65, ewRating: 81.5, profit: 3.20 },
  { race: "4:15 Wolverhampton — AW", venue: "Wolverhampton", time: "16:15", runners: 12, ewTerms: "1/4 odds, 3 places", backOdds: 10.0, layOdds: 10.6, ewRating: 78.0, profit: 8.90 },
];

const getRatingColor = (r: number) => r >= 85 ? "bg-primary/20 text-primary" : r >= 70 ? "bg-amber-500/20 text-amber-400" : "bg-destructive/20 text-destructive";

const EachWayMatcher = () => {
  const { isPremium } = useAuth();
  const [venue, setVenue] = useState("All");
  const venues = ["All", ...Array.from(new Set(mockRaces.map(r => r.venue)))];

  const filtered = useMemo(() => {
    return mockRaces
      .filter(r => venue === "All" || r.venue === venue)
      .sort((a, b) => b.ewRating - a.ewRating);
  }, [venue]);

  const visibleRows = isPremium ? filtered : filtered.slice(0, 3);

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto space-y-6">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
          <div className="mb-6">
            <h1 className="font-display text-2xl font-bold">Each-Way Matcher</h1>
            <p className="text-sm text-muted-foreground">Find profitable each-way betting opportunities in horse racing</p>
          </div>

          <div className="glass-card p-4 mb-6">
            <div className="flex gap-4 items-end">
              <div className="w-48">
                <label className="text-xs text-muted-foreground mb-1 block">Venue</label>
                <Select value={venue} onValueChange={setVenue}>
                  <SelectTrigger className="h-9 bg-secondary/50 border-border"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {venues.map(v => <SelectItem key={v} value={v}>{v}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="text-xs text-muted-foreground ml-auto">{filtered.length} races found</div>
            </div>
          </div>

          <div className="glass-card overflow-hidden rounded-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-secondary/30">
                    <th className="text-left p-3 font-medium text-muted-foreground">Race</th>
                    <th className="text-left p-3 font-medium text-muted-foreground">Time</th>
                    <th className="text-center p-3 font-medium text-muted-foreground">Runners</th>
                    <th className="text-left p-3 font-medium text-muted-foreground">E/W Terms</th>
                    <th className="text-center p-3 font-medium text-muted-foreground">Back</th>
                    <th className="text-center p-3 font-medium text-muted-foreground">Lay</th>
                    <th className="text-center p-3 font-medium text-muted-foreground">EW Rating</th>
                    <th className="text-right p-3 font-medium text-muted-foreground">Exp. Profit</th>
                    <th className="text-center p-3 font-medium text-muted-foreground">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {visibleRows.map((row, i) => (
                    <tr key={i} className="border-b border-border/50 hover:bg-secondary/20 transition-colors">
                      <td className="p-3 font-medium">{row.race}</td>
                      <td className="p-3 text-muted-foreground">{row.time}</td>
                      <td className="p-3 text-center">{row.runners}</td>
                      <td className="p-3 text-xs text-muted-foreground">{row.ewTerms}</td>
                      <td className="p-3 text-center text-primary font-semibold">{row.backOdds.toFixed(2)}</td>
                      <td className="p-3 text-center">{row.layOdds.toFixed(2)}</td>
                      <td className="p-3 text-center">
                        <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-semibold ${getRatingColor(row.ewRating)}`}>
                          {row.ewRating.toFixed(1)}%
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

            {!isPremium && (
              <div className="relative">
                <div className="blur-[4px] pointer-events-none select-none">
                  <table className="w-full text-sm"><tbody>
                    {filtered.slice(3, 6).map((r, i) => (
                      <tr key={i} className="border-b border-border/50">
                        <td className="p-3">{r.race}</td><td className="p-3">{r.time}</td><td className="p-3">{r.runners}</td>
                        <td className="p-3">{r.ewTerms}</td><td className="p-3">{r.backOdds}</td><td className="p-3">{r.layOdds}</td>
                        <td className="p-3">{r.ewRating}%</td><td className="p-3">£{r.profit}</td><td className="p-3">Open</td>
                      </tr>
                    ))}
                  </tbody></table>
                </div>
                <div className="absolute inset-0 flex items-center justify-center bg-card/70 backdrop-blur-[2px]">
                  <div className="text-center">
                    <Lock size={24} className="text-muted-foreground mx-auto mb-2" />
                    <p className="font-display font-semibold mb-1">Upgrade for all {filtered.length} races</p>
                    <Button className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold gap-2 mt-2">
                      <Crown size={16} /> Unlock Each-Way Matcher
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

export default EachWayMatcher;
