import Link from "next/link";
import { BookOpen, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center">
      <div className="w-20 h-20 rounded-2xl bg-emerald-gradient flex items-center justify-center mb-6 shadow-lg">
        <BookOpen className="w-10 h-10 text-white" />
      </div>
      <h1 className="text-4xl font-bold text-navy-900 mb-2">404</h1>
      <p className="text-xl font-semibold text-navy-700 mb-2">Page Not Found</p>
      <p className="arabic-text text-emerald-700 text-lg mb-2">الصفحة غير موجودة</p>
      <p className="text-sand-500 text-sm mb-8 max-w-md">
        The page you are looking for does not exist or has been moved.
        Return to the library to continue your journey.
      </p>
      <div className="flex gap-3">
        <Link href="/" className="btn-primary flex items-center gap-2">
          <Home className="w-4 h-4" /> Go Home
        </Link>
        <Link href="/library" className="btn-outline flex items-center gap-2">
          <BookOpen className="w-4 h-4" /> Browse Library
        </Link>
      </div>
    </div>
  );
}
