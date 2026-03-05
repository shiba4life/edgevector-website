import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Section from '../components/Section';
import Card from '../components/Card';
import Label from '../components/Label';

export default function Home() {
  return (
    <>
      <Helmet>
        <title>Edge Vector Foundation — Restoring Control Over Personal Data</title>
        <meta name="description" content="Edge Vector Foundation exists to restore individual control over personal data. We build open technology that enables secure, user-controlled computation on personal data." />
        <meta name="keywords" content="data sovereignty, personal data, privacy, user control, encryption, data ingestion, permissioned APIs, open source, data provenance" />
        <meta property="og:title" content="Edge Vector Foundation — Restoring Control Over Personal Data" />
        <meta property="og:description" content="People — not corporations — should determine how their data is stored, accessed, and used. We build the open ecosystem to make that real." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://edgevector.org/" />
        <meta property="og:site_name" content="Edge Vector Foundation" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Edge Vector Foundation" />
        <meta name="twitter:description" content="Restoring individual control over personal data through open technology." />
        <link rel="canonical" href="https://edgevector.org/" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "Edge Vector Foundation",
          "description": "A non-profit building open technology to restore individual control over personal data.",
          "url": "https://edgevector.org/",
          "isPartOf": { "@type": "WebSite", "name": "Edge Vector Foundation", "url": "https://edgevector.org" }
        })}</script>
      </Helmet>

      <div className="hero-title" aria-label="Edge Vector">
        <span className="hero-title-line">EDGE</span>
        <span className="hero-title-line">VECTOR</span>
      </div>
      <hr className="decorative-rule" aria-hidden="true" />
      <h1 className="tagline">Restoring individual control over personal data.</h1>
      <hr className="decorative-rule" aria-hidden="true" />
      <br />

      <p>The Edge Vector Foundation exists to ensure that <span className="bold white">people &mdash; not corporations or centralized platforms</span> &mdash; determine how their data is stored, accessed, and used.</p>

      <p>We are building an <span className="bold white">open ecosystem</span> that enables secure, user-controlled computation on personal data.</p>

      <p>
        <a href="#pillars" className="link-btn">[Our Vision]</a>{'  '}
        <a href="#projects" className="link-btn">[Projects]</a>{'  '}
        <Link to="/whitepaper" className="link-btn">[Whitepaper]</Link>
      </p>

      <Section variant="sage" id="pillars">
        <h2><span className="bold">1. SEAMLESS DATA INGESTION</span></h2>

        <p>Individuals must be able to easily bring their data into their personal data store.</p>

        <div className="grid-2">
          <Card>
            <p><Label color="green">SELF-INGESTION</Label></p>
            <p>Users can import documents, media, and other personal data directly from their devices. Your files become structured, queryable knowledge &mdash; under your control.</p>
          </Card>

          <Card>
            <p><Label color="green">THIRD-PARTY WRITES</Label></p>
            <p>Applications and services can write data with user permission, allowing external tools to contribute to the user&rsquo;s personal record. You decide who can add to your data store.</p>
          </Card>
        </div>
      </Section>

      <Section variant="slate">
        <h2><span className="bold">2. PRACTICAL USE OF PERSONAL DATA</span></h2>

        <p>Ownership is meaningful only if people can actually <span className="bold white">use</span> their data.</p>

        <div className="grid-3">
          <Card>
            <p><Label color="blue">APPLICATIONS ON YOUR DATA</Label></p>
            <p>Software &mdash; from budgeting tools to health trackers to AI assistants &mdash; can operate directly on your data without requiring centralized storage.</p>
          </Card>

          <Card>
            <p><Label color="blue">SELECTIVE DISCLOSURE</Label></p>
            <p>Users can reveal specific information to trusted parties &mdash; doctors, financial advisors, collaborators &mdash; without exposing everything.</p>
          </Card>

          <Card>
            <p><Label color="blue">PERMISSIONED APIs</Label></p>
            <p>External applications can access user data through controlled endpoints with explicit user authorization. Access is granted, not assumed.</p>
          </Card>
        </div>
      </Section>

      <Section variant="rose">
        <h2><span className="bold">3. SECURITY BY DEFAULT</span></h2>

        <p>The system must protect data against unauthorized access while remaining <span className="bold white">practical to use</span>.</p>

        <div className="grid-3">
          <Card>
            <p><Label color="red">END-TO-END ENCRYPTION</Label></p>
            <p>Only authorized parties can read the data. Encryption is not an add-on &mdash; it is the foundation.</p>
          </Card>

          <Card>
            <p><Label color="red">GRANULAR PERMISSIONS</Label></p>
            <p>Users determine exactly who can access what information. Fine-grained controls, not all-or-nothing access.</p>
          </Card>

          <Card>
            <p><Label color="red">ECONOMIC SAFEGUARDS</Label></p>
            <p>Micropayment mechanisms with exponentially increasing costs discourage large-scale data extraction or inference attacks.</p>
          </Card>
        </div>
      </Section>

      <Section variant="amber">
        <h2><span className="bold">4. VERIFIABLE TRUSTWORTHINESS</span></h2>

        <p>Data systems must provide <span className="bold white">guarantees</span> about authenticity and integrity.</p>

        <div className="grid-3">
          <Card>
            <p><Label color="yellow">SIGNED WRITES</Label></p>
            <p>All data entries are cryptographically signed. You can verify who wrote what, and when.</p>
          </Card>

          <Card>
            <p><Label color="yellow">TRANSPARENT ACCESS LOGS</Label></p>
            <p>All reads and read attempts are recorded. You always know who accessed your data.</p>
          </Card>

          <Card>
            <p><Label color="yellow">DATA PROVENANCE</Label></p>
            <p>Public, verifiable transforms ensure derived data can be traced to its original source and validated for correctness.</p>
          </Card>
        </div>
      </Section>

      <Section variant="lavender">
        <h2><span className="bold">5. LONG-TERM PERSONAL DATA INFRASTRUCTURE</span></h2>

        <p>A personal data system must remain viable for <span className="bold white">decades</span>.</p>

        <div className="grid-2">
          <Card>
            <p><Label color="purple">RESILIENCE</Label></p>
            <p>Secure cloud backups provide redundancy while preserving user control. Your data survives hardware failures without surrendering sovereignty.</p>
          </Card>

          <Card>
            <p><Label color="purple">ACCESSIBLE PERMISSION MANAGEMENT</Label></p>
            <p>AI-assisted interfaces help non-technical users manage access and policies. Data sovereignty should not require a computer science degree.</p>
          </Card>
        </div>
      </Section>

      <Section variant="sage">
        <h2><span className="bold">6. COLLECTIVE VALUE FROM PERSONAL DATA</span></h2>

        <p>When individuals choose to participate, their data can generate <span className="bold white">shared benefits</span> without requiring centralized ownership.</p>

        <div className="grid-3">
          <Card>
            <p><Label color="green">COMMUNAL COMPUTATION</Label></p>
            <p>Anonymized vectorized data enables insight into collective trends while protecting individual identity.</p>
          </Card>

          <Card>
            <p><Label color="green">INTERPERSONAL SHARING</Label></p>
            <p>Users can share information with friends, collaborators, or communities in a controlled manner. Sharing is a choice, not a requirement.</p>
          </Card>

          <Card>
            <p><Label color="green">DATA MARKETPLACES</Label></p>
            <p>Individuals may choose to allow specific queries against their data and receive compensation when relevant matches are found.</p>
          </Card>
        </div>
      </Section>

      <Section variant="slate" id="projects">
        <h2><span className="bold">PROJECTS</span></h2>

        <p>The Edge Vector Foundation develops open-source tools that enable this vision.</p>

        <div className="grid-2">
          <Card>
            <p><Label color="blue">FOLDDB</Label></p>
            <p>The core database. Schema-based storage and querying for personal data. Runs locally with encrypted cloud backup. The foundation for user-controlled data infrastructure.</p>
            <p>
              <a href="https://folddb.com" target="_blank" rel="noreferrer" className="link-btn">[Website]</a>{'  '}
              <a href="https://github.com/shiba4life/fold_db" target="_blank" rel="noreferrer" className="link-btn">[GitHub]</a>
            </p>
          </Card>

          <Card>
            <p><Label color="blue">EXEMEM</Label></p>
            <p>Cloud-resilient infrastructure for networked FoldDB nodes. Multi-tenant architecture with user-level encryption. Enables collective computation while preserving individual sovereignty.</p>
          </Card>
        </div>

        <div className="grid-2">
          <Card>
            <p><Label color="orange">SCHEMA REGISTRY</Label></p>
            <p>A shared vocabulary for data schemas that enables interoperability across nodes without centralizing data.</p>
            <p>
              <a href="https://schema.folddb.com" target="_blank" rel="noreferrer" className="link-btn">[Registry]</a>
            </p>
          </Card>

          <Card>
            <p><Label color="orange">FILE_TO_JSON</Label></p>
            <p>A universal ingestion pipeline for converting diverse file types into structured data for seamless data ingestion.</p>
            <p>
              <a href="https://github.com/shiba4life/file_to_json" target="_blank" rel="noreferrer" className="link-btn">[GitHub]</a>
            </p>
          </Card>
        </div>
      </Section>

      <div className="cta-block">
        <p className="tagline">Your Data. Your Control.</p>

        <p>The Edge Vector Foundation exists to build the infrastructure for a world where:</p>

        <p>&bull; individuals control their data<br />
        &bull; systems are secure by default<br />
        &bull; trust is verifiable, not assumed<br />
        &bull; collective value does not require centralized ownership</p>

        <p><span className="bold white">People should determine how their data is stored, accessed, and used.</span></p>

        <p>
          <Link to="/whitepaper" className="link-btn">[Read the Whitepaper]</Link>{'  '}
          <a href="#projects" className="link-btn">[Explore the Projects]</a>{'  '}
          <Link to="/about" className="link-btn">[About the Foundation]</Link>
        </p>
      </div>
    </>
  );
}
