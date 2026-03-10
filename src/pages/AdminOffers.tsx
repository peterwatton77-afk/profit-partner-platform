import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Pencil, Trash2 } from "lucide-react";
import AdminLayout from "@/components/AdminLayout";

interface Offer {
  id: number;
  bookmaker: string;
  type: string;
  value: string;
  expiry: string;
  status: "Active" | "Expired";
}

const initialOffers: Offer[] = [
  { id: 1, bookmaker: "Bet365", type: "Sign Up", value: "Bet £10 Get £30", expiry: "31 Mar 2026", status: "Active" },
  { id: 2, bookmaker: "William Hill", type: "Reload", value: "£5 Free Bet Weekly", expiry: "Ongoing", status: "Active" },
  { id: 3, bookmaker: "Paddy Power", type: "Sign Up", value: "Bet £20 Get £20", expiry: "15 Apr 2026", status: "Active" },
  { id: 4, bookmaker: "SkyBet", type: "Sign Up", value: "Bet £10 Get £40", expiry: "28 Feb 2026", status: "Expired" },
  { id: 5, bookmaker: "Coral", type: "Reload", value: "Acca Insurance 5+ Legs", expiry: "Ongoing", status: "Active" },
  { id: 6, bookmaker: "Betway", type: "Casino", value: "100% Deposit Match £50", expiry: "30 Mar 2026", status: "Active" },
  { id: 7, bookmaker: "888sport", type: "Sign Up", value: "Bet £10 Get £30", expiry: "01 Jan 2026", status: "Expired" },
  { id: 8, bookmaker: "Ladbrokes", type: "Reload", value: "Money Back Special", expiry: "Ongoing", status: "Active" },
];

const AdminOffers = () => {
  const [offers, setOffers] = useState(initialOffers);
  const [modalOpen, setModalOpen] = useState(false);
  const [newOffer, setNewOffer] = useState({ bookmaker: "Bet365", type: "Sign Up", value: "", expiry: "", status: "Active" as const });

  const addOffer = () => {
    if (!newOffer.value) return;
    setOffers(prev => [...prev, { ...newOffer, id: Date.now() }]);
    setNewOffer({ bookmaker: "Bet365", type: "Sign Up", value: "", expiry: "", status: "Active" });
    setModalOpen(false);
  };

  const deleteOffer = (id: number) => setOffers(prev => prev.filter(o => o.id !== id));

  return (
    <AdminLayout>
      <div className="space-y-6">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between">
          <div>
            <h1 className="font-display text-xl sm:text-2xl font-bold mb-1">Offers Management</h1>
            <p className="text-muted-foreground text-sm">Manage bookmaker offers and promotions.</p>
          </div>
          <Dialog open={modalOpen} onOpenChange={setModalOpen}>
            <DialogTrigger asChild>
              <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90 text-xs gap-1.5 font-semibold"><Plus size={14} /> Add Offer</Button>
            </DialogTrigger>
            <DialogContent className="bg-card border-border sm:max-w-md">
              <DialogHeader><DialogTitle className="font-display">Add Offer</DialogTitle></DialogHeader>
              <div className="space-y-4 pt-2">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-xs text-muted-foreground mb-1.5 block">Bookmaker</Label>
                    <Select value={newOffer.bookmaker} onValueChange={v => setNewOffer({ ...newOffer, bookmaker: v })}>
                      <SelectTrigger className="h-9 text-xs bg-secondary/50 border-border"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        {["Bet365", "William Hill", "Paddy Power", "Ladbrokes", "Coral", "SkyBet", "Betway", "888sport"].map(b => <SelectItem key={b} value={b}>{b}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-xs text-muted-foreground mb-1.5 block">Offer Type</Label>
                    <Select value={newOffer.type} onValueChange={v => setNewOffer({ ...newOffer, type: v })}>
                      <SelectTrigger className="h-9 text-xs bg-secondary/50 border-border"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        {["Sign Up", "Reload", "Casino", "Each-Way", "Acca Insurance"].map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div><Label className="text-xs text-muted-foreground mb-1.5 block">Value / Description</Label><Input value={newOffer.value} onChange={e => setNewOffer({ ...newOffer, value: e.target.value })} className="h-9 text-xs bg-secondary/50 border-border" placeholder="e.g. Bet £10 Get £30" /></div>
                <div><Label className="text-xs text-muted-foreground mb-1.5 block">Expiry</Label><Input value={newOffer.expiry} onChange={e => setNewOffer({ ...newOffer, expiry: e.target.value })} className="h-9 text-xs bg-secondary/50 border-border" placeholder="e.g. 31 Mar 2026 or Ongoing" /></div>
                <Button onClick={addOffer} className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold">Add Offer</Button>
              </div>
            </DialogContent>
          </Dialog>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="glass-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-xs text-muted-foreground">
                  <th className="text-left py-3 px-5 font-medium">Bookmaker</th>
                  <th className="text-left py-3 px-4 font-medium">Type</th>
                  <th className="text-left py-3 px-4 font-medium">Value</th>
                  <th className="text-left py-3 px-4 font-medium hidden md:table-cell">Expiry</th>
                  <th className="text-center py-3 px-4 font-medium">Status</th>
                  <th className="text-center py-3 px-5 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {offers.map(o => (
                  <tr key={o.id} className="border-b border-border/50 last:border-0 hover:bg-muted/30 transition-colors group">
                    <td className="py-3 px-5 text-sm font-medium">{o.bookmaker}</td>
                    <td className="py-3 px-4"><span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-primary/10 text-primary">{o.type}</span></td>
                    <td className="py-3 px-4 text-xs">{o.value}</td>
                    <td className="py-3 px-4 text-xs text-muted-foreground hidden md:table-cell">{o.expiry}</td>
                    <td className="py-3 px-4 text-center">
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${o.status === "Active" ? "bg-primary/10 text-primary" : "bg-destructive/10 text-destructive"}`}>{o.status}</span>
                    </td>
                    <td className="py-3 px-5">
                      <div className="flex items-center justify-center gap-1">
                        <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-foreground"><Pencil size={13} /></Button>
                        <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-destructive" onClick={() => deleteOffer(o.id)}><Trash2 size={13} /></Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </AdminLayout>
  );
};

export default AdminOffers;
