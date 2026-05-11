-- Run this in your Supabase SQL editor

create table if not exists workout_sessions (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users not null,
  date date not null,
  weight_kg numeric,
  cal_during int,
  cal_total int,
  done boolean default false,
  created_at timestamptz default now(),
  unique(user_id, date)
);

alter table workout_sessions enable row level security;

create policy "users_own_workout_sessions"
  on workout_sessions for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create table if not exists diet_logs (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users not null,
  date date not null,
  status text check (status in ('achieved', 'nope')),
  surplus_cal int default 0,
  created_at timestamptz default now(),
  unique(user_id, date)
);

alter table diet_logs enable row level security;

create policy "users_own_diet_logs"
  on diet_logs for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);
