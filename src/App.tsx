import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import Register from "./pages/Register.tsx";
import Login from "./pages/Login.tsx";
import ForgotPassword from "./pages/ForgotPassword.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import MemberDashboard from "./pages/MemberDashboard.tsx";
import OddsMatcher from "./pages/OddsMatcher.tsx";
import Calculators from "./pages/Calculators.tsx";
import ProfitTracker from "./pages/ProfitTracker.tsx";
import AdminDashboard from "./pages/AdminDashboard.tsx";
import AdminUsers from "./pages/AdminUsers.tsx";
import AdminContent from "./pages/AdminContent.tsx";
import AdminReports from "./pages/AdminReports.tsx";
import OutplayedLanding from "./pages/OutplayedLanding.tsx";
import BrandDemo from "./pages/BrandDemo.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/member-dashboard" element={<MemberDashboard />} />
          <Route path="/oddsmatcher" element={<OddsMatcher />} />
          <Route path="/calculators" element={<Calculators />} />
          <Route path="/profit-tracker" element={<ProfitTracker />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/users" element={<AdminUsers />} />
          <Route path="/admin/content" element={<AdminContent />} />
          <Route path="/admin/reports" element={<AdminReports />} />
          <Route path="/outplayed" element={<OutplayedLanding />} />
          <Route path="/brand-demo" element={<BrandDemo />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
