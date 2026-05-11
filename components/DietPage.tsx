'use client';

import { useState, useEffect } from 'react';
import { MEALS } from '@/lib/constants';
import { MEAL_LIBRARY, type MealItem } from '@/lib/data';
import { todayStr } from '@/lib/helpers';
import type { HistoryEntry } from '@/lib/types';

type Meal = (typeof MEALS)[number];

const pickMeals = (key: string, n = 3): MealItem[] =>
  [...MEAL_LIBRARY[key]].sort(() => Math.random() - 0.5).slice(0, n);

const formatMeals = (meals: MealItem[]) =>
  meals.map((m, i) => `${i + 1}. ${m.name}\n   ${m.cal} cal · ${m.protein}g protein\n   ${m.desc}`).join('\n\n');

const formatDayPlan = () =>
  MEALS.map((m) => {
    const pick = pickMeals(m.key, 1)[0];
    return `${m.icon} ${m.label} (${m.cal} cal)\n${pick.name}\n${pick.desc}\n${pick.protein}g protein`;
  }).join('\n\n');

export default function DietPage({ saveEntry, history }: { saveEntry: (e: Partial<HistoryEntry>) => Promise<void>; history: HistoryEntry[] }) {
  const [mode, setMode] = useState<'day' | 'meal' | null>(null);
  const [selectedMeal, setSelectedMeal] = useState<Meal | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [dietStatus, setDietStatus] = useState<'achieved' | 'nope' | null>(null);
  const [surplus, setSurplus] = useState('');
  const [dietSaved, setDietSaved] = useState(false);

  const todayDiet = history.find((h) => h.date === todayStr())?.diet;

  useEffect(() => {
    if (todayDiet) {
      setDietStatus(todayDiet.status);
      setSurplus(String(todayDiet.surplus || ''));
      setDietSaved(true);
    }
  }, []);

  const handleDayPlan = () => { setMode('day'); setResult(formatDayPlan()); };
  const handleMealIdea = (meal: Meal) => { setSelectedMeal(meal); setMode('meal'); setResult(formatMeals(pickMeals(meal.key, 3))); };
  const handleRegen = () => {
    if (mode === 'day') setResult(formatDayPlan());
    else if (selectedMeal) setResult(formatMeals(pickMeals(selectedMeal.key, 3)));
  };

  const handleSaveDiet = async () => {
    if (!dietStatus) return;
    await saveEntry({ date: todayStr(), diet: { status: dietStatus, surplus: parseInt(surplus) || 0, ts: Date.now() } });
    setDietSaved(true);
  };

  return (
    <div style={{ width: '100%', maxWidth: 380 }}>
      <div style={{ background: '#111', borderRadius: 14, padding: 14, marginBottom: 14, border: '1px solid #ffffff08' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <div style={{ fontSize: 10, letterSpacing: 3, color: '#555', textTransform: 'uppercase' }}>Daily plan</div>
          <div style={{ fontSize: 16, fontWeight: 700, color: '#2dcc70' }}>1400 cal</div>
        </div>
        {MEALS.map((m) => (
          <div key={m.key} style={{ marginBottom: 8 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: '#888', marginBottom: 3 }}>
              <span>{m.icon} {m.label}</span><span style={{ color: '#2dcc70' }}>{m.cal} cal</span>
            </div>
            <div style={{ height: 5, background: '#1a1a1a', borderRadius: 3, overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${(m.cal / 450) * 100}%`, background: '#2dcc70', borderRadius: 3 }} />
            </div>
          </div>
        ))}
      </div>

      <div style={{ background: '#111', borderRadius: 14, padding: 14, marginBottom: 14, border: '1px solid #ffffff08' }}>
        <div style={{ fontSize: 10, letterSpacing: 3, color: '#555', marginBottom: 12, textTransform: 'uppercase' }}>Today&apos;s diet check-in</div>
        <div style={{ fontSize: 12, color: '#888', marginBottom: 10 }}>How did you go today?</div>
        <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
          <button onClick={() => { setDietStatus('achieved'); setDietSaved(false); }} style={{ flex: 1, padding: '12px 8px', borderRadius: 10, border: `2px solid ${dietStatus === 'achieved' ? '#2dcc70' : '#ffffff15'}`, background: dietStatus === 'achieved' ? '#2dcc7020' : 'transparent', color: dietStatus === 'achieved' ? '#2dcc70' : '#666', fontFamily: 'inherit', fontSize: 13, fontWeight: 700, cursor: 'pointer', transition: 'all 0.2s' }}>✅ Achieved</button>
          <button onClick={() => { setDietStatus('nope'); setDietSaved(false); }} style={{ flex: 1, padding: '12px 8px', borderRadius: 10, border: `2px solid ${dietStatus === 'nope' ? '#e74c3c' : '#ffffff15'}`, background: dietStatus === 'nope' ? '#e74c3c20' : 'transparent', color: dietStatus === 'nope' ? '#e74c3c' : '#666', fontFamily: 'inherit', fontSize: 13, fontWeight: 700, cursor: 'pointer', transition: 'all 0.2s' }}>❌ Nope</button>
        </div>
        <div style={{ marginBottom: 12 }}>
          <div style={{ fontSize: 11, color: '#666', marginBottom: 6 }}>Surplus calories (if any)</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <input type="number" placeholder="0" value={surplus} onChange={(e) => { setSurplus(e.target.value); setDietSaved(false); }} onClick={(e) => e.stopPropagation()} style={{ width: 90, padding: '8px 10px', fontSize: 16, fontWeight: 700, background: '#ffffff10', border: '1px solid #ffffff20', borderRadius: 8, color: '#f0f0f0', fontFamily: 'inherit', textAlign: 'center', outline: 'none' }} />
            <span style={{ fontSize: 12, color: '#555' }}>cal over 1400</span>
          </div>
        </div>
        <button onClick={handleSaveDiet} disabled={!dietStatus} style={{ width: '100%', padding: '12px', borderRadius: 10, border: `1px solid ${dietSaved ? '#2dcc70' : '#ffffff20'}`, background: dietSaved ? '#2dcc7020' : dietStatus ? '#ffffff10' : '#ffffff05', color: dietSaved ? '#2dcc70' : dietStatus ? '#f0f0f0' : '#444', fontFamily: 'inherit', fontSize: 13, fontWeight: 700, cursor: dietStatus ? 'pointer' : 'default', transition: 'all 0.3s' }}>
          {dietSaved ? '✅ Saved for today' : 'Save check-in'}
        </button>
      </div>

      <div style={{ display: 'flex', gap: 8, marginBottom: 14 }}>
        <button onClick={handleDayPlan} style={{ flex: 1, padding: '12px 8px', background: '#1a3a2a', border: '1px solid #2dcc7040', borderRadius: 12, color: '#2dcc70', fontSize: 12, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>📅 Full day plan</button>
        <button onClick={() => { setMode('meal'); setResult(null); setSelectedMeal(null); }} style={{ flex: 1, padding: '12px 8px', background: '#1a2a3a', border: '1px solid #3a9bdc40', borderRadius: 12, color: '#3a9bdc', fontSize: 12, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>🍽️ One meal idea</button>
      </div>

      {mode === 'meal' && !selectedMeal && (
        <div style={{ background: '#111', borderRadius: 14, padding: 14, marginBottom: 14, border: '1px solid #3a9bdc20' }}>
          <div style={{ fontSize: 10, letterSpacing: 3, color: '#555', marginBottom: 10, textTransform: 'uppercase' }}>Which meal?</div>
          {MEALS.map((m) => (
            <button key={m.key} onClick={() => handleMealIdea(m)} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', padding: '11px 12px', background: '#ffffff08', border: '1px solid #ffffff10', borderRadius: 10, color: '#f0f0f0', fontSize: 13, fontFamily: 'inherit', cursor: 'pointer', textAlign: 'left', marginBottom: 6 }}>
              <span>{m.icon} {m.label}</span><span style={{ color: '#555', fontSize: 11 }}>{m.cal} cal</span>
            </button>
          ))}
        </div>
      )}

      {result && (
        <div style={{ background: '#111', borderRadius: 14, padding: 14, border: '1px solid #2dcc7020' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <div style={{ fontSize: 10, letterSpacing: 3, color: '#2dcc70', textTransform: 'uppercase' }}>{mode === 'day' ? 'Full day plan' : `${selectedMeal?.icon} ${selectedMeal?.label} ideas`}</div>
            <button onClick={handleRegen} style={{ background: 'transparent', border: '1px solid #ffffff20', borderRadius: 8, padding: '5px 10px', fontSize: 11, color: '#888', cursor: 'pointer', fontFamily: 'inherit' }}>↻ New ideas</button>
          </div>
          <div style={{ fontSize: 13, color: '#ccc', lineHeight: 1.8, whiteSpace: 'pre-wrap' }}>{result}</div>
        </div>
      )}
    </div>
  );
}
