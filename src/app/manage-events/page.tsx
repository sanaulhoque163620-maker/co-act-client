"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useApp } from "@/context/AppContext";
import { Trash2, Edit, Calendar, MapPin } from "lucide-react";

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

export default function ManageEventsPage() {
  const router = useRouter();
  const { user, showToast } = useApp();
  const [myEvents, setMyEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);

  const [editingEvent, setEditingEvent] = useState<EventItem | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDesc, setEditDesc] = useState("");
  const [editLocation, setEditLocation] = useState("");

  useEffect(() => {
    if (!user) {
      showToast("এই পেজটি অ্যাক্সেস করতে প্রথমে লগইন করুন", "error");
      router.push("/login");
      return;
    }

    const localCreatedKey = "custom_created_events";
    const localData = localStorage.getItem(localCreatedKey);
    let filteredList: EventItem[] = localData ? JSON.parse(localData).filter((e: EventItem) => e.creatorEmail === user.email) : [];

    fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/events/my-events?email=${user.email}`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          filteredList = [...filteredList, ...data];
        }
        const unique = filteredList.filter((v, i, a) => a.findIndex(t => t._id === v._id) === i);
        setMyEvents(unique);
        setLoading(false);
      })
      .catch(() => {
        setMyEvents(filteredList);
        setLoading(false);
      });
  }, [user, router, showToast]);

  const handleDelete = async (id: string) => {
    try {
      const localCreatedKey = "custom_created_events";
      const localData = localStorage.getItem(localCreatedKey);
      if (localData) {
        const parsed = JSON.parse(localData);
        const updated = parsed.filter((e: EventItem) => e._id !== id);
        localStorage.setItem(localCreatedKey, JSON.stringify(updated));
      }

      setMyEvents((prev) => prev.filter((e) => e._id !== id));
      showToast("ইভেন্টটি সফলভাবে ডিলিট করা হয়েছে", "success");

      await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/events/delete/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${user?.token}` }
      });
    } catch {}
  };

  const openEditModal = (event: EventItem) => {
    setEditingEvent(event);
    setEditTitle(event.title);
    setEditDesc(event.description);
    setEditLocation(event.location);
  };

  const handleUpdate = () => {
    if (!editTitle || !editDesc || !editLocation) {
      showToast("সবগুলো ঘর পূরণ করুন", "error");
      return;
    }

    const localCreatedKey = "custom_created_events";
    const localData = localStorage.getItem(localCreatedKey);
    if (localData && editingEvent) {
      const parsed = JSON.parse(localData);
      const updated = parsed.map((e: EventItem) => e._id === editingEvent._id ? { ...e, title: editTitle, description: editDesc, location: editLocation } : e);
      localStorage.setItem(localCreatedKey, JSON.stringify(updated));
    }

    setMyEvents((prev) => prev.map((e) => e._id === editingEvent?._id ? { ...e, title: editTitle, description: editDesc, location: editLocation } : e));
    showToast("ইভেন্টটি সফলভাবে আপডেট করা হয়েছে", "success");
    setEditingEvent(null);
  };

  if (loading) {
    return (
      <div className="w-full min-h-screen bg-white dark:bg-slate-950 flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-100 p-6 sm:p-12 transition-colors flex flex-col items-center">
      <div className="w-full max-w-6xl">
        <div className="mb-10 pb-6 border-b border-slate-100 dark:border-slate-800/60">
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight flex items-center gap-2">
            <span className="w-2.5 h-6 bg-blue-600 rounded-md inline-block" />
            আপনার তৈরি করা ইভেন্টসমূহ
          </h1>
        </div>

        {myEvents.length === 0 ? (
          <div className="w-full py-20 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-3xl flex flex-col items-center justify-center text-center">
            <p className="text-sm font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">আপনার তৈরি করা কোনো ইভেন্ট খুঁজে পাওয়া যায়নি</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {myEvents.map((event) => {
              const safeDate = new Date(event.eventDate).toLocaleDateString("bn-BD", { month: "long", day: "numeric", year: "numeric" });
              return (
                <div key={event._id} className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between group transition hover:shadow-md">
                  <div className="aspect-video w-full overflow-hidden bg-slate-100 dark:bg-slate-950 relative">
                    <picture>
                      <img src={event.thumbnailUrl.startsWith("http") || event.thumbnailUrl.startsWith("/") ? event.thumbnailUrl : "/winter.jpeg"} alt={event.title} className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).src = "/winter.jpeg"; }} />
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
                      <button onClick={() => openEditModal(event)} className="flex-1 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 hover:bg-blue-600 hover:text-white text-slate-700 dark:text-slate-300 font-black h-9 rounded-xl text-[10px] uppercase tracking-wider transition cursor-pointer flex items-center justify-center gap-1">
                        <Edit size={12} /> Edit
                      </button>
                      <button onClick={() => handleDelete(event._id)} className="px-3 bg-rose-50 hover:bg-rose-600 text-rose-600 hover:text-white border border-rose-200 dark:border-rose-800 rounded-xl transition cursor-pointer flex items-center justify-center">
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

      {editingEvent && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 w-full max-w-md shadow-2xl">
            <h2 className="text-sm font-black uppercase tracking-wider mb-4 text-blue-600">イভেন্ট তথ্য এডিট করুন</h2>
            <div className="space-y-4">
              <input type="text" value={editTitle} onChange={(e) => setEditTitle(e.target.value)} className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-semibold" placeholder="Title" />
              <textarea value={editDesc} onChange={(e) => setEditDesc(e.target.value)} className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-semibold resize-none" rows={3} placeholder="Description" />
              <input type="text" value={editLocation} onChange={(e) => setEditLocation(e.target.value)} className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-semibold" placeholder="Location" />
              <div className="flex gap-3 pt-2">
                <button onClick={() => setEditingEvent(null)} className="flex-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold h-10 rounded-xl text-xs uppercase tracking-wider cursor-pointer">Cancel</button>
                <button onClick={handleUpdate} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold h-10 rounded-xl text-xs uppercase tracking-wider cursor-pointer">Save Changes</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}