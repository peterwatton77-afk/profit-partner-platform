import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useLocation } from "react-router-dom";

export type BrandId = "oddsmonkey" | "outplayed";

interface BrandConfig {
  id: BrandId;
  name: string;
  logoText: string;
  tagline: string;
  heroHeadline: string;
  heroSubtitle: string;
  badge: string;
  cssClass: string;
  members: string;
  avgProfit: string;
  totalProfit: string;
  homeRoute: string;
  dashboardRoute: string;
}

const brands: Record<BrandId, BrandConfig> = {
  oddsmonkey: {
    id: "oddsmonkey",
    name: "OddsMonkey",
    logoText: "OddsMonkey",
    tagline: "The UK's #1 Matched Betting Platform",
    heroHeadline: "Turn Bookmaker Offers Into Guaranteed Profit",
    heroSubtitle: "OddsMonkey gives you the tools, offers, and guidance to make risk-free profit from matched betting. Join thousands of members earning an extra income every month.",
    badge: "The UK's #1 Matched Betting Platform",
    cssClass: "",
    members: "45,000+",
    avgProfit: "£1,500+",
    totalProfit: "£28M+",
    homeRoute: "/",
    dashboardRoute: "/dashboard",
  },
  outplayed: {
    id: "outplayed",
    name: "Outplayed",
    logoText: "Outplayed",
    tagline: "Smart Betting for Sports Fans",
    heroHeadline: "Beat the Bookies, Keep the Profits",
    heroSubtitle: "Outplayed gives you the edge with smart matched betting tools and sports offers. Join the smartest community in sports betting.",
    badge: "Smart Betting for Sports Fans",
    cssClass: "brand-outplayed",
    members: "28,000+",
    avgProfit: "£1,200+",
    totalProfit: "£18M+",
    homeRoute: "/outplayed",
    dashboardRoute: "/outplayed/dashboard",
  },
};

interface BrandContextValue {
  brand: BrandConfig;
  brandId: BrandId;
  setBrandId: (id: BrandId) => void;
  otherBrand: BrandConfig;
}

const BrandContext = createContext<BrandContextValue | null>(null);

export const useBrand = () => {
  const ctx = useContext(BrandContext);
  if (!ctx) throw new Error("useBrand must be used within BrandProvider");
  return ctx;
};

/** Detects brand from URL or accepts explicit override */
export const BrandProvider = ({
  children,
  defaultBrand,
}: {
  children: ReactNode;
  defaultBrand?: BrandId;
}) => {
  const location = useLocation();

  const detectBrand = (): BrandId => {
    if (defaultBrand) return defaultBrand;
    return location.pathname.startsWith("/outplayed") ? "outplayed" : "oddsmonkey";
  };

  const [brandId, setBrandId] = useState<BrandId>(detectBrand);

  useEffect(() => {
    if (!defaultBrand) {
      setBrandId(location.pathname.startsWith("/outplayed") ? "outplayed" : "oddsmonkey");
    }
  }, [location.pathname, defaultBrand]);

  const brand = brands[brandId];
  const otherBrand = brands[brandId === "oddsmonkey" ? "outplayed" : "oddsmonkey"];

  return (
    <BrandContext.Provider value={{ brand, brandId, setBrandId, otherBrand }}>
      <div className={brand.cssClass}>
        {children}
      </div>
    </BrandContext.Provider>
  );
};

export { brands };
