// In demo mode (no Supabase configured), dashboard is accessible without login.
// In production with Supabase configured, middleware handles the redirect.
export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
