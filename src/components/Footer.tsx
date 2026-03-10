import { Link } from "react-router-dom";

const footerLinks = {
  Product: [
    { label: "OddsMatcher", href: "/oddsmatcher" },
    { label: "Calculators", href: "/calculators" },
    { label: "Profit Tracker", href: "/profit-tracker" },
    { label: "Pricing", href: "/pricing" },
  ],
  Resources: [
    { label: "How It Works", href: "/how-it-works" },
    { label: "What Is Matched Betting?", href: "/what-is-matched-betting" },
    { label: "Testimonials", href: "/testimonials" },
    { label: "FAQs", href: "/how-it-works" },
  ],
  Company: [
    { label: "About Us", href: "#" },
    { label: "Contact", href: "#" },
    { label: "Terms of Service", href: "#" },
    { label: "Privacy Policy", href: "#" },
  ],
};

const Footer = () => {
  return (
    <footer className="border-t border-border bg-card/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="font-display text-xl font-bold">
              Odds<span className="text-gradient">Monkey</span>
            </Link>
            <p className="text-sm text-muted-foreground mt-3 leading-relaxed">
              The UK's most trusted matched betting platform. Making risk-free profit simple since 2014.
            </p>
          </div>
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-display text-sm font-semibold mb-4">{title}</h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link to={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} OddsMonkey. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            18+ only. Please gamble responsibly.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
