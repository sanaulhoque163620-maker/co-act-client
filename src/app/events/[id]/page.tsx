"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useApp } from "@/context/AppContext";
import { MapPin, Calendar, Layers, ArrowLeft } from "lucide-react";

interface EventDetail {
  _id: string;
  title: string;
  description: string;
  location: string;
  eventType: string;
  thumbnailUrl: string;
  eventDate: string;
  creatorEmail: string;
}

const mockEvents: Record<string, EventDetail> = {
  m1: { _id: "m1", title: "শীতবস্ত্র বিতরণ কর্মসূচি ২০২৬", description: "দুস্থ ও অসহায় মানুষের মাঝে উষ্ণতা ছড়িয়ে দিতে আমাদের এই ক্ষুদ্র প্রয়াস। আপনার অব্যবহৃত বা নতুন শীতবস্ত্র দিয়ে আমাদের সাথে শরিক হোন।", location: "মিরপুর ১০, ঢাকা", eventType: "DONATION", thumbnailUrl: "/winter.jpeg", eventDate: "2026-12-05", creatorEmail: "admin@coact.org" },
  m2: { _id: "m2", title: "বৃক্ষরোপণ ও পরিবেশ সচেতনতা কর্মসূচি", description: "সবুজ পৃথিবী গড়ার প্রত্যয়ে আমাদের এই পরিচ্ছন্নতা ও বৃক্ষরোপণ অভিযান। আসুন সবাই মিলে অন্তত একটি করে গাছ লাগাই।", location: "ধানমন্ডি, ঢাকা", eventType: "PLANTATION", thumbnailUrl: "/tree-planting.jpeg", eventDate: "2026-12-12", creatorEmail: "admin@coact.org" },
  m3: { _id: "m3", title: "রক্তদান ও প্রাথমিক স্বাস্থ্য ক্যাম্প", description: "আপনার রক্তে বাঁচতে পারে একটি প্রাণ। সম্পূর্ণ বিনামূল্যে স্বাস্থ্য পরীক্ষা এবং নিরাপদ রক্তদান কর্মসূচিতে অংশ নিন।", location: "মোহাম্মদপুর, ঢাকা", eventType: "DONATION", thumbnailUrl: "/blood-camp.jpeg", eventDate: "2026-12-18", creatorEmail: "admin@coact.org" },
  m4: { _id: "m4", title: "খাদ্য বিতরণ কর্মসূচি", description: "ক্ষুধামুক্ত সমাজ গঠনে আমাদের নিয়মিত পুষ্টিকর খাদ্য বিতরণ প্রজেক্ট।", location: "মিরপুর, ঢাকা", eventType: "DONATION", thumbnailUrl: "/food-dist.jpeg", eventDate: "2026-12-25", creatorEmail: "admin@coact.org" },
  m5: { _id: "m5", title: "পরিচ্ছন্নতা অভিযান", description: "আমাদের শহর আমাদের দায়িত্ব। নিজের চারপাশ পরিচ্ছন্ন রাখার সামাজিক সচেতনতা ক্যাম্পেইন।", location: "উত্তরা, ঢাকা", eventType: "CLEANUP", thumbnailUrl: "/clean.jpeg", eventDate: "2027-01-05", creatorEmail: "admin@coact.org" },
  m6: { _id: "m6", title: "পুষ্টিকর খাদ্য বিতরণ", description: "বঞ্চিত শিশুদের মাঝে পুষ্টিকর খাবার ও ফলমূল বিতরণ কর্মসূচি।", location: "গাজীপুর, ঢাকা", eventType: "DONATION", thumbnailUrl: "/food-dis.jpeg", eventDate: "2027-01-12", creatorEmail: "admin@coact.org" }
};

export default function EventDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { user, showToast } = useApp();
  
  const [event, setEvent] = useState<EventDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [urlId, setUrlId] = useState<string>("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const idFromPath = window.location.pathname.split("/").pop() || "";
      
      setTimeout(() => {
        setUrlId(idFromPath);
        if (idFromPath && mockEvents[idFromPath]) {
          setEvent(mockEvents[idFromPath]);
          setLoading(false);
        } else if (idFromPath) {
          fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/events/details/${idFromPath}`)
            .then((res) => res.json())
            .then((data) => {
              if (data && data._id) {
                setEvent(data);
              }
              setLoading(false);
            })
            .catch(() => {
              setLoading(false);
            });
        }
      }, 0);
    }
  }, [params]);

  const handleJoinEvent = async () => {
    if (!user) {
      showToast("ইভেন্টে যোগ দিতে প্রথমে লগইন করুন", "error");
      router.push("/login");
      return;
    }

    const targetId = urlId || window.location.pathname.split("/").pop() || "";
    const localKey = `joined_${user.email}`;
    const existing = localStorage.getItem(localKey);
    const list: Record<string, string>[] = existing ? JSON.parse(existing) : [];

    const isAlreadyJoined = list.some((item) => item.eventId === targetId);
    if (isAlreadyJoined) {
      showToast("আপনি ইতিমধ্যেই এই ইভেন্টটিতে যোগদান করেছেন!", "error");
      router.push("/joined-events");
      return;
    }

    try {
      const currentEvent = event || mockEvents[targetId];

      const newJoinItem = {
        _id: Math.random().toString(),
        eventId: targetId,
        title: currentEvent?.title || "শীতবস্ত্র বিতরণ কর্মসূচি ২০২৬",
        location: currentEvent?.location || "মিরপুর ১০, ঢাকা",
        eventType: currentEvent?.eventType || "DONATION",
        thumbnailUrl: currentEvent?.thumbnailUrl || "/winter.jpeg",
        eventDate: currentEvent?.eventDate || "2026-12-05",
        userEmail: user.email
      };

      list.push(newJoinItem);
      localStorage.setItem(localKey, JSON.stringify(list));

      await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/events/join`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`
        },
        body: JSON.stringify({ eventId: targetId, userEmail: user.email })
      });

      showToast("সফলভাবে ইভেন্টে যোগদান করেছেন!", "success");
      router.push("/joined-events");
    } catch {
      showToast("সফলভাবে ইভেন্টে যোগদান করেছেন!", "success");
      router.push("/joined-events");
    }
  };

  if (loading) {
    return (
      <div className="w-full min-h-screen bg-white dark:bg-slate-950 flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const activeEvent = event || (urlId ? mockEvents[urlId] : null);

  if (!activeEvent) {
    return (
      <div className="w-full min-h-screen bg-white dark:bg-slate-950 flex flex-col items-center justify-center gap-4">
        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">ইভেন্টটি খুঁজে পাওয়া যায়নি</p>
        <button onClick={() => router.back()} className="text-xs font-bold text-blue-600 flex items-center gap-1.5"><ArrowLeft size={14} /> ফিরে যান</button>
      </div>
    );
  }

  const rawUrl = activeEvent.thumbnailUrl ? activeEvent.thumbnailUrl.trim() : "";
  const safeImage = rawUrl.startsWith("http") || rawUrl.startsWith("/") ? rawUrl : "/" + rawUrl;
  const safeDate = activeEvent.eventDate ? new Date(activeEvent.eventDate).toLocaleDateString("bn-BD", { month: "long", day: "numeric", year: "numeric" }) : "আসন্ন";
  return (
    <div className="w-full min-h-screen bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-100 flex flex-col items-center justify-center p-6 transition-colors duration-200">
      
      <div className="w-full max-w-4xl bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/80 rounded-3xl overflow-hidden shadow-xl flex flex-col md:flex-row items-stretch gap-6 p-6">
        
        <div className="w-full md:w-1/2 aspect-4/3 md:aspect-auto rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-950 relative">
          <picture>
            <img src={safeImage} alt={activeEvent.title} className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).src = "/winter.jpeg"; }} />
          </picture>
        </div>

        <div className="w-full md:w-1/2 flex flex-col justify-between py-2 px-1">
          <div>
            <div className="flex items-center space-x-1.5 mb-3">
              <Layers size={14} className="text-blue-600 dark:text-blue-400" />
              <span className="inline-block bg-indigo-50 dark:bg-indigo-950/50 text-blue-600 dark:text-blue-400 border border-indigo-100 dark:border-indigo-900/40 px-2.5 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider">
                TYPE: {activeEvent.eventType || "DONATION"}
              </span>
            </div>

            <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight line-clamp-2 mb-4">
              {activeEvent.title}
            </h1>

            <div className="space-y-2 mb-6">
              <div className="flex items-center text-slate-500 dark:text-slate-400 text-xs font-semibold">
                <Calendar size={14} className="mr-2 text-blue-600 shrink-0" />
                <span>তারিখ: {safeDate}</span>
              </div>
              <div className="flex items-center text-slate-500 dark:text-slate-400 text-xs font-semibold">
                <MapPin size={14} className="mr-2 text-blue-600 shrink-0" />
                <span className="line-clamp-1">স্থান: {activeEvent.location}</span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-medium mb-6">
              {activeEvent.description}
            </p>
          </div>

          <div className="pt-4 border-t border-slate-100 dark:border-slate-800/60 flex flex-col sm:flex-row gap-3">
            <button onClick={() => router.back()} className="flex-1 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold h-11 rounded-xl text-xs uppercase tracking-wider flex items-center justify-center space-x-1.5 transition cursor-pointer">
              <ArrowLeft size={14} />
              <span>Back</span>
            </button>

            <button onClick={handleJoinEvent} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold h-11 rounded-xl text-xs uppercase tracking-wider flex items-center justify-center transition shadow-md shadow-blue-600/10 cursor-pointer">
              Join Event
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}