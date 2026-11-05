import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { AppProvider } from "@/context/AppContext";

export const metadata: Metadata = {
  title: "Co-Act | Distributed Social Platform",
  description: "Community deployment engine for spatial support"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-50 text-slate-900 transition-colors duration-200">
        <AppProvider>
          <Navbar />
          <main className="w-full">{children}</main>
          <Footer />
        </AppProvider>
      </body>
    </html>
  );
}