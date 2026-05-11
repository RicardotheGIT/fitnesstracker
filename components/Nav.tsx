'use client';

const tabs = [
  { id: 'workout', label: 'Workout', icon: '🏃' },
  { id: 'history', label: 'History', icon: '📅' },
  { id: 'diet', label: 'Diet', icon: '🥗' },
] as const;

type Tab = (typeof tabs)[number]['id'];

export default function Nav({ page, setPage }: { page: Tab; setPage: (p: Tab) => void }) {
  return (
    <div style={{ display: 'flex', gap: 4, background: '#111', borderRadius: 14, padding: 4, width: '100%', maxWidth: 380, marginBottom: 20 }}>
      {tabs.map((t) => (
        <button
          key={t.id}
          onClick={() => setPage(t.id)}
          style={{ flex: 1, padding: '10px 4px', borderRadius: 10, border: 'none', background: page === t.id ? '#1e1e2e' : 'transparent', color: page === t.id ? '#f0f0f0' : '#555', fontSize: 12, fontFamily: 'inherit', cursor: 'pointer', fontWeight: page === t.id ? 700 : 400 }}
        >
          {t.icon} {t.label}
        </button>
      ))}
    </div>
  );
}
