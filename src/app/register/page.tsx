"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useApp } from "@/context/AppContext";
import Link from "next/link";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const { login, showToast } = useApp();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    const hasUpper = /[A-Z]/.test(password);
    const hasLower = /[a-z]/.test(password);
    if (!hasUpper || !hasLower || password.length < 6) {
      showToast("Security code architecture params validation rejected", "error");
      return;
    }

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, photoUrl, password })
      });
      const data = await res.json();

      if (res.ok) {
        login({ name: data.user.name, email: data.user.email, photoUrl: data.user.photoUrl, token: data.token });
        showToast("Profile configuration allocation deployed successfully", "success");
        router.push("/upcoming-events");
      } else {
        showToast(data.message || "Dataset parameter validation error", "error");
      }
    } catch {
      showToast("Ecosystem initialization layer dead", "error");
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 shadow-sm">
        <h2 className="text-2xl font-black text-center tracking-tight uppercase mb-6">Initialize Profile Block</h2>
        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-xs font-black uppercase text-slate-500 tracking-wider">Identity Name String</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full mt-1.5 p-3 border border-slate-300 dark:border-slate-700 bg-transparent text-slate-900 dark:text-white font-semibold text-sm outline-none" required />
          </div>
          <div>
            <label className="block text-xs font-black uppercase text-slate-500 tracking-wider">Target Endpoint Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full mt-1.5 p-3 border border-slate-300 dark:border-slate-700 bg-transparent text-slate-900 dark:text-white font-semibold text-sm outline-none" required />
          </div>
          <div>
            <label className="block text-xs font-black uppercase text-slate-500 tracking-wider">Asset Photo Pointer URL</label>
            <input type="url" value={photoUrl} onChange={(e) => setPhotoUrl(e.target.value)} className="w-full mt-1.5 p-3 border border-slate-300 dark:border-slate-700 bg-transparent text-slate-900 dark:text-white font-semibold text-sm outline-none" required />
          </div>
          <div>
            <label className="block text-xs font-black uppercase text-slate-500 tracking-wider">Security Configuration Passphrase</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full mt-1.5 p-3 border border-slate-300 dark:border-slate-700 bg-transparent text-slate-900 dark:text-white font-semibold text-sm outline-none" required />
          </div>
          <button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-black tracking-wide uppercase py-3 rounded-xl transition text-sm mt-2 cursor-pointer">Deploy Block Configuration</button>
        </form>
        <p className="text-center text-xs font-bold text-slate-400 mt-6 tracking-wide">Registered entity? <Link href="/login" className="text-blue-500 hover:underline">Access active run</Link></p>
      </div>
    </div>
  );
}
