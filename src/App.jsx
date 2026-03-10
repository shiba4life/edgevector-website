import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Layout from './components/Layout';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';

const About = lazy(() => import('./pages/About'));
const Technology = lazy(() => import('./pages/Technology'));
const Papers = lazy(() => import('./pages/Papers'));
const Whitepaper = lazy(() => import('./pages/Whitepaper'));
const Internal = lazy(() => import('./pages/Internal'));
const NotFound = lazy(() => import('./pages/NotFound'));

export default function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Layout>
          <Suspense fallback={<p className="dim">Loading...</p>}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/technology" element={<Technology />} />
              <Route path="/papers" element={<Papers />} />
              <Route path="/whitepaper" element={<Whitepaper />} />
              <Route path="/internal" element={<Internal />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </Layout>
      </BrowserRouter>
    </HelmetProvider>
  );
}
