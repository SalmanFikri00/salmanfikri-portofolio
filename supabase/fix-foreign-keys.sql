-- ============================================================================
-- FIX FOREIGN KEY REFERENCES
-- ============================================================================
-- Script ini mengubah foreign key dari profiles ke auth.users
-- Karena di kode menggunakan user.id (auth.users.id), bukan profile.id
-- ============================================================================

-- 1. Drop foreign key constraints yang ada
ALTER TABLE public.categories
  DROP CONSTRAINT IF EXISTS categories_created_by_fkey,
  DROP CONSTRAINT IF EXISTS categories_updated_by_fkey;

ALTER TABLE public.projects
  DROP CONSTRAINT IF EXISTS projects_created_by_fkey,
  DROP CONSTRAINT IF EXISTS projects_updated_by_fkey;

-- 2. Ubah tipe kolom menjadi nullable dulu (untuk safety)
ALTER TABLE public.categories
  ALTER COLUMN created_by DROP NOT NULL,
  ALTER COLUMN updated_by DROP NOT NULL;

ALTER TABLE public.projects
  ALTER COLUMN created_by DROP NOT NULL,
  ALTER COLUMN updated_by DROP NOT NULL;

-- 3. UPDATE DATA YANG SUDAH ADA DULU (PENTING!)
-- Ini mengubah profile.id menjadi auth.users.id SEBELUM menambah constraint
UPDATE public.categories c
SET created_by = (
  SELECT user_id
  FROM public.profiles
  WHERE id = c.created_by
)
WHERE created_by IS NOT NULL
  AND EXISTS (SELECT 1 FROM public.profiles WHERE id = c.created_by);

UPDATE public.categories c
SET updated_by = (
  SELECT user_id
  FROM public.profiles
  WHERE id = c.updated_by
)
WHERE updated_by IS NOT NULL
  AND EXISTS (SELECT 1 FROM public.profiles WHERE id = c.updated_by);

UPDATE public.projects p
SET created_by = (
  SELECT user_id
  FROM public.profiles
  WHERE id = p.created_by
)
WHERE created_by IS NOT NULL
  AND EXISTS (SELECT 1 FROM public.profiles WHERE id = p.created_by);

UPDATE public.projects p
SET updated_by = (
  SELECT user_id
  FROM public.profiles
  WHERE id = p.updated_by
)
WHERE updated_by IS NOT NULL
  AND EXISTS (SELECT 1 FROM public.profiles WHERE id = p.updated_by);

-- 4. Set NULL untuk data yang tidak valid (jika ada)
UPDATE public.categories
SET created_by = NULL
WHERE created_by IS NOT NULL
  AND NOT EXISTS (SELECT 1 FROM auth.users WHERE id = created_by);

UPDATE public.categories
SET updated_by = NULL
WHERE updated_by IS NOT NULL
  AND NOT EXISTS (SELECT 1 FROM auth.users WHERE id = updated_by);

UPDATE public.projects
SET created_by = NULL
WHERE created_by IS NOT NULL
  AND NOT EXISTS (SELECT 1 FROM auth.users WHERE id = created_by);

UPDATE public.projects
SET updated_by = NULL
WHERE updated_by IS NOT NULL
  AND NOT EXISTS (SELECT 1 FROM auth.users WHERE id = updated_by);

-- 5. BARU TAMBAHKAN foreign key constraints
ALTER TABLE public.categories
  ADD CONSTRAINT categories_created_by_fkey
    FOREIGN KEY (created_by) REFERENCES auth.users(id) ON DELETE SET NULL,
  ADD CONSTRAINT categories_updated_by_fkey
    FOREIGN KEY (updated_by) REFERENCES auth.users(id) ON DELETE SET NULL;

ALTER TABLE public.projects
  ADD CONSTRAINT projects_created_by_fkey
    FOREIGN KEY (created_by) REFERENCES auth.users(id) ON DELETE SET NULL,
  ADD CONSTRAINT projects_updated_by_fkey
    FOREIGN KEY (updated_by) REFERENCES auth.users(id) ON DELETE SET NULL;

-- ============================================================================
-- DONE! Foreign keys sekarang merujuk ke auth.users
-- ============================================================================
