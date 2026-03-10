import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import MermaidMarkdown from '../components/MermaidMarkdown';

const DOC_PATH = '/docs/WHITEPAPER.md';

export default function Whitepaper() {
  const [content, setContent] = useState('');

  useEffect(() => {
    fetch(DOC_PATH)
      .then(res => {
        if (res.ok) return res.text();
        throw new Error('Failed to load');
      })
      .then(setContent)
      .catch(() => setContent('*Failed to load whitepaper.*'));
  }, []);

  return (
    <>
      <Helmet>
        <title>Architecture Overview — Edge Vector Foundation</title>
        <meta name="description" content="EdgeVector architecture overview: user-controlled FoldDB nodes, schema-enforced access control, e2e encrypted relay, passkey-based key management." />
      </Helmet>
      <div className="markdown-body">
        {content ? (
          <MermaidMarkdown>{content}</MermaidMarkdown>
        ) : (
          <p className="dim">Loading...</p>
        )}
      </div>
    </>
  );
}
