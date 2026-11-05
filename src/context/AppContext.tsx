"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface User {
  name: string;
  email: string;
  photoUrl?: string;
  token: string;
}

interface AppContextType {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
  theme: string;
  toggleTheme: () => void;
  showToast: (message: string, type: "success" | "error") => void;
  toastMessage: { text: string; type: "success" | "error" } | null;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [theme, setTheme] = useState("light");
  const [toastMessage, setToastMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("co_act_user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        localStorage.removeItem("co_act_user");
      }
    }
    const storedTheme = localStorage.getItem("co_act_theme") || "light";
    setTheme(storedTheme);
    document.documentElement.classList.toggle("dark", storedTheme === "dark");
  }, []);

  const login = (userData: User) => {
    setUser(userData);
    localStorage.setItem("co_act_user", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("co_act_user");
  };
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("co_act_theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  const showToast = (message: string, type: "success" | "error") => {
    setToastMessage({ text: message, type });
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  return (
    <AppContext.Provider value={{ user, login, logout, theme, toggleTheme, showToast, toastMessage }}>
      {children}
      {toastMessage && (
        <div className={`fixed bottom-5 right-5 z-50 px-5 py-3 rounded-xl shadow-lg border text-xs font-bold uppercase tracking-wider transition duration-300 animate-bounce ${
          toastMessage.type === "success" 
            ? "bg-emerald-500 text-white border-emerald-600" 
            : "bg-rose-500 text-white border-rose-600"
        }`}>
          {toastMessage.text}
        </div>
      )}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}