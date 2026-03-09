import { ReactNode } from "react";
import { TrendingUp, Star } from "lucide-react";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-screen bg-background flex">
      {/* Left panel — desktop only */}
      <div className="hidden lg:flex lg:w-[480px] xl:w-[520px] shrink-0 flex-col justify-between p-10 xl:p-14 border-r border-border bg-card/50 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,hsl(152_72%_46%/0.06),transparent_60%)]" />

        <div className="relative">
          <a href="/" className="font-display text-xl font-bold tracking-tight">
            Odds<span className="text-gradient">Monkey</span>
          </a>
        </div>

        <div className="relative space-y-8">
          <div className="glass-card p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <TrendingUp size={20} className="text-primary" />
              </div>
              <div>
                <p className="font-display text-2xl font-bold text-gradient">£28M+</p>
                <p className="text-xs text-muted-foreground">Total profit made by members</p>
              </div>
            </div>
          </div>

          <div className="glass-card p-6">
            <div className="flex gap-1 mb-3">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={14} className="fill-primary text-primary" />
              ))}
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              "I made £1,800 in my first month with zero betting experience. The guides and tools make it incredibly straightforward."
            </p>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs font-bold">
                SK
              </div>
              <div>
                <p className="text-sm font-medium">Sarah K.</p>
                <p className="text-xs text-primary">£1,800 first month</p>
              </div>
            </div>
          </div>
        </div>

        <div className="relative">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} OddsMonkey. 18+ only.
          </p>
        </div>
      </div>

      {/* Right panel — form content */}
      <div className="flex-1 flex items-center justify-center p-4 sm:p-8">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="lg:hidden mb-8 text-center">
            <a href="/" className="font-display text-xl font-bold tracking-tight">
              Odds<span className="text-gradient">Monkey</span>
            </a>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
