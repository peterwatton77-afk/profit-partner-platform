import { motion } from "framer-motion";
import { Users, CreditCard, DollarSign, TrendingDown, UserPlus, Activity } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import AdminLayout from "@/components/AdminLayout";

const stats = [
  { label: "Total Users", value: "45,234", icon: Users, change: "+312 this week", color: "text-primary" },
  { label: "Premium Members", value: "12,891", icon: CreditCard, change: "+89 this month", color: "text-primary" },
  { label: "Monthly Revenue", value: "£231,000", icon: DollarSign, change: "+8.2% vs last month", color: "text-primary" },
  { label: "Churn Rate", value: "2.3%", icon: TrendingDown, change: "-0.4% improvement", color: "text-amber-400" },
  { label: "New Signups (Month)", value: "1,247", icon: UserPlus, change: "+18% vs last month", color: "text-primary" },
  { label: "Active Today", value: "3,429", icon: Activity, change: "7.6% of total", color: "text-primary" },
];

const growthData = [
  { month: "Oct", users: 38200 },
  { month: "Nov", users: 39800 },
  { month: "Dec", users: 41100 },
  { month: "Jan", users: 42500 },
  { month: "Feb", users: 43900 },
  { month: "Mar", users: 45234 },
];

const AdminDashboard = () => (
  <AdminLayout>
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-display text-xl sm:text-2xl font-bold mb-1">Admin Dashboard</h1>
        <p className="text-muted-foreground text-sm">Platform overview and key metrics.</p>
      </motion.div>

      {/* Stats */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {stats.map((s, i) => (
          <div key={i} className="glass-card p-5">
            <div className="flex items-center gap-2 mb-2">
              <s.icon size={16} className="text-muted-foreground" />
              <span className="text-xs text-muted-foreground">{s.label}</span>
            </div>
            <p className={`font-display text-xl sm:text-2xl font-bold ${s.color}`}>{s.value}</p>
            <p className="text-[10px] text-muted-foreground mt-1">{s.change}</p>
          </div>
        ))}
      </motion.div>

      {/* User Growth Chart */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card p-6">
        <h3 className="font-display text-sm font-semibold mb-4">User Growth (6 Months)</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={growthData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 14% 18%)" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: "hsl(220 10% 55%)" }} stroke="hsl(220 14% 18%)" />
              <YAxis tick={{ fontSize: 11, fill: "hsl(220 10% 55%)" }} stroke="hsl(220 14% 18%)" tickFormatter={v => `${(v / 1000).toFixed(0)}k`} />
              <Tooltip contentStyle={{ background: "hsl(220 18% 10%)", border: "1px solid hsl(220 14% 18%)", borderRadius: "8px", fontSize: "12px" }} formatter={(value: number) => [value.toLocaleString(), "Users"]} />
              <Line type="monotone" dataKey="users" stroke="hsl(152 72% 46%)" strokeWidth={2.5} dot={{ fill: "hsl(152 72% 46%)", r: 4, strokeWidth: 0 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </motion.div>
    </div>
  </AdminLayout>
);

export default AdminDashboard;
