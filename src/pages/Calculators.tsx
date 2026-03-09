import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import DashboardLayout from "@/components/DashboardLayout";

const Field = ({ label, value, onChange, placeholder = "0.00" }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string }) => (
  <div>
    <Label className="text-xs text-muted-foreground mb-1.5 block">{label}</Label>
    <Input
      type="number"
      step="0.01"
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="h-10 bg-secondary/50 border-border text-sm"
    />
  </div>
);

const ResultRow = ({ label, value, accent = false }: { label: string; value: string; accent?: boolean }) => (
  <div className="flex items-center justify-between py-2.5 border-b border-border/50 last:border-0">
    <span className="text-sm text-muted-foreground">{label}</span>
    <span className={`text-sm font-semibold ${accent ? "text-primary" : ""}`}>{value}</span>
  </div>
);

const MatchedBetCalc = () => {
  const [backStake, setBackStake] = useState("10");
  const [backOdds, setBackOdds] = useState("3.00");
  const [layOdds, setLayOdds] = useState("3.10");
  const [commission, setCommission] = useState("2");

  const results = useMemo(() => {
    const bs = parseFloat(backStake) || 0;
    const bo = parseFloat(backOdds) || 0;
    const lo = parseFloat(layOdds) || 0;
    const comm = parseFloat(commission) || 0;
    if (!bs || !bo || !lo) return null;

    const layStake = (bs * bo) / (lo - comm / 100);
    const liability = layStake * (lo - 1);
    const backWin = bs * (bo - 1) - layStake * (lo - 1);
    const backLoss = -bs + layStake * (1 - comm / 100);
    const qualLoss = Math.min(backWin, backLoss);
    const profit = bs * (bo - 1) - liability;

    return {
      layStake: `£${layStake.toFixed(2)}`,
      liability: `£${liability.toFixed(2)}`,
      backWin: `£${backWin.toFixed(2)}`,
      backLoss: `£${backLoss.toFixed(2)}`,
      qualLoss: `£${qualLoss.toFixed(2)}`,
      profit: `£${Math.abs(qualLoss).toFixed(2)}`,
    };
  }, [backStake, backOdds, layOdds, commission]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="space-y-4">
        <Field label="Back Stake (£)" value={backStake} onChange={setBackStake} />
        <Field label="Back Odds" value={backOdds} onChange={setBackOdds} />
        <Field label="Lay Odds" value={layOdds} onChange={setLayOdds} />
        <Field label="Exchange Commission (%)" value={commission} onChange={setCommission} placeholder="2" />
      </div>
      <div className="glass-card p-5">
        <h3 className="font-display text-sm font-semibold mb-3">Results</h3>
        {results ? (
          <>
            <ResultRow label="Lay Stake" value={results.layStake} />
            <ResultRow label="Liability" value={results.liability} />
            <ResultRow label="If Back Wins" value={results.backWin} />
            <ResultRow label="If Back Loses" value={results.backLoss} />
            <ResultRow label="Qualifying Loss" value={results.qualLoss} accent />
          </>
        ) : (
          <p className="text-sm text-muted-foreground py-4 text-center">Enter values to see results</p>
        )}
      </div>
    </div>
  );
};

const EachWayCalc = () => {
  const [stake, setStake] = useState("10");
  const [backOdds, setBackOdds] = useState("5.00");
  const [placeOdds, setPlaceOdds] = useState("2.00");
  const [layOdds, setLayOdds] = useState("5.20");
  const [placeLay, setPlaceLay] = useState("2.10");

  const results = useMemo(() => {
    const s = parseFloat(stake) || 0;
    const bo = parseFloat(backOdds) || 0;
    const po = parseFloat(placeOdds) || 0;
    const lo = parseFloat(layOdds) || 0;
    const pl = parseFloat(placeLay) || 0;
    if (!s || !bo || !lo) return null;

    const winLayStake = (s * bo) / lo;
    const placeLayStake = po && pl ? (s * po) / pl : 0;
    const totalStake = s * 2;

    return {
      winLayStake: `£${winLayStake.toFixed(2)}`,
      placeLayStake: `£${placeLayStake.toFixed(2)}`,
      totalBackStake: `£${totalStake.toFixed(2)}`,
    };
  }, [stake, backOdds, placeOdds, layOdds, placeLay]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="space-y-4">
        <Field label="Stake (£, each way)" value={stake} onChange={setStake} />
        <Field label="Back Odds (Win)" value={backOdds} onChange={setBackOdds} />
        <Field label="Place Odds" value={placeOdds} onChange={setPlaceOdds} />
        <Field label="Lay Odds (Win)" value={layOdds} onChange={setLayOdds} />
        <Field label="Lay Odds (Place)" value={placeLay} onChange={setPlaceLay} />
      </div>
      <div className="glass-card p-5">
        <h3 className="font-display text-sm font-semibold mb-3">Results</h3>
        {results ? (
          <>
            <ResultRow label="Total Back Stake" value={results.totalBackStake} />
            <ResultRow label="Win Lay Stake" value={results.winLayStake} />
            <ResultRow label="Place Lay Stake" value={results.placeLayStake} accent />
          </>
        ) : (
          <p className="text-sm text-muted-foreground py-4 text-center">Enter values to see results</p>
        )}
      </div>
    </div>
  );
};

const ArbCalc = () => {
  const [odds1, setOdds1] = useState("2.10");
  const [odds2, setOdds2] = useState("2.05");
  const [totalStake, setTotalStake] = useState("100");

  const results = useMemo(() => {
    const o1 = parseFloat(odds1) || 0;
    const o2 = parseFloat(odds2) || 0;
    const ts = parseFloat(totalStake) || 0;
    if (!o1 || !o2 || !ts) return null;

    const arbPercent = (1 / o1 + 1 / o2) * 100;
    const stake1 = ts * (1 / o1) / (1 / o1 + 1 / o2);
    const stake2 = ts - stake1;
    const profit1 = stake1 * o1 - ts;
    const profit2 = stake2 * o2 - ts;
    const guaranteedProfit = Math.min(profit1, profit2);
    const isArb = arbPercent < 100;

    return {
      arbPercent: `${arbPercent.toFixed(2)}%`,
      stake1: `£${stake1.toFixed(2)}`,
      stake2: `£${stake2.toFixed(2)}`,
      profit: `£${guaranteedProfit.toFixed(2)}`,
      isArb,
    };
  }, [odds1, odds2, totalStake]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="space-y-4">
        <Field label="Odds 1 (Outcome A)" value={odds1} onChange={setOdds1} />
        <Field label="Odds 2 (Outcome B)" value={odds2} onChange={setOdds2} />
        <Field label="Total Stake (£)" value={totalStake} onChange={setTotalStake} />
      </div>
      <div className="glass-card p-5">
        <h3 className="font-display text-sm font-semibold mb-3">Results</h3>
        {results ? (
          <>
            <ResultRow label="Arb %" value={results.arbPercent} />
            <ResultRow label="Stake on Outcome A" value={results.stake1} />
            <ResultRow label="Stake on Outcome B" value={results.stake2} />
            <ResultRow label="Guaranteed Profit" value={results.profit} accent />
            <div className={`mt-3 text-xs text-center py-2 rounded-md ${results.isArb ? "bg-primary/10 text-primary" : "bg-destructive/10 text-destructive"}`}>
              {results.isArb ? "✓ Arbitrage opportunity found!" : "✗ No arbitrage — market is over 100%"}
            </div>
          </>
        ) : (
          <p className="text-sm text-muted-foreground py-4 text-center">Enter values to see results</p>
        )}
      </div>
    </div>
  );
};

const EarlyPayoutCalc = () => {
  const [backStake, setBackStake] = useState("10");
  const [backOdds, setBackOdds] = useState("3.00");
  const [currentOdds, setCurrentOdds] = useState("1.50");

  const results = useMemo(() => {
    const bs = parseFloat(backStake) || 0;
    const bo = parseFloat(backOdds) || 0;
    const co = parseFloat(currentOdds) || 0;
    if (!bs || !bo || !co) return null;

    const potentialReturn = bs * bo;
    const cashoutValue = (bs * bo) / co;
    const profitIfCashout = cashoutValue - bs;

    return {
      potentialReturn: `£${potentialReturn.toFixed(2)}`,
      cashoutValue: `£${cashoutValue.toFixed(2)}`,
      profit: `£${profitIfCashout.toFixed(2)}`,
    };
  }, [backStake, backOdds, currentOdds]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="space-y-4">
        <Field label="Original Stake (£)" value={backStake} onChange={setBackStake} />
        <Field label="Original Odds" value={backOdds} onChange={setBackOdds} />
        <Field label="Current Odds" value={currentOdds} onChange={setCurrentOdds} />
      </div>
      <div className="glass-card p-5">
        <h3 className="font-display text-sm font-semibold mb-3">Results</h3>
        {results ? (
          <>
            <ResultRow label="Potential Return" value={results.potentialReturn} />
            <ResultRow label="Cashout Value" value={results.cashoutValue} />
            <ResultRow label="Profit if Cashed Out" value={results.profit} accent />
          </>
        ) : (
          <p className="text-sm text-muted-foreground py-4 text-center">Enter values to see results</p>
        )}
      </div>
    </div>
  );
};

const Calculators = () => {
  return (
    <DashboardLayout premium>
      <div className="max-w-4xl mx-auto space-y-6">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="font-display text-xl sm:text-2xl font-bold mb-1">Calculator Suite</h1>
          <p className="text-muted-foreground text-sm mb-6">Calculate your stakes and profits in real-time.</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
        >
          <Tabs defaultValue="matched" className="w-full">
            <TabsList className="w-full sm:w-auto bg-secondary/50 border border-border h-10 p-1">
              <TabsTrigger value="matched" className="text-xs data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                Matched Bet
              </TabsTrigger>
              <TabsTrigger value="eachway" className="text-xs data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                Each Way
              </TabsTrigger>
              <TabsTrigger value="arb" className="text-xs data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                Arbitrage
              </TabsTrigger>
              <TabsTrigger value="earlypayout" className="text-xs data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                Early Payout
              </TabsTrigger>
            </TabsList>

            <div className="mt-6">
              <TabsContent value="matched"><MatchedBetCalc /></TabsContent>
              <TabsContent value="eachway"><EachWayCalc /></TabsContent>
              <TabsContent value="arb"><ArbCalc /></TabsContent>
              <TabsContent value="earlypayout"><EarlyPayoutCalc /></TabsContent>
            </div>
          </Tabs>
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default Calculators;
