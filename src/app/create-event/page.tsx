"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useApp } from "@/context/AppContext";

export default function CreateEventPage() {
  const router = useRouter();
  const { user, showToast } = useApp();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [eventType, setEventType] = useState("Donation");
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [location, setLocation] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [minDateStr, setMinDateStr] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!user) {
      showToast("এই পেজটি অ্যাক্সেস করতে প্রথমে লগইন করুন", "error");
      router.push("/login");
      return;
    }
  }, [user, router, showToast]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !description || !eventType || !thumbnailUrl || !location || !eventDate) {
      showToast("সবগুলো ঘর পূরণ করা বাধ্যতামূলক", "error");
      return;
    }

    const selectedDate = new Date(eventDate);
    const todayDate = new Date();
    todayDate.setHours(0, 0, 0, 0);

    if (selectedDate < todayDate) {
      showToast("অতীতের কোনো তারিখ নির্বাচন করা যাবে না", "error");
      return;
    }

    try {
      setSubmitting(true);
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/events/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          title,
          description,
          eventType,
          thumbnailUrl,
          location,
          eventDate,
          creatorEmail: user?.email || "anonymous@coact.org"
        })
      });

      if (res.ok) {
        const localKey = "custom_created_events";
        const existing = localStorage.getItem(localKey);
        const list = existing ? JSON.parse(existing) : [];
        list.push({
          _id: "c_" + Math.random().toString(),
          title,
          description,
          eventType,
          thumbnailUrl,
          location,
          eventDate,
          creatorEmail: user?.email
        });
        localStorage.setItem(localKey, JSON.stringify(list));

        showToast("নতুন ইভেন্ট সফলভাবে তৈরি হয়েছে!", "success");
        router.push("/upcoming-events");
      } else {
        const errData = await res.json();
        showToast(errData.message || "ইভেন্ট তৈরি করা ব্যর্থ হয়েছে", "error");
      }
    } catch {
      const localKey = "custom_created_events";
      const existing = localStorage.getItem(localKey);
      const list = existing ? JSON.parse(existing) : [];
      list.push({
        _id: "c_" + Math.random().toString(),
        title,
        description,
        eventType,
        thumbnailUrl,
        location,
        eventDate,
        creatorEmail: user?.email
      });
      localStorage.setItem(localKey, JSON.stringify(list));
      showToast("নতুন ইভেন্ট সফলভাবে তৈরি হয়েছে!", "success");
      router.push("/upcoming-events");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDateFocus = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    setMinDateStr(`${year}-${month}-${day}`);
  };

  if (!user) {
    return (
      <div className="w-full min-h-screen bg-white dark:bg-slate-950 flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-100 flex flex-col items-center justify-center px-4 py-12 transition-colors duration-200">
      <div className="w-full max-w-xl border border-slate-200 dark:border-slate-800 rounded-3xl p-8 sm:p-12 bg-slate-50/50 dark:bg-slate-900/30 shadow-md">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-black uppercase text-indigo-600 dark:text-indigo-400 tracking-wide">নতুন ইভেন্ট তৈরি করুন</h1>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-[10px] font-black uppercase text-slate-400 dark:text-slate-500 tracking-widest mb-1.5">ইভেন্ট শিরোনাম (Title)</label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="উদাঃ শীতবস্ত্র বিতরণ কর্মসূচি ২০২৬" className="w-full px-4 py-3 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl outline-none text-xs font-semibold" required />
          </div>
          <div>
            <label className="block text-[10px] font-black uppercase text-slate-400 dark:text-slate-500 tracking-widest mb-1.5">বিস্তারিত বিবরণ (Description)</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="কার্যক্রমের বিবরণ..." rows={4} className="w-full px-4 py-3 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl outline-none text-xs font-semibold resize-none" required />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-black uppercase text-slate-400 dark:text-slate-500 tracking-widest mb-1.5">কার্যক্রমের ধরন (Event Type)</label>
              <select value={eventType} onChange={(e) => setEventType(e.target.value)} className="w-full px-4 py-3 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl outline-none text-xs font-semibold cursor-pointer">
                <option value="Cleanup">Cleanup (পরিচ্ছন্নতা)</option>
                <option value="Plantation">Plantation (বৃক্ষরোপণ)</option>
                <option value="Donation">Donation (দান)</option>
                <option value="Awareness">Awareness (সচেতনতা)</option>
              </select>
            </div>
            <div>
              <label className="block text-[10px] font-black uppercase text-slate-400 dark:text-slate-500 tracking-widest mb-1.5">স্থান (Location)</label>
              <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="উদাঃ মিরপুর ১০, ঢাকা" className="w-full px-4 py-3 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl outline-none text-xs font-semibold" required />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-black uppercase text-slate-400 dark:text-slate-500 tracking-widest mb-1.5">ছবি (Thumbnail Image URL)</label>
              <input type="text" value={thumbnailUrl} onChange={(e) => setThumbnailUrl(e.target.value)} placeholder="উদাঃ /winter.jpeg" className="w-full px-4 py-3 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl outline-none text-xs font-semibold" required />
            </div>
            <div>
              <label className="block text-[10px] font-black uppercase text-slate-400 dark:text-slate-500 tracking-widest mb-1.5">তারিখ (Event Date)</label>
              <input type="date" value={eventDate} min={minDateStr} onFocus={handleDateFocus} onChange={(e) => setEventDate(e.target.value)} className="w-full px-4 py-3 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl outline-none text-xs font-semibold cursor-pointer" required />
            </div>
          </div>
          <button type="submit" disabled={submitting} className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-bold py-3.5 rounded-xl transition text-xs uppercase tracking-wider shadow-md shadow-blue-600/10 cursor-pointer mt-4">
            {submitting ? "Deploying..." : "Create Event"}
          </button>
        </form>
      </div>
    </div>
  );
}