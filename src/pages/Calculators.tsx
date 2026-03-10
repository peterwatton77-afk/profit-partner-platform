import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Calculator, Plus, Trash2 } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";

const MatchedBetCalc = () => {
  const [backStake, setBackStake] = useState("10");
  const [backOdds, setBackOdds] = useState("3.0");
  const [layOdds, setLayOdds] = useState("3.1");
  const [commission, setCommission] = useState("2");
  const [betType, setBetType] = useState("normal");

  const result = useMemo(() => {
    const bs = parseFloat(backStake) || 0;
    const bo = parseFloat(backOdds) || 0;
    const lo = parseFloat(layOdds) || 0;
    const comm = (parseFloat(commission) || 0) / 100;
    if (!bs || !bo || !lo || lo <= 1) return null;

    let layStake: number;

    if (betType === "normal") {
      layStake = (bs * bo) / (lo - comm);
      const backProfit = bs * (bo - 1) - (layStake * (lo - 1));
      const layProfit = layStake * (1 - comm) - bs;
      const qualLoss = Math.min(backProfit, layProfit);
      return { layStake, qualLoss, freeBetProfit: 0 };
    } else if (betType === "snr") {
      layStake = (bs * (bo - 1)) / (lo - comm);
      const backWin = bs * (bo - 1) - layStake * (lo - 1);
      const layWin = layStake * (1 - comm);
      const freeBetProfit = Math.min(backWin, layWin);
      return { layStake, qualLoss: 0, freeBetProfit };
    } else {
      layStake = (bs * bo) / (lo - comm);
      const backWin = bs * bo - layStake * (lo - 1);
      const layWin = layStake * (1 - comm) - bs;
      const freeBetProfit = Math.min(backWin, layWin);
      return { layStake, qualLoss: 0, freeBetProfit };
    }
  }, [backStake, backOdds, layOdds, commission, betType]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <div><Label className="text-xs mb-1 block">Back Stake (£)</Label><Input value={backStake} onChange={e => setBackStake(e.target.value)} type="number" className="h-10 bg-secondary/50 border-border" /></div>
        <div><Label className="text-xs mb-1 block">Back Odds</Label><Input value={backOdds} onChange={e => setBackOdds(e.target.value)} type="number" step="0.01" className="h-10 bg-secondary/50 border-border" /></div>
        <div><Label className="text-xs mb-1 block">Lay Odds</Label><Input value={layOdds} onChange={e => setLayOdds(e.target.value)} type="number" step="0.01" className="h-10 bg-secondary/50 border-border" /></div>
        <div><Label className="text-xs mb-1 block">Commission %</Label><Input value={commission} onChange={e => setCommission(e.target.value)} type="number" step="0.1" className="h-10 bg-secondary/50 border-border" /></div>
        <div>
          <Label className="text-xs mb-1 block">Bet Type</Label>
          <Select value={betType} onValueChange={setBetType}>
            <SelectTrigger className="h-10 bg-secondary/50 border-border"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="normal">Qualifying Bet</SelectItem>
              <SelectItem value="snr">Free Bet (SNR)</SelectItem>
              <SelectItem value="sr">Free Bet (SR)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      {result && (
        <div className="glass-card p-6">
          <h3 className="font-display text-sm font-semibold mb-4 text-muted-foreground uppercase tracking-wider">Results</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-secondary/30 rounded-lg"><p className="text-xs text-muted-foreground mb-1">Lay Stake</p><p className="font-display text-2xl font-bold">£{result.layStake.toFixed(2)}</p></div>
            {betType === "normal" ? (
              <div className="text-center p-4 bg-secondary/30 rounded-lg"><p className="text-xs text-muted-foreground mb-1">Qualifying Loss</p><p className={`font-display text-2xl font-bold ${result.qualLoss < 0 ? "text-destructive" : "text-primary"}`}>£{Math.abs(result.qualLoss).toFixed(2)}</p></div>
            ) : (
              <div className="text-center p-4 bg-secondary/30 rounded-lg"><p className="text-xs text-muted-foreground mb-1">Free Bet Profit</p><p className="font-display text-2xl font-bold text-primary">£{result.freeBetProfit.toFixed(2)}</p></div>
            )}
            <div className="text-center p-4 bg-secondary/30 rounded-lg"><p className="text-xs text-muted-foreground mb-1">Lay Liability</p><p className="font-display text-2xl font-bold">£{(result.layStake * (parseFloat(layOdds) - 1)).toFixed(2)}</p></div>
          </div>
          <div className="mt-4 p-4 bg-secondary/20 rounded-lg text-xs text-muted-foreground leading-relaxed">
            <p className="font-medium text-foreground mb-1">How this works:</p>
            {betType === "normal" ? (
              <p>Place £{backStake} back bet at {backOdds} odds, then lay £{result.layStake.toFixed(2)} at {layOdds} on the exchange. Your qualifying loss is £{Math.abs(result.qualLoss).toFixed(2)}.</p>
            ) : (
              <p>Use your £{backStake} free bet at {backOdds} odds, then lay £{result.layStake.toFixed(2)} at {layOdds}. Your guaranteed profit is £{result.freeBetProfit.toFixed(2)}.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

const EachWayCalc = () => {
  const [stake, setStake] = useState("10");
  const [backOdds, setBackOdds] = useState("5.0");
  const [ewFraction, setEwFraction] = useState("0.25");
  const [layWinOdds, setLayWinOdds] = useState("5.1");
  const [layPlaceOdds, setLayPlaceOdds] = useState("2.0");
  const [commission, setCommission] = useState("2");

  const result = useMemo(() => {
    const s = parseFloat(stake) || 0;
    const bo = parseFloat(backOdds) || 0;
    const ewf = parseFloat(ewFraction) || 0;
    const lwo = parseFloat(layWinOdds) || 0;
    const lpo = parseFloat(layPlaceOdds) || 0;
    const comm = (parseFloat(commission) || 0) / 100;
    if (!s || !bo || !lwo || !lpo || lwo <= 1 || lpo <= 1) return null;
    const placeOdds = 1 + (bo - 1) * ewf;
    const layWinStake = (s * bo) / (lwo - comm);
    const layPlaceStake = (s * placeOdds) / (lpo - comm);
    const winBackProfit = s * (bo - 1) + s * ((bo - 1) * ewf);
    const winLayLoss = layWinStake * (lwo - 1) + layPlaceStake * (lpo - 1);
    const winProfit = winBackProfit - winLayLoss;
    const loseLayWin = layWinStake * (1 - comm) + layPlaceStake * (1 - comm);
    const loseProfit = loseLayWin - s * 2;
    return { layWinStake, layPlaceStake, winProfit, loseProfit };
  }, [stake, backOdds, ewFraction, layWinOdds, layPlaceOdds, commission]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div><Label className="text-xs mb-1 block">Stake (£ e/w)</Label><Input value={stake} onChange={e => setStake(e.target.value)} type="number" className="h-10 bg-secondary/50 border-border" /></div>
        <div><Label className="text-xs mb-1 block">Back Odds</Label><Input value={backOdds} onChange={e => setBackOdds(e.target.value)} type="number" step="0.01" className="h-10 bg-secondary/50 border-border" /></div>
        <div><Label className="text-xs mb-1 block">E/W Fraction</Label><Select value={ewFraction} onValueChange={setEwFraction}><SelectTrigger className="h-10 bg-secondary/50 border-border"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="0.25">1/4 odds</SelectItem><SelectItem value="0.2">1/5 odds</SelectItem></SelectContent></Select></div>
        <div><Label className="text-xs mb-1 block">Lay Win Odds</Label><Input value={layWinOdds} onChange={e => setLayWinOdds(e.target.value)} type="number" step="0.01" className="h-10 bg-secondary/50 border-border" /></div>
        <div><Label className="text-xs mb-1 block">Lay Place Odds</Label><Input value={layPlaceOdds} onChange={e => setLayPlaceOdds(e.target.value)} type="number" step="0.01" className="h-10 bg-secondary/50 border-border" /></div>
        <div><Label className="text-xs mb-1 block">Commission %</Label><Input value={commission} onChange={e => setCommission(e.target.value)} type="number" step="0.1" className="h-10 bg-secondary/50 border-border" /></div>
      </div>
      {result && (
        <div className="glass-card p-6">
          <h3 className="font-display text-sm font-semibold mb-4 text-muted-foreground uppercase tracking-wider">Results</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="text-center p-3 bg-secondary/30 rounded-lg"><p className="text-xs text-muted-foreground mb-1">Lay Win Stake</p><p className="font-display text-xl font-bold">£{result.layWinStake.toFixed(2)}</p></div>
            <div className="text-center p-3 bg-secondary/30 rounded-lg"><p className="text-xs text-muted-foreground mb-1">Lay Place Stake</p><p className="font-display text-xl font-bold">£{result.layPlaceStake.toFixed(2)}</p></div>
            <div className="text-center p-3 bg-secondary/30 rounded-lg"><p className="text-xs text-muted-foreground mb-1">If Wins</p><p className={`font-display text-xl font-bold ${result.winProfit >= 0 ? "text-primary" : "text-destructive"}`}>£{result.winProfit.toFixed(2)}</p></div>
            <div className="text-center p-3 bg-secondary/30 rounded-lg"><p className="text-xs text-muted-foreground mb-1">If Loses</p><p className={`font-display text-xl font-bold ${result.loseProfit >= 0 ? "text-primary" : "text-destructive"}`}>£{result.loseProfit.toFixed(2)}</p></div>
          </div>
        </div>
      )}
    </div>
  );
};

const AccaCalc = () => {
  const [legs, setLegs] = useState([{ odds: "2.0" }, { odds: "1.5" }]);
  const [stake, setStake] = useState("10");
  const addLeg = () => { if (legs.length < 6) setLegs([...legs, { odds: "2.0" }]); };
  const removeLeg = (i: number) => { if (legs.length > 2) setLegs(legs.filter((_, j) => j !== i)); };
  const setLegOdds = (i: number, v: string) => { const n = [...legs]; n[i] = { odds: v }; setLegs(n); };

  const result = useMemo(() => {
    const s = parseFloat(stake) || 0;
    const combinedOdds = legs.reduce((acc, l) => acc * (parseFloat(l.odds) || 1), 1);
    const backProfit = s * (combinedOdds - 1);
    return { combinedOdds, backProfit };
  }, [legs, stake]);

  return (
    <div className="space-y-6">
      <div><Label className="text-xs mb-1 block">Total Stake (£)</Label><Input value={stake} onChange={e => setStake(e.target.value)} type="number" className="h-10 bg-secondary/50 border-border max-w-48" /></div>
      <div className="space-y-3">
        {legs.map((leg, i) => (
          <div key={i} className="flex items-center gap-3">
            <span className="text-xs text-muted-foreground w-16 shrink-0">Leg {i + 1}</span>
            <Input value={leg.odds} onChange={e => setLegOdds(i, e.target.value)} type="number" step="0.01" className="h-9 bg-secondary/50 border-border max-w-32" />
            {legs.length > 2 && <Button size="icon" variant="ghost" className="h-8 w-8 text-muted-foreground hover:text-destructive" onClick={() => removeLeg(i)}><Trash2 size={14} /></Button>}
          </div>
        ))}
        {legs.length < 6 && <Button variant="outline" size="sm" className="text-xs gap-1 border-border" onClick={addLeg}><Plus size={12} /> Add Leg</Button>}
      </div>
      <div className="glass-card p-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-secondary/30 rounded-lg"><p className="text-xs text-muted-foreground mb-1">Combined Odds</p><p className="font-display text-2xl font-bold">{result.combinedOdds.toFixed(2)}</p></div>
          <div className="text-center p-4 bg-secondary/30 rounded-lg"><p className="text-xs text-muted-foreground mb-1">Potential Return</p><p className="font-display text-2xl font-bold text-primary">£{(result.backProfit + (parseFloat(stake) || 0)).toFixed(2)}</p></div>
          <div className="text-center p-4 bg-secondary/30 rounded-lg"><p className="text-xs text-muted-foreground mb-1">Potential Profit</p><p className="font-display text-2xl font-bold text-primary">£{result.backProfit.toFixed(2)}</p></div>
        </div>
      </div>
    </div>
  );
};

const LayBetCalc = () => {
  const [layOdds, setLayOdds] = useState("3.0");
  const [layStake, setLayStake] = useState("10");
  const [commission, setCommission] = useState("2");

  const result = useMemo(() => {
    const lo = parseFloat(layOdds) || 0;
    const ls = parseFloat(layStake) || 0;
    const comm = (parseFloat(commission) || 0) / 100;
    if (!lo || !ls) return null;
    const liability = ls * (lo - 1);
    const profitIfLayWins = ls * (1 - comm);
    return { liability, profitIfLayWins };
  }, [layOdds, layStake, commission]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div><Label className="text-xs mb-1 block">Lay Odds</Label><Input value={layOdds} onChange={e => setLayOdds(e.target.value)} type="number" step="0.01" className="h-10 bg-secondary/50 border-border" /></div>
        <div><Label className="text-xs mb-1 block">Lay Stake (£)</Label><Input value={layStake} onChange={e => setLayStake(e.target.value)} type="number" className="h-10 bg-secondary/50 border-border" /></div>
        <div><Label className="text-xs mb-1 block">Commission %</Label><Input value={commission} onChange={e => setCommission(e.target.value)} type="number" step="0.1" className="h-10 bg-secondary/50 border-border" /></div>
      </div>
      {result && (
        <div className="glass-card p-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-secondary/30 rounded-lg"><p className="text-xs text-muted-foreground mb-1">Liability</p><p className="font-display text-2xl font-bold">£{result.liability.toFixed(2)}</p></div>
            <div className="text-center p-4 bg-secondary/30 rounded-lg"><p className="text-xs text-muted-foreground mb-1">If Lay Wins</p><p className="font-display text-2xl font-bold text-primary">+£{result.profitIfLayWins.toFixed(2)}</p></div>
            <div className="text-center p-4 bg-secondary/30 rounded-lg"><p className="text-xs text-muted-foreground mb-1">If Lay Loses</p><p className="font-display text-2xl font-bold text-destructive">-£{result.liability.toFixed(2)}</p></div>
          </div>
          <div className="mt-4 p-4 bg-secondary/20 rounded-lg text-xs text-muted-foreground">
            <p className="font-medium text-foreground mb-1">How this works:</p>
            <p>Laying at {layOdds} for £{layStake} means you risk £{result.liability.toFixed(2)}. If the selection doesn't win, you profit £{result.profitIfLayWins.toFixed(2)} after commission.</p>
          </div>
        </div>
      )}
    </div>
  );
};

const Calculators = () => {
  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
          <div className="mb-6">
            <h1 className="font-display text-2xl font-bold flex items-center gap-2"><Calculator size={24} className="text-primary" /> Calculator Suite</h1>
            <p className="text-sm text-muted-foreground">Work out exact stakes for any matched betting scenario</p>
          </div>
          <Tabs defaultValue="matched" className="space-y-6">
            <TabsList className="bg-secondary/50 border border-border">
              <TabsTrigger value="matched">Matched Bet</TabsTrigger>
              <TabsTrigger value="eachway">Each Way</TabsTrigger>
              <TabsTrigger value="acca">Accumulator</TabsTrigger>
              <TabsTrigger value="lay">Lay Bet</TabsTrigger>
            </TabsList>
            <TabsContent value="matched"><MatchedBetCalc /></TabsContent>
            <TabsContent value="eachway"><EachWayCalc /></TabsContent>
            <TabsContent value="acca"><AccaCalc /></TabsContent>
            <TabsContent value="lay"><LayBetCalc /></TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default Calculators;
