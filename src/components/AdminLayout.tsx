import { ReactNode } from "react";
import { NavLink } from "@/components/NavLink";
import { LayoutDashboard, Users, CreditCard, Gift, Wrench, FileText, BarChart3, LogOut, Shield, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const adminNav = [
  { title: "Dashboard", url: "/admin", icon: LayoutDashboard },
  { title: "Users", url: "/admin/users", icon: Users },
  { title: "Subscriptions", url: "/admin/subscriptions", icon: CreditCard },
  { title: "Offers", url: "/admin/offers", icon: Gift },
  { title: "Tools", url: "/admin/tools", icon: Wrench },
  { title: "Content", url: "/admin/content", icon: FileText },
  { title: "Reports", url: "/admin/reports", icon: BarChart3 },
];

const AdminLayout = ({ children }: { children: ReactNode }) => {
  const { isAdmin, user, logout } = useAuth();
  const navigate = useNavigate();

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center glass-card p-10 max-w-md mx-4">
          <ShieldAlert size={48} className="text-destructive mx-auto mb-4" />
          <h1 className="font-display text-2xl font-bold mb-2">Access Denied</h1>
          <p className="text-sm text-muted-foreground mb-6">You don't have permission to access the admin panel. Please log in with an admin account.</p>
          <p className="text-xs text-muted-foreground mb-4">Hint: use admin@oddsmonkey.com</p>
          <Button onClick={() => navigate("/login")} className="bg-primary text-primary-foreground hover:bg-primary/90">Go to Login</Button>
        </div>
      </div>
    );
  }

  const handleLogout = () => { logout(); navigate("/"); };

  return (
    <div className="min-h-screen flex admin-theme">
      {/* Sidebar */}
      <aside className="w-60 shrink-0 bg-[hsl(0_20%_10%)] border-r border-[hsl(0_15%_18%)] flex flex-col">
        <div className="px-5 py-5 border-b border-[hsl(0_15%_18%)]">
          <div className="flex items-center gap-2">
            <Shield size={18} className="text-[hsl(0_72%_55%)]" />
            <span className="font-display text-sm font-bold tracking-tight text-[hsl(0_0%_92%)]">
              OddsMonkey <span className="text-[hsl(0_72%_55%)]">Admin</span>
            </span>
          </div>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1">
          {adminNav.map((item) => (
            <NavLink
              key={item.url}
              to={item.url}
              end={item.url === "/admin"}
              className="flex items-center gap-2.5 px-3 py-2 rounded-md text-xs text-[hsl(0_0%_60%)] hover:text-[hsl(0_0%_90%)] hover:bg-[hsl(0_15%_15%)] transition-colors"
              activeClassName="bg-[hsl(0_72%_55%)/0.12] text-[hsl(0_72%_55%)] font-medium"
            >
              <item.icon size={15} />
              {item.title}
            </NavLink>
          ))}
        </nav>

        <div className="px-4 py-4 border-t border-[hsl(0_15%_18%)]">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-7 h-7 rounded-full bg-[hsl(0_72%_55%)/0.15] flex items-center justify-center text-[10px] font-bold text-[hsl(0_72%_55%)]">A</div>
            <div className="min-w-0">
              <p className="text-xs font-medium text-[hsl(0_0%_90%)] truncate">{user?.name}</p>
              <p className="text-[10px] text-[hsl(0_0%_50%)] truncate">{user?.email}</p>
            </div>
          </div>
          <Button variant="ghost" size="sm" className="w-full justify-start gap-2 text-[hsl(0_0%_50%)] hover:text-[hsl(0_0%_90%)] hover:bg-[hsl(0_15%_15%)] text-xs h-8" onClick={handleLogout}>
            <LogOut size={13} /> Logout
          </Button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 bg-background overflow-auto">
        <div className="p-6 lg:p-8 max-w-7xl mx-auto">{children}</div>
      </main>
    </div>
  );
};

export default AdminLayout;
