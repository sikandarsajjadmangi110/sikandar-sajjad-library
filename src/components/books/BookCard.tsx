"use client";

import Link from "next/link";
import Image from "next/image";
import { BookOpen, Download, Headphones, ShieldCheck, Star } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import type { Book } from "@/types/book";

const BADGE_STYLES: Record<string, string> = {
  verified_source:   "bg-emerald-100 text-emerald-800 border-emerald-200",
  scholar_reviewed:  "bg-purple-100 text-purple-800 border-purple-200",
  classical_text:    "bg-amber-100 text-amber-800 border-amber-200",
  modern_research:   "bg-blue-100 text-blue-800 border-blue-200",
  audio_available:   "bg-violet-100 text-violet-800 border-violet-200",
  fiqh_sensitive:    "bg-red-100 text-red-800 border-red-200",
  citation_ready:    "bg-teal-100 text-teal-800 border-teal-200",
};

const LANGUAGE_FLAG: Record<string, string> = {
  en:    "🇬🇧",
  ur:    "🇵🇰",
  ar:    "🇸🇦",
  multi: "🌐",
};

interface BookCardProps {
  book: Book;
  variant?: "grid" | "list";
  className?: string;
}

export function BookCard({ book, variant = "grid", className }: BookCardProps) {
  if (variant === "list") {
    return (
      <Link href={`/book/${book.slug}`} className={cn("card-library flex gap-4 p-4 group", className)}>
        <div className="w-16 h-24 relative flex-shrink-0 rounded-lg overflow-hidden bg-sand-200">
          {book.cover_image_url ? (
            <Image src={book.cover_image_url} alt={book.title} fill className="object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-sand-400" />
            </div>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-navy-900 text-sm group-hover:text-emerald-700 truncate">
            {book.title}
          </h3>
          <p className="text-sand-500 text-xs mt-0.5">{book.author?.name}</p>
          <p className="text-navy-600 text-xs mt-1 line-clamp-2">{book.description}</p>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-xs text-sand-500">{LANGUAGE_FLAG[book.language]}</span>
            {book.verification_status === "verified" && (
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            )}
            {book.pdf_available  && <Download   className="w-3.5 h-3.5 text-blue-500" />}
            {book.audio_available && <Headphones className="w-3.5 h-3.5 text-violet-500" />}
          </div>
        </div>
      </Link>
    );
  }

  // Grid variant
  return (
    <Link
      href={`/book/${book.slug}`}
      className={cn("card-library flex flex-col group overflow-hidden", className)}
    >
      {/* Cover */}
      <div className="relative w-full aspect-[3/4] bg-gradient-to-br from-sand-100 to-sand-200 overflow-hidden">
        {book.cover_image_url ? (
          <Image
            src={book.cover_image_url}
            alt={book.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center gap-2 p-4 text-center">
            <div className="w-12 h-12 rounded-xl bg-emerald-gradient flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <p className="text-navy-700 font-semibold text-xs line-clamp-3">{book.title}</p>
          </div>
        )}

        {/* Language badge */}
        <div className="absolute top-2 left-2">
          <span className="bg-navy-900/80 text-white text-xs px-2 py-0.5 rounded-full backdrop-blur-sm">
            {LANGUAGE_FLAG[book.language]} {book.language.toUpperCase()}
          </span>
        </div>

        {/* Verified badge */}
        {book.verification_status === "verified" && (
          <div className="absolute top-2 right-2">
            <ShieldCheck className="w-5 h-5 text-emerald-400 drop-shadow-md" />
          </div>
        )}

        {/* Featured star */}
        {book.featured && (
          <div className="absolute bottom-2 right-2">
            <Star className="w-4 h-4 text-gold-400 fill-gold-400 drop-shadow-md" />
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-3 flex flex-col flex-1">
        <h3 className="font-semibold text-navy-900 text-sm leading-snug line-clamp-2 group-hover:text-emerald-700 transition-colors">
          {book.title}
        </h3>

        {book.author && (
          <p className="text-sand-500 text-xs mt-1 truncate">
            {book.author.name}
          </p>
        )}

        {book.category && (
          <p className="text-emerald-600 text-xs mt-0.5 truncate">
            {book.category.name}
          </p>
        )}

        {/* Capability icons */}
        <div className="flex items-center gap-2 mt-auto pt-3 border-t border-sand-100">
          {book.pdf_available && (
            <span title="PDF Available" className="flex items-center gap-1 text-xs text-blue-600">
              <Download className="w-3 h-3" /> PDF
            </span>
          )}
          {book.audio_available && (
            <span title="Audio Available" className="flex items-center gap-1 text-xs text-violet-600">
              <Headphones className="w-3 h-3" /> Audio
            </span>
          )}
          {book.is_beginner_friendly && (
            <span className="ml-auto text-xs bg-emerald-50 text-emerald-700 px-1.5 py-0.5 rounded-full">
              Beginner
            </span>
          )}
        </div>

        {/* Scholar Review Badge */}
        {book.scholar_review_status === "approved" && (
          <div className="mt-2">
            <span className="badge bg-purple-50 text-purple-700 border border-purple-100 text-xs">
              <ShieldCheck className="w-3 h-3" /> Scholar Reviewed
            </span>
          </div>
        )}
      </div>
    </Link>
  );
}

/* Skeleton loader */
export function BookCardSkeleton({ variant = "grid" }: { variant?: "grid" | "list" }) {
  if (variant === "list") {
    return (
      <div className="card-library flex gap-4 p-4">
        <div className="w-16 h-24 skeleton rounded-lg" />
        <div className="flex-1 space-y-2">
          <div className="h-4 skeleton rounded w-3/4" />
          <div className="h-3 skeleton rounded w-1/2" />
          <div className="h-3 skeleton rounded w-full" />
        </div>
      </div>
    );
  }
  return (
    <div className="card-library overflow-hidden">
      <div className="aspect-[3/4] skeleton" />
      <div className="p-3 space-y-2">
        <div className="h-4 skeleton rounded w-3/4" />
        <div className="h-3 skeleton rounded w-1/2" />
        <div className="h-3 skeleton rounded w-1/3" />
      </div>
    </div>
  );
}
