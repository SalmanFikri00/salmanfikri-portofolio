-- Enable extensions ---------------------------------------------------------
create extension if not exists "uuid-ossp";
create extension if not exists "pgcrypto";

-- Utility trigger to maintain updated_at ------------------------------------
create or replace function public.handle_updated_at()
returns trigger
language plpgsql
as $function$
begin
  new.updated_at = timezone('utc', now());
  return new;
end;
$function$;

-- Profiles ------------------------------------------------------------------
create table if not exists public.profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique references auth.users (id) on delete cascade,
  full_name text,
  role text not null default 'viewer',
  is_admin boolean not null default false,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create trigger trg_profiles_updated_at
before update on public.profiles
for each row execute procedure public.handle_updated_at();

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public, pg_temp
as $function$
begin
  insert into public.profiles (user_id, full_name, role, is_admin)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'name', new.email),
    'viewer',
    false
  );
  return new;
end;
$function$;

create trigger trg_on_auth_user_created
after insert on auth.users
for each row execute procedure public.handle_new_user();

-- Admin helper --------------------------------------------------------------
create or replace function public.is_admin()
returns boolean
language sql
security definer
set search_path = public, pg_temp
stable
as $function$
  select coalesce(
    (select is_admin from public.profiles where user_id = auth.uid()),
    false
  );
$function$;

-- Categories ----------------------------------------------------------------
create table if not exists public.categories (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  slug text not null unique,
  description text,
  is_active boolean not null default true,
  created_by uuid references public.profiles (id),
  updated_by uuid references public.profiles (id),
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create trigger trg_categories_updated_at
before update on public.categories
for each row execute procedure public.handle_updated_at();

-- Projects ------------------------------------------------------------------
create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  summary text not null,
  body text,
  image_url text,
  accent_color text not null default 'bg-neutral-200',
  project_url text,
  roles text[] not null default array[]::text[],
  is_featured boolean not null default false,
  is_published boolean not null default true,
  created_by uuid references public.profiles (id),
  updated_by uuid references public.profiles (id),
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create trigger trg_projects_updated_at
before update on public.projects
for each row execute procedure public.handle_updated_at();

-- Project categories --------------------------------------------------------
create table if not exists public.project_categories (
  project_id uuid not null references public.projects (id) on delete cascade,
  category_id uuid not null references public.categories (id) on delete cascade,
  created_at timestamptz not null default timezone('utc', now()),
  primary key (project_id, category_id)
);

create index if not exists idx_project_categories_project
  on public.project_categories (project_id);

create index if not exists idx_project_categories_category
  on public.project_categories (category_id);

-- View combining projects with categories -----------------------------------
create or replace view public.project_with_categories as
select
  p.id,
  p.title,
  p.slug,
  p.summary,
  p.body,
  p.image_url,
  p.accent_color,
  p.project_url,
  p.roles,
  p.is_featured,
  p.is_published,
  p.created_at,
  p.updated_at,
  coalesce(
    json_agg(
      distinct jsonb_build_object(
        'id', c.id,
        'name', c.name,
        'slug', c.slug
      )
    ) filter (where c.id is not null),
    '[]'
  ) as categories
from public.projects p
left join public.project_categories pc on pc.project_id = p.id
left join public.categories c on c.id = pc.category_id
group by p.id;

alter view public.project_with_categories owner to postgres;

-- Row Level Security --------------------------------------------------------
alter table public.profiles enable row level security;
alter table public.categories enable row level security;
alter table public.projects enable row level security;
alter table public.project_categories enable row level security;

-- Profiles policies
create policy "Users can view their own profile"
  on public.profiles
  for select
  using (auth.uid() = user_id);

create policy "Admins can view all profiles"
  on public.profiles
  for select
  using (public.is_admin());

create policy "Admins manage profiles"
  on public.profiles
  for all
  using (public.is_admin())
  with check (public.is_admin());

-- Categories policies
create policy "Categories public read"
  on public.categories
  for select
  using (is_active or public.is_admin());

create policy "Categories admin manage"
  on public.categories
  for all
  using (public.is_admin())
  with check (public.is_admin());

-- Projects policies
create policy "Projects public read"
  on public.projects
  for select
  using (is_published or public.is_admin());

create policy "Projects admin manage"
  on public.projects
  for all
  using (public.is_admin())
  with check (public.is_admin());

-- Project categories policies
create policy "Project categories public read"
  on public.project_categories
  for select
  using (
    public.is_admin() or exists (
      select 1
      from public.projects p
      join public.categories c on c.id = project_categories.category_id
      where p.id = project_categories.project_id
        and p.is_published
        and c.is_active
    )
  );

create policy "Project categories admin manage"
  on public.project_categories
  for all
  using (public.is_admin())
  with check (public.is_admin());
