import { MINUTES } from './constants';

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
