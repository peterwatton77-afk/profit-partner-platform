import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Users, CreditCard, UserX, UserPlus, Megaphone, BarChart3, Settings } from "lucide-react";
import AdminLayout from "@/components/AdminLayout";
import { Link } from "react-router-dom";

const stats = [
  { label: "Total Members", value: "45,230", icon: Users, change: "+312 this week" },
  { label: "Active Subscriptions", value: "18,940", icon: CreditCard, change: "+89 this week" },
  { label: "Free Users", value: "24,180", icon: UserPlus, change: "+198 this week" },
  { label: "Churned This Month", value: "142", icon: UserX, change: "1.2% rate" },
];

const recentRegistrations = [
  { name: "Emma Thompson", email: "emma.t@gmail.com", joined: "09 Mar 2026", plan: "Free", status: "Active" },
  { name: "James Wilson", email: "jwilson@outlook.com", joined: "09 Mar 2026", plan: "Trial", status: "Active" },
  { name: "Sophie Chen", email: "sophie.chen@yahoo.com", joined: "08 Mar 2026", plan: "Premium", status: "Active" },
  { name: "Oliver Brown", email: "o.brown@gmail.com", joined: "08 Mar 2026", plan: "Free", status: "Active" },
  { name: "Charlotte Davis", email: "cdavis@hotmail.com", joined: "07 Mar 2026", plan: "Trial", status: "Pending" },
];

const planColors: Record<string, string> = {
  Free: "bg-muted text-muted-foreground",
  Trial: "bg-amber-500/10 text-amber-400",
  Premium: "bg-primary/10 text-primary",
};

const quickActions = [
  { label: "Add Announcement", icon: Megaphone, url: "/admin/content" },
  { label: "View Reports", icon: BarChart3, url: "/admin/reports" },
  { label: "Manage Users", icon: Settings, url: "/admin/users" },
];

const AdminDashboard = () => {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="font-display text-xl sm:text-2xl font-bold mb-1">Admin Dashboard</h1>
          <p className="text-muted-foreground text-sm">Platform overview and quick actions.</p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {stats.map((s, i) => (
            <div key={i} className="glass-card p-5">
              <div className="flex items-center gap-2 mb-2">
                <s.icon size={16} className="text-muted-foreground" />
                <span className="text-xs text-muted-foreground">{s.label}</span>
              </div>
              <p className="font-display text-xl sm:text-2xl font-bold">{s.value}</p>
              <p className="text-[10px] text-muted-foreground mt-1">{s.change}</p>
            </div>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Registrations */}
          <motion.div
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="lg:col-span-2 glass-card overflow-hidden"
          >
            <div className="px-6 py-4 border-b border-border">
              <h3 className="font-display text-sm font-semibold">Recent Registrations</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border text-xs text-muted-foreground">
                    <th className="text-left py-3 px-6 font-medium">Name</th>
                    <th className="text-left py-3 px-4 font-medium hidden sm:table-cell">Email</th>
                    <th className="text-left py-3 px-4 font-medium hidden md:table-cell">Joined</th>
                    <th className="text-center py-3 px-4 font-medium">Plan</th>
                    <th className="text-center py-3 px-6 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentRegistrations.map((u, i) => (
                    <tr key={i} className="border-b border-border/50 last:border-0">
                      <td className="py-2.5 px-6 text-xs font-medium">{u.name}</td>
                      <td className="py-2.5 px-4 text-xs text-muted-foreground hidden sm:table-cell">{u.email}</td>
                      <td className="py-2.5 px-4 text-xs text-muted-foreground hidden md:table-cell">{u.joined}</td>
                      <td className="py-2.5 px-4 text-center">
                        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${planColors[u.plan]}`}>{u.plan}</span>
                      </td>
                      <td className="py-2.5 px-6 text-center">
                        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${u.status === "Active" ? "bg-primary/10 text-primary" : "bg-amber-500/10 text-amber-400"}`}>{u.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
            className="glass-card p-6"
          >
            <h3 className="font-display text-sm font-semibold mb-4">Quick Actions</h3>
            <div className="space-y-3">
              {quickActions.map((a, i) => (
                <Button
                  key={i}
                  variant="outline"
                  className="w-full justify-start gap-3 h-11 border-border text-foreground hover:bg-primary/5 hover:text-primary hover:border-primary/30 text-xs"
                  asChild
                >
                  <Link to={a.url}>
                    <a.icon size={16} />
                    {a.label}
                  </Link>
                </Button>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
