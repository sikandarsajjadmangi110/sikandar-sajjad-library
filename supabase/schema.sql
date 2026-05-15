-- ============================================================
-- THE SIKANDAR SAJJAD DIGITAL LIBRARY — COMPLETE SCHEMA
-- Run this in Supabase SQL Editor (Dashboard → SQL Editor → New Query)
-- ============================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- ── USERS ──────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS users (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name            VARCHAR(200) NOT NULL,
    email           VARCHAR(255) UNIQUE NOT NULL,
    avatar_url      TEXT,
    role            VARCHAR(50) DEFAULT 'reader'
                    CHECK (role IN ('reader','editor','scholar_reviewer',
                                    'audio_manager','community_mod','super_admin')),
    selected_marja  VARCHAR(100),
    preferred_lang  VARCHAR(10) DEFAULT 'en',
    reading_streak  INT DEFAULT 0,
    last_active     TIMESTAMPTZ,
    created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- ── AUTHORS ────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS authors (
    id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name        VARCHAR(300) NOT NULL,
    name_ur     VARCHAR(300),
    name_ar     VARCHAR(300),
    slug        VARCHAR(300) UNIQUE NOT NULL,
    bio         TEXT,
    bio_ur      TEXT,
    language    VARCHAR(10),
    era         VARCHAR(100),
    image_url   TEXT,
    is_scholar  BOOLEAN DEFAULT FALSE,
    created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- ── CATEGORIES ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS categories (
    id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name        VARCHAR(200) NOT NULL,
    name_ur     VARCHAR(200),
    name_ar     VARCHAR(200),
    slug        VARCHAR(200) UNIQUE NOT NULL,
    parent_id   UUID REFERENCES categories(id),
    icon        VARCHAR(100),
    description TEXT,
    sort_order  INT DEFAULT 0,
    created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- ── BOOKS ──────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS books (
    id                    UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title                 VARCHAR(500) NOT NULL,
    title_ur              VARCHAR(500),
    title_ar              VARCHAR(500),
    slug                  VARCHAR(500) UNIQUE NOT NULL,
    author_id             UUID REFERENCES authors(id),
    translator_name       VARCHAR(300),
    description           TEXT,
    description_ur        TEXT,
    language              VARCHAR(10) NOT NULL DEFAULT 'ar',
    category_id           UUID REFERENCES categories(id),
    pdf_url               TEXT,
    cover_image_url       TEXT,
    audio_url             TEXT,
    publication_year      INT,
    publisher             VARCHAR(300),
    edition               VARCHAR(100),
    total_pages           INT,
    source_reference      TEXT,
    verification_status   VARCHAR(50) DEFAULT 'pending'
                          CHECK (verification_status IN ('pending','verified','rejected','under_review')),
    scholar_review_status VARCHAR(50) DEFAULT 'unreviewed'
                          CHECK (scholar_review_status IN ('unreviewed','approved','flagged')),
    is_classical_text     BOOLEAN DEFAULT FALSE,
    is_rare_manuscript    BOOLEAN DEFAULT FALSE,
    is_beginner_friendly  BOOLEAN DEFAULT FALSE,
    download_allowed      BOOLEAN DEFAULT TRUE,
    audio_available       BOOLEAN DEFAULT FALSE,
    pdf_available         BOOLEAN DEFAULT FALSE,
    marja_related         VARCHAR(100),
    fiqh_sensitive        BOOLEAN DEFAULT FALSE,
    tags                  TEXT[],
    view_count            INT DEFAULT 0,
    download_count        INT DEFAULT 0,
    featured              BOOLEAN DEFAULT FALSE,
    created_at            TIMESTAMPTZ DEFAULT NOW(),
    updated_at            TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_books_fts ON books
    USING GIN (to_tsvector('english', title || ' ' || COALESCE(description,'')));
CREATE INDEX IF NOT EXISTS idx_books_language   ON books(language);
CREATE INDEX IF NOT EXISTS idx_books_category   ON books(category_id);
CREATE INDEX IF NOT EXISTS idx_books_verified   ON books(verification_status);

-- ── BADGE TYPES ────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS badge_types (
    id    SERIAL PRIMARY KEY,
    name  VARCHAR(100) UNIQUE NOT NULL,
    label VARCHAR(200) NOT NULL,
    color VARCHAR(50)
);

INSERT INTO badge_types (name, label, color) VALUES
  ('verified_source',   'Verified Source',             '#059669'),
  ('scholar_reviewed',  'Scholar Reviewed',             '#7c3aed'),
  ('classical_text',    'Classical Text',               '#92400e'),
  ('modern_research',   'Modern Research',              '#1d4ed8'),
  ('urdu_available',    'Urdu Available',               '#b45309'),
  ('english_available', 'English Available',            '#0369a1'),
  ('arabic_original',   'Arabic Original',              '#047857'),
  ('audio_available',   'Audio Available',              '#6d28d9'),
  ('citation_ready',    'Citation Ready',               '#0f766e'),
  ('fiqh_sensitive',    'Scholar Review Recommended',   '#dc2626')
ON CONFLICT (name) DO NOTHING;

-- ── BOOK BADGES ────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS book_badges (
    book_id  UUID REFERENCES books(id) ON DELETE CASCADE,
    badge_id INT  REFERENCES badge_types(id),
    PRIMARY KEY (book_id, badge_id)
);

-- ── VERIFICATIONS ──────────────────────────────────────────
CREATE TABLE IF NOT EXISTS verifications (
    id                UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    book_id           UUID REFERENCES books(id) ON DELETE CASCADE,
    reviewer_id       UUID REFERENCES users(id),
    reviewer_name     VARCHAR(300),
    verification_note TEXT,
    status            VARCHAR(50) CHECK (status IN ('approved','flagged','pending')),
    reviewed_at       TIMESTAMPTZ DEFAULT NOW()
);

-- ── BOOKMARKS ──────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS bookmarks (
    id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id     UUID REFERENCES users(id) ON DELETE CASCADE,
    book_id     UUID REFERENCES books(id) ON DELETE CASCADE,
    page_number INT,
    note        TEXT,
    color       VARCHAR(20) DEFAULT 'yellow',
    created_at  TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE (user_id, book_id, page_number)
);

-- ── READING PROGRESS ───────────────────────────────────────
CREATE TABLE IF NOT EXISTS reading_progress (
    user_id    UUID REFERENCES users(id) ON DELETE CASCADE,
    book_id    UUID REFERENCES books(id) ON DELETE CASCADE,
    last_page  INT DEFAULT 1,
    percentage NUMERIC(5,2) DEFAULT 0,
    started_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    PRIMARY KEY (user_id, book_id)
);

-- ── USER SHELF ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS user_shelf (
    user_id  UUID REFERENCES users(id) ON DELETE CASCADE,
    book_id  UUID REFERENCES books(id) ON DELETE CASCADE,
    saved_at TIMESTAMPTZ DEFAULT NOW(),
    PRIMARY KEY (user_id, book_id)
);

-- ── ILM JOURNAL ────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS ilm_journal (
    id             UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id        UUID REFERENCES users(id) ON DELETE CASCADE,
    title          VARCHAR(500),
    content        TEXT NOT NULL,
    linked_book_id UUID REFERENCES books(id),
    linked_page    INT,
    type           VARCHAR(50) DEFAULT 'reflection'
                   CHECK (type IN ('reflection','highlight','goal','dua_reminder','note')),
    is_private     BOOLEAN DEFAULT TRUE,
    created_at     TIMESTAMPTZ DEFAULT NOW()
);

-- ── HALAQAS ────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS halaqas (
    id             UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title          VARCHAR(500) NOT NULL,
    description    TEXT,
    scholar_name   VARCHAR(300),
    scholar_id     UUID REFERENCES users(id),
    category_id    UUID REFERENCES categories(id),
    date           TIMESTAMPTZ,
    duration_mins  INT,
    meeting_link   TEXT,
    is_recorded    BOOLEAN DEFAULT FALSE,
    recording_url  TEXT,
    max_attendees  INT,
    is_public      BOOLEAN DEFAULT TRUE,
    status         VARCHAR(50) DEFAULT 'upcoming'
                   CHECK (status IN ('upcoming','live','completed','cancelled')),
    created_at     TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS halaqa_enrollments (
    user_id     UUID REFERENCES users(id) ON DELETE CASCADE,
    halaqa_id   UUID REFERENCES halaqas(id) ON DELETE CASCADE,
    enrolled_at TIMESTAMPTZ DEFAULT NOW(),
    completed   BOOLEAN DEFAULT FALSE,
    PRIMARY KEY (user_id, halaqa_id)
);

-- ── MANUSCRIPTS ────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS manuscripts (
    id                UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title             VARCHAR(500) NOT NULL,
    title_ur          VARCHAR(500),
    description       TEXT,
    uploader_id       UUID REFERENCES users(id),
    uploader_name     VARCHAR(300),
    file_url          TEXT,
    cover_url         TEXT,
    language          VARCHAR(10),
    estimated_era     VARCHAR(200),
    physical_location VARCHAR(300),
    status            VARCHAR(50) DEFAULT 'pending'
                      CHECK (status IN ('pending','under_review','verified','archived')),
    verification_note TEXT,
    verified_by       UUID REFERENCES users(id),
    created_at        TIMESTAMPTZ DEFAULT NOW()
);

-- ── DAILY CONTENT ──────────────────────────────────────────
CREATE TABLE IF NOT EXISTS daily_content (
    id           UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    type         VARCHAR(50) CHECK (type IN ('hadith','dua','quote')),
    text_ar      TEXT,
    text_en      TEXT,
    text_ur      TEXT,
    source       VARCHAR(500),
    display_date DATE UNIQUE,
    created_at   TIMESTAMPTZ DEFAULT NOW()
);

-- ── ILM ASSISTANT LOGS ─────────────────────────────────────
CREATE TABLE IF NOT EXISTS ilm_assistant_logs (
    id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id       UUID REFERENCES users(id),
    question      TEXT NOT NULL,
    answer        TEXT,
    sources_cited JSONB,
    language      VARCHAR(10),
    flagged       BOOLEAN DEFAULT FALSE,
    created_at    TIMESTAMPTZ DEFAULT NOW()
);

-- ── HELPER FUNCTION ────────────────────────────────────────
CREATE OR REPLACE FUNCTION increment_view_count(book_id UUID)
RETURNS void AS $$
  UPDATE books SET view_count = view_count + 1 WHERE id = book_id;
$$ LANGUAGE sql;

-- ── ROW LEVEL SECURITY ─────────────────────────────────────
ALTER TABLE users           ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookmarks       ENABLE ROW LEVEL SECURITY;
ALTER TABLE reading_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_shelf      ENABLE ROW LEVEL SECURITY;
ALTER TABLE ilm_journal     ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users manage own bookmarks"
    ON bookmarks FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users manage own reading progress"
    ON reading_progress FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users manage own shelf"
    ON user_shelf FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users manage own journal"
    ON ilm_journal FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Books are publicly readable"
    ON books FOR SELECT USING (true);

CREATE POLICY "Categories are publicly readable"
    ON categories FOR SELECT USING (true);

CREATE POLICY "Authors are publicly readable"
    ON authors FOR SELECT USING (true);

-- ============================================================
-- SEED DATA — Categories
-- ============================================================
INSERT INTO categories (name, name_ur, name_ar, slug, icon, sort_order) VALUES
  ('Quran & Tafsir',           'قرآن و تفسیر',        'القرآن والتفسير',  'quran-tafsir',         '📖', 1),
  ('Hadith',                   'احادیث',              'الحديث',          'hadith',               '📜', 2),
  ('Aqaed / Beliefs',          'عقائد',               'العقائد',         'aqaed-beliefs',        '🕌', 3),
  ('Fiqh',                     'فقہ',                 'الفقه',           'fiqh',                 '⚖️', 4),
  ('Marja / Risalah Amaliyya', 'مرجع / رسالہ عملیہ', 'رسالة عملية',    'marja-risalah',        '🎓', 5),
  ('History',                  'تاریخ',               'التاريخ',         'history',              '🏛️', 6),
  ('Seerah',                   'سیرت',                'السيرة',          'seerah',               '⭐', 7),
  ('Ahlulbaytؑ',               'اہلِ بیتؑ',           'أهل البيت',       'ahlulbayt',            '🌹', 8),
  ('Imam Aliؑ',                'امام علیؑ',           'الإمام علي',      'imam-ali',             '🦁', 9),
  ('Imam Hussainؑ & Karbala',  'امام حسینؑ و کربلا', 'الإمام الحسين',   'imam-hussain-karbala', '🌷', 10),
  ('Nahj al-Balagha',          'نہج البلاغہ',         'نهج البلاغة',     'nahj-al-balagha',      '📚', 11),
  ('Sahifa Sajjadiya',         'صحیفہ سجادیہ',        'الصحيفة السجادية','sahifa-sajjadiya',     '🤲', 12),
  ('Duas & Ziyarat',           'دعائیں و زیارات',    'الأدعية والزيارات','duas-ziyarat',         '🌙', 13),
  ('Akhlaq',                   'اخلاق',               'الأخلاق',         'akhlaq',               '💎', 14),
  ('Spirituality / Irfan',     'روحانیت / عرفان',    'الروحانية والعرفان','spirituality-irfan',  '✨', 15),
  ('Urdu Books',               'اردو کتابیں',         'الكتب الأردية',    'urdu-books',           '📕', 16),
  ('English Books',            'انگریزی کتابیں',      'الكتب الإنجليزية', 'english-books',        '📗', 17),
  ('Arabic Books',             'عربی کتابیں',         'الكتب العربية',    'arabic-books',         '📘', 18),
  ('Children''s Islamic Books','بچوں کی اسلامی کتابیں','كتب إسلامية للأطفال','childrens-books',  '🎈', 19),
  ('Rare Manuscripts',         'نادر مخطوطات',        'المخطوطات النادرة', 'rare-manuscripts',    '🗿', 20)
ON CONFLICT (slug) DO NOTHING;

-- ── SEED: Sample Authors ────────────────────────────────────
INSERT INTO authors (name, name_ur, name_ar, slug, era, is_scholar) VALUES
  ('Imam Ali ibn Abi Talib (as)',  'امام علی ابن ابی طالبؑ',   'الإمام علي بن أبي طالب', 'imam-ali-ibn-abi-talib',  '1st Century Hijri', true),
  ('Imam Zain al-Abidin (as)',    'امام زین العابدینؑ',       'الإمام زين العابدين',     'imam-zain-al-abidin',     '1st Century Hijri', true),
  ('Sheikh Muhammad al-Kulayni',  'شیخ محمد الکلینی',         'الشيخ محمد الكليني',      'sheikh-kulayni',           '4th Century Hijri', true),
  ('Allamah Sayyid Tabatabai',    'علامہ سید طباطبائی',       'العلامة الطباطبائي',      'allamah-tabatabai',        'Contemporary',      true),
  ('Ayatollah Sayyid Sistani',    'آیت اللہ سید سیستانی',     'آية الله السيستاني',      'ayatollah-sistani',        'Contemporary',      true)
ON CONFLICT (slug) DO NOTHING;

-- ── SEED: Sample Books ─────────────────────────────────────
INSERT INTO books (
    title, title_ur, title_ar, slug, language,
    description, description_ur,
    publication_year, is_classical_text, is_beginner_friendly,
    verification_status, scholar_review_status,
    pdf_available, download_allowed, featured,
    source_reference
)
SELECT
    'Nahj al-Balagha',
    'نہج البلاغہ',
    'نهج البلاغة',
    'nahj-al-balagha',
    'ar',
    'The peak of eloquence — a collection of sermons, letters, and sayings of Imam Ali ibn Abi Talib (as), compiled by Sayyid al-Radi. One of the most important texts in Islamic literature.',
    'نہج البلاغہ — امام علی ابن ابی طالبؑ کے خطبات، خطوط اور اقوال کا مجموعہ، جو سید الرضی نے مرتب کیا۔',
    1010,
    true, false,
    'verified', 'approved',
    true, true, true,
    'Imam Ali ibn Abi Talib (as). Nahj al-Balagha. Compiled by Sayyid al-Radi, 400 AH. Multiple publishers.'
WHERE NOT EXISTS (SELECT 1 FROM books WHERE slug = 'nahj-al-balagha');

INSERT INTO books (
    title, title_ur, title_ar, slug, language,
    description, publication_year,
    is_classical_text, is_beginner_friendly,
    verification_status, scholar_review_status,
    pdf_available, download_allowed, featured, source_reference
)
SELECT
    'Sahifa Sajjadiya',
    'صحیفہ سجادیہ',
    'الصحيفة السجادية',
    'sahifa-sajjadiya',
    'ar',
    'The Psalms of Islam — a collection of 54 supplications by Imam Ali ibn al-Husayn Zain al-Abidin (as). Known as the sister of the Quran in spirituality and eloquence.',
    1000,
    true, false,
    'verified', 'approved',
    true, true, true,
    'Imam Zain al-Abidin (as). Al-Sahifah al-Kamilah al-Sajjadiyyah. 1st Century AH.'
WHERE NOT EXISTS (SELECT 1 FROM books WHERE slug = 'sahifa-sajjadiya');

INSERT INTO books (
    title, title_ur, slug, language,
    description, is_classical_text,
    verification_status, scholar_review_status,
    pdf_available, featured, source_reference
)
SELECT
    'Islamic Laws (Sistani)',
    'اسلامی احکام — سیستانی',
    'islamic-laws-sistani',
    'en',
    'The English translation of the Risalah Amaliyya of Grand Ayatollah Sayyid Ali al-Husayni al-Sistani. Covers all practical aspects of Islamic law for followers.',
    false,
    'verified', 'approved',
    true, false,
    'Ayatollah Sayyid Sistani. Islamic Laws (Tawdhih al-Masa''il). Translated from Persian/Arabic.'
WHERE NOT EXISTS (SELECT 1 FROM books WHERE slug = 'islamic-laws-sistani');

-- ── SEED: Daily Content ─────────────────────────────────────
INSERT INTO daily_content (type, text_ar, text_en, text_ur, source, display_date)
VALUES
  ('hadith',
   'طَلَبُ الْعِلْمِ فَرِيضَةٌ عَلَى كُلِّ مُسْلِمٍ',
   'Seeking knowledge is an obligation upon every Muslim.',
   'علم حاصل کرنا ہر مسلمان پر فرض ہے۔',
   'Prophet Muhammad (saw) | Bihar al-Anwar',
   CURRENT_DATE),
  ('hadith',
   'قِيمَةُ كُلِّ امْرِئٍ مَا يُحْسِنُهُ',
   'The value of a man is what he knows.',
   'انسان کی قدر وہی ہے جو وہ جانتا ہے۔',
   'Imam Ali (as) | Nahj al-Balagha, Hikam 81',
   CURRENT_DATE + 1),
  ('dua',
   'اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعِلْمَ النَّافِعَ',
   'O Allah, I ask You for beneficial knowledge.',
   'اے اللہ! میں آپ سے نفع بخش علم مانگتا ہوں۔',
   'Sahifa Sajjadiya',
   CURRENT_DATE + 2)
ON CONFLICT (display_date) DO NOTHING;

-- ============================================================
-- DONE. Your database is ready.
-- ============================================================
