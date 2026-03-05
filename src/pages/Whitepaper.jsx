import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Section from '../components/Section';
import Card from '../components/Card';
import Label from '../components/Label';

export default function Whitepaper() {
  return (
    <>
      <Helmet>
        <title>Whitepaper — Edge Vector Foundation</title>
        <meta name="description" content="Personal Data Sovereignty: A Vision for Individual Control. The Edge Vector Foundation whitepaper on user-controlled data storage, permissioned access, verifiable trustworthiness, and collective value." />
        <meta name="keywords" content="Edge Vector whitepaper, data sovereignty, personal data, FoldDB, Exemem, encryption, permissioned access, data provenance, collective computation" />
        <meta property="og:title" content="Whitepaper — Personal Data Sovereignty" />
        <meta property="og:description" content="A vision for individual control over personal data. Covers seamless ingestion, practical use, security, verifiable trust, long-term viability, and collective value." />
        <meta property="og:url" content="https://edgevector.org/whitepaper" />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Edge Vector Whitepaper — Personal Data Sovereignty" />
        <link rel="canonical" href="https://edgevector.org/whitepaper" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "TechArticle",
          "headline": "Personal Data Sovereignty: A Vision for Individual Control",
          "author": { "@type": "Organization", "name": "Edge Vector Foundation", "url": "https://edgevector.org" },
          "publisher": { "@type": "Organization", "name": "Edge Vector Foundation" },
          "url": "https://edgevector.org/whitepaper",
          "description": "The Edge Vector Foundation's vision for personal data sovereignty.",
          "keywords": "data sovereignty, personal data, FoldDB, Exemem, encryption, permissioned access, data provenance"
        })}</script>
      </Helmet>

      <h1 className="tagline">Whitepaper</h1>
      <p className="subtitle">Personal Data Sovereignty: A Vision for Individual Control</p>
      <hr className="decorative-rule" aria-hidden="true" />

      <p>
        <a href="/whitepaper.html" target="_blank" rel="noreferrer" className="link-btn">[Read the Full Whitepaper]</a>
      </p>

      <Section variant="slate">
        <h2><span className="bold">ABSTRACT</span></h2>

        <p>People have lost control over their personal data. It is scattered across dozens of platforms, stored in formats they cannot access, governed by terms they did not meaningfully consent to, and exploited in ways they cannot see. This is not a technology problem &mdash; it is an infrastructure problem.</p>

        <p>This paper presents the Edge Vector Foundation&rsquo;s vision for <span className="bold white">personal data sovereignty</span> &mdash; an open ecosystem where individuals control how their data is stored, who can access it, and how it is used. We describe six requirements for making this real and how two open-source systems &mdash; <span className="bold">FoldDB</span> and <span className="bold">Exemem</span> &mdash; work together to meet them.</p>
      </Section>

      <Section variant="rose">
        <h2><span className="bold">SIX REQUIREMENTS</span></h2>

        <div className="grid-2">
          <Card><p><Label color="red">SEAMLESS INGESTION</Label></p><p>Self-ingestion from devices plus permissioned third-party writes. A global schema registry makes data automatically compatible across all applications.</p></Card>
          <Card><p><Label color="red">PRACTICAL USE</Label></p><p>Applications operate on your data through a universal API. Selective disclosure through policy-enforcing folds. Your data stays under your control.</p></Card>
          <Card><p><Label color="red">SECURITY BY DEFAULT</Label></p><p>End-to-end encryption, four-layer access control (trust distance, capabilities, security labels, payment gates), and economic safeguards against mass extraction.</p></Card>
          <Card><p><Label color="red">VERIFIABLE TRUST</Label></p><p>Cryptographically signed writes, append-only storage, transparent access logs, and a Universal Transform Registry for provable data provenance.</p></Card>
          <Card><p><Label color="red">LONG-TERM VIABILITY</Label></p><p>Encrypted cloud backups for resilience. AI-assisted permission management for non-technical users. Built to last decades.</p></Card>
          <Card><p><Label color="red">COLLECTIVE VALUE</Label></p><p>Anonymized communal computation via per-entry pseudonyms. Interpersonal sharing. Data marketplaces where users set the terms and receive compensation.</p></Card>
        </div>
      </Section>

      <Section variant="sage">
        <h2><span className="bold">PAPER OUTLINE</span></h2>

        <pre>{`
  1.  The Problem ................. Why personal data is broken
  2.  The Vision .................. Six requirements for sovereignty
  3.  Seamless Ingestion .......... Self-ingestion and third-party writes
  4.  Practical Use ............... Applications, selective disclosure, APIs
  5.  Security by Default ......... Encryption, permissions, economic safeguards
  6.  Verifiable Trustworthiness .. Signed writes, access logs, provenance
  7.  Long-Term Viability ......... Cloud backup, accessible management
  8.  Collective Value ............ Communal computation, sharing, marketplaces
  9.  How It Works Together ....... FoldDB + Exemem architecture
  10. What This Makes Possible .... Healthcare, finance, creative, personal
  11. Organizational Structure .... Foundation + subsidiary model
  12. Conclusion .................. The path forward
`}</pre>
      </Section>

      <Section variant="amber">
        <h2><span className="bold">TWO SYSTEMS, ONE ECOSYSTEM</span></h2>

        <div className="grid-2">
          <Card>
            <p><Label color="yellow">FOLDDB</Label></p>
            <p>The personal data store. Global schema registry for universal app compatibility. Policy-enforcing folds for granular access control. Signed, append-only storage. Encrypted cloud backup. The sovereignty layer.</p>
          </Card>

          <Card>
            <p><Label color="yellow">EXEMEM</Label></p>
            <p>The network layer. Public vector embeddings for discovery. Per-entry derived pseudonyms for unlinkability. Collective computation where anonymity strengthens with growth. The value layer.</p>
          </Card>
        </div>

        <p>Discovery is public and pseudonymous. Access is private and policy-controlled. Value and privacy grow together.</p>
      </Section>

      <div className="cta-block">
        <p>
          <a href="/whitepaper.html" target="_blank" rel="noreferrer" className="link-btn">[Read the Full Whitepaper]</a>{'  '}
          <a href="https://github.com/shiba4life/fold_db" target="_blank" rel="noreferrer" className="link-btn">[Get FoldDB]</a>{'  '}
          <Link to="/technology" className="link-btn">[Technology Overview]</Link>{'  '}
          <Link to="/about" className="link-btn">[About the Foundation]</Link>
        </p>
      </div>
    </>
  );
}
