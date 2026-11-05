"use client";

import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-slate-900 text-slate-300 dark:bg-slate-950 border-t border-slate-800 pt-16 pb-8 transition-colors mt-auto">
      <div className="max-w-6xl px-6 sm:px-8 lg:px-12 mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 pb-12 border-b border-slate-800">
        
        <div className="flex flex-col gap-4">
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-md shadow-blue-600/10 transition group-hover:scale-105">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.318 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-black tracking-tight text-white uppercase leading-none">Co Act</span>
              <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mt-1">COMMUNITY ACTION</span>
            </div>
          </Link>
          <p className="text-xs text-slate-400 leading-relaxed mt-2">
            আপনার চারপাশের ইতিবাচক পরিবর্তন ও স্বেচ্ছাসেবামূলক ইভেন্টগুলোতে অংশ নিয়ে সমাজকে সুন্দর করে তুলুন।
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <h4 className="text-xs font-black uppercase text-slate-400 tracking-widest">কুইক লিংকস</h4>
          <div className="flex flex-col gap-2.5 text-xs font-semibold">
            <Link href="/upcoming-events" className="hover:text-blue-500 transition">আসন্ন ইভেন্টসমূহ</Link>
            <Link href="/create-event" className="hover:text-blue-500 transition">ইভেন্ট তৈরি করুন</Link>
            <Link href="/joined-events" className="hover:text-blue-500 transition">আমার যুক্ত হওয়া ইভেন্ট</Link>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <h4 className="text-xs font-black uppercase text-slate-400 tracking-widest">যোগাযোগ</h4>
          <div className="flex flex-col gap-3 text-xs font-semibold text-slate-400">
            <div className="flex items-center gap-2.5"><MapPin size={14} className="text-blue-500" /><span>চট্টগ্রাম, বাংলাদেশ</span></div>
            <div className="flex items-center gap-2.5"><Mail size={14} className="text-blue-500" /><span>info@coact.org</span></div>
            <div className="flex items-center gap-2.5"><Phone size={14} className="text-blue-500" /><span>+৮৮০ ১২৩৪৫৬৭৮</span></div>
          </div>
        </div>

      </div>

      <div className="max-w-6xl px-6 sm:px-8 lg:px-12 mx-auto pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-[11px] font-semibold text-slate-500">
          &copy; 2026 Co Act. All rights reserved.
        </p>
        <div className="flex items-center gap-5 text-slate-500">
          <a href="https://x.com" target="_blank" rel="noreferrer" className="hover:text-white transition">
            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}