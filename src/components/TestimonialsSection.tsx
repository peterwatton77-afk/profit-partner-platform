import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "James T.",
    profit: "£4,200",
    period: "in 3 months",
    text: "I was sceptical at first, but OddsMonkey made it so easy. The OddsMatcher does all the hard work — I just follow the steps. Absolutely life-changing extra income.",
    avatar: "JT",
  },
  {
    name: "Sarah K.",
    profit: "£1,800",
    period: "first month",
    text: "The guides walked me through everything from scratch. I had zero betting experience and made nearly two grand in my first month. The profit tracker keeps me motivated.",
    avatar: "SK",
  },
  {
    name: "Mark D.",
    profit: "£12,500",
    period: "in 6 months",
    text: "Been matched betting for six months now. Each Way Pro and the racing matcher are incredible tools. This has genuinely replaced my part-time job income.",
    avatar: "MD",
  },
];

const TestimonialsSection = () => {
  return (
    <section id="testimonials" className="section-padding relative">
      <div className="relative mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-semibold uppercase tracking-wider">Testimonials</span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mt-3 mb-4">
            Real Members, Real Profit
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Thousands of people are earning extra income with OddsMonkey every single day.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="glass-card p-6 sm:p-8"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} size={16} className="fill-primary text-primary" />
                ))}
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6">"{t.text}"</p>
              <div className="flex items-center gap-3 pt-4 border-t border-border">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary text-sm font-bold">
                  {t.avatar}
                </div>
                <div>
                  <p className="text-sm font-semibold">{t.name}</p>
                  <p className="text-xs text-primary font-medium">
                    {t.profit} profit {t.period}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
