'use client';

import type { HistoryEntry } from '@/lib/types';
import { todayStr, fmtDate, dayTotalCal, dayDone } from '@/lib/helpers';

export default function HistoryPage({ history, loaded }: { history: HistoryEntry[]; loaded: boolean }) {
  const streak = (() => {
    const dates = history.filter(dayDone).map((h) => h.date).sort().reverse();
    let s = 0; let cur = new Date(); cur.setHours(0, 0, 0, 0);
    for (const d of dates) {
      const dd = new Date(d + 'T00:00:00');
      const diff = Math.round((cur.getTime() - dd.getTime()) / 86400000);
      if (diff <= 1) { s++; cur = dd; } else break;
    }
    return s;
  })();

  const totalW = history.reduce((sum, h) => sum + (h.workouts?.filter((w) => w.done).length ?? 0), 0);
  const totalCal = history.reduce((sum, h) => sum + dayTotalCal(h), 0);
  const last14 = Array.from({ length: 14 }, (_, i) => {
    const d = new Date(); d.setDate(d.getDate() - (13 - i));
    const str = d.toISOString().slice(0, 10);
    return { str, done: history.some((h) => h.date === str && dayDone(h)), label: d.toLocaleDateString('en-AU', { weekday: 'short' }).slice(0, 1) };
  });

  return (
    <div style={{ width: '100%', maxWidth: 380 }}>
      <div style={{ display: 'flex', gap: 8, marginBottom: 14 }}>
        {[{ val: streak, label: 'Streak', icon: '🔥', col: '#e74c3c' }, { val: totalW, label: 'Sessions', icon: '💪', col: '#2dcc70' }, { val: totalCal, label: 'Cal total', icon: '⚡', col: '#3a9bdc' }].map((s, i) => (
          <div key={i} style={{ flex: 1, background: '#111', borderRadius: 12, padding: '12px 8px', textAlign: 'center', border: `1px solid ${s.col}20` }}>
            <div style={{ fontSize: 18 }}>{s.icon}</div>
            <div style={{ fontSize: 18, fontWeight: 700, color: s.col, lineHeight: 1.2 }}>{s.val}</div>
            <div style={{ fontSize: 9, color: '#555', marginTop: 2 }}>{s.label}</div>
          </div>
        ))}
      </div>

      <div style={{ background: '#111', borderRadius: 14, padding: 14, marginBottom: 14, border: '1px solid #ffffff08' }}>
        <div style={{ fontSize: 10, letterSpacing: 3, color: '#555', marginBottom: 10, textTransform: 'uppercase' }}>Last 14 days</div>
        <div style={{ display: 'flex', gap: 4 }}>
          {last14.map((d, i) => (
            <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
              <div style={{ fontSize: 8, color: '#444' }}>{d.label}</div>
              <div style={{ width: '100%', aspectRatio: '1', borderRadius: 5, background: d.done ? '#2dcc70' : '#1a1a1a', border: d.str === todayStr() ? '1px solid #2dcc7060' : '1px solid transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, color: d.done ? '#0a0a0f' : 'transparent' }}>✓</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ background: '#111', borderRadius: 14, padding: 14, border: '1px solid #ffffff08' }}>
        <div style={{ fontSize: 10, letterSpacing: 3, color: '#555', marginBottom: 12, textTransform: 'uppercase' }}>Session log</div>
        {!loaded && <div style={{ fontSize: 13, color: '#555', textAlign: 'center', padding: 16 }}>Loading...</div>}
        {loaded && !history.length && <div style={{ fontSize: 13, color: '#555', textAlign: 'center', padding: 16 }}>No sessions yet.</div>}
        {loaded && history.map((h, i) => {
          const workouts = h.workouts ?? [];
          const totalCal = dayTotalCal(h);
          const done = dayDone(h);
          return (
            <div key={i} style={{ padding: '12px 0', borderBottom: i < history.length - 1 ? '1px solid #1a1a1a' : 'none' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 }}>
                <div>
                  <div style={{ fontSize: 13, color: '#f0f0f0', fontWeight: 600 }}>{fmtDate(h.date)}</div>
                  {done && workouts.length === 1 && (
                    <div style={{ fontSize: 11, color: '#555', marginTop: 2 }}>💪 {workouts[0].weightKg}kg · {workouts[0].calTotal} cal</div>
                  )}
                  {done && workouts.length > 1 && (
                    <div style={{ fontSize: 11, color: '#555', marginTop: 2 }}>💪 {workouts.length} sessions · {totalCal} cal total</div>
                  )}
                </div>
                <div style={{ display: 'flex', gap: 6, alignItems: 'center', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
                  {done && <span style={{ fontSize: 11, color: '#2dcc70' }}>✓ {workouts.length > 1 ? `${workouts.length}× workout` : 'Workout'}</span>}
                  {h.water !== undefined && <span style={{ fontSize: 11, color: h.water.drank ? '#3a9bdc' : '#666' }}>{h.water.drank ? '💧' : '○'} Water</span>}
                  {h.diet?.status && <span style={{ fontSize: 11, color: h.diet.status === 'achieved' ? '#2dcc70' : '#e74c3c' }}>{h.diet.status === 'achieved' ? '✓ Diet' : '✗ Diet'}</span>}
                </div>
              </div>
              {workouts.length > 1 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 3, marginBottom: 6 }}>
                  {workouts.map((w, j) => (
                    <div key={j} style={{ fontSize: 11, color: '#666', background: '#ffffff06', borderRadius: 6, padding: '4px 8px' }}>
                      Session {j + 1}: {w.weightKg}kg · {w.calTotal} cal
                    </div>
                  ))}
                </div>
              )}
              {h.diet && (
                <div style={{ background: '#ffffff06', borderRadius: 8, padding: '8px 10px', fontSize: 11, color: '#888' }}>
                  Diet: <span style={{ color: h.diet.status === 'achieved' ? '#2dcc70' : '#e74c3c', fontWeight: 700 }}>{h.diet.status === 'achieved' ? 'Achieved' : 'Nope'}</span>
                  {h.diet.surplus > 0 && <span> · +{h.diet.surplus} cal surplus</span>}
                  {h.diet.surplus > 0 && totalCal > 0 && (
                    <span style={{ color: h.diet.surplus <= totalCal ? '#2dcc70' : '#e74c3c' }}> ({h.diet.surplus <= totalCal ? 'covered by workout' : 'over budget'})</span>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
