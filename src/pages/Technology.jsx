import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Section from '../components/Section';
import Card from '../components/Card';
import Label from '../components/Label';
import ArchDiagram from '../components/ArchDiagram';

export default function Technology() {
  return (
    <>
      <Helmet>
        <title>Technology — Edge Vector Foundation</title>
        <meta name="description" content="Edge Vector's technology: user-controlled data stores with seamless ingestion, permissioned access, end-to-end encryption, signed writes, access logs, and collective computation. All open source." />
        <meta name="keywords" content="data sovereignty technology, personal data store, encrypted storage, permissioned APIs, signed writes, data provenance, FoldDB, collective computation, open source" />
        <meta property="og:title" content="Technology — Edge Vector Foundation" />
        <meta property="og:description" content="Personal data infrastructure with seamless ingestion, security by default, verifiable trustworthiness, and collective computation. How the sovereign data stack works." />
        <meta property="og:url" content="https://edgevector.org/technology" />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Technology — Edge Vector Foundation" />
        <link rel="canonical" href="https://edgevector.org/technology" />
      </Helmet>

      <h1 className="tagline">Technology</h1>
      <hr className="decorative-rule" aria-hidden="true" />

      <p>Edge Vector&rsquo;s technology gives individuals a <span className="bold white">personal data store they actually control</span> &mdash; with seamless ingestion, granular permissions, end-to-end encryption, verifiable integrity, and the option to derive collective value.</p>

      <Section variant="slate">
        <h2><span className="bold">ARCHITECTURE</span> <span className="dim">User-controlled, cloud-resilient</span></h2>

        <ArchDiagram />
      </Section>

      <Section variant="sage">
        <h2><span className="bold">DATA INGESTION</span> <span className="dim">Bringing data under your control</span></h2>

        <div className="grid-2">
          <Card>
            <p><Label color="green">SELF-INGESTION</Label></p>
            <p>Import documents, media, code, emails, notes, and data files directly from your devices. Format-aware parsing aligns to natural boundaries &mdash; functions in code, paragraphs in prose, records in data. Your files become structured, queryable knowledge.</p>
          </Card>

          <Card>
            <p><Label color="green">THIRD-PARTY WRITES</Label></p>
            <p>Applications and services can write data into your store with explicit permission. Medical records from your doctor, receipts from a purchase, notes from a collaborator &mdash; all land in your personal data store, signed and logged.</p>
          </Card>

          <Card>
            <p><Label color="green">DELTA SCANNING</Label></p>
            <p>A background daemon watches your file system for changes. Uses BLAKE3 hashing to efficiently detect modifications. Only re-indexes what changed &mdash; scanning 500K files takes under 10 seconds.</p>
          </Card>

          <Card>
            <p><Label color="green">FORMAT SUPPORT</Label></p>
            <p>Markdown, plain text, PDF, DOCX, HTML, LaTeX, JSON, CSV, YAML, TOML, XML, email, and code in all major languages via tree-sitter.</p>
          </Card>
        </div>
      </Section>

      <Section variant="rose">
        <h2><span className="bold">SECURITY &amp; VERIFICATION</span> <span className="dim">Trust by design, not by promise</span></h2>

        <div className="grid-3">
          <Card>
            <p><Label color="red">END-TO-END ENCRYPTION</Label></p>
            <p><span className="bold">AES-256-GCM</span> for content encryption. Keys derived via <span className="bold">Argon2id</span> KDF, expanded through HKDF. Your master key never touches disk unencrypted. The cloud only ever sees ciphertext.</p>
          </Card>

          <Card>
            <p><Label color="red">SIGNED WRITES</Label></p>
            <p>Every data entry is cryptographically signed. You can verify who wrote what, and when. Tampered data is detectable. Authenticity is provable.</p>
          </Card>

          <Card>
            <p><Label color="red">TRANSPARENT ACCESS LOGS</Label></p>
            <p>All reads and read attempts are recorded. You always know who accessed your data, what they accessed, and when. No silent surveillance.</p>
          </Card>
        </div>

        <div className="grid-2">
          <Card>
            <p><Label color="red">DATA PROVENANCE</Label></p>
            <p>Public, verifiable transforms ensure derived data can be traced to its original source and validated for correctness. The chain of custody is transparent.</p>
          </Card>

          <Card>
            <p><Label color="red">ECONOMIC SAFEGUARDS</Label></p>
            <p>Micropayment mechanisms with exponentially increasing costs make large-scale data extraction or inference attacks economically impractical.</p>
          </Card>
        </div>
      </Section>

      <Section variant="amber">
        <h2><span className="bold">PERMISSIONED ACCESS</span> <span className="dim">You decide who sees what</span></h2>

        <div className="grid-3">
          <Card>
            <p><Label color="yellow">GRANULAR PERMISSIONS</Label></p>
            <p>Fine-grained controls let you determine exactly who can access which data, for how long, and under what conditions. Not all-or-nothing &mdash; precise control.</p>
          </Card>

          <Card>
            <p><Label color="yellow">SELECTIVE DISCLOSURE</Label></p>
            <p>Share specific information with trusted parties &mdash; a doctor sees your medical history, an advisor sees financial data, a collaborator sees project files. Nothing more.</p>
          </Card>

          <Card>
            <p><Label color="yellow">PERMISSIONED APIs</Label></p>
            <p>External applications access your data through controlled endpoints with explicit authorization. Your data stays in your store &mdash; applications come to it, not the other way around.</p>
          </Card>
        </div>
      </Section>

      <Section variant="lavender">
        <h2><span className="bold">COLLECTIVE COMPUTATION</span> <span className="dim">Shared value, individual control</span></h2>

        <div className="grid-3">
          <Card>
            <p><Label color="purple">COMMUNAL QUERIES</Label></p>
            <p>Anonymized vectorized data enables insight into collective trends while protecting individual identity. A query propagates across participating nodes; each returns only the answer &mdash; never the raw data.</p>
          </Card>

          <Card>
            <p><Label color="purple">INTERPERSONAL SHARING</Label></p>
            <p>Share information with friends, collaborators, or communities in a controlled manner. The recipient gets what you chose to share. Your underlying data stays private.</p>
          </Card>

          <Card>
            <p><Label color="purple">DATA MARKETPLACES</Label></p>
            <p>Opt in to allow specific queries against your data and receive compensation when relevant matches are found. You set the terms. You keep control.</p>
          </Card>
        </div>
      </Section>

      <Section variant="slate">
        <h2><span className="bold">PERFORMANCE</span> <span className="dim">Built for real-world scale</span></h2>

        <pre>{`
  METRIC                          TARGET
  ─────────────────────────────────────────
  Installation time               < 2 minutes
  Initial indexing speed           > 200,000 files/hr
  Incremental scan (500K files)   < 10 seconds
  Semantic query latency          < 500ms
  Keyword query latency           < 100ms
  Memory usage (idle)             < 200 MB
  Disk overhead                   ~20% of source files
`}</pre>

        <p>These targets are designed for consumer hardware &mdash; laptops and desktops, not servers. Personal data infrastructure should run on what you already own.</p>
      </Section>

      <div className="cta-block">
        <p>Want the full technical details?</p>
        <p>
          <Link to="/whitepaper" className="link-btn">[Read the Whitepaper]</Link>{'  '}
          <a href="https://github.com/shiba4life/fold_db" target="_blank" rel="noreferrer" className="link-btn">[View the Source]</a>
        </p>
      </div>
    </>
  );
}
