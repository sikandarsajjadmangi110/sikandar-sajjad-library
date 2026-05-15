# The Sikandar Sajjad Digital Library
## Complete Development Plan

---

## TECH STACK

| Layer            | Technology                  | Reason                                          |
|------------------|-----------------------------|-------------------------------------------------|
| Frontend         | Next.js 14 (App Router)     | SSR, ISR, SEO, file-based routing               |
| Styling          | Tailwind CSS                | Utility-first, responsive, fast                 |
| UI Components    | shadcn/ui                   | Accessible, customizable                        |
| Database         | Supabase (PostgreSQL)       | Auth + DB + Storage + Realtime in one           |
| Storage          | Supabase Storage / R2       | PDFs, audio, images — globally distributed      |
| Auth             | Supabase Auth               | Email, Google OAuth, magic links                |
| Search           | PostgreSQL FTS → pgvector   | Start simple, upgrade to semantic               |
| AI (Future)      | Anthropic Claude + RAG      | Citation-required answers only                  |
| Hosting          | Vercel + Cloudflare          | Edge delivery, global CDN                       |
| Admin CMS        | Custom Next.js admin panel  | Full control over Islamic content workflows     |
| PWA              | next-pwa + manifest.json    | App-like on mobile, offline support             |

---

## MVP — PHASE 1 (Weeks 1–6)

### Must Have
- [x] Homepage with Hero, Categories, Recent Books
- [x] Library page with Filters (language, category, verification)
- [x] Book Detail page (cover, author, description, badges)
- [x] Online PDF Reader (basic navigation, night mode, font size)
- [x] User Auth (login, register, Google OAuth)
- [x] User Dashboard (continue reading, saved shelf)
- [x] Admin: Add/Edit/Delete books
- [x] Admin: Manage categories and authors
- [x] Book search (full-text via PostgreSQL)
- [x] Supabase integration (DB + Auth + Storage)
- [x] Responsive design (mobile-first)
- [x] Trust badges system
- [x] PWA manifest

### Database Tables (Phase 1)
- users, authors, categories, books, book_badges, badge_types
- bookmarks, reading_progress, user_shelf

---

## PHASE 2 — Features (Weeks 7–12)

- [ ] Ilm Journal (private notes, reflections, goals)
- [ ] Daily Hadith / Dua display system
- [ ] Halaqa Hub (list, enroll, attend halaqas)
- [ ] Marja-based Fiqh Filter (full browsing by Marja)
- [ ] Knowledge Tree (interactive visual map)
- [ ] Heritage Portal (manuscript submission)
- [ ] Advanced search (filters + sort)
- [ ] Reading streak + gamification
- [ ] Scholar Verification workflow
- [ ] Email notifications (Halaqa reminders, new books)
- [ ] Social sharing (copy link, share book)
- [ ] Citations export (BibTeX, plain text)

---

## PHASE 3 — Ilm Assistant AI (Weeks 13–20)

### Architecture
```
User Question
      ↓
Language Detection
      ↓
Embedding Generation (Anthropic embed)
      ↓
Vector Search (pgvector)
   → Find top 5 relevant passages from verified books
      ↓
Claude claude-sonnet-4-6 with:
  - System: Shia verified sources only
  - Context: Retrieved passages + citations
  - Rules: No fabrication, cite everything
      ↓
Answer + Citations returned
      ↓
Log to ilm_assistant_logs
```

### RAG Setup Steps
1. Add pgvector extension to Supabase
2. Create book_chunks table (book_id, page, text, embedding vector)
3. Chunk all verified PDFs (500-token chunks with 50-token overlap)
4. Generate embeddings via Anthropic embeddings API
5. Store in pgvector column
6. At query time: embed question → similarity search → retrieve chunks → pass to Claude

### pgvector schema addition
```sql
CREATE EXTENSION vector;
ALTER TABLE books ADD COLUMN embedding vector(1536);

CREATE TABLE book_chunks (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  book_id     UUID REFERENCES books(id),
  page_number INT,
  chunk_index INT,
  text        TEXT,
  embedding   vector(1536),
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX ON book_chunks USING ivfflat (embedding vector_cosine_ops);
```

---

## PHASE 4 — Scale & Polish (Months 5–6)

- [ ] Multilingual UI (i18n with next-intl)
- [ ] Urdu/Arabic UI direction toggle (RTL support)
- [ ] Audio book player (HTML5 + waveform)
- [ ] Certificate generation after Halaqa completion
- [ ] Scholar-moderated discussion forums
- [ ] Offline reading (Service Worker + IndexedDB)
- [ ] Analytics dashboard (admin)
- [ ] Advanced admin roles (super admin, editor, reviewer)
- [ ] API rate limiting and abuse protection

---

## ADMIN PANEL STRUCTURE

```
/admin
├── Dashboard          — Overview stats, recent additions
├── Books
│   ├── All Books      — Search, filter, bulk actions
│   ├── Add Book       — Full form (see AddBookPage)
│   ├── Edit Book      — Same form pre-filled
│   └── Verification   — Books awaiting review
├── Authors            — Add/Edit authors
├── Categories         — Manage category tree
├── Halaqas            — Schedule and manage halaqas
├── Manuscripts        — Heritage portal submissions
├── Users              — View users, assign roles
├── Scholar Reviewers  — Manage reviewer assignments
├── Daily Content      — Schedule hadith/duas
└── Analytics          — Views, downloads, popular books
```

### Admin Roles & Permissions
| Role               | Can Do                                                     |
|--------------------|-------------------------------------------------------------|
| super_admin        | Everything including role management                        |
| editor             | Add/edit books, authors, categories                         |
| scholar_reviewer   | Approve/flag books, add verification notes                  |
| audio_manager      | Upload and manage audio files only                          |
| community_mod      | Manage halaqa comments, discussion moderation               |

---

## TRUST FRAMEWORK — Implementation

### 1. No-Alteration Policy
- Every book upload goes through admin form with explicit check
- Source reference is required field for classical texts
- Scholar reviewer adds verification note before marking "verified"
- No-alteration note shown on every Book Detail page and Reader

### 2. Verification Workflow
```
Book Upload (Editor)
      ↓
status = "pending"
      ↓
Assigned to Scholar Reviewer
      ↓
Reviewer reads, checks source, adds note
      ↓
status = "verified" OR "flagged"
      ↓
If verified: visible in library
If flagged:  hidden, editor notified
```

### 3. Badge System
Badges are awarded manually by admins after verification:
- verified_source      → Source confirmed by scholar
- scholar_reviewed     → Full scholar review done
- classical_text       → Pre-modern Islamic text
- fiqh_sensitive       → Contains rulings → warns to consult Marja
- citation_ready       → Full citation metadata present

### 4. Sensitive Content Handling
- fiqh_sensitive flag shows warning banner on book detail
- IlmAssistant: all fiqh answers end with Marja disclaimer
- Historical differences: marked with "Multiple scholarly opinions exist"
- Translations: labeled with translator name, language, year

---

## SECURITY RECOMMENDATIONS

### Application Security
1. Row Level Security on all user tables (Supabase RLS)
2. Admin routes protected by role check in middleware
3. File uploads: validate MIME type + max size (PDF: 50MB, Audio: 200MB)
4. Rate limit Ilm Assistant API: 30 requests/hour per user
5. Input sanitization on all text fields
6. HTTPS only (enforced by Vercel + Cloudflare)
7. Security headers in next.config.ts (already added)
8. No direct SQL — use Supabase client only
9. Environment variables: never expose SERVICE_ROLE_KEY to client
10. Audit log for admin actions (admin_logs table)

### Content Integrity
1. SHA-256 hash of each PDF stored at upload time
2. Regular integrity check job (weekly cron)
3. Backup strategy: Supabase daily backups + R2 redundancy
4. Version history for book metadata edits

---

## CONTENT UPLOAD WORKFLOW

### New Book Addition
1. Editor logs into /admin
2. Fills Add Book form:
   - Title (EN + UR + AR)
   - Author name → system finds or creates author record
   - Category, Language, Marja relation
   - Description (EN + UR)
   - Publication details
   - Source reference (full citation)
   - Uploads cover image to Supabase Storage
   - Uploads PDF file to Supabase Storage / R2
   - Uploads audio (if available) to R2
   - Sets flags: pdf_available, audio_available, download_allowed
3. Book saved with verification_status = "pending"
4. Scholar reviewer notified
5. Scholar reviews source authenticity
6. Scholar approves → status = "verified" + adds badges
7. Book appears in library

### Manuscript Submission (Public)
1. User visits /heritage
2. Fills submission form with:
   - Title, description, estimated era
   - Physical location (if known)
   - Upload scanned PDF
3. Saved to manuscripts table with status = "pending"
4. Admin team reviews
5. If accepted: moved to library as rare_manuscript = true

---

## MOBILE / PWA PLAN

### PWA Features
- manifest.json with app name, icons, theme_color
- Service Worker (via next-pwa) for:
  - Cache static assets (fonts, icons, CSS)
  - Cache visited book pages
  - Offline fallback page
- Add to Home Screen prompt
- App-like navigation (no browser chrome)
- Push notifications for:
  - Upcoming halaqa reminders
  - New books in user's favorite category
  - Daily hadith

### Low-Bandwidth Mode
- Images: use Next.js Image with proper sizes
- PDFs: lazy-load pages (react-pdf loads one page at a time)
- Fonts: system font fallback before custom fonts load
- Skeleton loaders on all data fetches
- compress: true in next.config.ts

---

## DEVELOPMENT ROADMAP

### Week 1–2: Foundation
- [ ] Set up Next.js 14 project
- [ ] Install and configure Tailwind + shadcn/ui
- [ ] Set up Supabase project
- [ ] Run database schema (schema.sql)
- [ ] Configure Supabase Auth (email + Google)
- [ ] Set up Cloudflare R2 bucket
- [ ] Configure env variables
- [ ] Deploy skeleton to Vercel

### Week 3–4: Core Pages
- [ ] Homepage (Hero, Categories, Recent Books)
- [ ] Library page (grid + filters)
- [ ] Book Detail page
- [ ] Auth pages (login, register)
- [ ] Navbar, Footer

### Week 5–6: Reading & Dashboard
- [ ] PDF Reader (react-pdf integration)
- [ ] Reading progress tracking
- [ ] User Dashboard
- [ ] My Shelf / Bookmarks
- [ ] Admin: Add Book form

### Week 7–8: Content & Features
- [ ] Seed initial book data
- [ ] Daily Hadith system
- [ ] Halaqa Hub
- [ ] Marja Fiqh filter
- [ ] Knowledge Tree

### Week 9–10: Trust & Polish
- [ ] Scholar verification workflow
- [ ] Trust badge display
- [ ] Heritage Portal
- [ ] Ilm Journal

### Week 11–12: Launch Prep
- [ ] SEO (metadata, sitemap.xml, robots.txt)
- [ ] Performance audit (Lighthouse 90+)
- [ ] Accessibility audit (WCAG AA)
- [ ] Security audit
- [ ] PWA testing
- [ ] Load testing
- [ ] Content upload (initial 50+ books)

---

## LAUNCH CHECKLIST

### Technical
- [ ] All environment variables set in Vercel
- [ ] Supabase RLS policies active on all tables
- [ ] Database backed up
- [ ] Custom domain configured (sikandar-library.com)
- [ ] SSL/HTTPS confirmed
- [ ] Security headers verified
- [ ] Sitemap.xml generated and submitted to Google Search Console
- [ ] robots.txt configured (allow books, block admin)
- [ ] og:image set for all pages
- [ ] Favicon + Apple touch icons
- [ ] PWA manifest tested
- [ ] 404 and error pages styled

### Content
- [ ] Minimum 50 verified books uploaded
- [ ] All books have cover images
- [ ] At least 10 books have verified source badges
- [ ] At least 3 scholar-reviewed books
- [ ] Categories populated with at least 2 books each
- [ ] Daily hadith/dua loaded for next 30 days
- [ ] At least 2 halaqas scheduled
- [ ] About page written
- [ ] Trust Policy page written
- [ ] Privacy Policy written
- [ ] Terms of Use written

### Performance
- [ ] Lighthouse score: Performance > 90
- [ ] Lighthouse score: Accessibility > 90
- [ ] Lighthouse score: SEO > 95
- [ ] First Contentful Paint < 2s
- [ ] PDF loading optimized (progressive rendering)
- [ ] Images WebP format where possible

### Community
- [ ] Scholar reviewer accounts created
- [ ] Admin panel tested end-to-end
- [ ] Editor accounts created
- [ ] Beta testing with 5–10 trusted users

---

## SUGGESTED INITIAL BOOK LIST (Seed Data)

### Urdu Books
1. Nahj al-Balagha (Urdu translation)
2. Sahifa Sajjadiya (Urdu translation)
3. Mafatih al-Jinan (Urdu)
4. Risalah Amaliyya — Sistani (Urdu)
5. Aqaid-e-Islamiyya — Allamah Tabatabai

### Arabic Books
1. Nahj al-Balagha (Arabic)
2. Al-Kafi — Sheikh Kulayni (Selected)
3. Bihar al-Anwar (Selected volumes)
4. Maqtal al-Husayn — Abu Mikhnaf

### English Books
1. The Quran (Agha Pooya/Ali translation)
2. Peak of Eloquence (Nahj al-Balagha English)
3. Peshawar Nights — Sultanu'l-Waizin
4. Islam and the Contemporary World
5. Imam Husain & The Tragedy of Karbala
