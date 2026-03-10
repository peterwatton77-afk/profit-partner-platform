import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, ChevronLeft, ChevronRight, Eye, Ban } from "lucide-react";
import AdminLayout from "@/components/AdminLayout";

const mockUsers = [
  { name: "Emma Thompson", email: "emma.t@gmail.com", plan: "Premium", joined: "15 Jan 2026", lastActive: "10 Mar 2026", status: "Active" },
  { name: "James Wilson", email: "jwilson@outlook.com", plan: "Free", joined: "02 Mar 2026", lastActive: "10 Mar 2026", status: "Active" },
  { name: "Sophie Chen", email: "sophie.chen@yahoo.com", plan: "Premium", joined: "22 Nov 2025", lastActive: "09 Mar 2026", status: "Active" },
  { name: "Oliver Brown", email: "o.brown@gmail.com", plan: "Free", joined: "08 Mar 2026", lastActive: "08 Mar 2026", status: "Active" },
  { name: "Charlotte Davis", email: "cdavis@hotmail.com", plan: "Free", joined: "10 Sep 2025", lastActive: "01 Mar 2026", status: "Suspended" },
  { name: "Harry Evans", email: "h.evans@gmail.com", plan: "Premium", joined: "05 Dec 2025", lastActive: "10 Mar 2026", status: "Active" },
  { name: "Amelia Roberts", email: "aroberts@outlook.com", plan: "Free", joined: "01 Mar 2026", lastActive: "07 Mar 2026", status: "Active" },
  { name: "George Taylor", email: "g.taylor@yahoo.com", plan: "Premium", joined: "04 Feb 2026", lastActive: "09 Mar 2026", status: "Active" },
  { name: "Lily Walker", email: "lwalker@gmail.com", plan: "Free", joined: "20 Feb 2026", lastActive: "06 Mar 2026", status: "Active" },
  { name: "Jack Harris", email: "j.harris@hotmail.com", plan: "Premium", joined: "12 Jan 2026", lastActive: "10 Mar 2026", status: "Active" },
];

const planColors: Record<string, string> = {
  Free: "bg-muted text-muted-foreground",
  Premium: "bg-primary/10 text-primary",
};

const AdminUsers = () => {
  const [search, setSearch] = useState("");
  const [planFilter, setPlanFilter] = useState("All");
  const [page, setPage] = useState(1);
  const perPage = 6;

  const filtered = useMemo(() => {
    return mockUsers.filter((u) => {
      const q = search.toLowerCase();
      if (q && !u.name.toLowerCase().includes(q) && !u.email.toLowerCase().includes(q)) return false;
      if (planFilter !== "All" && u.plan !== planFilter) return false;
      return true;
    });
  }, [search, planFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const paged = filtered.slice((page - 1) * perPage, page * perPage);

  return (
    <AdminLayout>
      <div className="space-y-6">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="font-display text-xl sm:text-2xl font-bold mb-1">User Management</h1>
          <p className="text-muted-foreground text-sm">Search, filter, and manage all platform users.</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search by name or email…" value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }} className="h-9 pl-9 bg-secondary/50 border-border text-sm" />
          </div>
          <Select value={planFilter} onValueChange={(v) => { setPlanFilter(v); setPage(1); }}>
            <SelectTrigger className="h-9 w-full sm:w-40 bg-secondary/50 border-border text-sm"><SelectValue /></SelectTrigger>
            <SelectContent>
              {["All", "Free", "Premium"].map((p) => <SelectItem key={p} value={p}>{p}</SelectItem>)}
            </SelectContent>
          </Select>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-xs text-muted-foreground">
                  <th className="text-left py-3 px-5 font-medium">Name</th>
                  <th className="text-left py-3 px-4 font-medium hidden md:table-cell">Email</th>
                  <th className="text-center py-3 px-4 font-medium">Plan</th>
                  <th className="text-left py-3 px-4 font-medium hidden lg:table-cell">Joined</th>
                  <th className="text-left py-3 px-4 font-medium hidden lg:table-cell">Last Active</th>
                  <th className="text-center py-3 px-4 font-medium">Status</th>
                  <th className="text-center py-3 px-5 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paged.map((u, i) => (
                  <tr key={i} className="border-b border-border/50 last:border-0 hover:bg-muted/30 transition-colors">
                    <td className="py-3 px-5">
                      <p className="text-xs font-medium">{u.name}</p>
                      <p className="text-[10px] text-muted-foreground md:hidden">{u.email}</p>
                    </td>
                    <td className="py-3 px-4 text-xs text-muted-foreground hidden md:table-cell">{u.email}</td>
                    <td className="py-3 px-4 text-center"><span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${planColors[u.plan]}`}>{u.plan}</span></td>
                    <td className="py-3 px-4 text-xs text-muted-foreground hidden lg:table-cell">{u.joined}</td>
                    <td className="py-3 px-4 text-xs text-muted-foreground hidden lg:table-cell">{u.lastActive}</td>
                    <td className="py-3 px-4 text-center"><span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${u.status === "Active" ? "bg-primary/10 text-primary" : "bg-destructive/10 text-destructive"}`}>{u.status}</span></td>
                    <td className="py-3 px-5">
                      <div className="flex items-center justify-center gap-1">
                        <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-foreground"><Eye size={14} /></Button>
                        <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-destructive"><Ban size={14} /></Button>
                      </div>
                    </td>
                  </tr>
                ))}
                {paged.length === 0 && <tr><td colSpan={7} className="py-12 text-center text-sm text-muted-foreground">No users found.</td></tr>}
              </tbody>
            </table>
          </div>
          {totalPages > 1 && (
            <div className="flex items-center justify-between px-5 py-3 border-t border-border">
              <span className="text-xs text-muted-foreground">{(page - 1) * perPage + 1}–{Math.min(page * perPage, filtered.length)} of {filtered.length}</span>
              <div className="flex items-center gap-1">
                <Button variant="ghost" size="icon" className="h-8 w-8" disabled={page === 1} onClick={() => setPage(page - 1)}><ChevronLeft size={16} /></Button>
                <Button variant="ghost" size="icon" className="h-8 w-8" disabled={page === totalPages} onClick={() => setPage(page + 1)}><ChevronRight size={16} /></Button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AdminLayout>
  );
};

export default AdminUsers;
