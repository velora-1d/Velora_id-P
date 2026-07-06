-- ============================================
-- VELORA COMPLETE SAFE MIGRATION
-- Generated: 2026-07-06
--
-- Pakai file ini untuk database yang mungkin sudah punya sebagian schema.
-- Aman dijalankan ulang sejauh memungkinkan:
-- - CREATE TABLE IF NOT EXISTS
-- - ALTER TABLE ... ADD COLUMN IF NOT EXISTS
-- - CREATE INDEX IF NOT EXISTS
-- - DROP POLICY IF EXISTS sebelum CREATE POLICY
-- - TANPA SEED / TANPA INSERT DATA AWAL agar tidak duplikat
-- ============================================

-- ============================================
-- Base schema
-- ============================================
CREATE TABLE IF NOT EXISTS blog_posts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    content TEXT NOT NULL DEFAULT '',
    excerpt TEXT NOT NULL DEFAULT '',
    image_url TEXT DEFAULT '',
    category TEXT NOT NULL DEFAULT 'Technology',
    author TEXT NOT NULL DEFAULT 'Tim Velora',
    read_time TEXT DEFAULT '5 menit',
    published BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS portfolio_projects (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    category TEXT NOT NULL DEFAULT '',
    client TEXT NOT NULL DEFAULT '',
    description TEXT NOT NULL DEFAULT '',
    challenge TEXT DEFAULT '',
    solution TEXT DEFAULT '',
    tech TEXT DEFAULT '',
    image_url TEXT DEFAULT '',
    icon TEXT DEFAULT 'Globe',
    published BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS testimonials (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    role TEXT DEFAULT '',
    company TEXT DEFAULT '',
    content TEXT NOT NULL DEFAULT '',
    rating INTEGER DEFAULT 5,
    avatar_url TEXT DEFAULT '',
    published BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS contact_messages (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT DEFAULT '',
    subject TEXT DEFAULT '',
    message TEXT NOT NULL DEFAULT '',
    is_read BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS services (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    category_id TEXT NOT NULL,
    category_name TEXT NOT NULL,
    category_description TEXT DEFAULT '',
    category_gradient TEXT DEFAULT 'from-blue-500 to-indigo-600',
    icon_name TEXT DEFAULT 'Globe',
    title TEXT NOT NULL,
    description TEXT NOT NULL DEFAULT '',
    sort_order INTEGER DEFAULT 0,
    published BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS faqs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    question TEXT NOT NULL,
    answer TEXT NOT NULL DEFAULT '',
    sort_order INTEGER DEFAULT 0,
    published BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

ALTER TABLE portfolio_projects ENABLE ROW LEVEL SECURITY;

ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;

ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

ALTER TABLE services ENABLE ROW LEVEL SECURITY;

ALTER TABLE faqs ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public can read published blog posts" ON blog_posts;
CREATE POLICY "Public can read published blog posts"
    ON blog_posts FOR SELECT
    USING (published = true);

DROP POLICY IF EXISTS "Public can read published portfolio" ON portfolio_projects;
CREATE POLICY "Public can read published portfolio"
    ON portfolio_projects FOR SELECT
    USING (published = true);

DROP POLICY IF EXISTS "Public can read published testimonials" ON testimonials;
CREATE POLICY "Public can read published testimonials"
    ON testimonials FOR SELECT
    USING (published = true);

DROP POLICY IF EXISTS "Public can read published services" ON services;
CREATE POLICY "Public can read published services"
    ON services FOR SELECT
    USING (published = true);

DROP POLICY IF EXISTS "Public can read published faqs" ON faqs;
CREATE POLICY "Public can read published faqs"
    ON faqs FOR SELECT
    USING (published = true);

DROP POLICY IF EXISTS "Public can send contact messages" ON contact_messages;
CREATE POLICY "Public can send contact messages"
    ON contact_messages FOR INSERT
    WITH CHECK (true);

DROP POLICY IF EXISTS "Admin full access blog" ON blog_posts;
CREATE POLICY "Admin full access blog" ON blog_posts
    FOR ALL USING (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Admin full access portfolio" ON portfolio_projects;
CREATE POLICY "Admin full access portfolio" ON portfolio_projects
    FOR ALL USING (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Admin full access testimonials" ON testimonials;
CREATE POLICY "Admin full access testimonials" ON testimonials
    FOR ALL USING (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Admin full access messages" ON contact_messages;
CREATE POLICY "Admin full access messages" ON contact_messages
    FOR ALL USING (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Admin full access services" ON services;
CREATE POLICY "Admin full access services" ON services
    FOR ALL USING (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Admin full access faqs" ON faqs;
CREATE POLICY "Admin full access faqs" ON faqs
    FOR ALL USING (auth.role() = 'authenticated');


-- ============================================
-- Extended website content schema
-- ============================================
CREATE TABLE IF NOT EXISTS featured_products (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    icon_name TEXT DEFAULT 'Globe',
    title TEXT NOT NULL,
    description TEXT NOT NULL DEFAULT '',
    color_gradient TEXT DEFAULT 'from-blue-500 to-indigo-600',
    sort_order INTEGER DEFAULT 0,
    published BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS product_benefits (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    benefit TEXT NOT NULL,
    sort_order INTEGER DEFAULT 0,
    published BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS about_content (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    section_key TEXT UNIQUE NOT NULL,
    title TEXT DEFAULT '',
    content TEXT DEFAULT '',
    image_url TEXT DEFAULT '',
    stat_value TEXT DEFAULT '',
    stat_label TEXT DEFAULT '',
    sort_order INTEGER DEFAULT 0,
    published BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS founder (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    title TEXT DEFAULT '',
    photo_url TEXT DEFAULT '/images/founder.jpg',
    bio_paragraphs JSONB DEFAULT '[]',
    stats JSONB DEFAULT '[]',
    social_links JSONB DEFAULT '[]',
    published BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS workflow_steps (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    icon_name TEXT DEFAULT 'Globe',
    title TEXT NOT NULL,
    description TEXT NOT NULL DEFAULT '',
    color_gradient TEXT DEFAULT 'from-blue-500 to-blue-600',
    sort_order INTEGER DEFAULT 0,
    published BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS legalitas (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    nib TEXT NOT NULL,
    status TEXT DEFAULT 'AKTIF / TERBIT',
    nama_usaha TEXT DEFAULT '',
    nama_usaha_sub TEXT DEFAULT '',
    pemilik TEXT DEFAULT '',
    pemilik_title TEXT DEFAULT '',
    domisili TEXT DEFAULT '',
    domisili_sub TEXT DEFAULT '',
    tanggal_terbit TEXT DEFAULT '',
    tanggal_terbit_sub TEXT DEFAULT '',
    perizinan_text TEXT DEFAULT '',
    perizinan_sub TEXT DEFAULT '',
    skala_text TEXT DEFAULT '',
    skala_sub TEXT DEFAULT '',
    wilayah_desc TEXT DEFAULT '',
    kbli_desc TEXT DEFAULT '',
    footer_text TEXT DEFAULT '',
    published BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS site_settings (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    setting_key TEXT UNIQUE NOT NULL,
    setting_value TEXT NOT NULL DEFAULT '',
    setting_label TEXT DEFAULT '',
    setting_suffix TEXT DEFAULT '',
    sort_order INTEGER DEFAULT 0,
    published BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE featured_products ENABLE ROW LEVEL SECURITY;

ALTER TABLE product_benefits ENABLE ROW LEVEL SECURITY;

ALTER TABLE about_content ENABLE ROW LEVEL SECURITY;

ALTER TABLE founder ENABLE ROW LEVEL SECURITY;

ALTER TABLE workflow_steps ENABLE ROW LEVEL SECURITY;

ALTER TABLE legalitas ENABLE ROW LEVEL SECURITY;

ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public read featured_products" ON featured_products;
CREATE POLICY "Public read featured_products" ON featured_products FOR SELECT USING (published = true);

DROP POLICY IF EXISTS "Public read product_benefits" ON product_benefits;
CREATE POLICY "Public read product_benefits" ON product_benefits FOR SELECT USING (published = true);

DROP POLICY IF EXISTS "Public read about_content" ON about_content;
CREATE POLICY "Public read about_content" ON about_content FOR SELECT USING (published = true);

DROP POLICY IF EXISTS "Public read founder" ON founder;
CREATE POLICY "Public read founder" ON founder FOR SELECT USING (published = true);

DROP POLICY IF EXISTS "Public read workflow_steps" ON workflow_steps;
CREATE POLICY "Public read workflow_steps" ON workflow_steps FOR SELECT USING (published = true);

DROP POLICY IF EXISTS "Public read legalitas" ON legalitas;
CREATE POLICY "Public read legalitas" ON legalitas FOR SELECT USING (published = true);

DROP POLICY IF EXISTS "Public read site_settings" ON site_settings;
CREATE POLICY "Public read site_settings" ON site_settings FOR SELECT USING (published = true);

DROP POLICY IF EXISTS "Admin full featured_products" ON featured_products;
CREATE POLICY "Admin full featured_products" ON featured_products FOR ALL USING (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Admin full product_benefits" ON product_benefits;
CREATE POLICY "Admin full product_benefits" ON product_benefits FOR ALL USING (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Admin full about_content" ON about_content;
CREATE POLICY "Admin full about_content" ON about_content FOR ALL USING (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Admin full founder" ON founder;
CREATE POLICY "Admin full founder" ON founder FOR ALL USING (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Admin full workflow_steps" ON workflow_steps;
CREATE POLICY "Admin full workflow_steps" ON workflow_steps FOR ALL USING (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Admin full legalitas" ON legalitas;
CREATE POLICY "Admin full legalitas" ON legalitas FOR ALL USING (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Admin full site_settings" ON site_settings;
CREATE POLICY "Admin full site_settings" ON site_settings FOR ALL USING (auth.role() = 'authenticated');


-- ============================================
-- Founder bio compatibility schema
-- ============================================
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_name = 'founder' AND column_name = 'bio'
    ) THEN
        ALTER TABLE founder ADD COLUMN bio JSONB DEFAULT '[]';

END IF;

END $$;

UPDATE founder
SET bio = bio_paragraphs
WHERE bio IS NULL OR bio = '[]'::jsonb;


-- ============================================
-- CMS categories, SEO, and portfolio detail schema
-- ============================================
CREATE TABLE IF NOT EXISTS public.categories (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    type TEXT NOT NULL,
    name TEXT NOT NULL,
    slug TEXT NOT NULL,
    description TEXT DEFAULT '',
    icon_name TEXT DEFAULT 'Tag',
    sort_order INTEGER DEFAULT 0,
    published BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now(),
    CONSTRAINT categories_type_slug_unique UNIQUE (type, slug)
);

ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public read published categories" ON public.categories;

DROP POLICY IF EXISTS "Public read published categories" ON public.categories;
CREATE POLICY "Public read published categories"
    ON public.categories
    FOR SELECT
    TO anon, authenticated
    USING (published = true);

DROP POLICY IF EXISTS "Admin full categories" ON public.categories;

DROP POLICY IF EXISTS "Admin full categories" ON public.categories;
CREATE POLICY "Admin full categories"
    ON public.categories
    FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);

CREATE INDEX IF NOT EXISTS idx_categories_type_published_sort
    ON public.categories (type, sort_order)
    WHERE published = true;

CREATE TABLE IF NOT EXISTS public.page_sections (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    page_key TEXT NOT NULL,
    section_key TEXT NOT NULL,
    label TEXT DEFAULT '',
    title TEXT DEFAULT '',
    subtitle TEXT DEFAULT '',
    content TEXT DEFAULT '',
    tag TEXT DEFAULT '',
    seo_title TEXT DEFAULT '',
    seo_description TEXT DEFAULT '',
    seo_keywords TEXT[] DEFAULT '{}',
    image_url TEXT DEFAULT '',
    background_image_url TEXT DEFAULT '',
    icon_name TEXT DEFAULT 'LayoutPanelTop',
    sort_order INTEGER DEFAULT 0,
    published BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now(),
    CONSTRAINT page_sections_page_section_unique UNIQUE (page_key, section_key)
);

ALTER TABLE public.page_sections ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public read published page sections" ON public.page_sections;

DROP POLICY IF EXISTS "Public read published page sections" ON public.page_sections;
CREATE POLICY "Public read published page sections"
    ON public.page_sections
    FOR SELECT
    TO anon, authenticated
    USING (published = true);

DROP POLICY IF EXISTS "Admin full page sections" ON public.page_sections;

DROP POLICY IF EXISTS "Admin full page sections" ON public.page_sections;
CREATE POLICY "Admin full page sections"
    ON public.page_sections
    FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);

CREATE INDEX IF NOT EXISTS idx_page_sections_page_published_sort
    ON public.page_sections (page_key, sort_order)
    WHERE published = true;

ALTER TABLE public.blog_posts
    ADD COLUMN IF NOT EXISTS category_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
    ADD COLUMN IF NOT EXISTS tags TEXT[] DEFAULT '{}',
    ADD COLUMN IF NOT EXISTS seo_title TEXT DEFAULT '',
    ADD COLUMN IF NOT EXISTS seo_description TEXT DEFAULT '',
    ADD COLUMN IF NOT EXISTS seo_keywords TEXT[] DEFAULT '{}',
    ADD COLUMN IF NOT EXISTS header_title TEXT DEFAULT '',
    ADD COLUMN IF NOT EXISTS header_subtitle TEXT DEFAULT '',
    ADD COLUMN IF NOT EXISTS background_image_url TEXT DEFAULT '';

CREATE INDEX IF NOT EXISTS idx_blog_posts_category_id
    ON public.blog_posts (category_id);

CREATE INDEX IF NOT EXISTS idx_blog_posts_published_created_at
    ON public.blog_posts (created_at DESC)
    WHERE published = true;

ALTER TABLE public.portfolio_projects
    ADD COLUMN IF NOT EXISTS slug TEXT,
    ADD COLUMN IF NOT EXISTS category_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
    ADD COLUMN IF NOT EXISTS icon_name TEXT DEFAULT 'Globe',
    ADD COLUMN IF NOT EXISTS tags TEXT[] DEFAULT '{}',
    ADD COLUMN IF NOT EXISTS seo_title TEXT DEFAULT '',
    ADD COLUMN IF NOT EXISTS seo_description TEXT DEFAULT '',
    ADD COLUMN IF NOT EXISTS seo_keywords TEXT[] DEFAULT '{}',
    ADD COLUMN IF NOT EXISTS header_title TEXT DEFAULT '',
    ADD COLUMN IF NOT EXISTS header_subtitle TEXT DEFAULT '',
    ADD COLUMN IF NOT EXISTS background_image_url TEXT DEFAULT '';

WITH generated AS (
    SELECT
        id,
        regexp_replace(
            regexp_replace(lower(title), '[^a-z0-9]+', '-', 'g'),
            '(^-|-$)',
            '',
            'g'
        ) AS base_slug,
        row_number() OVER (
            PARTITION BY regexp_replace(
                regexp_replace(lower(title), '[^a-z0-9]+', '-', 'g'),
                '(^-|-$)',
                '',
                'g'
            )
            ORDER BY created_at, id
        ) AS duplicate_no
    FROM public.portfolio_projects
    WHERE slug IS NULL OR slug = ''
)
UPDATE public.portfolio_projects p
SET slug = CASE
    WHEN generated.base_slug = '' THEN 'portfolio-' || left(p.id::text, 8)
    WHEN generated.duplicate_no = 1 THEN generated.base_slug
    ELSE generated.base_slug || '-' || generated.duplicate_no
END
FROM generated
WHERE p.id = generated.id;

UPDATE public.portfolio_projects
SET icon_name = CASE icon
    WHEN '🛒' THEN 'ShoppingCart'
    WHEN '💳' THEN 'CreditCard'
    WHEN '🏥' THEN 'Building2'
    WHEN '🚚' THEN 'Truck'
    WHEN '📚' THEN 'GraduationCap'
    WHEN '📊' THEN 'BarChart3'
    WHEN '🌐' THEN 'Globe'
    ELSE COALESCE(NULLIF(icon_name, ''), 'Globe')
END
WHERE icon_name IS NULL
   OR icon_name = ''
   OR icon IN ('🛒', '💳', '🏥', '🚚', '📚', '📊', '🌐');

CREATE UNIQUE INDEX IF NOT EXISTS idx_portfolio_projects_slug_unique
    ON public.portfolio_projects (slug);

CREATE INDEX IF NOT EXISTS idx_portfolio_projects_category_id
    ON public.portfolio_projects (category_id);

CREATE INDEX IF NOT EXISTS idx_portfolio_projects_published_created_at
    ON public.portfolio_projects (created_at DESC)
    WHERE published = true;

ALTER TABLE public.services
    ADD COLUMN IF NOT EXISTS category_ref_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
    ADD COLUMN IF NOT EXISTS image_url TEXT DEFAULT '',
    ADD COLUMN IF NOT EXISTS background_image_url TEXT DEFAULT '',
    ADD COLUMN IF NOT EXISTS tags TEXT[] DEFAULT '{}',
    ADD COLUMN IF NOT EXISTS seo_title TEXT DEFAULT '',
    ADD COLUMN IF NOT EXISTS seo_description TEXT DEFAULT '',
    ADD COLUMN IF NOT EXISTS seo_keywords TEXT[] DEFAULT '{}';

CREATE INDEX IF NOT EXISTS idx_services_category_ref_id
    ON public.services (category_ref_id);

CREATE INDEX IF NOT EXISTS idx_services_published_sort
    ON public.services (sort_order)
    WHERE published = true;

ALTER TABLE public.featured_products
    ADD COLUMN IF NOT EXISTS image_url TEXT DEFAULT '',
    ADD COLUMN IF NOT EXISTS background_image_url TEXT DEFAULT '',
    ADD COLUMN IF NOT EXISTS tags TEXT[] DEFAULT '{}',
    ADD COLUMN IF NOT EXISTS seo_title TEXT DEFAULT '',
    ADD COLUMN IF NOT EXISTS seo_description TEXT DEFAULT '',
    ADD COLUMN IF NOT EXISTS seo_keywords TEXT[] DEFAULT '{}';

ALTER TABLE public.workflow_steps
    ADD COLUMN IF NOT EXISTS image_url TEXT DEFAULT '',
    ADD COLUMN IF NOT EXISTS background_image_url TEXT DEFAULT '',
    ADD COLUMN IF NOT EXISTS label TEXT DEFAULT '';

ALTER TABLE public.faqs
    ADD COLUMN IF NOT EXISTS category_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
    ADD COLUMN IF NOT EXISTS icon_name TEXT DEFAULT 'HelpCircle',
    ADD COLUMN IF NOT EXISTS tags TEXT[] DEFAULT '{}';

ALTER TABLE public.testimonials
    ADD COLUMN IF NOT EXISTS category_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
    ADD COLUMN IF NOT EXISTS image_url TEXT DEFAULT '';

ALTER TABLE public.about_content
    ADD COLUMN IF NOT EXISTS background_image_url TEXT DEFAULT '',
    ADD COLUMN IF NOT EXISTS icon_name TEXT DEFAULT 'Info',
    ADD COLUMN IF NOT EXISTS tag TEXT DEFAULT '',
    ADD COLUMN IF NOT EXISTS seo_title TEXT DEFAULT '',
    ADD COLUMN IF NOT EXISTS seo_description TEXT DEFAULT '',
    ADD COLUMN IF NOT EXISTS seo_keywords TEXT[] DEFAULT '{}';

ALTER TABLE public.founder
    ADD COLUMN IF NOT EXISTS background_image_url TEXT DEFAULT '',
    ADD COLUMN IF NOT EXISTS seo_title TEXT DEFAULT '',
    ADD COLUMN IF NOT EXISTS seo_description TEXT DEFAULT '',
    ADD COLUMN IF NOT EXISTS seo_keywords TEXT[] DEFAULT '{}';

ALTER TABLE public.legalitas
    ADD COLUMN IF NOT EXISTS background_image_url TEXT DEFAULT '',
    ADD COLUMN IF NOT EXISTS seo_title TEXT DEFAULT '',
    ADD COLUMN IF NOT EXISTS seo_description TEXT DEFAULT '',
    ADD COLUMN IF NOT EXISTS seo_keywords TEXT[] DEFAULT '{}';

CREATE INDEX IF NOT EXISTS idx_faqs_category_id
    ON public.faqs (category_id);

CREATE INDEX IF NOT EXISTS idx_testimonials_category_id
    ON public.testimonials (category_id);

