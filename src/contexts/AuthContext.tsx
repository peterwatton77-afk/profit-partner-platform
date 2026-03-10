import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface User {
  name: string;
  email: string;
  plan: "free" | "premium";
}

interface AuthContextType {
  user: User | null;
  login: (email: string, name?: string) => void;
  logout: () => void;
  upgrade: () => void;
  isAuthenticated: boolean;
  isPremium: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const stored = localStorage.getItem("om_user");
      return stored ? JSON.parse(stored) : null;
    } catch { return null; }
  });

  useEffect(() => {
    if (user) localStorage.setItem("om_user", JSON.stringify(user));
    else localStorage.removeItem("om_user");
  }, [user]);

  const login = (email: string, name?: string) => {
    const isPrem = email.toLowerCase().includes("premium");
    setUser({ name: name || email.split("@")[0], email, plan: isPrem ? "premium" : "free" });
  };

  const logout = () => setUser(null);

  const upgrade = () => {
    if (user) setUser({ ...user, plan: "premium" });
  };

  const isPremium = user?.plan === "premium";

  return (
    <AuthContext.Provider value={{ user, login, logout, upgrade, isAuthenticated: !!user, isPremium }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
