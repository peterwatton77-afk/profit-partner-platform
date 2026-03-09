const footerLinks = {
  Product: ["OddsMatcher", "Each Way Pro", "Calculators", "Profit Tracker", "Pricing"],
  Resources: ["Getting Started", "Matched Betting Guide", "Blog", "Community", "FAQs"],
  Company: ["About Us", "Careers", "Contact", "Terms of Service", "Privacy Policy"],
};

const Footer = () => {
  return (
    <footer className="border-t border-border bg-card/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <span className="font-display text-xl font-bold">
              Odds<span className="text-gradient">Monkey</span>
            </span>
            <p className="text-sm text-muted-foreground mt-3 leading-relaxed">
              The UK's most trusted matched betting platform. Making risk-free profit simple since 2014.
            </p>
          </div>
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-display text-sm font-semibold mb-4">{title}</h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                      {link}
                    </a>
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
