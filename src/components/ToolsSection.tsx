import { motion } from "framer-motion";
import { Activity, BarChart3, Calculator, Crosshair, TrendingUp, Zap, Gift, Dices } from "lucide-react";

const tools = [
  { icon: Crosshair, name: "OddsMatcher", description: "Real-time odds matching engine scanning thousands of markets across all major bookmakers and exchanges.", tag: "Core" },
  { icon: Activity, name: "Each-Way Matcher", description: "Advanced each way betting system with extra place matching and EV calculations built in.", tag: "Advanced" },
  { icon: TrendingUp, name: "BOG Matcher", description: "Best Odds Guaranteed matcher finding the most profitable horse racing opportunities with BOG offers.", tag: "Core" },
  { icon: Zap, name: "Acca Matcher", description: "Accumulator matching tool to extract value from acca insurance and acca boost promotions.", tag: "Advanced" },
  { icon: Gift, name: "Casino Offers", description: "Curated casino offers with expected value calculations. Low-risk strategies for casino bonuses.", tag: "Premium" },
  { icon: BarChart3, name: "Profit Tracker", description: "Log every bet, track per-bookie performance, and see your running profit with detailed breakdowns.", tag: "Essential" },
];

const ToolsSection = () => {
  return (
    <section id="tools" className="section-padding relative">
      <div className="relative mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-semibold uppercase tracking-wider">Powerful Tools</span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mt-3 mb-4">
            Everything You Need to Profit
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Professional-grade tools built for speed and accuracy. From finding offers to tracking profit.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool, i) => (
            <motion.div
              key={tool.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="glass-card p-6 group hover:border-primary/30 transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <tool.icon size={20} className="text-primary" />
                </div>
                <span className="text-xs font-medium text-muted-foreground border border-border rounded-full px-3 py-1">
                  {tool.tag}
                </span>
              </div>
              <h3 className="font-display text-lg font-semibold mb-2">{tool.name}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{tool.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ToolsSection;
