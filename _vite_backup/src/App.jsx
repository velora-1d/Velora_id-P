import { Suspense, lazy } from 'react';
import Navbar from './components/layout/Navbar';
import Hero from './components/sections/Hero';

// Lazy load below-the-fold content to improve initial load speed (LCP)
const About = lazy(() => import('./components/sections/About'));
const Founder = lazy(() => import('./components/sections/Founder'));
const Legalitas = lazy(() => import('./components/sections/Legalitas'));
const Services = lazy(() => import('./components/sections/Services'));
const FeaturedProduct = lazy(() => import('./components/sections/FeaturedProduct'));
const Portfolio = lazy(() => import('./components/sections/Portfolio'));
const Workflow = lazy(() => import('./components/sections/Workflow'));
const Testimonials = lazy(() => import('./components/sections/Testimonials'));
const Blog = lazy(() => import('./components/sections/Blog'));
const FAQ = lazy(() => import('./components/sections/FAQ'));
const Contact = lazy(() => import('./components/sections/Contact'));
const Footer = lazy(() => import('./components/layout/Footer'));

function App() {
  return (
    <div className="font-sans text-gray-900 overflow-x-hidden">
      <Navbar />
      <Hero />
      <Suspense fallback={null}>
        <Services />
        <FeaturedProduct />
        <Portfolio />
        <Workflow />
        <Testimonials />
        <About />
        <Founder />
        <Legalitas />
        <Blog />
        <FAQ />
        <Contact />
        <Footer />
      </Suspense>
    </div>
  );
}

export default App;
