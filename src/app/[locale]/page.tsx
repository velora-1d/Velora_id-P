import { getLocale } from 'next-intl/server';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/sections/Hero';
import Services from '@/components/sections/Services';
import Portfolio from '@/components/sections/Portfolio';
import Blog from '@/components/sections/Blog';
import Testimonials from '@/components/sections/Testimonials';
import FAQ from '@/components/sections/FAQ';
import Contact from '@/components/sections/Contact';
import About from '@/components/sections/About';

export default async function HomePage() {
  const locale = await getLocale();

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Services locale={locale} />
        <Portfolio />
        <Testimonials />
        <About />
        <Blog />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
