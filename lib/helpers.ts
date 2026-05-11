import type { HistoryEntry, WorkoutSession, DietLog } from './types';
import { MINUTES } from './constants';

export const todayStr = () => new Date().toISOString().slice(0, 10);
export const fmtDate = (d: string) =>
  new Date(d + 'T00:00:00').toLocaleDateString('en-AU', { weekday: 'short', day: 'numeric', month: 'short' });
export const formatTime = (s: number) =>
  `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;

export const getRoundColor = (r: number) =>
  r === 1
    ? { bg: '#1a3a2a', accent: '#2dcc70', text: '#7effc0' }
    : r === 2
    ? { bg: '#1a2a3a', accent: '#3a9bdc', text: '#7ed4ff' }
    : { bg: '#3a1a1a', accent: '#e74c3c', text: '#ffaaaa' };

export const pickRandom = <T>(arr: T[], n: number): T[] =>
  [...arr].sort(() => Math.random() - 0.5).slice(0, n);

export const calcCal = (kg: number) => {
  const d = Math.round(8.5 * kg * (MINUTES / 60));
  return { during: d, total: Math.round(d * 1.15) };
};

export function mergeHistory(
  workouts: WorkoutSession[] | null,
  diets: DietLog[] | null
): HistoryEntry[] {
  const map = new Map<string, HistoryEntry>();

  workouts?.forEach((w) => {
    map.set(w.date, {
      date: w.date,
      workout: {
        done: w.done,
        weightKg: w.weight_kg,
        calDuring: w.cal_during,
        calTotal: w.cal_total,
        ts: new Date(w.created_at).getTime(),
      },
    });
  });

  diets?.forEach((d) => {
    const existing = map.get(d.date) ?? { date: d.date };
    map.set(d.date, {
      ...existing,
      diet: {
        status: d.status,
        surplus: d.surplus_cal,
        ts: new Date(d.created_at).getTime(),
      },
    });
  });

  return Array.from(map.values()).sort((a, b) => b.date.localeCompare(a.date));
}
