import {
  LayoutDashboard,
  Crosshair,
  Calculator,
  BarChart3,
  BookOpen,
  Crown,
  Lock,
  Activity,
  TrendingUp,
  Zap,
  Gift,
  User,
} from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

const allNavItems = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard, freeAccess: true },
  { title: "OddsMatcher", url: "/dashboard/oddsmatcher", icon: Crosshair, freeAccess: false },
  { title: "Each-Way Matcher", url: "/dashboard/eachway", icon: Activity, freeAccess: false },
  { title: "Calculators", url: "/dashboard/calculators", icon: Calculator, freeAccess: false },
  { title: "Profit Tracker", url: "/dashboard/profit-tracker", icon: BarChart3, freeAccess: false },
  { title: "Guides", url: "/dashboard/guides", icon: BookOpen, freeAccess: true },
];

export function DashboardSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();
  const navigate = useNavigate();
  const { isPremium, upgrade } = useAuth();

  return (
    <Sidebar collapsible="icon" className="border-r border-border bg-card">
      <SidebarContent className="pt-4">
        <div className={`px-4 mb-4 ${collapsed ? "px-2 text-center" : ""}`}>
          {collapsed ? (
            <span className="font-display text-lg font-bold text-gradient">O</span>
          ) : (
            <a href="/" className="font-display text-lg font-bold tracking-tight">
              Odds<span className="text-gradient">Monkey</span>
            </a>
          )}
        </div>

        <SidebarGroup>
          <SidebarGroupLabel className="text-xs text-muted-foreground uppercase tracking-wider">
            {!collapsed && "Tools"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {allNavItems.map((item) => {
                const isLocked = !isPremium && !item.freeAccess;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      {isLocked ? (
                        <div
                          className="flex items-center gap-2 px-3 py-2 text-muted-foreground/50 cursor-not-allowed rounded-md"
                          title={`${item.title} — Premium only`}
                        >
                          <item.icon className="h-4 w-4 shrink-0" />
                          {!collapsed && (
                            <>
                              <span className="flex-1">{item.title}</span>
                              <Lock className="h-3 w-3 text-muted-foreground/40" />
                            </>
                          )}
                        </div>
                      ) : (
                        <NavLink
                          to={item.url}
                          end={item.url === "/dashboard"}
                          className="flex items-center gap-2 px-3 py-2 rounded-md text-muted-foreground hover:bg-muted/50 hover:text-foreground transition-colors"
                          activeClassName="bg-primary/10 text-primary font-medium"
                        >
                          <item.icon className="h-4 w-4 shrink-0" />
                          {!collapsed && <span>{item.title}</span>}
                        </NavLink>
                      )}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-3">
        {!isPremium ? (
          <>
            {!collapsed ? (
              <Button
                onClick={upgrade}
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold gap-2 h-10"
              >
                <Crown size={16} />
                Upgrade to Premium
              </Button>
            ) : (
              <Button
                size="icon"
                onClick={upgrade}
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
              >
                <Crown size={16} />
              </Button>
            )}
          </>
        ) : (
          !collapsed && (
            <div className="flex items-center gap-2 px-2 py-1">
              <Crown size={14} className="text-primary" />
              <span className="text-xs text-primary font-semibold">Premium Active</span>
            </div>
          )
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
