"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { useApp } from "@/context/AppContext";

export default function LoginPage() {
  const router = useRouter();
  const { login, showToast } = useApp();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const handleEmailAction = async (e: React.FormEvent, isSignUp: boolean) => {
    e.preventDefault();
    if (!email || !password) {
      showToast("দয়া করে ইমেইল এবং পাসওয়ার্ড উভয়ই প্রদান করুন", "error");
      return;
    }

    try {
      setLoading(true);
      if (isSignUp) {
        const { data, error } = await authClient.signUp.email({
          email,
          password,
          name: email.split("@")[0],
        });

        if (error) {
          showToast(error.message || "নিবন্ধন ব্যর্থ হয়েছে", "error");
          return;
        }
        if (data?.user) {
          showToast("অ্যাকাউন্ট তৈরি সফল হয়েছে! এখন লগইন করুন।", "success");
        }
      } else {
        const { data, error } = await authClient.signIn.email({
          email,
          password,
        });

        if (error) {
          showToast(error.message || "লগইন ব্যর্থ হয়েছে, আবার চেষ্টা করুন", "error");
          return;
        }

        if (data?.user) {
          login({
            name: data.user.name,
            email: data.user.email,
            photoUrl: data.user.image || undefined,
            token: "better-auth-session"
          });
          showToast("সফলভাবে লগইন সম্পূর্ণ হয়েছে!", "success");
          router.push("/");
        }
      }
    } catch {
      showToast("নেটওয়ার্ক সংযোগ বা ডাটাবেজ রেসপন্স ত্রুটি", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setGoogleLoading(true);
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/"
      });
    } catch {
      showToast("গুগল সাইন-ইন ট্র্যান্সমিশন লিংক ফেইল করেছে", "error");
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-100 flex flex-col items-center justify-center px-4 py-12 transition-colors duration-200">
      <div className="w-full max-w-sm border border-slate-200 dark:border-slate-800 rounded-3xl p-8 sm:p-10 bg-slate-50/50 dark:bg-slate-900/30 shadow-md flex flex-col">
        
        <div className="text-center mb-8">
          <h1 className="text-2xl font-black tracking-tight text-slate-800 dark:text-white mb-2">
            স্বাগতম!
          </h1>
          <p className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wide">
            আপনার অ্যাকাউন্টে লগইন বা সাইন-আপ করুন
          </p>
        </div>

        <div className="space-y-5">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
              ইমেইল ঠিকানা (Email)
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="আপনার ইমেইল দিন..."
              className="w-full px-4 py-3 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl outline-none text-xs font-semibold focus:border-blue-600 transition"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
              পাসওয়ার্ড (Password)
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="আপনার পাসওয়ার্ড দিন..."
              className="w-full px-4 py-3 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl outline-none text-xs font-semibold focus:border-blue-600 transition"
              required
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button
              onClick={(e) => handleEmailAction(e, false)}
              disabled={loading}
              className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-bold h-11 rounded-xl text-xs uppercase tracking-wider flex items-center justify-center transition shadow-md cursor-pointer"
            >
              {loading ? "..." : "লগইন করুন"}
            </button>
            <button
              onClick={(e) => handleEmailAction(e, true)}
              disabled={loading}
              className="flex-1 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold h-11 rounded-xl text-xs uppercase tracking-wider flex items-center justify-center transition border border-slate-200 dark:border-slate-700 cursor-pointer"
            >
              সাইন-আপ
            </button>
          </div>
        </div>

        <div className="relative flex py-4 items-center justify-center my-2">
          <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest bg-transparent px-3">
            অথবা
          </span>
        </div>

        <button
          onClick={handleGoogleLogin}
          disabled={googleLoading}
          className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900 text-slate-700 dark:text-slate-200 font-bold h-11 rounded-xl text-xs flex items-center justify-center space-x-3 transition shadow-xs cursor-pointer disabled:opacity-50"
        >
          <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          <span>Gmail দিয়ে সরাসরি লগইন</span>
        </button>

      </div>
    </div>
  );
}