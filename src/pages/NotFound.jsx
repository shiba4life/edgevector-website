import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

export default function NotFound() {
  return (
    <>
      <Helmet>
        <title>404 | Edge Vector Foundation</title>
      </Helmet>
      <h1 className="tagline">404</h1>
      <p>Page not found.</p>
      <p><Link to="/" className="link-btn">[Back to Home]</Link></p>
    </>
  );
}
