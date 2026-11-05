"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useApp } from "@/context/AppContext";
import { MapPin, Calendar, ArrowLeft, Trash2 } from "lucide-react";

interface JoinedEvent {
  _id: string;
  eventId: string;
  title: string;
  location: string;
  eventType: string;
  thumbnailUrl: string;
  eventDate: string;
  userEmail: string;
}

export default function JoinedEventsPage() {
  const router = useRouter();
  const { user, showToast } = useApp();
  const [joinedEvents, setJoinedEvents] = useState<JoinedEvent[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

 useEffect(() => {
    const localKey = user ? `joined_${user.email}` : "joined_guest";
    const existing = localStorage.getItem(localKey);
    const combinedData: JoinedEvent[] = existing ? JSON.parse(existing) : [];
    
    const unique: JoinedEvent[] = combinedData.filter((v: JoinedEvent, i: number, a: JoinedEvent[]) => a.findIndex((t: JoinedEvent) => t.eventId === v.eventId) === i);
    const sorted: JoinedEvent[] = [...unique].sort((a: JoinedEvent, b: JoinedEvent) => new Date(a.eventDate).getTime() - new Date(b.eventDate).getTime());
    
    setTimeout(() => {
      setJoinedEvents(sorted);
      setLoading(false);
    }, 0);
  }, [user]);

  const handleDeleteJoinedEvent = (eventId: string) => {
    const localKey = user ? `joined_${user.email}` : "joined_guest";
    const existing = localStorage.getItem(localKey);
    if (existing) {
      try {
        const list: JoinedEvent[] = JSON.parse(existing);
        const updatedList = list.filter((item) => item.eventId !== eventId);
        localStorage.setItem(localKey, JSON.stringify(updatedList));
      } catch (e) {
        console.error(e);
      }
    }
    setJoinedEvents((prev) => prev.filter((item) => item.eventId !== eventId));
    showToast("ইভেন্টটি আপনার তালিকা থেকে ডিলিট করা হয়েছে", "success");
  };

  if (loading) {
    return (
      <div className="w-full min-h-screen bg-white dark:bg-slate-950 flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-100 p-6 sm:p-12 transition-colors duration-200 flex flex-col items-center">
      <div className="w-full max-w-6xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10 pb-6 border-b border-slate-100 dark:border-slate-800/60">
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight flex items-center gap-2">
              <span className="w-2.5 h-6 bg-blue-600 rounded-md inline-block" />
              আপনার যুক্ত হওয়া ইভেন্টসমূহ
            </h1>
          </div>
          <button onClick={() => router.push("/upcoming-events")} className="flex items-center space-x-1.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold px-4 py-2.5 rounded-xl text-xs uppercase tracking-wider transition cursor-pointer">
            <ArrowLeft size={14} />
            <span>আরোও ইভেন্ট দেখুন</span>
          </button>
        </div>

        {joinedEvents.length === 0 ? (
          <div className="w-full py-20 border-2 border-dashed border-slate-200 dark:border-slate-800/80 rounded-3xl flex flex-col items-center justify-center text-center px-4">
            <p className="text-sm font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">আপনি এখনো কোনো ইভেন্টে যোগদান করেননি</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {joinedEvents.map((event) => {
              const safeDate = new Date(event.eventDate).toLocaleDateString("bn-BD", { month: "long", day: "numeric", year: "numeric" });
              return (
                <div key={event._id} className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/80 rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between group transition hover:shadow-md">
                  <div className="aspect-video w-full overflow-hidden bg-slate-100 dark:bg-slate-950 relative">
                    <picture>
                      <img src={event.thumbnailUrl} alt={event.title} className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).src = "/winter.jpeg"; }} />
                    </picture>
                  </div>
                  <div className="p-5 flex-1 flex flex-col justify-between gap-4">
                    <div>
                      <h2 className="text-sm font-black text-slate-800 dark:text-white uppercase tracking-tight line-clamp-1 mb-2">{event.title}</h2>
                      <div className="space-y-1.5 text-slate-400 dark:text-slate-500 text-[11px] font-bold">
                        <div className="flex items-center"><Calendar size={12} className="mr-1.5 text-blue-600" /><span>{safeDate}</span></div>
                        <div className="flex items-center"><MapPin size={12} className="mr-1.5 text-blue-600" /><span>{event.location}</span></div>
                      </div>
                    </div>
                    <div className="flex gap-2.5 mt-2">
                      <button onClick={() => router.push(`/events/${event.eventId}`)} className="flex-1 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 hover:bg-blue-600 hover:text-white text-slate-700 dark:text-slate-300 font-black h-9 rounded-xl text-[10px] uppercase tracking-wider transition cursor-pointer flex items-center justify-center">
                        Details
                      </button>
                      <button onClick={() => handleDeleteJoinedEvent(event.eventId)} className="px-3 bg-rose-50 hover:bg-rose-600 text-rose-600 hover:text-white border border-rose-200 dark:border-rose-900/40 rounded-xl transition cursor-pointer flex items-center justify-center" title="ইভেন্ট ডিলিট করুন">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}