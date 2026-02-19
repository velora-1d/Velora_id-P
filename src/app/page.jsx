
import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import Navbar from '@/components/layout/Navbar';
import Hero from '@/components/sections/Hero';

// Dynamic imports for heavy sections
const Services = dynamic(() => import('@/components/sections/Services'));
const FeaturedProduct = dynamic(() => import('@/components/sections/FeaturedProduct'));
const Portfolio = dynamic(() => import('@/components/sections/Portfolio'));
const Workflow = dynamic(() => import('@/components/sections/Workflow'));
const Testimonials = dynamic(() => import('@/components/sections/Testimonials'));
const About = dynamic(() => import('@/components/sections/About'));
const Founder = dynamic(() => import('@/components/sections/Founder'));
const Legalitas = dynamic(() => import('@/components/sections/Legalitas'));
const Blog = dynamic(() => import('@/components/sections/Blog'));
const FAQ = dynamic(() => import('@/components/sections/FAQ'));
const Contact = dynamic(() => import('@/components/sections/Contact'));
const Footer = dynamic(() => import('@/components/layout/Footer'));

export default function Home() {
    return (
        <div className="font-sans text-gray-900 overflow-x-hidden">
            <Navbar />
            <Hero />
            <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
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
