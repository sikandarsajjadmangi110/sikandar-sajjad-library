import Link     from "next/link";
import { Mail } from "lucide-react";

export default function VerifyEmailPage() {
  return (
    <div className="min-h-screen bg-ivory-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md text-center">
        <div className="w-16 h-16 rounded-2xl bg-emerald-gradient flex items-center justify-center mx-auto mb-6 shadow-lg">
          <Mail className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-2xl font-bold text-navy-900 mb-2">Check Your Email</h1>
        <p className="text-navy-600 mb-4">
          We sent a confirmation link to your email. Please click it to activate your account.
        </p>
        <p className="arabic-text text-emerald-700 text-lg mb-6">جزاكم الله خيرًا</p>
        <Link href="/auth/login" className="btn-primary inline-flex">
          Back to Login
        </Link>
      </div>
    </div>
  );
}
