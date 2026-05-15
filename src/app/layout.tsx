import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: {
    default:  "The Sikandar Sajjad Digital Library",
    template: "%s | Sikandar Sajjad Digital Library",
  },
  description:
    "Preserving Ahlulbayt knowledge for the digital age. Explore verified Shia Islamic books, hadith, fiqh, history, duas, ziyarat, lectures, and rare manuscripts.",
  keywords: [
    "Shia Islamic library", "Ahlulbayt books", "Islamic digital library",
    "Shia hadith", "Shia fiqh", "Nahj al-Balagha", "Sahifa Sajjadiya",
    "Islamic duas", "ziyarat", "Urdu Islamic books", "Arabic Islamic books",
  ],
  authors:   [{ name: "The Sikandar Sajjad Digital Library" }],
  creator:   "The Sikandar Sajjad Digital Library",
  openGraph: {
    type:        "website",
    locale:      "en_US",
    url:         "https://sikandar-library.com",
    siteName:    "Sikandar Sajjad Digital Library",
    title:       "The Sikandar Sajjad Digital Library",
    description: "Preserving Ahlulbayt Knowledge for the Digital Age",
    images: [{ url: "/images/og-image.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card:        "summary_large_image",
    title:       "The Sikandar Sajjad Digital Library",
    description: "Preserving Ahlulbayt Knowledge for the Digital Age",
    images:      ["/images/og-image.jpg"],
  },
  manifest: "/manifest.json",
  icons: {
    icon:  "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#059669",
  width:      "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <body className="min-h-screen flex flex-col">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
