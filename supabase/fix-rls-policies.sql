-- ============================================================================
-- FIX RLS POLICIES - PORTFOLIO PROJECT
-- ============================================================================
-- Jalankan script ini di Supabase SQL Editor untuk memperbaiki RLS policies
-- ============================================================================

-- 1. DROP existing policies yang bermasalah
DROP POLICY IF EXISTS "Categories admin manage" ON public.categories;
DROP POLICY IF EXISTS "Projects admin manage" ON public.projects;
DROP POLICY IF EXISTS "Project categories admin manage" ON public.project_categories;

-- 2. CREATE policies baru yang lebih permisif untuk authenticated users
-- CATEGORIES TABLE
CREATE POLICY "Authenticated users can insert categories"
ON public.categories
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can update categories"
ON public.categories
FOR UPDATE
TO authenticated
USING (auth.uid() IS NOT NULL)
WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can delete categories"
ON public.categories
FOR DELETE
TO authenticated
USING (auth.uid() IS NOT NULL);

-- PROJECTS TABLE
CREATE POLICY "Authenticated users can insert projects"
ON public.projects
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can update projects"
ON public.projects
FOR UPDATE
TO authenticated
USING (auth.uid() IS NOT NULL)
WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can delete projects"
ON public.projects
FOR DELETE
TO authenticated
USING (auth.uid() IS NOT NULL);

-- PROJECT_CATEGORIES TABLE
CREATE POLICY "Authenticated users can insert project_categories"
ON public.project_categories
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can delete project_categories"
ON public.project_categories
FOR DELETE
TO authenticated
USING (auth.uid() IS NOT NULL);

-- 3. FIX Storage bucket policies untuk upload gambar
-- Hapus semua policies di bucket 'projects' dulu, lalu tambahkan ini:

-- Policy untuk upload (INSERT)
CREATE POLICY "Authenticated users can upload to projects bucket"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'projects');

-- Policy untuk update
CREATE POLICY "Authenticated users can update in projects bucket"
ON storage.objects
FOR UPDATE
TO authenticated
USING (bucket_id = 'projects')
WITH CHECK (bucket_id = 'projects');

-- Policy untuk delete
CREATE POLICY "Authenticated users can delete from projects bucket"
ON storage.objects
FOR DELETE
TO authenticated
USING (bucket_id = 'projects');

-- Policy untuk select/read (public)
CREATE POLICY "Public can view projects bucket"
ON storage.objects
FOR SELECT
TO public
USING (bucket_id = 'projects');

-- 4. Verifikasi is_admin function masih ada
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
SET search_path = public, pg_temp
STABLE
AS $function$
  SELECT COALESCE(
    (SELECT is_admin FROM public.profiles WHERE user_id = auth.uid()),
    false
  );
$function$;

-- 5. Pastikan profile Anda ada dan is_admin = true
-- Jalankan ini untuk memastikan user Anda jadi admin:
UPDATE public.profiles
SET is_admin = true, role = 'admin'
WHERE user_id = auth.uid();

-- 6. Cek hasil
SELECT
  user_id,
  full_name,
  role,
  is_admin,
  created_at
FROM public.profiles
WHERE user_id = auth.uid();

-- ============================================================================
-- DONE! Sekarang coba logout dan login kembali di aplikasi Anda
-- ============================================================================
