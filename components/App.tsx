'use client';

import WorkoutPage from './WorkoutPage';

export default function App() {
  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0f', display: 'flex', flexDirection: 'column', alignItems: 'center', fontFamily: "'DM Mono','Courier New',monospace", color: '#e0e0e0', padding: '24px 16px 48px' }}>
      <div style={{ width: '100%', maxWidth: 380, marginBottom: 16 }}>
        <div style={{ fontSize: 10, letterSpacing: 5, color: '#555', textTransform: 'uppercase' }}>daily tracker</div>
        <div style={{ fontSize: 22, fontWeight: 700, letterSpacing: -1, color: '#f0f0f0' }}>Fit &amp; Fuel</div>
      </div>
      <WorkoutPage />
    </div>
  );
}
