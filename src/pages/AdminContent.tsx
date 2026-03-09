import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Plus, Pencil, Trash2 } from "lucide-react";
import AdminLayout from "@/components/AdminLayout";

const mockAnnouncements = [
  { id: 1, title: "Platform Maintenance — 15 March", status: "Live", created: "07 Mar 2026" },
  { id: 2, title: "New Each Way Pro Tool Launched!", status: "Live", created: "01 Mar 2026" },
  { id: 3, title: "Easter Promotion — 20% Off Premium", status: "Draft", created: "28 Feb 2026" },
];

const mockGuides = [
  { id: 1, title: "What is Matched Betting?", category: "Beginner", status: "Published" },
  { id: 2, title: "How to Use a Betting Exchange", category: "Beginner", status: "Published" },
  { id: 3, title: "Your First Matched Bet Walkthrough", category: "Beginner", status: "Published" },
  { id: 4, title: "Advanced Each Way Strategies", category: "Advanced", status: "Draft" },
];

const mockOffers = [
  { id: 1, bookmaker: "Bet365", title: "Bet £10 Get £30 Free Bets", type: "Sign Up", status: "Active" },
  { id: 2, bookmaker: "William Hill", title: "Acca Insurance — 5+ Legs", type: "Reload", status: "Active" },
  { id: 3, bookmaker: "Paddy Power", title: "Money Back as Cash", type: "Sign Up", status: "Paused" },
];

const statusColors: Record<string, string> = {
  Live: "bg-primary/10 text-primary",
  Draft: "bg-muted text-muted-foreground",
  Published: "bg-primary/10 text-primary",
  Active: "bg-primary/10 text-primary",
  Paused: "bg-amber-500/10 text-amber-400",
};

const AdminContent = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [editTitle, setEditTitle] = useState("");
  const [editBody, setEditBody] = useState("");
  const [editLive, setEditLive] = useState(false);

  const openNew = () => {
    setEditTitle("");
    setEditBody("");
    setEditLive(false);
    setModalOpen(true);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="font-display text-xl sm:text-2xl font-bold mb-1">Content Management</h1>
          <p className="text-muted-foreground text-sm">Manage announcements, guides, and offers.</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}>
          <Tabs defaultValue="announcements" className="w-full">
            <TabsList className="w-full sm:w-auto bg-secondary/50 border border-border h-10 p-1">
              <TabsTrigger value="announcements" className="text-xs data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Announcements</TabsTrigger>
              <TabsTrigger value="guides" className="text-xs data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Guides</TabsTrigger>
              <TabsTrigger value="offers" className="text-xs data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Offers</TabsTrigger>
            </TabsList>

            {/* Announcements */}
            <TabsContent value="announcements" className="mt-6">
              <div className="flex justify-end mb-4">
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold gap-2 text-xs" onClick={openNew}>
                  <Plus size={14} /> New Announcement
                </Button>
              </div>
              <div className="glass-card overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border text-xs text-muted-foreground">
                      <th className="text-left py-3 px-6 font-medium">Title</th>
                      <th className="text-center py-3 px-4 font-medium">Status</th>
                      <th className="text-left py-3 px-4 font-medium hidden sm:table-cell">Created</th>
                      <th className="text-center py-3 px-6 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockAnnouncements.map((a) => (
                      <tr key={a.id} className="border-b border-border/50 last:border-0">
                        <td className="py-3 px-6 text-xs font-medium">{a.title}</td>
                        <td className="py-3 px-4 text-center">
                          <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${statusColors[a.status]}`}>{a.status}</span>
                        </td>
                        <td className="py-3 px-4 text-xs text-muted-foreground hidden sm:table-cell">{a.created}</td>
                        <td className="py-3 px-6">
                          <div className="flex items-center justify-center gap-1">
                            <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-foreground" onClick={() => { setEditTitle(a.title); setEditBody("Announcement body text..."); setEditLive(a.status === "Live"); setModalOpen(true); }}><Pencil size={14} /></Button>
                            <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-destructive"><Trash2 size={14} /></Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </TabsContent>

            {/* Guides */}
            <TabsContent value="guides" className="mt-6">
              <div className="glass-card overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border text-xs text-muted-foreground">
                      <th className="text-left py-3 px-6 font-medium">Title</th>
                      <th className="text-center py-3 px-4 font-medium">Category</th>
                      <th className="text-center py-3 px-4 font-medium">Status</th>
                      <th className="text-center py-3 px-6 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockGuides.map((g) => (
                      <tr key={g.id} className="border-b border-border/50 last:border-0">
                        <td className="py-3 px-6 text-xs font-medium">{g.title}</td>
                        <td className="py-3 px-4 text-center">
                          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-muted text-muted-foreground">{g.category}</span>
                        </td>
                        <td className="py-3 px-4 text-center">
                          <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${statusColors[g.status]}`}>{g.status}</span>
                        </td>
                        <td className="py-3 px-6">
                          <div className="flex items-center justify-center gap-1">
                            <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-foreground"><Pencil size={14} /></Button>
                            <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-destructive"><Trash2 size={14} /></Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </TabsContent>

            {/* Offers */}
            <TabsContent value="offers" className="mt-6">
              <div className="glass-card overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border text-xs text-muted-foreground">
                      <th className="text-left py-3 px-6 font-medium">Bookmaker</th>
                      <th className="text-left py-3 px-4 font-medium">Offer</th>
                      <th className="text-center py-3 px-4 font-medium hidden sm:table-cell">Type</th>
                      <th className="text-center py-3 px-4 font-medium">Status</th>
                      <th className="text-center py-3 px-6 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockOffers.map((o) => (
                      <tr key={o.id} className="border-b border-border/50 last:border-0">
                        <td className="py-3 px-6 text-xs font-semibold">{o.bookmaker}</td>
                        <td className="py-3 px-4 text-xs text-muted-foreground">{o.title}</td>
                        <td className="py-3 px-4 text-center hidden sm:table-cell">
                          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-muted text-muted-foreground">{o.type}</span>
                        </td>
                        <td className="py-3 px-4 text-center">
                          <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${statusColors[o.status]}`}>{o.status}</span>
                        </td>
                        <td className="py-3 px-6">
                          <div className="flex items-center justify-center gap-1">
                            <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-foreground"><Pencil size={14} /></Button>
                            <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-destructive"><Trash2 size={14} /></Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>

      {/* Announcement Modal */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="bg-card border-border">
          <DialogHeader>
            <DialogTitle className="font-display text-lg">{editTitle ? "Edit Announcement" : "New Announcement"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label className="text-xs text-muted-foreground mb-1.5 block">Title</Label>
              <Input value={editTitle} onChange={(e) => setEditTitle(e.target.value)} placeholder="Announcement title" className="h-10 bg-secondary/50 border-border text-sm" />
            </div>
            <div>
              <Label className="text-xs text-muted-foreground mb-1.5 block">Body</Label>
              <Textarea value={editBody} onChange={(e) => setEditBody(e.target.value)} placeholder="Write your announcement…" className="bg-secondary/50 border-border text-sm min-h-[100px]" />
            </div>
            <div className="flex items-center justify-between">
              <Label className="text-sm">Publish immediately</Label>
              <Switch checked={editLive} onCheckedChange={setEditLive} />
            </div>
          </div>
          <DialogFooter className="gap-2">
            <Button variant="ghost" className="text-muted-foreground" onClick={() => setModalOpen(false)}>Cancel</Button>
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold" onClick={() => setModalOpen(false)}>
              {editTitle ? "Save Changes" : "Create"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default AdminContent;
