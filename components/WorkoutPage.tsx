'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Diagram from './Diagram';
import { WORK_TIME, REST_TIME, TOTAL_DURATION, MINUTES } from '@/lib/constants';
import { POOL } from '@/lib/data';
import { formatTime, getRoundColor, pickRandom, calcCal, todayStr } from '@/lib/helpers';
import type { HistoryEntry, SavePayload } from '@/lib/types';

const buildWorkout = () =>
  [1, 2, 3].flatMap((r) => pickRandom(POOL[r], 3).map((ex) => ({ ...ex, round: r })));

type Phase = 'idle' | 'warmup' | 'work' | 'rest' | 'done';

export default function WorkoutPage({ saveEntry, history }: { saveEntry: (e: SavePayload) => Promise<void>; history: HistoryEntry[] }) {
  const [phase, setPhase] = useState<Phase>('idle');
  const [exercises, setExercises] = useState<ReturnType<typeof buildWorkout>>([]);
  const [exIdx, setExIdx] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const [warmup, setWarmup] = useState(20);
  const [muted, setMuted] = useState(false);
  const [weightKg, setWeightKg] = useState(80);
  const [weightInput, setWeightInput] = useState('80');
  const [unit, setUnit] = useState<'kg' | 'lbs'>('kg');
  const [saved, setSaved] = useState(false);

  const todayWorkouts = history.find((h) => h.date === todayStr())?.workouts ?? [];

  const actx = useRef<AudioContext | null>(null);
  const phaseR = useRef(phase);
  const idxR = useRef(exIdx);
  const exsR = useRef(exercises);
  const mutedR = useRef(muted);
  phaseR.current = phase;
  idxR.current = exIdx;
  exsR.current = exercises;
  mutedR.current = muted;

  const wakeLockRef = useRef<WakeLockSentinel | null>(null);

  useEffect(() => {
    const active = phase === 'warmup' || phase === 'work' || phase === 'rest';
    if (active && typeof navigator !== 'undefined' && 'wakeLock' in navigator) {
      navigator.wakeLock.request('screen').then((lock) => { wakeLockRef.current = lock; }).catch(() => {});
    } else if (!active && wakeLockRef.current) {
      wakeLockRef.current.release().then(() => { wakeLockRef.current = null; }).catch(() => {});
    }
  }, [phase]);

  const getCtx = useCallback(() => {
    if (!actx.current) actx.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    if (actx.current.state === 'suspended') actx.current.resume();
    return actx.current;
  }, []);

  const beep = useCallback((freq: number, dur: number, delay = 0) => {
    if (mutedR.current) return;
    try {
      const ctx = getCtx(), osc = ctx.createOscillator(), g = ctx.createGain();
      osc.connect(g); g.connect(ctx.destination); osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime + delay);
      g.gain.setValueAtTime(0, ctx.currentTime + delay);
      g.gain.linearRampToValueAtTime(0.4, ctx.currentTime + delay + 0.01);
      g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + delay + dur);
      osc.start(ctx.currentTime + delay); osc.stop(ctx.currentTime + delay + dur + 0.05);
    } catch {}
  }, [getCtx]);

  const beeps3 = useCallback(() => { beep(660, 0.12, 0); beep(660, 0.12, 0.35); beep(920, 0.3, 0.7); }, [beep]);

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const timeLeftRef = useRef(0);
  const onDoneRef = useRef<(() => void) | null>(null);

  const stopTimer = useCallback(() => {
    if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; }
  }, []);

  const startTimer = useCallback((seconds: number, onDone: () => void) => {
    stopTimer();
    timeLeftRef.current = seconds;
    onDoneRef.current = onDone;
    setTimeLeft(seconds);
    timerRef.current = setInterval(() => {
      timeLeftRef.current -= 1;
      const t = timeLeftRef.current;
      if (t <= 3 && t > 0) beeps3();
      setTimeLeft(t);
      setElapsed((e) => Math.min(e + 1, TOTAL_DURATION));
      if (t <= 0) {
        clearInterval(timerRef.current!);
        timerRef.current = null;
        onDoneRef.current?.();
      }
    }, 1000);
  }, [stopTimer, beeps3]);

  const start = () => {
    getCtx();
    const w = buildWorkout();
    setExercises(w); exsR.current = w;
    setPhase('warmup'); setWarmup(20); setExIdx(0); setElapsed(0); setSaved(false);
  };

  const handleSave = async () => {
    if (saved) return;
    const { during, total } = calcCal(weightKg);
    await saveEntry({ date: todayStr(), workout: { done: true, weightKg, calDuring: during, calTotal: total, ts: Date.now() } });
    setSaved(true);
  };

  useEffect(() => {
    if (phase !== 'warmup') return;
    const wRef = { current: 20 };
    setWarmup(20);
    const iv = setInterval(() => {
      wRef.current -= 1;
      const w = wRef.current;
      if (w <= 3 && w > 0) beeps3();
      setWarmup(w);
      if (w <= 0) { clearInterval(iv); setPhase('work'); }
    }, 1000);
    return () => clearInterval(iv);
  }, [phase, beeps3]);

  useEffect(() => {
    if (phase === 'work') {
      startTimer(WORK_TIME, () => setPhase('rest'));
    } else if (phase === 'rest') {
      startTimer(REST_TIME, () => {
        const n = idxR.current + 1;
        if (n >= exsR.current.length) setPhase('done');
        else { setExIdx(n); setPhase('work'); }
      });
    } else {
      stopTimer();
    }
    return () => stopTimer();
  }, [phase, exIdx, startTimer, stopTimer]);

  const cur = exercises[exIdx], nxt = exercises[exIdx + 1];
  const disp = phase === 'rest' && nxt ? nxt : cur;
  const colors = phase === 'done' ? { bg: '#1a1a2a', accent: '#a78bfa', text: '#d8b4fe' } : getRoundColor(cur?.round ?? 1);
  const prog = (elapsed / TOTAL_DURATION) * 100;
  const maxT = phase === 'work' ? WORK_TIME : REST_TIME;
  const ringPct = maxT > 0 ? (timeLeft / maxT) * 100 : 0;
  const rR = 55, rC = 2 * Math.PI * rR;
  const { during, total } = calcCal(weightKg);

  return (
    <div onClick={() => { if (actx.current?.state === 'suspended') actx.current.resume(); }} style={{ width: '100%', maxWidth: 380 }}>
      {phase !== 'idle' && phase !== 'done' && (
        <div style={{ marginBottom: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: '#555', marginBottom: 6, letterSpacing: 2 }}><span>ELAPSED</span><span>{formatTime(elapsed)} / 15:00</span></div>
          <div style={{ height: 4, background: '#1a1a1a', borderRadius: 2, overflow: 'hidden' }}><div style={{ height: '100%', width: `${prog}%`, background: colors.accent, borderRadius: 2, transition: 'width 1s linear' }} /></div>
        </div>
      )}
      {phase !== 'idle' && (
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 12 }}>
          <button onClick={(e) => { e.stopPropagation(); setMuted((m) => !m); }} style={{ background: muted ? '#ff444420' : `${colors.accent}20`, border: `1px solid ${muted ? '#ff4444' : colors.accent}50`, borderRadius: 10, padding: '7px 12px', fontSize: 12, color: muted ? '#ff4444' : colors.accent, cursor: 'pointer', fontFamily: 'inherit' }}>{muted ? '🔇 Muted' : '🔊 Sound'}</button>
        </div>
      )}

      <div style={{ background: colors.bg, borderRadius: 20, padding: '24px 20px', border: `1px solid ${colors.accent}22`, transition: 'background 0.6s,border 0.6s', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: -60, right: -60, width: 160, height: 160, borderRadius: '50%', background: `${colors.accent}15`, filter: 'blur(40px)', pointerEvents: 'none' }} />

        {phase === 'idle' && (
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 44, marginBottom: 10 }}>🏃</div>
            <div style={{ fontSize: 20, fontWeight: 700, color: '#f0f0f0', marginBottom: 6 }}>Ready to burn?</div>
            <div style={{ fontSize: 12, color: '#777', marginBottom: todayWorkouts.length > 0 ? 10 : 18, lineHeight: 1.8 }}>3 rounds · random exercises · 40s work / 20s rest</div>
            {todayWorkouts.length > 0 && (
              <div style={{ fontSize: 12, color: '#2dcc70', marginBottom: 18, fontWeight: 700 }}>
                ✓ {todayWorkouts.length} workout{todayWorkouts.length > 1 ? 's' : ''} logged today · {todayWorkouts.reduce((s, w) => s + w.calTotal, 0)} cal
              </div>
            )}
            <div style={{ background: '#ffffff08', borderRadius: 12, padding: 14, marginBottom: 18, border: '1px solid #ffffff10' }}>
              <div style={{ fontSize: 10, letterSpacing: 3, color: '#555', marginBottom: 10, textTransform: 'uppercase' }}>Your weight</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, justifyContent: 'center' }}>
                <input type="number" value={weightInput} onChange={(e) => { setWeightInput(e.target.value); const n = parseFloat(e.target.value); if (!isNaN(n) && n > 0) setWeightKg(unit === 'kg' ? n : Math.round(n / 2.205)); }} onClick={(e) => e.stopPropagation()} style={{ width: 80, padding: '8px', fontSize: 20, fontWeight: 700, background: '#ffffff12', border: '1px solid #ffffff20', borderRadius: 8, color: '#f0f0f0', fontFamily: 'inherit', textAlign: 'center', outline: 'none' }} />
                <button onClick={(e) => { e.stopPropagation(); const nu = unit === 'kg' ? 'lbs' : 'kg'; setUnit(nu); setWeightInput(String(nu === 'lbs' ? Math.round(weightKg * 2.205) : weightKg)); }} style={{ background: '#2dcc7020', border: '1px solid #2dcc7040', borderRadius: 8, padding: '8px 12px', fontSize: 13, color: '#2dcc70', cursor: 'pointer', fontFamily: 'inherit', fontWeight: 700 }}>{unit}</button>
              </div>
              <div style={{ fontSize: 12, color: '#666', marginTop: 10 }}><span style={{ color: '#2dcc70', fontWeight: 700 }}>{during}</span> during + <span style={{ color: '#3a9bdc', fontWeight: 700 }}>{total - during}</span> afterburn = <span style={{ color: '#f0f0f0', fontWeight: 700 }}>{total} cal</span></div>
            </div>
            {[{ r: 1, l: 'Upper body + core' }, { r: 2, l: 'Full body compound' }, { r: 3, l: 'Cardio finisher' }].map(({ r, l }) => {
              const c = getRoundColor(r);
              return <div key={r} style={{ background: `${c.accent}15`, border: `1px solid ${c.accent}30`, borderRadius: 10, padding: '10px 14px', textAlign: 'left', marginBottom: 8 }}>
                <div style={{ fontSize: 10, letterSpacing: 3, color: c.accent, marginBottom: 2 }}>ROUND {r}</div>
                <div style={{ fontSize: 12, color: '#888' }}>{l} · randomly selected</div>
              </div>;
            })}
            <button onClick={start} style={{ marginTop: 14, background: '#2dcc70', color: '#0a0a0f', border: 'none', borderRadius: 12, padding: '13px 36px', fontSize: 14, fontWeight: 700, letterSpacing: 2, cursor: 'pointer', fontFamily: 'inherit', textTransform: 'uppercase' }}>{todayWorkouts.length > 0 ? 'Go Again' : 'Start'}</button>
          </div>
        )}

        {phase === 'warmup' && (
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 11, letterSpacing: 4, color: '#777', marginBottom: 12 }}>GET SET</div>
            <div style={{ fontSize: 72, fontWeight: 700, color: '#f0f0f0', lineHeight: 1 }}>{warmup}</div>
            <div style={{ fontSize: 13, color: '#aaa', marginTop: 10, fontWeight: 700 }}>First up: {exercises[0]?.name}</div>
            <div style={{ fontSize: 12, color: '#555', marginTop: 6 }}>Get in position. Beeps count you in.</div>
          </div>
        )}

        {(phase === 'work' || phase === 'rest') && cur && (
          <div>
            <div style={{ fontSize: 10, letterSpacing: 4, color: colors.accent, marginBottom: 12, textAlign: 'center' }}>
              {phase === 'rest' && nxt ? `UP NEXT · ROUND ${nxt.round}` : `ROUND ${cur.round} · ${exIdx + 1} of ${exercises.length}`}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
              <div style={{ background: '#ffffff08', borderRadius: 12, padding: '10px 8px', border: `1px solid ${phase === 'rest' ? '#f39c1230' : colors.accent + '30'}`, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                <Diagram poseKey={disp?.poseKey ?? 'squatPress'} color={phase === 'rest' ? '#f39c12' : colors.accent} playing={phase === 'work'} />
                <div style={{ fontSize: 9, letterSpacing: 2, color: phase === 'rest' ? '#f39c12' : colors.text }}>{phase === 'rest' ? 'NEXT UP' : 'FORM'}</div>
              </div>
              <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
                <div style={{ position: 'relative', width: 130, height: 130 }}>
                  <svg width="130" height="130" style={{ transform: 'rotate(-90deg)' }}>
                    <circle cx="65" cy="65" r={rR} fill="none" stroke="#1a1a1a" strokeWidth="6" />
                    <circle cx="65" cy="65" r={rR} fill="none" stroke={phase === 'rest' ? '#f39c12' : colors.accent} strokeWidth="6" strokeLinecap="round" strokeDasharray={`${(ringPct / 100) * rC} ${rC}`} style={{ transition: 'stroke-dasharray 1s linear' }} />
                  </svg>
                  <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ fontSize: 34, fontWeight: 700, color: '#f0f0f0', lineHeight: 1 }}>{timeLeft}</div>
                    <div style={{ fontSize: 9, letterSpacing: 3, color: phase === 'rest' ? '#f39c12' : colors.text, marginTop: 4 }}>{phase === 'rest' ? 'REST' : 'WORK'}</div>
                  </div>
                </div>
              </div>
            </div>
            <div style={{ fontSize: 18, fontWeight: 700, color: '#f0f0f0', marginBottom: 8 }}>{disp?.name}</div>
            <div style={{ fontSize: 12, color: '#888', lineHeight: 1.6, background: '#ffffff08', borderRadius: 10, padding: '10px 12px', marginBottom: 12 }}>{disp?.cue}</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
              {disp?.steps.map((s, i) => (
                <div key={i} style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                  <div style={{ fontSize: 10, fontWeight: 700, minWidth: 20, height: 20, borderRadius: '50%', background: `${phase === 'rest' ? '#f39c12' : colors.accent}25`, color: phase === 'rest' ? '#f39c12' : colors.accent, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{i + 1}</div>
                  <div style={{ fontSize: 12, color: '#aaa', lineHeight: 1.5, paddingTop: 2 }}>{s}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {phase === 'done' && (
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 48, marginBottom: 10 }}>🎯</div>
            <div style={{ fontSize: 21, fontWeight: 700, color: '#f0f0f0', marginBottom: 14 }}>Done. Smashed it.</div>
            <div style={{ background: '#ffffff08', borderRadius: 12, padding: 14, marginBottom: 14, border: '1px solid #a78bfa30' }}>
              <div style={{ fontSize: 10, letterSpacing: 3, color: '#a78bfa', marginBottom: 12, textTransform: 'uppercase' }}>Calories · {weightKg}kg</div>
              <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
                <div style={{ textAlign: 'center' }}><div style={{ fontSize: 26, fontWeight: 700, color: '#2dcc70' }}>{during}</div><div style={{ fontSize: 9, color: '#555', letterSpacing: 1 }}>DURING</div></div>
                <div style={{ fontSize: 20, color: '#333' }}>+</div>
                <div style={{ textAlign: 'center' }}><div style={{ fontSize: 26, fontWeight: 700, color: '#3a9bdc' }}>{total - during}</div><div style={{ fontSize: 9, color: '#555', letterSpacing: 1 }}>AFTERBURN</div></div>
                <div style={{ fontSize: 20, color: '#333' }}>=</div>
                <div style={{ textAlign: 'center' }}><div style={{ fontSize: 26, fontWeight: 700, color: '#f0f0f0' }}>{total}</div><div style={{ fontSize: 9, color: '#555', letterSpacing: 1 }}>TOTAL</div></div>
              </div>
            </div>
            <button onClick={handleSave} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, width: '100%', padding: 14, marginBottom: 10, background: saved ? '#2dcc7020' : '#ffffff10', border: `1px solid ${saved ? '#2dcc70' : '#ffffff20'}`, borderRadius: 12, fontSize: 15, fontWeight: 700, color: saved ? '#2dcc70' : '#f0f0f0', cursor: saved ? 'default' : 'pointer', fontFamily: 'inherit', transition: 'all 0.3s' }}>
              <span style={{ fontSize: 20 }}>{saved ? '✅' : '☐'}</span>{saved ? 'Workout logged!' : 'Mark as done'}
            </button>
            <button onClick={start} style={{ background: '#a78bfa', color: '#0a0a0f', border: 'none', borderRadius: 12, padding: '12px 32px', fontSize: 13, fontWeight: 700, letterSpacing: 2, cursor: 'pointer', fontFamily: 'inherit', textTransform: 'uppercase' }}>Go Again</button>
          </div>
        )}
      </div>

      {(phase === 'work' || phase === 'rest') && exercises.length > 0 && (
        <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 4 }}>
          {exercises.map((ex, i) => {
            const done = i < exIdx, active = i === exIdx, c = getRoundColor(ex.round);
            return <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '6px 12px', borderRadius: 8, background: active ? `${c.accent}18` : 'transparent', border: active ? `1px solid ${c.accent}40` : '1px solid transparent', opacity: done ? 0.3 : 1, transition: 'all 0.3s' }}>
              <div style={{ fontSize: 14 }}>{done ? '✓' : ex.icon}</div>
              <div style={{ fontSize: 12, color: active ? '#f0f0f0' : '#555', flex: 1 }}>{ex.name}</div>
              <div style={{ fontSize: 10, color: c.accent, letterSpacing: 1 }}>R{ex.round}</div>
            </div>;
          })}
        </div>
      )}
    </div>
  );
}
