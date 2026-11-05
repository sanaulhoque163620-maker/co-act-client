"use client";

import Link from "next/link";
import { Mail, Calendar, MapPin, Shield, PlusCircle, Users } from "lucide-react";
import Button from "@/components/Button";

const events = [
  { _id: "m1", title: "শীতবস্ত্র বিতরণ কর্মসূচি ২০২৬", location: "মিরপুর ১০, ঢাকা", eventType: "DONATION", thumbnailUrl: "/winter.jpeg" },
  { _id: "m2", title: "বৃক্ষরোপণ ও পরিবেশ সচেতনতা কর্মসূচি", location: "ধানমন্ডি, ঢাকা", eventType: "PLANTATION", thumbnailUrl: "/tree-planting.jpeg" },
  { _id: "m3", title: "রক্তদান ও প্রাথমিক স্বাস্থ্য ক্যাম্প", location: "মোহাম্মদপুর, ঢাকা", eventType: "DONATION", thumbnailUrl: "/blood-camp.jpeg" },
  { _id: "m4", title: "খাদ্য বিতরণ কর্মসূচি", location: "মিরপুর, ঢাকা", eventType: "DONATION", thumbnailUrl: "/food-dist.jpeg" },
  { _id: "m5", title: "পরিচ্ছন্নতা অভিযান", location: "উত্তরা, ঢাকা", eventType: "CLEANUP", thumbnailUrl: "/clean.jpeg" },
  { _id: "m6", title: "পুষ্টিকর খাদ্য বিতরণ", location: "গাজীপুর, ঢাকা", eventType: "DONATION", thumbnailUrl: "/food-dis.jpeg" }
];

export default function HomePage() {
  return (
    <div className="w-full min-h-screen bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-100 flex flex-col pb-16 items-center transition-colors duration-200">
      
      <div className="w-full max-w-6xl px-6 sm:px-8 lg:px-12 mx-auto">
        
        <section className="w-full pt-10 pb-6">
          <div className="w-full bg-blue-600 text-white rounded-3xl py-24 px-8 text-center shadow-md flex flex-col justify-center items-center min-h-95">
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4 uppercase leading-tight">
              সামাজিক উন্নয়নে আমরা একতাবদ্ধ
            </h1>
            <p className="text-sm sm:text-base text-blue-100 max-w-xl mx-auto font-normal leading-relaxed">
              আপনার চারপাশের ইতিবাচক পরিবর্তন ও স্বেচ্ছাসেবামূলক ইভেন্টগুলোতে অংশ নিন।
            </p>
          </div>
        </section>

        <div className="w-full h-24" />

        <section className="w-full py-4">
          <h2 className="text-2xl font-black uppercase text-center text-indigo-600 dark:text-indigo-400 tracking-wide">
            আমাদের মূল বৈশিষ্ট্যসমূহ
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="bg-slate-50 dark:bg-slate-900/40 p-6 rounded-2xl border border-slate-200 dark:border-slate-800/60 flex flex-col items-center justify-center text-center shadow-sm min-h-35">
              <div className="text-red-500 mb-2.5"><Shield size={24} /></div>
              <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 mb-1.5">নিরাপদ প্ল্যাটফর্ম</h3>
              <p className="text-xs text-slate-400 dark:text-slate-500 leading-relaxed max-w-xs mx-auto">ভেরিফাইড ইউজার ও সঠিক তথ্যের মাধ্যমে ইভেন্ট পরিচালনা নিশ্চিত করা হয়।</p>
            </div>

            <div className="bg-slate-50 dark:bg-slate-900/40 p-6 rounded-2xl border border-slate-200 dark:border-slate-800/60 flex flex-col items-center justify-center text-center shadow-sm min-h-35">
              <div className="text-red-500 mb-2.5"><PlusCircle size={24} /></div>
              <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 mb-1.5">সহজ ইভেন্ট তৈরি</h3>
              <p className="text-xs text-slate-400 dark:text-slate-500 leading-relaxed max-w-xs mx-auto">লগইন করে মাত্র কয়েক ক্লিকে যেকোনো সামাজিক উন্নয়নের কাজ সবার সামনে তুলে ধরুন।</p>
            </div>

            <div className="bg-slate-50 dark:bg-slate-900/40 p-6 rounded-2xl border border-slate-200 dark:border-slate-800/60 flex flex-col items-center justify-center text-center shadow-sm min-h-35">
              <div className="text-red-500 mb-2.5"><Users size={24} /></div>
              <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 mb-1.5">স্বেচ্ছাসেবী নেটওয়ার্ক</h3>
              <p className="text-xs text-slate-400 dark:text-slate-500 leading-relaxed max-w-xs mx-auto">হাজারো দক্ষ ও আগ্রহী মানুষের সাথে মিলে সমাজের জন্য একসঙ্গে কাজ করুন।</p>
            </div>
          </div>
        </section>

        <div className="w-full h-24" />
        <section className="w-full py-4">
          <h2 className="text-2xl font-black uppercase text-center text-indigo-600 dark:text-indigo-400 tracking-wide">
            সাম্প্রতিক আসন্ন ইভেন্টসসমূহ
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            {events.map((event) => (
              <div key={event._id} className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/80 rounded-2xl overflow-hidden shadow-md flex flex-col justify-between group">
                <div className="w-full h-44 bg-slate-100 dark:bg-slate-950 relative overflow-hidden">
                  <picture>
                    <img src={event.thumbnailUrl} alt="Event" className="w-full h-full object-cover transition duration-300 group-hover:scale-105" onError={(e) => { (e.target as HTMLImageElement).src = "/winter.jpeg"; }} />
                  </picture>
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="inline-block bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-900/40 px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider mb-2.5">
                      {event.eventType}
                    </span>
                    <h3 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-tight line-clamp-1 mb-2">
                      {event.title}
                    </h3>
                  </div>
                  <div className="space-y-1.5 pt-2">
                    <div className="flex items-center text-slate-400 text-[11px] font-semibold">
                      <MapPin size={12} className="mr-1.5 text-indigo-500" />
                      <span className="line-clamp-1">{event.location}</span>
                    </div>
                    <div className="flex items-center text-slate-400 text-[11px] font-semibold">
                      <Calendar size={12} className="mr-1.5 text-indigo-500" />
                      <span>আসন্ন</span>
                    </div>
                  </div>
                </div>
              <div className="px-5 pb-5">
                <Link href={`/events/${event._id}`} className="w-full block">
                  <Button className="w-full">
                    View Event
                  </Button>
                </Link>
              </div>
              </div>
            ))}
          </div>
        </section>

        <div className="w-full h-24" />

        <section className="w-full py-4 border-t border-slate-100 dark:border-slate-900/60">
          <h2 className="text-2xl font-black uppercase text-center text-indigo-600 dark:text-indigo-400 tracking-wide">
            আমাদের কার্যক্রমের স্থিরচিত্র (Gallery)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
            <div className="relative aspect-4/3 rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 shadow-lg group">
              <picture>
                <img src="/blood-camp.jpeg" alt="Blood Donation" className="w-full h-full object-cover opacity-70 group-hover:scale-105 transition duration-300" />
              </picture>
              <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-slate-950/20 to-transparent flex flex-col justify-end p-5">
                <span className="bg-red-500 text-white text-[9px] font-black uppercase px-2 py-0.5 rounded w-max mb-1.5">Completed</span>
                <h4 className="text-xs font-black text-white uppercase tracking-wide">Blood Donation</h4>
                <span className="text-[10px] font-semibold text-slate-400 mt-1">Mirpur, Dhaka</span>
              </div>
            </div>

            <div className="relative aspect-4/3 rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 shadow-lg group">
              <picture>
                <img src="/tree-planting.jpeg" alt="Tree Planting" className="w-full h-full object-cover opacity-70 group-hover:scale-105 transition duration-300" />
              </picture>
              <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-slate-950/20 to-transparent flex flex-col justify-end p-5">
                <span className="bg-emerald-500 text-white text-[9px] font-black uppercase px-2 py-0.5 rounded w-max mb-1.5">Completed</span>
                <h4 className="text-xs font-black text-white uppercase tracking-wide">Tree Planting</h4>
                <span className="text-[10px] font-semibold text-slate-400 mt-1">Dhanmondi, Dhaka</span>
              </div>
            </div>

            <div className="relative aspect-4/3 rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 shadow-lg group">
              <picture>
                <img src="/clean.jpeg" alt="Cleanup Drive" className="w-full h-full object-cover opacity-70 group-hover:scale-105 transition duration-300" />
              </picture>
              <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-slate-950/20 to-transparent flex flex-col justify-end p-5">
                <span className="bg-blue-500 text-white text-[9px] font-black uppercase px-2 py-0.5 rounded w-max mb-1.5">Completed</span>
                <h4 className="text-xs font-black text-white uppercase tracking-wide">Cleanup Drive</h4>
                <span className="text-[10px] font-semibold text-slate-400 mt-1">Uttara, Dhaka</span>
              </div>
            </div>
          </div>
        </section>

        <div className="w-full h-24" />

        <section className="w-full max-w-5xl mx-auto border border-slate-200 dark:border-slate-800 rounded-3xl p-16 bg-slate-50/50 dark:bg-slate-900/30 shadow-xs text-center flex flex-col items-center justify-center min-h-80">
          <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-3 uppercase">
            আমাদের নিউজলেটারে যুক্ত হোন
          </h2>
          <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-10 uppercase tracking-wider max-w-xl mx-auto">
            নতুন নতুন সামাজিক ইভেন্ট এবং আমাদের কার্যক্রমের নিয়মিত আপডেট পেতে সাবস্ক্রাইব করুন।
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full max-w-md justify-center">
            <div className="relative w-full flex-1">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                <Mail size={14} />
              </span>
              <input type="text" placeholder="আপনার ইমেইল দিন..." className="w-full pl-10 pr-4 py-3 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl outline-none text-xs font-semibold text-slate-900 dark:text-white transition focus:border-blue-600" />
            </div>
            <button className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 h-10 rounded-xl text-xs uppercase tracking-wider transition shadow-md shadow-blue-600/10 shrink-0">
              Subscribe
            </button>
          </div>
        </section>

      </div>
    </div>
  );
}
