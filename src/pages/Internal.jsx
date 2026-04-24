import { useState, useEffect } from 'react';
import MermaidMarkdown from '../components/MermaidMarkdown';

const PASS_HASH = '799f56123d10ca0cb0c90641591cede64bce3182aeb82442c1438cecd539a77d'; // sha256

async function hashPassword(pw) {
  const data = new TextEncoder().encode(pw);
  const buf = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('');
}

const TABS = [
  {
    id: 'architecture',
    label: 'Architecture',
    docs: [
      '/docs/design/SYSTEMS_OVERVIEW.md',
    ],
  },
  {
    id: 'formation',
    label: 'Formation',
    docs: [
      '/docs/corporate/nonprofit_edge_vector_foundation.md',
      '/docs/corporate/filing_checklist.md',
    ],
  },
  {
    id: 'formation-docs',
    label: 'Formation Docs',
    docs: [
      '/docs/corporate/articles_of_incorporation.md',
      '/docs/corporate/bylaws.md',
      '/docs/corporate/conflict_of_interest_policy.md',
    ],
  },
  {
    id: 'patents',
    label: 'Patents',
    pdfs: [
      { label: 'Pseudonymous Vectorized Discovery', href: '/docs/corporate/patent_vectorized_discovery.pdf' },
      { label: 'Schema Canonical Service', href: '/docs/corporate/patent_schema_canonical_service.pdf' },
      { label: 'Verified WASM Execution', href: '/docs/corporate/patent_verified_wasm_execution.pdf' },
    ],
  },
  {
    id: 'video',
    label: 'Explainer Video',
    video: '/videos/FoldDB_Overview_V7_with_audio.mp4',
  },
];

const tabStyle = (active) => ({
  padding: '0.5em 1.25em',
  border: '2px solid #0a0a0a',
  borderBottom: active ? '2px solid #e8e8e8' : '2px solid #0a0a0a',
  background: active ? '#e8e8e8' : 'transparent',
  fontFamily: 'inherit',
  fontSize: '0.85em',
  fontWeight: active ? 'bold' : 'normal',
  letterSpacing: '0.05em',
  cursor: 'pointer',
  marginBottom: '-2px',
  position: 'relative',
  zIndex: active ? 1 : 0,
});

export default function Internal() {
  const [authed, setAuthed] = useState(() => sessionStorage.getItem('internal_authed') === '1');
  const [pw, setPw] = useState('');
  const [error, setError] = useState(false);
  const [activeTab, setActiveTab] = useState('architecture');
  const [docs, setDocs] = useState({});

  const tab = TABS.find(t => t.id === activeTab);

  async function handleLogin(e) {
    e.preventDefault();
    const hash = await hashPassword(pw);
    if (hash === PASS_HASH) {
      sessionStorage.setItem('internal_authed', '1');
      setAuthed(true);
      setError(false);
    } else {
      setError(true);
    }
  }

  useEffect(() => {
    if (!tab) return;
    let cancelled = false;

    async function fetchDocs() {
      const results = {};
      for (const path of tab.docs) {
        if (docs[path]) {
          results[path] = docs[path];
          continue;
        }
        try {
          const res = await fetch(path);
          if (res.ok) {
            results[path] = await res.text();
          } else {
            results[path] = `*Failed to load ${path}*`;
          }
        } catch {
          results[path] = `*Failed to load ${path}*`;
        }
      }
      if (!cancelled) {
        setDocs(prev => ({ ...prev, ...results }));
      }
    }

    fetchDocs();
    return () => { cancelled = true; };
  }, [activeTab]);

  if (!authed) {
    return (
      <div style={{ maxWidth: 360, margin: '4em auto', textAlign: 'center' }}>
        <h1 className="tagline">Internal</h1>
        <p className="subtitle" style={{ marginBottom: '2em' }}>This page is password-protected.</p>
        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '0.8em' }}>
          <input
            type="password"
            value={pw}
            onChange={e => setPw(e.target.value)}
            placeholder="Password"
            style={{
              fontFamily: 'inherit',
              fontSize: '1em',
              padding: '0.5em 0.75em',
              border: '2px solid #0a0a0a',
              background: 'transparent',
              outline: 'none',
            }}
            autoFocus
          />
          {error && <p style={{ color: '#cc0000', margin: 0 }}>Incorrect password.</p>}
          <button
            type="submit"
            className="link-btn"
            style={{ alignSelf: 'center', cursor: 'pointer', fontFamily: 'inherit' }}
          >
            Enter
          </button>
        </form>
      </div>
    );
  }

  return (
    <>
      <h1 className="tagline">Internal</h1>
      <p className="subtitle">Architecture decisions and design documents</p>

      <div style={{ display: 'flex', gap: '0', borderBottom: '2px solid #0a0a0a', marginBottom: '2em', flexWrap: 'wrap' }}>
        {TABS.map(t => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id)}
            style={tabStyle(t.id === activeTab)}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab && tab.video && (
        <div style={{ marginBottom: '3em' }}>
          <h2 style={{ fontFamily: 'inherit', fontWeight: 'bold', marginBottom: '1em' }}>FoldDB Overview</h2>
          <video
            controls
            style={{ width: '100%', maxWidth: '960px', border: '2px solid #0a0a0a' }}
            src={tab.video}
          >
            Your browser does not support the video tag.
          </video>
        </div>
      )}

      {tab && tab.pdfs && (
        <div style={{ marginBottom: '2em', display: 'flex', gap: '1em', flexWrap: 'wrap' }}>
          {tab.pdfs.map(pdf => (
            <a
              key={pdf.href}
              href={pdf.href}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                padding: '0.5em 1em',
                border: '2px solid #0a0a0a',
                fontFamily: 'inherit',
                fontSize: '0.85em',
                letterSpacing: '0.05em',
                textDecoration: 'none',
                color: '#0a0a0a',
              }}
            >
              PDF: {pdf.label}
            </a>
          ))}
        </div>
      )}

      {tab && tab.docs && tab.docs.map(path => (
        <div key={path} className="markdown-body" style={{ marginBottom: '3em' }}>
          {docs[path] ? (
            <MermaidMarkdown>{docs[path]}</MermaidMarkdown>
          ) : (
            <p className="dim">Loading...</p>
          )}
          {tab.docs.length > 1 && (
            <hr style={{ border: 'none', borderTop: '2px solid #999', margin: '3em 0' }} />
          )}
        </div>
      ))}
    </>
  );
}
