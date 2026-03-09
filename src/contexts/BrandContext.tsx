import { createContext, useContext, useState, ReactNode } from "react";

export type BrandId = "oddsmonkey" | "outplayed";

interface BrandConfig {
  id: BrandId;
  name: string;
  tagline: string;
  heroHeadline: string;
  heroSubtitle: string;
  badge: string;
  cssClass: string;
}

const brands: Record<BrandId, BrandConfig> = {
  oddsmonkey: {
    id: "oddsmonkey",
    name: "OddsMonkey",
    tagline: "The UK's #1 Matched Betting Platform",
    heroHeadline: "Turn Bookmaker Offers Into Guaranteed Profit",
    heroSubtitle: "OddsMonkey gives you the tools, offers, and guidance to make risk-free profit from matched betting. Join thousands of members earning an extra income every month.",
    badge: "The UK's #1 Matched Betting Platform",
    cssClass: "",
  },
  outplayed: {
    id: "outplayed",
    name: "Outplayed",
    tagline: "Smart Betting. Real Profit.",
    heroHeadline: "Turn Sports Knowledge Into Profit",
    heroSubtitle: "Outplayed gives you powerful tools and daily offers to extract guaranteed profit from bookmaker promotions. Join the smartest community in sports betting.",
    badge: "Smart Betting. Real Profit.",
    cssClass: "brand-outplayed",
  },
};

interface BrandContextValue {
  brand: BrandConfig;
  brandId: BrandId;
  setBrandId: (id: BrandId) => void;
  LogoText: () => JSX.Element;
}

const BrandContext = createContext<BrandContextValue | null>(null);

export const useBrand = () => {
  const ctx = useContext(BrandContext);
  if (!ctx) throw new Error("useBrand must be used within BrandProvider");
  return ctx;
};

export const BrandProvider = ({ children, defaultBrand = "oddsmonkey" }: { children: ReactNode; defaultBrand?: BrandId }) => {
  const [brandId, setBrandId] = useState<BrandId>(defaultBrand);
  const brand = brands[brandId];

  const LogoText = () => {
    if (brandId === "outplayed") {
      return <span className="font-display text-xl font-bold tracking-tight text-gradient">Outplayed</span>;
    }
    return (
      <span className="font-display text-xl font-bold tracking-tight">
        Odds<span className="text-gradient">Monkey</span>
      </span>
    );
  };

  return (
    <BrandContext.Provider value={{ brand, brandId, setBrandId, LogoText }}>
      <div className={brand.cssClass}>
        {children}
      </div>
    </BrandContext.Provider>
  );
};

export { brands };
