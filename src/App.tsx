import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index.tsx";
import Register from "./pages/Register.tsx";
import Login from "./pages/Login.tsx";
import ForgotPassword from "./pages/ForgotPassword.tsx";
import VerifyEmail from "./pages/VerifyEmail.tsx";
import Onboarding from "./pages/Onboarding.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import OddsMatcher from "./pages/OddsMatcher.tsx";
import EachWayMatcher from "./pages/EachWayMatcher.tsx";
import Calculators from "./pages/Calculators.tsx";
import ProfitTracker from "./pages/ProfitTracker.tsx";
import GuidesPage from "./pages/GuidesPage.tsx";
import AdminDashboard from "./pages/AdminDashboard.tsx";
import AdminUsers from "./pages/AdminUsers.tsx";
import AdminOffers from "./pages/AdminOffers.tsx";
import AdminContent from "./pages/AdminContent.tsx";
import AdminReports from "./pages/AdminReports.tsx";
import OutplayedLanding from "./pages/OutplayedLanding.tsx";
import BrandDemo from "./pages/BrandDemo.tsx";
import HowItWorksPage from "./pages/HowItWorksPage.tsx";
import WhatIsMatchedBetting from "./pages/WhatIsMatchedBetting.tsx";
import PricingPage from "./pages/PricingPage.tsx";
import TestimonialsPage from "./pages/TestimonialsPage.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/verify-email" element={<VerifyEmail />} />
            <Route path="/onboarding" element={<Onboarding />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard/oddsmatcher" element={<OddsMatcher />} />
            <Route path="/dashboard/eachway" element={<EachWayMatcher />} />
            <Route path="/dashboard/calculators" element={<Calculators />} />
            <Route path="/dashboard/profit-tracker" element={<ProfitTracker />} />
            <Route path="/dashboard/guides" element={<GuidesPage />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/users" element={<AdminUsers />} />
            <Route path="/admin/offers" element={<AdminOffers />} />
            <Route path="/admin/content" element={<AdminContent />} />
            <Route path="/admin/reports" element={<AdminReports />} />
            <Route path="/outplayed" element={<OutplayedLanding />} />
            <Route path="/brand-demo" element={<BrandDemo />} />
            <Route path="/how-it-works" element={<HowItWorksPage />} />
            <Route path="/what-is-matched-betting" element={<WhatIsMatchedBetting />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/testimonials" element={<TestimonialsPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
