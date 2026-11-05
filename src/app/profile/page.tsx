"use client";

import Link from "next/link";
import { useApp } from "@/context/AppContext";

export default function ProfilePage() {
  const { user } = useApp();

  return (
    <div className="w-full min-h-[70vh] bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-100 flex flex-col items-center justify-center px-4 transition-colors duration-200">
      <div className="w-full max-w-sm border border-slate-200 dark:border-slate-800 rounded-3xl p-8 bg-slate-50/50 dark:bg-slate-900/30 shadow-md text-center flex flex-col items-center">
      <div className="w-20 h-20 rounded-full border-4 border-blue-600 overflow-hidden shadow-sm mb-4">
          <picture>
            <img 
              src={user?.photoUrl || "https://unsplash.com"} 
              alt="User Avatar" 
              className="w-full h-full object-cover"
            />
          </picture>
        </div>

        <h2 className="text-xl font-black text-slate-800 dark:text-white uppercase tracking-wide mb-1">
          {user?.name || "স্বেচ্ছাসেবক"}
        </h2>
        
        <p className="text-xs font-semibold text-slate-400 dark:text-slate-500 mb-6 lowercase">
          {user?.email || "email@example.com"}
        </p>

        <Link href="/" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold h-10 rounded-xl text-xs uppercase tracking-wider flex items-center justify-center transition shadow-sm">
          Back To Home
        </Link>

      </div>
    </div>
  );
}