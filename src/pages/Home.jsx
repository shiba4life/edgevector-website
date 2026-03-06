import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Section from '../components/Section';
import Card from '../components/Card';
import Label from '../components/Label';

export default function Home() {
  return (
    <>
      <Helmet>
        <title>Edge Vector Foundation: Restoring Control Over Personal Data</title>
        <meta name="description" content="Edge Vector Foundation exists to restore individual control over personal data. We build open technology that enables secure, user-controlled computation on personal data." />
        <meta name="keywords" content="data sovereignty, personal data, privacy, user control, encryption, data ingestion, permissioned APIs, open source, data provenance" />
        <meta property="og:title" content="Edge Vector Foundation: Restoring Control Over Personal Data" />
        <meta property="og:description" content="People, not corporations, should determine how their data is stored, accessed, and used. We build the open ecosystem to make that real." />
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

      <p>A framework for restoring individual control over personal data through secure, user-controlled infrastructure and open standards.</p>

      <p>Today, most personal information is stored inside platforms that determine how that data can be accessed, analyzed, or shared. The Edge Vector Foundation&rsquo;s goal is to establish an <span className="bold white">open ecosystem</span> where individuals retain authority over their own information while still enabling powerful applications, services, and research built on top of it.</p>

      <p>Achieving this requires solving several core challenges: ingestion, usability, security, trust, long-term viability, and collective value.</p>

      <p>
        <a href="#pillars" className="link-btn">[Our Vision]</a>{'  '}
        <a href="#projects" className="link-btn">[Projects]</a>{'  '}
        <Link to="/whitepaper" className="link-btn">[Whitepaper]</Link>
      </p>

      <Section variant="sage" id="pillars">
        <h2><span className="bold">1. SEAMLESS DATA INGESTION</span></h2>

        <div className="grid-2">
          <Card>
            <p><Label color="green">SELF-INGESTION</Label></p>
            <p>Users must be able to import documents, media, and personal records directly from their devices.</p>
          </Card>

          <Card>
            <p><Label color="green">THIRD-PARTY WRITES</Label></p>
            <p>Third-party applications must be able to write data into the system with explicit user permission.</p>
          </Card>
        </div>
      </Section>

      <Section variant="slate">
        <h2><span className="bold">2. PRACTICAL USE OF PERSONAL DATA</span></h2>

        <div className="grid-3">
          <Card>
            <p><Label color="blue">APPLICATIONS ON YOUR DATA</Label></p>
            <p>Applications and assistants should be able to operate directly on user-owned data.</p>
          </Card>

          <Card>
            <p><Label color="blue">SELECTIVE DISCLOSURE</Label></p>
            <p>Users must be able to selectively reveal information to trusted parties such as doctors or financial advisors.</p>
          </Card>

          <Card>
            <p><Label color="blue">PERMISSIONED APIs</Label></p>
            <p>External applications should be able to access data through permissioned APIs controlled by the user.</p>
          </Card>
        </div>
      </Section>

      <Section variant="rose">
        <h2><span className="bold">3. SECURITY BY DEFAULT</span></h2>

        <div className="grid-3">
          <Card>
            <p><Label color="red">END-TO-END ENCRYPTION</Label></p>
            <p>All data should be protected by end-to-end encryption.</p>
          </Card>

          <Card>
            <p><Label color="red">GRANULAR PERMISSIONS</Label></p>
            <p>Fine-grained permission systems must allow users to control exactly who can access specific information.</p>
          </Card>

          <Card>
            <p><Label color="red">ECONOMIC SAFEGUARDS</Label></p>
            <p>Economic safeguards such as micropayments with escalating costs discourage large-scale data extraction.</p>
          </Card>
        </div>
      </Section>

      <Section variant="amber">
        <h2><span className="bold">4. VERIFIABLE TRUSTWORTHINESS</span></h2>

        <div className="grid-3">
          <Card>
            <p><Label color="yellow">SIGNED WRITES</Label></p>
            <p>All writes should be cryptographically signed.</p>
          </Card>

          <Card>
            <p><Label color="yellow">TRANSPARENT ACCESS LOGS</Label></p>
            <p>Reads and read attempts must be logged transparently.</p>
          </Card>

          <Card>
            <p><Label color="yellow">DATA PROVENANCE</Label></p>
            <p>Data provenance mechanisms ensure that derived information can be traced to its source.</p>
          </Card>
        </div>
      </Section>

      <Section variant="lavender">
        <h2><span className="bold">5. LONG-TERM PERSONAL DATA INFRASTRUCTURE</span></h2>

        <div className="grid-2">
          <Card>
            <p><Label color="purple">RESILIENCE</Label></p>
            <p>Secure cloud backups provide resilience without sacrificing user ownership.</p>
          </Card>

          <Card>
            <p><Label color="purple">ACCESSIBLE MANAGEMENT</Label></p>
            <p>Permission management should remain usable for non-technical users through intelligent assistance.</p>
          </Card>
        </div>
      </Section>

      <Section variant="sage">
        <h2><span className="bold">6. COLLECTIVE VALUE FROM PERSONAL DATA</span></h2>

        <div className="grid-3">
          <Card>
            <p><Label color="green">COMMUNAL COMPUTATION</Label></p>
            <p>Anonymized vectorized datasets can enable insights into collective trends.</p>
          </Card>

          <Card>
            <p><Label color="green">INTERPERSONAL SHARING</Label></p>
            <p>Individuals may share data with friends, collaborators, or communities.</p>
          </Card>

          <Card>
            <p><Label color="green">DATA MARKETPLACES</Label></p>
            <p>Users may optionally allow specific queries against their data and receive compensation.</p>
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
              <a href="https://exemem.com" target="_blank" rel="noreferrer" className="link-btn">[Website]</a>
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

        <p>The long-term objective of the Edge Vector Foundation is to establish a durable personal data infrastructure: a system where individuals permanently own their information, determine how it is used, and benefit from the value it creates.</p>

        <p>
          <Link to="/whitepaper" className="link-btn">[Read the Whitepaper]</Link>{'  '}
          <a href="#projects" className="link-btn">[Explore the Projects]</a>{'  '}
          <Link to="/about" className="link-btn">[About the Foundation]</Link>
        </p>
      </div>
    </>
  );
}
