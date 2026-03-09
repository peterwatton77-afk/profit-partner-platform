import { motion } from "framer-motion";
import { DollarSign, Users, UserPlus, TrendingDown } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";
import AdminLayout from "@/components/AdminLayout";

const stats = [
  { label: "MRR", value: "£47,350", icon: DollarSign, change: "+4.2% vs last month" },
  { label: "Total Subscribers", value: "18,940", icon: Users, change: "Premium + Trial" },
  { label: "New This Month", value: "1,284", icon: UserPlus, change: "+12% vs last month" },
  { label: "Churn Rate", value: "1.2%", icon: TrendingDown, change: "-0.3% vs last month" },
];

const revenueData = [
  { month: "Apr", revenue: 32000 },
  { month: "May", revenue: 34500 },
  { month: "Jun", revenue: 33800 },
  { month: "Jul", revenue: 36200 },
  { month: "Aug", revenue: 37800 },
  { month: "Sep", revenue: 39500 },
  { month: "Oct", revenue: 40200 },
  { month: "Nov", revenue: 41800 },
  { month: "Dec", revenue: 40500 },
  { month: "Jan", revenue: 43200 },
  { month: "Feb", revenue: 45100 },
  { month: "Mar", revenue: 47350 },
];

const planData = [
  { name: "Premium", value: 18940, color: "hsl(152 72% 46%)" },
  { name: "Trial", value: 2110, color: "hsl(45 93% 58%)" },
  { name: "Free", value: 24180, color: "hsl(220 14% 30%)" },
];

const AdminReports = () => {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="font-display text-xl sm:text-2xl font-bold mb-1">Subscription Reports</h1>
          <p className="text-muted-foreground text-sm">Revenue, subscriber metrics, and plan breakdowns.</p>
        </motion.div>

        {/* Stats */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}
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
          {/* Revenue Chart */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="lg:col-span-2 glass-card p-6"
          >
            <h3 className="font-display text-sm font-semibold mb-4">Monthly Revenue (12 Months)</h3>
            <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 14% 18%)" />
                  <XAxis dataKey="month" tick={{ fill: "hsl(220 10% 55%)", fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: "hsl(220 10% 55%)", fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `£${(v / 1000).toFixed(0)}k`} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(220 18% 10%)",
                      border: "1px solid hsl(220 14% 18%)",
                      borderRadius: "8px",
                      color: "hsl(0 0% 96%)",
                      fontSize: "12px",
                    }}
                    formatter={(value: number) => [`£${value.toLocaleString()}`, "Revenue"]}
                  />
                  <Bar dataKey="revenue" fill="hsl(152 72% 46%)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Plan Breakdown */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
            className="glass-card p-6"
          >
            <h3 className="font-display text-sm font-semibold mb-4">Plan Breakdown</h3>
            <div className="h-[220px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={planData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {planData.map((entry, index) => (
                      <Cell key={index} fill={entry.color} />
                    ))}
                  </Pie>
                  <Legend
                    verticalAlign="bottom"
                    iconType="circle"
                    iconSize={8}
                    formatter={(value) => <span style={{ color: "hsl(220 10% 55%)", fontSize: "11px" }}>{value}</span>}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(220 18% 10%)",
                      border: "1px solid hsl(220 14% 18%)",
                      borderRadius: "8px",
                      color: "hsl(0 0% 96%)",
                      fontSize: "12px",
                    }}
                    formatter={(value: number) => [value.toLocaleString(), "Users"]}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Breakdown numbers */}
            <div className="space-y-2 mt-4">
              {planData.map((p, i) => (
                <div key={i} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: p.color }} />
                    <span className="text-muted-foreground">{p.name}</span>
                  </div>
                  <span className="font-semibold">{p.value.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminReports;
