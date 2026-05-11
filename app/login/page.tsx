'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const supabase = createClient();

  const handle = async () => {
    setError(''); setLoading(true);
    const fn = mode === 'signin'
      ? supabase.auth.signInWithPassword({ email, password })
      : supabase.auth.signUp({ email, password });
    const { error: err } = await fn;
    setLoading(false);
    if (err) { setError(err.message); return; }
    if (mode === 'signup') { setError('Check your email to confirm your account.'); return; }
    window.location.href = '/';
  };

  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0f', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: "'DM Mono','Courier New',monospace", padding: '24px 16px' }}>
      <div style={{ width: '100%', maxWidth: 340 }}>
        <div style={{ marginBottom: 32, textAlign: 'center' }}>
          <div style={{ fontSize: 10, letterSpacing: 5, color: '#555', textTransform: 'uppercase', marginBottom: 6 }}>daily tracker</div>
          <div style={{ fontSize: 28, fontWeight: 700, letterSpacing: -1, color: '#f0f0f0' }}>Fit &amp; Fuel</div>
        </div>

        <div style={{ background: '#111', borderRadius: 16, padding: 24, border: '1px solid #ffffff10' }}>
          <div style={{ display: 'flex', gap: 4, background: '#0a0a0f', borderRadius: 10, padding: 4, marginBottom: 24 }}>
            {(['signin', 'signup'] as const).map((m) => (
              <button key={m} onClick={() => { setMode(m); setError(''); }} style={{ flex: 1, padding: '8px', borderRadius: 8, border: 'none', background: mode === m ? '#1e1e2e' : 'transparent', color: mode === m ? '#f0f0f0' : '#555', fontSize: 12, fontFamily: 'inherit', cursor: 'pointer', fontWeight: mode === m ? 700 : 400 }}>
                {m === 'signin' ? 'Sign in' : 'Sign up'}
              </button>
            ))}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handle()} style={{ width: '100%', padding: '12px', background: '#ffffff08', border: '1px solid #ffffff15', borderRadius: 10, color: '#f0f0f0', fontSize: 14, fontFamily: 'inherit', outline: 'none' }} />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handle()} style={{ width: '100%', padding: '12px', background: '#ffffff08', border: '1px solid #ffffff15', borderRadius: 10, color: '#f0f0f0', fontSize: 14, fontFamily: 'inherit', outline: 'none' }} />
          </div>

          {error && <div style={{ marginTop: 12, fontSize: 12, color: error.includes('Check') ? '#2dcc70' : '#e74c3c', lineHeight: 1.5 }}>{error}</div>}

          <button onClick={handle} disabled={loading || !email || !password} style={{ marginTop: 16, width: '100%', padding: '13px', background: '#2dcc70', color: '#0a0a0f', border: 'none', borderRadius: 10, fontSize: 14, fontWeight: 700, letterSpacing: 1, cursor: loading || !email || !password ? 'default' : 'pointer', fontFamily: 'inherit', opacity: loading || !email || !password ? 0.5 : 1, transition: 'opacity 0.2s' }}>
            {loading ? '...' : mode === 'signin' ? 'Sign in' : 'Create account'}
          </button>
        </div>
      </div>
    </div>
  );
}
