import { motion } from "framer-motion";
import { Search, Calculator, ArrowLeftRight, PoundSterling, ChevronDown, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";

const steps = [
  { icon: Search, number: "1", title: "Find an Offer", description: "Use OddsMatcher to scan thousands of bookmaker promotions and find the most profitable offers. Our engine updates in real-time so you always get the best opportunities." },
  { icon: Calculator, number: "2", title: "Place a Back Bet", description: "Place your qualifying bet at the bookmaker. Our calculators tell you exactly how much to stake. Follow the simple instructions — no guesswork needed." },
  { icon: ArrowLeftRight, number: "3", title: "Place a Lay Bet", description: "Cover your back bet by laying the same outcome on a betting exchange like Betfair or Smarkets. This removes all risk from the equation." },
  { icon: PoundSterling, number: "4", title: "Pocket the Profit", description: "No matter the result, you lock in a guaranteed profit from the bookmaker's free bet. Withdraw your winnings and move on to the next offer." },
];

const faqs = [
  { q: "Is matched betting legal?", a: "Yes, 100%. Matched betting is completely legal in the UK. You're simply taking advantage of bookmaker promotions — it's maths, not gambling." },
  { q: "How much can I earn?", a: "Most members earn £500-£1,500 in their first month. Experienced members regularly make £1,000-£2,000+ per month from reload offers alone." },
  { q: "Do I need betting experience?", a: "No! Our step-by-step guides and tools walk you through everything. Most of our top earners had zero betting experience when they started." },
  { q: "How much money do I need to start?", a: "We recommend starting with a float of around £50-£100. This gets recycled through offers, so you don't need a large bankroll." },
  { q: "Can I lose money?", a: "When you follow our tools and guides correctly, matched betting is risk-free. You cover all outcomes, so there's no chance of losing. Mistakes can happen, so always double-check your stakes." },
  { q: "How long does it take?", a: "Most offers take 10-20 minutes to complete. You can fit matched betting around your existing schedule — many members do it during lunch breaks or evenings." },
];

const HowItWorksPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-16">
        {/* Hero */}
        <section className="section-padding text-center">
          <div className="mx-auto max-w-3xl">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
                How <span className="text-gradient">Matched Betting</span> Works
              </h1>
              <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
                A simple, proven method to turn bookmaker offers into guaranteed profit. No risk, no gambling — just maths.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Video Placeholder */}
        <section className="px-4 sm:px-6 lg:px-8 pb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mx-auto max-w-4xl glass-card aspect-video flex items-center justify-center relative overflow-hidden group cursor-pointer"
          >
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--primary)/0.08),transparent_60%)]" />
            <div className="relative flex flex-col items-center gap-4">
              <div className="w-20 h-20 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <Play size={32} className="text-primary ml-1" />
              </div>
              <p className="text-muted-foreground font-medium">Watch: How Matched Betting Works (3 mins)</p>
            </div>
          </motion.div>
        </section>

        {/* Steps */}
        <section className="section-padding">
          <div className="mx-auto max-w-5xl space-y-8">
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="glass-card p-8 flex flex-col sm:flex-row items-start gap-6"
              >
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <step.icon size={24} className="text-primary" />
                </div>
                <div>
                  <span className="text-primary text-sm font-semibold">Step {step.number}</span>
                  <h3 className="font-display text-xl font-bold mt-1 mb-2">{step.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="section-padding">
          <div className="mx-auto max-w-3xl">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
              <h2 className="font-display text-3xl sm:text-4xl font-bold">Frequently Asked Questions</h2>
            </motion.div>
            <Accordion type="single" collapsible className="space-y-3">
              {faqs.map((faq, i) => (
                <AccordionItem key={i} value={`faq-${i}`} className="glass-card px-6 border rounded-xl">
                  <AccordionTrigger className="text-left font-display font-semibold text-sm sm:text-base hover:no-underline py-5">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-sm leading-relaxed pb-5">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* CTA */}
        <section className="section-padding text-center">
          <div className="mx-auto max-w-2xl">
            <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">Ready to Start Earning?</h2>
            <p className="text-muted-foreground mb-8">Join 45,000+ members making risk-free profit every month.</p>
            <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold gap-2 h-12 px-8" asChild>
              <Link to="/register">Start Free Today</Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default HowItWorksPage;
