
import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import Navbar from '@/components/layout/Navbar';
import Hero from '@/components/sections/Hero';
import { createClient } from '@/lib/supabase/server';

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

async function getFaqData() {
    try {
        const supabase = await createClient();
        const { data } = await supabase
            .from('faqs')
            .select('question, answer')
            .eq('published', true)
            .order('sort_order', { ascending: true });
        return data || [];
    } catch {
        return [];
    }
}

export default async function Home() {
    const faqData = await getFaqData();

    // FAQPage JSON-LD Schema — enables rich snippets in Google
    const faqSchema = faqData.length > 0 ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqData.map((faq) => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: {
                '@type': 'Answer',
                text: faq.answer,
            },
        })),
    } : null;

    return (
        <div className="font-sans text-gray-900 overflow-x-hidden">
            {faqSchema && (
                <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
            )}
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
