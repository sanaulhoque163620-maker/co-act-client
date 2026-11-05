"use client";

import Link from "next/link";
import { useApp } from "@/context/AppContext";
import { useState } from "react";
import { Calendar, Sun, Moon } from "lucide-react";

export default function Navbar() {
  const { user, logout, theme, toggleTheme } = useApp();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <nav className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-40 transition-colors w-full h-16 flex items-center justify-center">
      <div className="w-full max-w-6xl px-6 sm:px-8 lg:px-12 flex items-center justify-between mx-auto">
        
        <div className="flex items-center space-x-12 flex-1 max-w-lg">
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-md shadow-blue-600/10 transition group-hover:scale-105">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.318 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-black tracking-tight text-blue-600 dark:text-blue-400 uppercase leading-none">
                Co Act
              </span>
              <span className="text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mt-1">
                COMMUNITY ACTION
              </span>
            </div>
          </Link>
        </div>

        <div className="flex justify-center items-center space-x-4 flex-1 shrink-0">
          <Link href="/upcoming-events" className="flex items-center space-x-2 bg-slate-50 dark:bg-slate-950 hover:bg-slate-100 dark:hover:bg-slate-800/60 border border-slate-200 dark:border-slate-800 px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition shadow-inner">
            <Calendar size={14} className="text-blue-600" />
            <span>Upcoming Events</span>
          </Link>

          
          <button 
            onClick={toggleTheme} 
            className="w-10 h-10 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 rounded-xl flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-800/60 transition cursor-pointer shadow-inner"
            title={theme === "light" ? "ডার্ক মোড অন করুন" : "লাইট মোড অন করুন"}
          >
            {theme === "light" ? <Moon size={16} className="text-indigo-600" /> : <Sun size={16} className="text-amber-400" />}
          </button>
        </div>
<div className="flex items-center space-x-6 flex-1 justify-end shrink-0">
          {user ? (
            <div className="flex items-center space-x-4">
              <button onClick={logout} className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-rose-50 dark:hover:bg-rose-950/30 text-slate-600 dark:text-slate-300 hover:text-rose-600 dark:hover:text-rose-400 text-[10px] font-black uppercase tracking-wider px-4 py-2.5 rounded-xl transition cursor-pointer">
                Logout
              </button>

              <div className="relative" onMouseEnter={() => setDropdownOpen(true)} onMouseLeave={() => setDropdownOpen(false)}>
                <div className="group flex items-center cursor-pointer py-1" onClick={() => setDropdownOpen(!dropdownOpen)}>
                  <div className="w-10 h-10 rounded-full border-2 border-blue-600 overflow-hidden shadow-sm">
                    <picture>
                      <img src={user.photoUrl || "https://unsplash.com"} alt="Profile" className="w-full h-full object-cover" />
                    </picture>
                  </div>
                  <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-950 text-[10px] py-1 px-2 rounded-lg opacity-0 group-hover:opacity-100 transition duration-150 whitespace-nowrap font-bold shadow-md">
                    {user.name}
                  </span>
                </div>
                
                {dropdownOpen && (
                  <div className="absolute right-0 top-full mt-1 w-48 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xl py-1.5 z-50">
                    <Link href="/create-event" onClick={() => setDropdownOpen(false)} className="block px-4 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800">Create Event</Link>
                    <Link href="/manage-events" onClick={() => setDropdownOpen(false)} className="block px-4 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800">Manage Events</Link>
                    <Link href="/joined-events" onClick={() => setDropdownOpen(false)} className="block px-4 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800">Joined Events</Link>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <Link href="/login" className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-6 py-2.5 rounded-xl transition shadow-md uppercase tracking-wider flex items-center space-x-1.5">
              <span>Login</span>
            </Link>
          )}
        </div>

      </div>
    </nav>
  );
}