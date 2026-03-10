import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";

const testimonials = [
  { name: "James T.", avatar: "JT", profit: "£4,200", period: "in 3 months", location: "Manchester", text: "I was sceptical at first, but OddsMonkey made it so easy. The OddsMatcher does all the hard work — I just follow the steps. Absolutely life-changing extra income." },
  { name: "Sarah K.", avatar: "SK", profit: "£1,800", period: "first month", location: "London", text: "The guides walked me through everything from scratch. I had zero betting experience and made nearly two grand in my first month. The profit tracker keeps me motivated." },
  { name: "Mark D.", avatar: "MD", profit: "£12,500", period: "in 6 months", location: "Bristol", text: "Been matched betting for six months now. Each Way Pro and the racing matcher are incredible tools. This has genuinely replaced my part-time job income." },
  { name: "Emma W.", avatar: "EW", profit: "£2,400", period: "in 2 months", location: "Leeds", text: "As a uni student, this has been a game changer. I do it between lectures and make more than most part-time jobs. The calculator tools make everything foolproof." },
  { name: "David R.", avatar: "DR", profit: "£8,900", period: "in 4 months", location: "Birmingham", text: "The reload offers keep the profit coming month after month. I was worried it would dry up but there are always new offers. The community is brilliant too." },
  { name: "Lisa M.", avatar: "LM", profit: "£950", period: "first month", location: "Edinburgh", text: "I started with absolutely no knowledge of betting. The step-by-step guides held my hand through every single bet. Made nearly a grand in my first month — incredible." },
  { name: "Tom H.", avatar: "TH", profit: "£15,200", period: "in 8 months", location: "Cardiff", text: "I've been doing this for eight months now and it's consistently profitable. OddsMonkey's tools are head and shoulders above anything else. Worth every penny of Premium." },
  { name: "Rachel B.", avatar: "RB", profit: "£3,100", period: "in 6 weeks", location: "Nottingham", text: "My partner thought I was mad when I said I was going to make money from betting. Six weeks later, I've proved them wrong. OddsMonkey is the real deal." },
  { name: "Chris P.", avatar: "CP", profit: "£6,750", period: "in 5 months", location: "Liverpool", text: "The casino offers alone have made me thousands. OddsMonkey finds opportunities I would never spot on my own. Best investment I've ever made." },
  { name: "Hannah S.", avatar: "HS", profit: "£1,200", period: "in 3 weeks", location: "Brighton", text: "Three weeks in and I've already made over a grand. The sign-up offers are incredibly lucrative. I only wish I'd started sooner." },
];

const TestimonialsPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-16">
        <section className="section-padding text-center">
          <div className="mx-auto max-w-3xl">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <span className="text-primary text-sm font-semibold uppercase tracking-wider">Testimonials</span>
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold mt-3 mb-6">
                Real Members, <span className="text-gradient">Real Profit</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Don't just take our word for it. Here's what our members have to say about their matched betting journey.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="px-4 sm:px-6 lg:px-8 pb-20">
          <div className="mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (i % 3) * 0.1, duration: 0.5 }}
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
                    <p className="text-xs text-primary font-medium">{t.profit} profit {t.period}</p>
                    <p className="text-xs text-muted-foreground">{t.location}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="section-padding text-center">
          <div className="mx-auto max-w-2xl">
            <h2 className="font-display text-3xl font-bold mb-4">Join Our Success Stories</h2>
            <p className="text-muted-foreground mb-8">Start your matched betting journey today and see the results for yourself.</p>
            <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold h-12 px-8" asChild>
              <Link to="/register">Start Free Today</Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default TestimonialsPage;
