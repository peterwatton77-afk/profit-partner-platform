import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Calculator, Plus, Trash2, Info } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";

const fmt = (n: number) => n.toFixed(2);

const ResultBox = ({ label, value, type = "neutral" }: { label: string; value: string; type?: "profit" | "loss" | "neutral" }) => (
  <div className={`text-center p-4 rounded-lg border ${
    type === "profit" ? "bg-primary/10 border-primary/20" : type === "loss" ? "bg-destructive/10 border-destructive/20" : "bg-secondary/30 border-border"
  }`}>
    <p className="text-xs text-muted-foreground mb-1">{label}</p>
    <p className={`font-display text-2xl font-bold ${
      type === "profit" ? "text-primary" : type === "loss" ? "text-destructive" : "text-foreground"
    }`}>{value}</p>
  </div>
);

const Explainer = ({ children }: { children: React.ReactNode }) => (
  <div className="mt-4 p-4 bg-secondary/20 rounded-lg border border-border/50 text-xs text-muted-foreground leading-relaxed flex gap-2">
    <Info size={14} className="shrink-0 mt-0.5 text-primary" />
    <div>{children}</div>
  </div>
);

const FieldWrap = ({ label, prefix, children }: { label: string; prefix?: string; children: React.ReactNode }) => (
  <div>
    <Label className="text-xs text-muted-foreground mb-1.5 block">{label}</Label>
    {prefix ? (
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">{prefix}</span>
        <div className="[&_input]:pl-7">{children}</div>
      </div>
    ) : children}
  </div>
);

/* ───────── Tab 1: Matched Betting ───────── */
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
    if (!bs || bo <= 1 || lo <= 1) return null;

    const denom = lo - comm;
    let layStake: number;
    let backWinPL: number;
    let backLosePL: number;

    if (betType === "normal") {
      layStake = (bs * bo) / denom;
      backWinPL = bs * (bo - 1) - layStake * (lo - 1);
      backLosePL = layStake * (1 - comm) - bs;
      const qualLoss = Math.min(backWinPL, backLosePL);
      return { layStake, liability: layStake * (lo - 1), qualLoss, freeBetProfit: 0, backWinPL, backLosePL };
    } else if (betType === "snr") {
      layStake = (bs * (bo - 1)) / denom;
      backWinPL = bs * (bo - 1) - layStake * (lo - 1);
      backLosePL = layStake * (1 - comm);
      const freeBetProfit = Math.min(backWinPL, backLosePL);
      return { layStake, liability: layStake * (lo - 1), qualLoss: 0, freeBetProfit, backWinPL, backLosePL };
    } else {
      layStake = (bs * bo) / denom;
      backWinPL = bs * bo - layStake * (lo - 1);
      backLosePL = layStake * (1 - comm) - bs;
      const freeBetProfit = Math.min(backWinPL, backLosePL);
      return { layStake, liability: layStake * (lo - 1), qualLoss: 0, freeBetProfit, backWinPL, backLosePL };
    }
  }, [backStake, backOdds, layOdds, commission, betType]);

  return (
    <div className="space-y-6">
      <p className="text-sm text-muted-foreground">Calculate the exact lay stake needed for any qualifying bet or free bet to lock in a guaranteed profit (or minimise your qualifying loss).</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <FieldWrap label="Back Stake" prefix="£"><Input value={backStake} onChange={e => setBackStake(e.target.value)} type="number" className="h-10 bg-secondary/50 border-border" /></FieldWrap>
        <FieldWrap label="Back Odds"><Input value={backOdds} onChange={e => setBackOdds(e.target.value)} type="number" step="0.01" className="h-10 bg-secondary/50 border-border" /></FieldWrap>
        <FieldWrap label="Lay Odds"><Input value={layOdds} onChange={e => setLayOdds(e.target.value)} type="number" step="0.01" className="h-10 bg-secondary/50 border-border" /></FieldWrap>
        <FieldWrap label="Commission %"><Input value={commission} onChange={e => setCommission(e.target.value)} type="number" step="0.1" className="h-10 bg-secondary/50 border-border" /></FieldWrap>
        <div>
          <Label className="text-xs text-muted-foreground mb-1.5 block">Bet Type</Label>
          <Select value={betType} onValueChange={setBetType}>
            <SelectTrigger className="h-10 bg-secondary/50 border-border"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="normal">Normal Qualifying Bet</SelectItem>
              <SelectItem value="snr">Free Bet (SNR)</SelectItem>
              <SelectItem value="sr">Free Bet (SR)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {result && (
        <div className="glass-card p-6 space-y-4">
          <h3 className="font-display text-sm font-semibold text-muted-foreground uppercase tracking-wider">Results</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <ResultBox label="Lay Stake" value={`£${fmt(result.layStake)}`} />
            <ResultBox label="Lay Liability" value={`£${fmt(result.liability)}`} />
            {betType === "normal" ? (
              <ResultBox label="Qualifying Loss" value={`£${fmt(Math.abs(result.qualLoss))}`} type={result.qualLoss >= 0 ? "profit" : "loss"} />
            ) : (
              <ResultBox label="Free Bet Profit" value={`£${fmt(result.freeBetProfit)}`} type="profit" />
            )}
            <ResultBox label="If Back Wins" value={`${result.backWinPL >= 0 ? "+" : ""}£${fmt(result.backWinPL)}`} type={result.backWinPL >= 0 ? "profit" : "loss"} />
          </div>

          <Explainer>
            <p className="font-medium text-foreground mb-1">Calculation breakdown:</p>
            {betType === "normal" ? (
              <>
                <p>Lay Stake = (£{backStake} × {backOdds}) ÷ ({layOdds} − {commission}%) = £{fmt(result.layStake)}</p>
                <p className="mt-1">Place £{backStake} as a back bet at {backOdds}, then lay £{fmt(result.layStake)} at {layOdds} on the exchange. Your qualifying loss is £{fmt(Math.abs(result.qualLoss))} — this is the cost of unlocking the free bet.</p>
              </>
            ) : betType === "snr" ? (
              <>
                <p>Lay Stake = (£{backStake} × ({backOdds} − 1)) ÷ ({layOdds} − {commission}%) = £{fmt(result.layStake)}</p>
                <p className="mt-1">Use your £{backStake} free bet (stake not returned) at {backOdds}, lay £{fmt(result.layStake)} at {layOdds}. Guaranteed profit: £{fmt(result.freeBetProfit)}.</p>
              </>
            ) : (
              <>
                <p>Lay Stake = (£{backStake} × {backOdds}) ÷ ({layOdds} − {commission}%) = £{fmt(result.layStake)}</p>
                <p className="mt-1">Use your £{backStake} free bet (stake returned) at {backOdds}, lay £{fmt(result.layStake)} at {layOdds}. Guaranteed profit: £{fmt(result.freeBetProfit)}.</p>
              </>
            )}
          </Explainer>
        </div>
      )}
    </div>
  );
};

/* ───────── Tab 2: Each-Way Calculator ───────── */
const EachWayCalc = () => {
  const [stake, setStake] = useState("10");
  const [backOdds, setBackOdds] = useState("5.0");
  const [placeTerms, setPlaceTerms] = useState("1/4");
  const [numPlaces, setNumPlaces] = useState("3");
  const [layWinOdds, setLayWinOdds] = useState("5.2");
  const [layPlaceOdds, setLayPlaceOdds] = useState("2.05");
  const [commission, setCommission] = useState("2");

  const result = useMemo(() => {
    const s = parseFloat(stake) || 0;
    const bo = parseFloat(backOdds) || 0;
    const lwo = parseFloat(layWinOdds) || 0;
    const lpo = parseFloat(layPlaceOdds) || 0;
    const comm = (parseFloat(commission) || 0) / 100;
    const fraction = placeTerms === "1/4" ? 0.25 : placeTerms === "1/5" ? 0.2 : 1 / 6;
    if (!s || bo <= 1 || lwo <= 1 || lpo <= 1) return null;

    const placeOdds = 1 + (bo - 1) * fraction;
    const layWinStake = (s * bo) / (lwo - comm);
    const layPlaceStake = (s * placeOdds) / (lpo - comm);

    // If horse wins (both win & place parts pay out)
    const winBackProfit = s * (bo - 1) + s * (placeOdds - 1);
    const winLayCost = layWinStake * (lwo - 1) + layPlaceStake * (lpo - 1);
    const profitWin = winBackProfit - winLayCost;

    // If horse places only (place part pays, win part loses)
    const placeBackProfit = s * (placeOdds - 1) - s;
    const placeLayGain = layWinStake * (1 - comm) - layPlaceStake * (lpo - 1);
    const profitPlace = placeBackProfit + placeLayGain;

    // If horse loses (both parts lose)
    const loseLayGain = layWinStake * (1 - comm) + layPlaceStake * (1 - comm);
    const profitLose = loseLayGain - s * 2;

    return { layWinStake, layPlaceStake, profitWin, profitPlace, profitLose, placeOdds };
  }, [stake, backOdds, placeTerms, layWinOdds, layPlaceOdds, commission]);

  return (
    <div className="space-y-6">
      <p className="text-sm text-muted-foreground">Calculate lay stakes for each-way bets, which consist of two parts: a win bet and a place bet at a fraction of the odds.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <FieldWrap label="Stake (£ each way)" prefix="£"><Input value={stake} onChange={e => setStake(e.target.value)} type="number" className="h-10 bg-secondary/50 border-border" /></FieldWrap>
        <FieldWrap label="Back Win Odds"><Input value={backOdds} onChange={e => setBackOdds(e.target.value)} type="number" step="0.01" className="h-10 bg-secondary/50 border-border" /></FieldWrap>
        <div>
          <Label className="text-xs text-muted-foreground mb-1.5 block">Place Terms</Label>
          <Select value={placeTerms} onValueChange={setPlaceTerms}>
            <SelectTrigger className="h-10 bg-secondary/50 border-border"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="1/4">1/4 odds</SelectItem>
              <SelectItem value="1/5">1/5 odds</SelectItem>
              <SelectItem value="1/6">1/6 odds</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <FieldWrap label="Number of Places"><Input value={numPlaces} onChange={e => setNumPlaces(e.target.value)} type="number" min="1" max="8" className="h-10 bg-secondary/50 border-border" /></FieldWrap>
        <FieldWrap label="Lay Win Odds"><Input value={layWinOdds} onChange={e => setLayWinOdds(e.target.value)} type="number" step="0.01" className="h-10 bg-secondary/50 border-border" /></FieldWrap>
        <FieldWrap label="Lay Place Odds"><Input value={layPlaceOdds} onChange={e => setLayPlaceOdds(e.target.value)} type="number" step="0.01" className="h-10 bg-secondary/50 border-border" /></FieldWrap>
        <FieldWrap label="Commission %"><Input value={commission} onChange={e => setCommission(e.target.value)} type="number" step="0.1" className="h-10 bg-secondary/50 border-border" /></FieldWrap>
      </div>

      {result && (
        <div className="glass-card p-6 space-y-4">
          <h3 className="font-display text-sm font-semibold text-muted-foreground uppercase tracking-wider">Results</h3>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
            <ResultBox label="Lay Win Stake" value={`£${fmt(result.layWinStake)}`} />
            <ResultBox label="Lay Place Stake" value={`£${fmt(result.layPlaceStake)}`} />
            <ResultBox label="Profit if Wins" value={`${result.profitWin >= 0 ? "+" : ""}£${fmt(result.profitWin)}`} type={result.profitWin >= 0 ? "profit" : "loss"} />
            <ResultBox label="Profit if Places" value={`${result.profitPlace >= 0 ? "+" : ""}£${fmt(result.profitPlace)}`} type={result.profitPlace >= 0 ? "profit" : "loss"} />
            <ResultBox label="Profit if Loses" value={`${result.profitLose >= 0 ? "+" : ""}£${fmt(result.profitLose)}`} type={result.profitLose >= 0 ? "profit" : "loss"} />
          </div>

          <Explainer>
            <p className="font-medium text-foreground mb-1">How each-way works:</p>
            <p>Your £{stake} e/w bet is actually 2 × £{stake} = £{fmt(parseFloat(stake) * 2)} total. The place odds are {fmt(result.placeOdds)} ({placeTerms} of {backOdds}). Lay £{fmt(result.layWinStake)} for the win and £{fmt(result.layPlaceStake)} for the place on the exchange.</p>
          </Explainer>
        </div>
      )}
    </div>
  );
};

/* ───────── Tab 3: Lay Bet Calculator ───────── */
const LayBetCalc = () => {
  const [layOdds, setLayOdds] = useState("3.0");
  const [layStake, setLayStake] = useState("10");
  const [commission, setCommission] = useState("2");

  const result = useMemo(() => {
    const lo = parseFloat(layOdds) || 0;
    const ls = parseFloat(layStake) || 0;
    const comm = (parseFloat(commission) || 0) / 100;
    if (lo <= 1 || !ls) return null;
    const liability = ls * (lo - 1);
    const profitIfLoses = ls * (1 - comm);
    return { liability, profitIfLoses };
  }, [layOdds, layStake, commission]);

  return (
    <div className="space-y-6">
      <p className="text-sm text-muted-foreground">Calculate your liability and potential outcomes for a lay bet on a betting exchange.</p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <FieldWrap label="Lay Odds"><Input value={layOdds} onChange={e => setLayOdds(e.target.value)} type="number" step="0.01" className="h-10 bg-secondary/50 border-border" /></FieldWrap>
        <FieldWrap label="Lay Stake" prefix="£"><Input value={layStake} onChange={e => setLayStake(e.target.value)} type="number" className="h-10 bg-secondary/50 border-border" /></FieldWrap>
        <FieldWrap label="Commission %"><Input value={commission} onChange={e => setCommission(e.target.value)} type="number" step="0.1" className="h-10 bg-secondary/50 border-border" /></FieldWrap>
      </div>

      {result && (
        <div className="glass-card p-6 space-y-4">
          <h3 className="font-display text-sm font-semibold text-muted-foreground uppercase tracking-wider">Results</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <ResultBox label="Liability" value={`£${fmt(result.liability)}`} />
            <ResultBox label="If Selection Loses (You Win)" value={`+£${fmt(result.profitIfLoses)}`} type="profit" />
            <ResultBox label="If Selection Wins (You Lose)" value={`-£${fmt(result.liability)}`} type="loss" />
          </div>

          <Explainer>
            <p className="font-medium text-foreground mb-1">Calculation breakdown:</p>
            <p>Liability = £{layStake} × ({layOdds} − 1) = £{fmt(result.liability)}</p>
            <p>Profit if loses = £{layStake} × (1 − {commission}%) = £{fmt(result.profitIfLoses)}</p>
            <p className="mt-1">You need £{fmt(result.liability)} in your exchange account to place this lay bet. If the selection doesn't win, you profit £{fmt(result.profitIfLoses)} after {commission}% commission.</p>
          </Explainer>
        </div>
      )}
    </div>
  );
};

/* ───────── Tab 4: Accumulator Calculator ───────── */
const AccaCalc = () => {
  const [legs, setLegs] = useState([
    { name: "Man City Win", odds: "1.80" },
    { name: "Liverpool Win", odds: "2.10" },
  ]);
  const [backStake, setBackStake] = useState("10");
  const [layCommission, setLayCommission] = useState("2");

  const addLeg = () => { if (legs.length < 6) setLegs([...legs, { name: `Leg ${legs.length + 1}`, odds: "2.00" }]); };
  const removeLeg = (i: number) => { if (legs.length > 2) setLegs(legs.filter((_, j) => j !== i)); };
  const updateLeg = (i: number, field: "name" | "odds", v: string) => {
    const n = [...legs]; n[i] = { ...n[i], [field]: v }; setLegs(n);
  };

  const result = useMemo(() => {
    const bs = parseFloat(backStake) || 0;
    const comm = (parseFloat(layCommission) || 0) / 100;
    const combinedOdds = legs.reduce((acc, l) => acc * (parseFloat(l.odds) || 1), 1);
    const potentialReturn = bs * combinedOdds;
    const potentialProfit = potentialReturn - bs;
    // Lay the acca: lay stake to cover the combined odds
    const layStake = (bs * combinedOdds) / (combinedOdds - comm);
    const estimatedProfit = layStake * (1 - comm) - bs;
    return { combinedOdds, potentialReturn, potentialProfit, layStake, estimatedProfit };
  }, [legs, backStake, layCommission]);

  return (
    <div className="space-y-6">
      <p className="text-sm text-muted-foreground">Build an accumulator bet with up to 6 legs. See the combined odds, potential return, and required lay stake to lock in profit.</p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-2">
        <FieldWrap label="Back Stake" prefix="£"><Input value={backStake} onChange={e => setBackStake(e.target.value)} type="number" className="h-10 bg-secondary/50 border-border" /></FieldWrap>
        <FieldWrap label="Exchange Commission %"><Input value={layCommission} onChange={e => setLayCommission(e.target.value)} type="number" step="0.1" className="h-10 bg-secondary/50 border-border" /></FieldWrap>
      </div>

      <div className="space-y-3">
        <Label className="text-xs text-muted-foreground uppercase tracking-wider">Legs ({legs.length}/6)</Label>
        {legs.map((leg, i) => (
          <div key={i} className="flex items-center gap-3 bg-secondary/20 rounded-lg p-3 border border-border/50">
            <span className="text-xs font-semibold text-primary w-6 text-center shrink-0">{i + 1}</span>
            <Input value={leg.name} onChange={e => updateLeg(i, "name", e.target.value)} placeholder="Selection name" className="h-9 bg-secondary/50 border-border flex-1" />
            <div className="w-28 shrink-0">
              <Input value={leg.odds} onChange={e => updateLeg(i, "odds", e.target.value)} type="number" step="0.01" placeholder="Odds" className="h-9 bg-secondary/50 border-border" />
            </div>
            {legs.length > 2 && (
              <Button size="icon" variant="ghost" className="h-8 w-8 text-muted-foreground hover:text-destructive shrink-0" onClick={() => removeLeg(i)}>
                <Trash2 size={14} />
              </Button>
            )}
          </div>
        ))}
        {legs.length < 6 && (
          <Button variant="outline" size="sm" className="text-xs gap-1.5 border-border" onClick={addLeg}>
            <Plus size={12} /> Add Leg
          </Button>
        )}
      </div>

      <div className="glass-card p-6 space-y-4">
        <h3 className="font-display text-sm font-semibold text-muted-foreground uppercase tracking-wider">Results</h3>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
          <ResultBox label="Combined Odds" value={fmt(result.combinedOdds)} />
          <ResultBox label="Potential Return" value={`£${fmt(result.potentialReturn)}`} />
          <ResultBox label="Potential Profit" value={`£${fmt(result.potentialProfit)}`} type="profit" />
          <ResultBox label="Required Lay Stake" value={`£${fmt(result.layStake)}`} />
          <ResultBox label="Est. Matched Profit" value={`£${fmt(result.estimatedProfit)}`} type={result.estimatedProfit >= 0 ? "profit" : "loss"} />
        </div>

        <Explainer>
          <p className="font-medium text-foreground mb-1">How acca matching works:</p>
          <p>Your {legs.length}-fold accumulator at combined odds of {fmt(result.combinedOdds)} would return £{fmt(result.potentialReturn)} from a £{backStake} stake. To lock in profit, lay at combined odds on the exchange with a £{fmt(result.layStake)} lay stake.</p>
        </Explainer>
      </div>
    </div>
  );
};

/* ───────── Page ───────── */
const Calculators = () => (
  <DashboardLayout>
    <div className="max-w-5xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
        <div className="mb-6">
          <h1 className="font-display text-2xl font-bold flex items-center gap-2">
            <Calculator size={24} className="text-primary" /> Calculator Suite
          </h1>
          <p className="text-sm text-muted-foreground">Work out exact stakes for any matched betting scenario</p>
        </div>
        <Tabs defaultValue="matched" className="space-y-6">
          <TabsList className="bg-secondary/50 border border-border flex-wrap h-auto gap-1 p-1">
            <TabsTrigger value="matched" className="text-xs sm:text-sm">Matched Bet</TabsTrigger>
            <TabsTrigger value="eachway" className="text-xs sm:text-sm">Each Way</TabsTrigger>
            <TabsTrigger value="lay" className="text-xs sm:text-sm">Lay Bet</TabsTrigger>
            <TabsTrigger value="acca" className="text-xs sm:text-sm">Accumulator</TabsTrigger>
          </TabsList>
          <TabsContent value="matched"><MatchedBetCalc /></TabsContent>
          <TabsContent value="eachway"><EachWayCalc /></TabsContent>
          <TabsContent value="lay"><LayBetCalc /></TabsContent>
          <TabsContent value="acca"><AccaCalc /></TabsContent>
        </Tabs>
      </motion.div>
    </div>
  </DashboardLayout>
);

export default Calculators;
