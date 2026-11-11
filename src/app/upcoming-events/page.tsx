"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Calendar, MapPin } from "lucide-react";

interface EventItem {
  _id: string;
  title: string;
  description: string;
  location: string;
  eventType: string;
  thumbnailUrl: string;
  eventDate: string;
  creatorEmail: string;
}

const mockEvents: EventItem[] = [
  { _id: "m1", title: "শীতবস্ত্র বিতরণ কর্মসূচি ২০২৬", description: "দুস্থ ও অসহায় মানুষের মাঝে উষ্ণতা ছড়িয়ে দিতে আমাদের এই ক্ষুদ্র প্রয়াস।", location: "মিরপুর ১০, ঢাকা", eventType: "DONATION", thumbnailUrl: "/winter.jpeg", eventDate: "2026-12-05", creatorEmail: "admin@coact.org" },
  { _id: "m2", title: "বৃক্ষরোপণ ও পরিবেশ সচেতনতা কর্মসূচি", description: "সবুজ পৃথিবী গড়ার প্রত্যয়ে আমাদের এই অভিযান। আসুন সবাই গাছ লাগাই।", location: "ধানমন্ডি, ঢাকা", eventType: "PLANTATION", thumbnailUrl: "/tree-planting.jpeg", eventDate: "2026-12-12", creatorEmail: "admin@coact.org" },
  { _id: "m3", title: "রক্তদান ও প্রাথমিক স্বাস্থ্য ক্যাম্প", description: "আপনার রক্তে বাঁচতে পারে একটি প্রাণ। নিরাপদ রক্তদান কর্মসূচিতে অংশ নিন।", location: "মোহাম্মদপুর, ঢাকা", eventType: "DONATION", thumbnailUrl: "/blood-camp.jpeg", eventDate: "2026-12-18", creatorEmail: "admin@coact.org" },
  { _id: "m4", title: "খাদ্য বিতরণ কর্মসূচি", description: "ক্ষুধামুক্ত সমাজ গঠনে আমাদের নিয়মিত পুষ্টিকর খাদ্য বিতরণ প্রজেক্ট।", location: "মিরপুর, ঢাকা", eventType: "DONATION", thumbnailUrl: "/food-dist.jpeg", eventDate: "2026-12-25", creatorEmail: "admin@coact.org" },
  { _id: "m5", title: "পরিচ্ছন্নতা অভিযান", description: "আমাদের শহর আমাদের দায়িত্ব। নিজের চারপাশ পরিচ্ছন্ন রাখার সামাজিক সচেতনতা ক্যাম্পেইন।", location: "উত্তরা, ঢাকা", eventType: "CLEANUP", thumbnailUrl: "/clean.jpeg", eventDate: "2027-01-05", creatorEmail: "admin@coact.org" },
  { _id: "m6", title: "পুষ্টিকর খাদ্য বিতরণ", description: "বঞ্চিত শিশুদের মাঝে পুষ্টিকর খাবার ও ফলমূল বিতরণ কর্মসূচি।", location: "গাজীপুর, ঢাকা", eventType: "DONATION", thumbnailUrl: "/food-dis.jpeg", eventDate: "2027-01-12", creatorEmail: "admin@coact.org" }
];

export default function UpcomingEventsPage() {
  const router = useRouter();
  const [events, setEvents] = useState<EventItem[]>(mockEvents);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL || "https://co-act-platfrom-server.vercel.app"}/api/events/upcoming`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setEvents(data);
        }
      })
      .catch(() => {});
  }, []);

  return (
    <div className="w-full min-h-screen bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-100 p-6 sm:p-12 transition-colors duration-200 flex flex-col items-center">
      <div className="w-full max-w-6xl">
        <div className="mb-10 pb-6 border-b border-slate-100 dark:border-slate-800/60">
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight flex items-center gap-2">
            <span className="w-2.5 h-6 bg-blue-600 rounded-md inline-block" />
            আসন্ন স্বেচ্ছাসেবক ইভেন্টসমূহ
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => {
            const safeDate = new Date(event.eventDate).toLocaleDateString("bn-BD", { month: "long", day: "numeric", year: "numeric" });
            const rawUrl = event.thumbnailUrl ? event.thumbnailUrl.trim() : "";
            const safeImage = rawUrl.startsWith("http") || rawUrl.startsWith("/") ? rawUrl : "/" + rawUrl;

            return (
              <div key={event._id} className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/80 rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between group transition hover:shadow-md">
                <div className="aspect-video w-full overflow-hidden bg-slate-100 dark:bg-slate-950 relative">
                  <picture>
                    <img src={safeImage} alt={event.title} className="w-full h-full object-cover transition duration-300 group-hover:scale-103" onError={(e) => { (e.target as HTMLImageElement).src = "/winter.jpeg"; }} />
                  </picture>
                  <span className="absolute top-3 left-3 bg-blue-600 text-white border border-blue-500 px-2 py-0.5 rounded-md text-[9px] font-black uppercase tracking-wider">
                    {event.eventType}
                  </span>
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between gap-4">
                  <div>
                    <h2 className="text-sm font-black text-slate-800 dark:text-white uppercase tracking-tight line-clamp-1 mb-2">{event.title}</h2>
                    <div className="space-y-1.5 text-slate-400 dark:text-slate-500 text-[11px] font-bold">
                      <div className="flex items-center"><Calendar size={12} className="mr-1.5 text-blue-600" /><span>{safeDate}</span></div>
                      <div className="flex items-center"><MapPin size={12} className="mr-1.5 text-blue-600" /><span>{event.location}</span></div>
                    </div>
                  </div>
                  <button onClick={() => router.push(`/events/${event._id}`)} className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 hover:bg-blue-600 hover:text-white text-slate-700 dark:text-slate-300 font-black h-9 rounded-xl text-[10px] uppercase tracking-wider transition cursor-pointer flex items-center justify-center">
                    View Event
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}