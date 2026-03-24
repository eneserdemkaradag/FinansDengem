-- FinansDengem base schema
-- Run this query in Supabase SQL editor

create extension if not exists "pgcrypto";

create table if not exists public.profiles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  active_mode text not null default 'investor' check (active_mode in ('investor', 'normal')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.assets (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  asset_type text not null check (asset_type in ('hisse', 'altin', 'doviz')),
  symbol text not null,
  quantity numeric(18, 6) not null check (quantity > 0),
  buy_price numeric(18, 4) not null check (buy_price > 0),
  daily_change_percent numeric(7, 2) not null default 0,
  created_at timestamptz not null default now()
);

alter table public.assets
add column if not exists daily_change_percent numeric(7, 2) not null default 0;

create table if not exists public.budgets (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  monthly_income numeric(14, 2) not null check (monthly_income >= 0),
  month_key text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(user_id, month_key)
);

create table if not exists public.expenses (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  amount numeric(14, 2) not null check (amount > 0),
  category text not null check (category in ('Yemek', 'Kira', 'Eglence', 'Borc', 'Diger')),
  expense_date date not null default now(),
  created_at timestamptz not null default now()
);

create index if not exists assets_user_id_idx on public.assets(user_id);
create index if not exists assets_symbol_idx on public.assets(symbol);
create index if not exists budgets_user_month_idx on public.budgets(user_id, month_key);
create index if not exists expenses_user_date_idx on public.expenses(user_id, expense_date);

alter table public.profiles enable row level security;
alter table public.assets enable row level security;
alter table public.budgets enable row level security;
alter table public.expenses enable row level security;

create policy "profiles_select_own"
on public.profiles
for select
using (auth.uid() = user_id);

create policy "profiles_insert_own"
on public.profiles
for insert
with check (auth.uid() = user_id);

create policy "profiles_update_own"
on public.profiles
for update
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

create policy "assets_select_own"
on public.assets
for select
using (auth.uid() = user_id);

create policy "assets_insert_own"
on public.assets
for insert
with check (auth.uid() = user_id);

create policy "assets_delete_own"
on public.assets
for delete
using (auth.uid() = user_id);

create policy "budgets_select_own"
on public.budgets
for select
using (auth.uid() = user_id);

create policy "budgets_insert_own"
on public.budgets
for insert
with check (auth.uid() = user_id);

create policy "budgets_update_own"
on public.budgets
for update
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

create policy "expenses_select_own"
on public.expenses
for select
using (auth.uid() = user_id);

create policy "expenses_insert_own"
on public.expenses
for insert
with check (auth.uid() = user_id);

create policy "expenses_delete_own"
on public.expenses
for delete
using (auth.uid() = user_id);
