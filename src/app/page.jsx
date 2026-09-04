
import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import Navbar from '@/components/layout/Navbar';
import Hero from '@/components/sections/Hero';
import { createClient } from '@/lib/supabase/server';
import { LazyMotion, domMax } from 'framer-motion';

// ... (rest of dynamic imports)
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
        <LazyMotion features={domMax}>
            <div className="font-sans bg-[#070C18] text-slate-100 min-h-screen overflow-x-hidden">
                {faqSchema && (
                    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
                )}
                <Navbar />
                <Hero />
                
                <Suspense fallback={<SectionPlaceholder />}>
                    <Services />
                </Suspense>
                
                <Suspense fallback={<SectionPlaceholder />}>
                    <FeaturedProduct />
                </Suspense>
                
                <Suspense fallback={<SectionPlaceholder />}>
                    <Portfolio />
                </Suspense>
                
                <Suspense fallback={<SectionPlaceholder />}>
                    <Workflow />
                </Suspense>
                
                <Suspense fallback={<SectionPlaceholder />}>
                    <Testimonials />
                </Suspense>
                
                <Suspense fallback={<SectionPlaceholder />}>
                    <About />
                </Suspense>
                
                <Suspense fallback={<SectionPlaceholder />}>
                    <Founder />
                </Suspense>
                
                <Suspense fallback={<SectionPlaceholder />}>
                    <Legalitas />
                </Suspense>
                
                <Suspense fallback={<SectionPlaceholder />}>
                    <Blog />
                </Suspense>
                
                <Suspense fallback={<SectionPlaceholder />}>
                    <FAQ />
                </Suspense>
                
                <Suspense fallback={<SectionPlaceholder />}>
                    <Contact />
                </Suspense>
                
                <Suspense fallback={<SectionPlaceholder />}>
                    <Footer />
                </Suspense>
            </div>
        </LazyMotion>
    );
}

// Simple placeholder to maintain layout while loading
const SectionPlaceholder = () => <div className="min-h-[200px] w-full bg-[#070C18]" />;
