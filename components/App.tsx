'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import type { User } from '@supabase/supabase-js';
import Nav from './Nav';
import WorkoutPage from './WorkoutPage';
import HistoryPage from './HistoryPage';
import DietPage from './DietPage';
import { createClient } from '@/lib/supabase/client';
import { mergeHistory } from '@/lib/helpers';
import type { HistoryEntry, SavePayload } from '@/lib/types';

type Tab = 'workout' | 'history' | 'diet';

export default function App({ user }: { user: User }) {
  const [page, setPage] = useState<Tab>('workout');
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [loaded, setLoaded] = useState(false);
  const supabase = useRef(createClient()).current;

  const fetchData = useCallback(async () => {
    const [{ data: workouts }, { data: diets }, { data: waters }] = await Promise.all([
      supabase.from('workout_sessions').select('*').eq('user_id', user.id).order('created_at', { ascending: true }),
      supabase.from('diet_logs').select('*').eq('user_id', user.id).order('date', { ascending: false }),
      supabase.from('water_logs').select('*').eq('user_id', user.id).order('date', { ascending: false }),
    ]);
    setHistory(mergeHistory(workouts, diets, waters));
    setLoaded(true);
  }, [user.id, supabase]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Re-fetch when the user returns to this tab/device so history stays in sync
  useEffect(() => {
    const onVisible = () => { if (document.visibilityState === 'visible') fetchData(); };
    document.addEventListener('visibilitychange', onVisible);
    return () => document.removeEventListener('visibilitychange', onVisible);
  }, [fetchData]);

  const saveEntry = useCallback(async (entry: SavePayload) => {
    if (!entry.date) return;

    if (entry.workout) {
      const { workout: w } = entry;
      const { data, error } = await supabase
        .from('workout_sessions')
        .insert({ user_id: user.id, date: entry.date, weight_kg: w.weightKg, cal_during: w.calDuring, cal_total: w.calTotal, done: w.done })
        .select('id')
        .single();
      if (!error) {
        const saved = { ...w, id: data?.id };
        setHistory((prev) => {
          const idx = prev.findIndex((h) => h.date === entry.date);
          if (idx >= 0) {
            const updated = [...prev];
            updated[idx] = { ...updated[idx], workouts: [...(updated[idx].workouts ?? []), saved] };
            return updated;
          }
          return [{ date: entry.date, workouts: [saved] }, ...prev].slice(0, 120);
        });
      }
    }

    if (entry.diet) {
      const { diet: d } = entry;
      const { error } = await supabase
        .from('diet_logs')
        .upsert({ user_id: user.id, date: entry.date, status: d.status, surplus_cal: d.surplus }, { onConflict: 'user_id,date' });
      if (!error) {
        setHistory((prev) => {
          const idx = prev.findIndex((h) => h.date === entry.date);
          if (idx >= 0) {
            const updated = [...prev];
            updated[idx] = { ...updated[idx], diet: entry.diet };
            return updated;
          }
          return [{ date: entry.date, diet: entry.diet } as HistoryEntry, ...prev].slice(0, 120);
        });
      }
    }

    if (entry.water) {
      const { water: w } = entry;
      const { error } = await supabase
        .from('water_logs')
        .upsert({ user_id: user.id, date: entry.date, drank: w.drank }, { onConflict: 'user_id,date' });
      if (!error) {
        setHistory((prev) => {
          const idx = prev.findIndex((h) => h.date === entry.date);
          if (idx >= 0) {
            const updated = [...prev];
            updated[idx] = { ...updated[idx], water: entry.water };
            return updated;
          }
          return [{ date: entry.date, water: entry.water } as HistoryEntry, ...prev].slice(0, 120);
        });
      }
    }
  }, [user.id, supabase]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    window.location.href = '/login';
  };

  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0f', display: 'flex', flexDirection: 'column', alignItems: 'center', fontFamily: "'DM Mono','Courier New',monospace", color: '#e0e0e0', padding: '24px 16px 48px' }}>
      <div style={{ width: '100%', maxWidth: 380, marginBottom: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <div style={{ fontSize: 10, letterSpacing: 5, color: '#555', textTransform: 'uppercase' }}>daily tracker</div>
          <div style={{ fontSize: 22, fontWeight: 700, letterSpacing: -1, color: '#f0f0f0' }}>Fit &amp; Fuel</div>
        </div>
        <button onClick={handleSignOut} style={{ background: 'transparent', border: '1px solid #ffffff15', borderRadius: 8, padding: '6px 12px', fontSize: 11, color: '#555', cursor: 'pointer', fontFamily: 'inherit' }}>Sign out</button>
      </div>
      <Nav page={page} setPage={setPage} />
      {page === 'workout' && <WorkoutPage saveEntry={saveEntry} history={history} />}
      {page === 'history' && <HistoryPage history={history} loaded={loaded} />}
      {page === 'diet' && <DietPage saveEntry={saveEntry} history={history} />}
    </div>
  );
}
