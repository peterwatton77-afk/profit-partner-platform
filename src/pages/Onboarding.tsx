import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { ArrowRight, ArrowLeft, Zap, BookOpen, Target, Gift, CheckCircle } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const offers = [
  { bookmaker: "Bet365", offer: "Bet £10 Get £30 Free Bets", profit: "~£25" },
  { bookmaker: "William Hill", offer: "Bet £10 Get £30", profit: "~£24" },
  { bookmaker: "Paddy Power", offer: "Bet £20 Get £20 Free", profit: "~£16" },
  { bookmaker: "Betfair", offer: "Bet £10 Get £30", profit: "~£25" },
];

const Onboarding = () => {
  const [step, setStep] = useState(0);
  const [goal, setGoal] = useState([500]);
  const [selectedOffer, setSelectedOffer] = useState<number | null>(null);
  const navigate = useNavigate();

  const next = () => {
    if (step < 3) setStep(step + 1);
    else navigate("/dashboard");
  };

  const prev = () => {
    if (step > 0) setStep(step - 1);
  };

  const steps = [
    // Step 1: Welcome
    <div className="text-center" key="welcome">
      <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
        <Zap size={32} className="text-primary" />
      </div>
      <h2 className="font-display text-2xl sm:text-3xl font-bold mb-3">Welcome to OddsMonkey!</h2>
      <p className="text-muted-foreground max-w-md mx-auto mb-8">
        You're about to discover how thousands of people earn an extra income every month through matched betting. Here's what to expect:
      </p>
      <div className="glass-card p-6 text-left space-y-4 max-w-md mx-auto">
        <div className="flex items-start gap-3">
          <CheckCircle size={18} className="text-primary shrink-0 mt-0.5" />
          <p className="text-sm"><span className="font-medium text-foreground">Risk-free profit</span> — it's maths, not gambling</p>
        </div>
        <div className="flex items-start gap-3">
          <CheckCircle size={18} className="text-primary shrink-0 mt-0.5" />
          <p className="text-sm"><span className="font-medium text-foreground">Step-by-step guides</span> — we walk you through everything</p>
        </div>
        <div className="flex items-start gap-3">
          <CheckCircle size={18} className="text-primary shrink-0 mt-0.5" />
          <p className="text-sm"><span className="font-medium text-foreground">Powerful tools</span> — OddsMatcher, calculators, profit tracker</p>
        </div>
      </div>
    </div>,

    // Step 2: How it works
    <div className="text-center" key="how">
      <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
        <BookOpen size={32} className="text-primary" />
      </div>
      <h2 className="font-display text-2xl sm:text-3xl font-bold mb-3">How Matched Betting Works</h2>
      <p className="text-muted-foreground max-w-md mx-auto mb-8">
        In a nutshell: bookmakers offer free bets. We show you how to convert them into guaranteed cash.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-lg mx-auto">
        {[
          { n: "1", title: "Back", desc: "Bet on an outcome at the bookmaker" },
          { n: "2", title: "Lay", desc: "Cover it at a betting exchange" },
          { n: "3", title: "Profit", desc: "Keep the guaranteed profit" },
        ].map((s) => (
          <div key={s.n} className="glass-card p-5 text-center">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
              <span className="font-display font-bold text-primary">{s.n}</span>
            </div>
            <p className="font-display text-sm font-semibold mb-1">{s.title}</p>
            <p className="text-xs text-muted-foreground">{s.desc}</p>
          </div>
        ))}
      </div>
    </div>,

    // Step 3: Goal setting
    <div className="text-center" key="goal">
      <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
        <Target size={32} className="text-primary" />
      </div>
      <h2 className="font-display text-2xl sm:text-3xl font-bold mb-3">Set Your Profit Goal</h2>
      <p className="text-muted-foreground max-w-md mx-auto mb-8">
        How much extra income would you like to earn per month? This helps us personalise your experience.
      </p>
      <div className="max-w-md mx-auto glass-card p-8">
        <p className="text-gradient font-display text-4xl font-bold mb-6">£{goal[0].toLocaleString()}/month</p>
        <Slider
          value={goal}
          onValueChange={setGoal}
          min={100}
          max={2000}
          step={50}
          className="mb-4"
        />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>£100</span>
          <span>£2,000</span>
        </div>
      </div>
    </div>,

    // Step 4: First offer
    <div className="text-center" key="offer">
      <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
        <Gift size={32} className="text-primary" />
      </div>
      <h2 className="font-display text-2xl sm:text-3xl font-bold mb-3">Choose Your First Offer</h2>
      <p className="text-muted-foreground max-w-md mx-auto mb-8">
        Pick an offer to try first. We'll guide you through every step.
      </p>
      <div className="space-y-3 max-w-md mx-auto">
        {offers.map((o, i) => (
          <button
            key={o.bookmaker}
            onClick={() => setSelectedOffer(i)}
            className={`w-full glass-card p-4 text-left flex items-center justify-between transition-colors ${selectedOffer === i ? "border-primary glow-border" : "hover:border-primary/30"}`}
          >
            <div>
              <p className="font-display text-sm font-semibold">{o.bookmaker}</p>
              <p className="text-xs text-muted-foreground">{o.offer}</p>
            </div>
            <span className="text-primary font-display font-bold text-sm">{o.profit}</span>
          </button>
        ))}
      </div>
    </div>,
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Progress bar */}
      <div className="h-1 bg-muted">
        <div className="h-full bg-primary transition-all duration-500" style={{ width: `${((step + 1) / 4) * 100}%` }} />
      </div>

      {/* Header */}
      <div className="px-4 sm:px-6 py-4 flex items-center justify-between">
        <a href="/" className="font-display text-lg font-bold tracking-tight">
          Odds<span className="text-gradient">Monkey</span>
        </a>
        <span className="text-xs text-muted-foreground">Step {step + 1} of 4</span>
      </div>

      {/* Content */}
      <div className="flex-1 flex items-center justify-center p-4 sm:p-8">
        <div className="w-full max-w-xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {steps[step]}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Footer nav */}
      <div className="px-4 sm:px-6 py-6 flex items-center justify-between max-w-xl mx-auto w-full">
        <Button
          variant="ghost"
          onClick={prev}
          disabled={step === 0}
          className="text-muted-foreground gap-1"
        >
          <ArrowLeft size={16} /> Back
        </Button>
        <Button
          onClick={next}
          className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold gap-2 px-8"
        >
          {step === 3 ? "Go to Dashboard" : "Continue"} <ArrowRight size={16} />
        </Button>
      </div>
    </div>
  );
};

export default Onboarding;
