import { ReactNode } from "react";
import { NavLink } from "@/components/NavLink";
import { LayoutDashboard, Users, FileText, BarChart3, LogOut, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";

const adminNav = [
  { title: "Dashboard", url: "/admin", icon: LayoutDashboard },
  { title: "Users", url: "/admin/users", icon: Users },
  { title: "Content", url: "/admin/content", icon: FileText },
  { title: "Reports", url: "/admin/reports", icon: BarChart3 },
];

const AdminLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Top nav */}
      <header className="h-14 border-b border-border bg-card/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="h-full max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Shield size={18} className="text-primary" />
              <span className="font-display text-sm font-bold tracking-tight">
                Odds<span className="text-gradient">Monkey</span>
                <span className="text-muted-foreground font-normal ml-1.5 text-xs">Admin</span>
              </span>
            </div>

            <nav className="hidden md:flex items-center gap-1">
              {adminNav.map((item) => (
                <NavLink
                  key={item.url}
                  to={item.url}
                  end={item.url === "/admin"}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
                  activeClassName="bg-primary/10 text-primary font-medium"
                >
                  <item.icon size={14} />
                  {item.title}
                </NavLink>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs text-muted-foreground hidden sm:block">Admin User</span>
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground gap-1.5 text-xs h-8">
              <LogOut size={14} />
              <span className="hidden sm:inline">Logout</span>
            </Button>
          </div>
        </div>

        {/* Mobile nav */}
        <div className="md:hidden border-t border-border bg-card/80 flex overflow-x-auto px-2 py-1.5 gap-1">
          {adminNav.map((item) => (
            <NavLink
              key={item.url}
              to={item.url}
              end={item.url === "/admin"}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs text-muted-foreground whitespace-nowrap hover:text-foreground transition-colors"
              activeClassName="bg-primary/10 text-primary font-medium"
            >
              <item.icon size={14} />
              {item.title}
            </NavLink>
          ))}
        </div>
      </header>

      <main className="flex-1 p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">{children}</div>
      </main>
    </div>
  );
};

export default AdminLayout;
