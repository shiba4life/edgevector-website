import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Section from '../components/Section';
import Card from '../components/Card';
import Label from '../components/Label';

export default function About() {
  return (
    <>
      <Helmet>
        <title>About — Edge Vector Foundation</title>
        <meta name="description" content="Edge Vector Foundation is a non-profit building a path toward individual data ownership through open-source infrastructure. Learn about our mission, principles, and organizational structure." />
        <meta name="keywords" content="Edge Vector Foundation, non-profit, data sovereignty, personal data control, open source, privacy, mission" />
        <meta property="og:title" content="About — Edge Vector Foundation" />
        <meta property="og:description" content="A non-profit dedicated to ensuring people — not corporations — control their personal data." />
        <meta property="og:url" content="https://edgevector.org/about" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="About — Edge Vector Foundation" />
        <link rel="canonical" href="https://edgevector.org/about" />
      </Helmet>

      <h1 className="tagline">About the Foundation</h1>
      <hr className="decorative-rule" aria-hidden="true" />

      <p>Edge Vector Foundation is a <span className="bold white">non-profit organization</span> building a path toward individual data ownership.</p>

      <p>We believe that people &mdash; not corporations or centralized platforms &mdash; should determine how their data is stored, accessed, and used. We build the open ecosystem that makes this possible: <span className="bold white">secure, user-controlled computation on personal data</span>.</p>

      <Section variant="sage">
        <h2><span className="bold">MISSION</span></h2>

        <p>To ensure that every person controls their own data &mdash; how it is stored, who can access it, and how it is used. We build open-source infrastructure for seamless data ingestion, practical data use, security by default, verifiable trustworthiness, and long-term personal data resilience.</p>
      </Section>

      <Section variant="slate">
        <h2><span className="bold">PRINCIPLES</span> <span className="dim">What we stand for</span></h2>

        <ul className="principle-list">
          <li><span className="bold white">User control is non-negotiable</span> &mdash; People decide what data to store, who can access it, and for how long. Real revocation, not permission theater.</li>
          <li><span className="bold white">Security by default</span> &mdash; End-to-end encryption, granular permissions, and economic safeguards protect data without requiring user expertise.</li>
          <li><span className="bold white">Verifiable, not trusted</span> &mdash; Signed writes, transparent access logs, and data provenance provide cryptographic guarantees about authenticity and integrity.</li>
          <li><span className="bold white">Practical ownership</span> &mdash; Data control is meaningful only when people can use their data &mdash; through personal assistants, selective disclosure, and permissioned APIs.</li>
          <li><span className="bold white">Built for decades</span> &mdash; Personal data infrastructure must be resilient, with secure cloud backups and accessible permission management for non-technical users.</li>
          <li><span className="bold white">Open by default</span> &mdash; Every tool, protocol, and schema is open source. No proprietary lock-in. No closed ecosystems.</li>
        </ul>
      </Section>

      <Section variant="amber">
        <h2><span className="bold">STRUCTURE</span> <span className="dim">How we&rsquo;re organized</span></h2>

        <div className="grid-2">
          <Card>
            <p><Label color="yellow">NON-PROFIT FOUNDATION</Label></p>
            <p>The Edge Vector Foundation governs the open-source ecosystem. We maintain FoldDB, the schema registry, and the network protocols. Our mandate is the long-term health of personal data infrastructure.</p>
            <p className="dim">Open governance. Community-driven. No shareholders.</p>
          </Card>

          <Card>
            <p><Label color="yellow">COMMERCIAL SUBSIDIARY</Label></p>
            <p>A for-profit subsidiary builds commercial products on top of the open-source foundation. Revenue funds continued development of the free tools. The subsidiary can never close-source the foundation&rsquo;s work.</p>
            <p className="dim">Sustainable funding. Aligned incentives.</p>
          </Card>
        </div>

        <p>This structure ensures the core infrastructure remains free and open while creating a sustainable path for long-term development. The foundation sets the direction. The subsidiary funds the work.</p>
      </Section>

      <Section variant="lavender">
        <h2><span className="bold">THE LONG VIEW</span> <span className="dim">Where we&rsquo;re headed</span></h2>

        <p>Today, we&rsquo;re building the tools for individuals to reclaim control over their personal data. Tomorrow, we&rsquo;re building an ecosystem where <span className="bold white">collective value emerges from personal data</span> without requiring centralized ownership.</p>

        <p>Imagine choosing to let anonymized insights from your data contribute to medical research &mdash; without any researcher seeing your records. Or allowing specific queries against your expertise and receiving compensation when matches are found. Or sharing travel recommendations with friends without exposing your trip details.</p>

        <p>This is the vision: <span className="bold white">individual control with collective benefit</span> &mdash; personal data infrastructure that serves people, not platforms.</p>
      </Section>

      <Section variant="rose">
        <h2><span className="bold">GET INVOLVED</span></h2>

        <p>Edge Vector Foundation is an open community. Whether you&rsquo;re a developer, researcher, privacy advocate, or someone who believes in a better model for personal data &mdash; there&rsquo;s a place for you.</p>

        <p>
          <a href="https://github.com/EdgeVector/fold_db" target="_blank" rel="noreferrer" className="link-btn">[Contribute on GitHub]</a>{'  '}
          <a href="https://github.com/EdgeVector/fold_db/discussions" target="_blank" rel="noreferrer" className="link-btn">[Join the Discussion]</a>{'  '}
          <a href="https://github.com/EdgeVector/fold_db/issues" target="_blank" rel="noreferrer" className="link-btn">[Report Issues]</a>{'  '}
          <Link to="/technology" className="link-btn">[Technology]</Link>{'  '}
          <Link to="/papers" className="link-btn">[Papers]</Link>
        </p>
      </Section>
    </>
  );
}
