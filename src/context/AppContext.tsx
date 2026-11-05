"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface User {
  email: string;
  name: string;
  photoUrl?: string;
  token?: string;
}

interface AppContextType {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
  theme: string;
  toggleTheme: () => void;
  showToast: (msg: string, type?: "success" | "error") => void;
  toast: { message: string; type: "success" | "error" } | null;
  loading: boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [theme, setTheme] = useState<string>("light");
  const [loading, setLoading] = useState<boolean>(true);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedUser = localStorage.getItem("coact_user");
      const savedTheme = localStorage.getItem("coact_theme") || "light";
      
      setTimeout(() => {
        setTheme(savedTheme);
        if (savedTheme === "dark") {
          document.documentElement.classList.add("dark");
        } else {
          document.documentElement.classList.remove("dark");
        }
        if (savedUser) {
          try {
            setUser(JSON.parse(savedUser));
          } catch (e) {
            console.error(e);
          }
        }
        setLoading(false);
      }, 0);
    }
  }, []);

  const login = (userData: User) => {
    setUser(userData);
    localStorage.setItem("coact_user", JSON.stringify(userData));
    showToast("সফলভাবে লগইন সম্পন্ন হয়েছে!", "success");
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("coact_user");
    showToast("সফলভাবে লগআউট করা হয়েছে!", "success");
  };

  const toggleTheme = () => {
    const nextTheme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
    localStorage.setItem("coact_theme", nextTheme);
    if (nextTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  const showToast = (msg: string, type: "success" | "error" = "success") => {
    setToast({ message: msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <AppContext.Provider value={{ user, login, logout, theme, toggleTheme, showToast, toast, loading }}>
      {!loading && children}
      {toast && (
        <div className={`fixed bottom-5 right-5 px-5 py-3 rounded-xl text-white font-black text-xs uppercase tracking-wider shadow-2xl z-50 transition-all duration-300 transform translate-y-0 ${toast.type === "success" ? "bg-emerald-600 border border-emerald-500" : "bg-rose-600 border border-rose-500"}`}>
          {toast.message}
        </div>
      )}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error("useApp must be used within AppProvider");
  return context;
}