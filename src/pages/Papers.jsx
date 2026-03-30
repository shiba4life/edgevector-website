import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Section from '../components/Section';
import Card from '../components/Card';
import Label from '../components/Label';

const PAPERS = [
  {
    category: 'Vision',
    color: 'yellow',
    items: [
      {
        title: 'Personal Data Sovereignty: A Vision for Individual Control',
        authors: 'Edge Vector Foundation',
        description: 'The foundation\'s vision for an open ecosystem where individuals control how their data is stored, who can access it, and how it is used.',
        pdf: '/papers/vision.pdf',
      },
    ],
  },
  {
    category: 'Core Technology',
    color: 'red',
    items: [
      {
        title: 'EdgeVector Architecture Overview',
        authors: 'Edge Vector Foundation',
        description: 'End-to-end architecture: user-controlled FoldDB nodes, schema-enforced access control (folds), e2e encrypted relay via Exemem, passkey-based key derivation, and multi-node availability.',
        link: '/whitepaper',
        linkLabel: 'Read',
      },
      {
        title: 'Fold DB: Compute Without Exposure',
        authors: 'Tom Tang',
        description: 'Formalizes the fold abstraction: policy-enforcing interfaces over stored data with composable, multi-layer access control and a data-minimality proof.',
        pdf: '/papers/compute_without_exposure.pdf',
        simplified: [
          { label: 'ELI5 Version', pdf: '/papers/compute_without_exposure_eli5.pdf' },
        ],
      },
      {
        title: 'Schema Convergence Through Views and Transforms',
        authors: 'Tom Tang',
        description: 'How user schemas converge over time through WASM-based views, a content-addressed view registry, bidirectional consistency, and micropayment incentives.',
        pdf: '/papers/schema_convergence_views.pdf',
        simplified: [
          { label: 'ELI5 Version', pdf: '/papers/schema_convergence_views_eli5.pdf' },
        ],
      },
      {
        title: 'Preventing Data Structure Fragmentation Through Canonical Schema and Field Resolution',
        authors: 'Tom Tang, Fei Jia',
        description: 'Two-tier canonicalization using vector embeddings to resolve schema-level and field-level fragmentation, with zero-migration schema expansion via field mappers to deprecated schemas.',
        pdf: '/papers/canonical_fields_via_embeddings.pdf',
        simplified: [
          { label: 'ELI5 Version', pdf: '/papers/canonical_fields_via_embeddings_eli5.pdf' },
        ],
      },
      {
        title: 'Verifiable Classification Downgrading Through Information-Destroying Transforms',
        authors: 'Tom Tang, Fei Jia',
        description: 'A formal mechanism for controlled downgrading of data classification levels through publicly visible, automatically verified statistical aggregation transforms. Unverifiable information loss does not get downgraded.',
        pdf: '/papers/classification_downgrading.pdf',
      },
    ],
  },
  {
    category: 'Data Discovery & Retrieval',
    color: 'blue',
    items: [
      {
        title: 'Anonymized Vector Discovery Through Semantic Atomization',
        authors: 'Tom Tang, Fei Jia',
        description: 'A system for discovering private data without exposing it, using semantic atomization and anonymized vector fragments that enable search while preserving privacy.',
        pdf: '/papers/pseudonymous_vectorized_discovery.pdf',
        simplified: [
          { label: 'ELI5 Version', pdf: '/papers/pseudonymous_vectorized_discovery_eli5.pdf' },
        ],
      },
    ],
  },
];

export default function Papers() {
  return (
    <>
      <Helmet>
        <title>Papers — Edge Vector Foundation</title>
        <meta name="description" content="Technical papers from the Edge Vector Foundation covering personal data sovereignty, FoldDB, privacy-preserving network effects, schema convergence, and more." />
        <meta name="keywords" content="Edge Vector papers, FoldDB whitepaper, data sovereignty, privacy, schema convergence, WASM transforms, access control" />
        <meta property="og:title" content="Papers — Edge Vector Foundation" />
        <meta property="og:description" content="Technical papers on personal data sovereignty, privacy-preserving computation, and distributed schema systems." />
        <meta property="og:url" content="https://edgevector.org/papers" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Edge Vector Foundation — Papers" />
        <link rel="canonical" href="https://edgevector.org/papers" />
      </Helmet>

      <h1 className="tagline">Papers</h1>
      <p className="subtitle">Technical papers from the Edge Vector Foundation</p>

      {PAPERS.map((section) => (
        <Section key={section.category} variant="slate">
          <h2><span className="bold">{section.category.toUpperCase()}</span></h2>
          <div className="papers-list">
            {section.items.map((paper) => (
              <Card key={paper.pdf || paper.link}>
                <p><Label color={section.color}>{paper.authors}</Label></p>
                <h3 className="paper-title">
                  {paper.link
                    ? <Link to={paper.link}>{paper.title}</Link>
                    : <a href={paper.pdf} target="_blank" rel="noreferrer">{paper.title}</a>
                  }
                </h3>
                <p>{paper.description}</p>
                <p>
                  {paper.link && <Link to={paper.link} className="link-btn">[{paper.linkLabel || 'Read'}]</Link>}
                  {paper.pdf && <a href={paper.pdf} target="_blank" rel="noreferrer" className="link-btn">[PDF]</a>}
                  {paper.simplified && paper.simplified.map((s) => (
                    <span key={s.pdf}>
                      {'  '}
                      <a href={s.pdf} target="_blank" rel="noreferrer" className="link-btn">[{s.label}]</a>
                    </span>
                  ))}
                </p>
              </Card>
            ))}
          </div>
        </Section>
      ))}

      <div className="cta-block">
        <p>
          <a href="https://github.com/EdgeVector/fold_db" target="_blank" rel="noreferrer" className="link-btn">[Get FoldDB]</a>{'  '}
          <Link to="/technology" className="link-btn">[Technology Overview]</Link>{'  '}
          <Link to="/about" className="link-btn">[About the Foundation]</Link>
        </p>
      </div>
    </>
  );
}
