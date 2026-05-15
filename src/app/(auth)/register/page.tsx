"use client";

import { useState } from "react";
import Link         from "next/link";
import { useRouter } from "next/navigation";
import { BookOpen, Eye, EyeOff, Loader2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { MARJAS }        from "@/lib/constants/marjas";

export default function RegisterPage() {
  const [name,     setName]     = useState("");
  const [email,    setEmail]    = useState("");
  const [password, setPassword] = useState("");
  const [marja,    setMarja]    = useState("");
  const [show,     setShow]     = useState(false);
  const [loading,  setLoading]  = useState(false);
  const [error,    setError]    = useState("");
  const router   = useRouter();
  const supabase = createClient();

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { error: err } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data:         { name, selected_marja: marja },
        emailRedirectTo: `${location.origin}/auth/callback`,
      },
    });

    if (err) {
      setError(err.message);
      setLoading(false);
    } else {
      router.push("/auth/verify-email");
    }
  }

  return (
    <div className="min-h-screen bg-ivory-100 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-emerald-gradient flex items-center justify-center mx-auto mb-4 shadow-lg">
            <BookOpen className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-navy-900">Create Your Account</h1>
          <p className="text-sand-500 text-sm mt-1">Join the library — it's free</p>
        </div>

        <div className="bg-white rounded-2xl border border-sand-200 shadow-sm p-8">
          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-navy-700 mb-1">Full Name</label>
              <input type="text" required value={name} onChange={(e) => setName(e.target.value)}
                placeholder="Yasir Sajjad"
                className="w-full px-4 py-3 rounded-xl border border-sand-200 bg-ivory-100 focus:outline-none focus:ring-2 focus:ring-emerald-400 text-sm" />
            </div>

            <div>
              <label className="block text-sm font-medium text-navy-700 mb-1">Email</label>
              <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full px-4 py-3 rounded-xl border border-sand-200 bg-ivory-100 focus:outline-none focus:ring-2 focus:ring-emerald-400 text-sm" />
            </div>

            <div>
              <label className="block text-sm font-medium text-navy-700 mb-1">Password</label>
              <div className="relative">
                <input type={show ? "text" : "password"} required value={password}
                  onChange={(e) => setPassword(e.target.value)} placeholder="Min. 8 characters"
                  className="w-full px-4 py-3 pr-10 rounded-xl border border-sand-200 bg-ivory-100 focus:outline-none focus:ring-2 focus:ring-emerald-400 text-sm" />
                <button type="button" onClick={() => setShow((s) => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-sand-400">
                  {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-navy-700 mb-1">
                Your Marja <span className="text-sand-400 font-normal">(optional)</span>
              </label>
              <select value={marja} onChange={(e) => setMarja(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-sand-200 bg-ivory-100 focus:outline-none focus:ring-2 focus:ring-emerald-400 text-sm text-navy-800">
                <option value="">Select your Marja...</option>
                {MARJAS.map((m) => (
                  <option key={m.id} value={m.id}>{m.name}</option>
                ))}
              </select>
            </div>

            {error && (
              <p className="text-red-600 text-xs bg-red-50 border border-red-200 rounded-lg px-3 py-2">{error}</p>
            )}

            <button type="submit" disabled={loading}
              className="btn-primary w-full flex items-center justify-center gap-2">
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
              Create Account
            </button>
          </form>

          <p className="text-center text-sm text-sand-500 mt-5">
            Already have an account?{" "}
            <Link href="/auth/login" className="text-emerald-600 hover:underline font-medium">Sign In</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
