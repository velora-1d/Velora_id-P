'use client';

import { useState, useEffect, useCallback } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';

const Navbar = () => {
    const [activeSection, setActiveSection] = useState('home');
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);

            const sections = ['home', 'services', 'featured', 'portfolio', 'workflow', 'testimonials', 'tentang', 'blog', 'faq', 'contact'];
            const scrollPosition = window.scrollY + 120;

            if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 50) {
                setActiveSection('contact');
                return;
            }

            for (const sectionId of sections) {
                const element = document.getElementById(sectionId);
                if (element) {
                    const { offsetTop, offsetHeight } = element;
                    if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
                        setActiveSection(sectionId);
                    }
                }
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = useCallback((id) => {
        setMobileMenuOpen(false);
        const element = document.getElementById(id);
        if (element) {
            window.scrollTo({
                top: element.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    }, []);

    const navLinks = [
        { id: 'home', label: 'Home' },
        { id: 'services', label: 'Layanan' },
        { id: 'featured', label: 'Sistem' },
        { id: 'portfolio', label: 'Portfolio' },
        { id: 'workflow', label: 'Cara Kerja' },
        { id: 'faq', label: 'FAQ' },
    ];

    return (
        <>
            <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-out ${scrolled
                    ? 'py-3'
                    : 'py-5'
                }`}>
                {/* Navbar container — floating pill when scrolled */}
                <div className={`mx-auto transition-all duration-500 ease-out ${scrolled
                        ? 'max-w-5xl px-2 sm:px-3'
                        : 'container px-6'
                    }`}>
                    <div className={`flex items-center justify-between transition-all duration-500 ${scrolled
                            ? 'bg-slate-950/85 backdrop-blur-xl shadow-2xl border border-slate-800/90 rounded-2xl px-4 sm:px-6 py-2.5'
                            : 'px-0 py-0'
                        }`}>
                        {/* Logo */}
                        <button
                            onClick={() => scrollToSection('home')}
                            className="flex items-center gap-2.5 group"
                        >
                            <img
                                src="/images/logo.webp"
                                alt="Velora"
                                width={160}
                                height={40}
                                className={`w-auto transition-all duration-300 ${scrolled ? 'h-8' : 'h-10 sm:h-12'}`}
                            />
                            <span className="font-bold tracking-tight transition-all duration-300 text-lg sm:text-xl text-white">
                                Velora
                            </span>
                        </button>

                        {/* Desktop Menu — centered */}
                        <div className="hidden lg:flex items-center">
                            <div className="flex items-center gap-1 bg-slate-900/60 backdrop-blur-md rounded-xl px-1.5 py-1 border border-slate-800/80">
                                {navLinks.map((link) => (
                                    <button
                                        key={link.id}
                                        onClick={() => scrollToSection(link.id)}
                                        className={`relative px-4 py-1.5 rounded-lg text-[13px] font-medium tracking-wide transition-all duration-200 ${activeSection === link.id
                                                ? 'text-white bg-blue-600 shadow-sm shadow-blue-900/40'
                                                : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                                            }`}
                                    >
                                        {link.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* CTA */}
                        <div className="hidden lg:flex items-center">
                            <button
                                onClick={() => scrollToSection('contact')}
                                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-[13px] font-bold bg-gradient-to-r from-blue-600 to-orange-500 hover:from-blue-500 hover:to-orange-400 text-white shadow-lg shadow-blue-900/30 hover:shadow-orange-500/20 transition-all duration-200 group hover:-translate-y-0.5"
                            >
                                <span>Hubungi Kami</span>
                                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform text-orange-100 group-hover:text-white" />
                            </button>
                        </div>

                        {/* Mobile Toggle */}
                        <button
                            className="lg:hidden p-2 rounded-xl transition-all duration-200 text-white hover:bg-slate-800"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            aria-label="Toggle menu"
                        >
                            <div className="relative w-5 h-5">
                                <Menu className={`w-5 h-5 absolute inset-0 transition-all duration-300 ${mobileMenuOpen ? 'opacity-0 rotate-90 scale-75' : 'opacity-100 rotate-0 scale-100'}`} />
                                <X className={`w-5 h-5 absolute inset-0 transition-all duration-300 ${mobileMenuOpen ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-75'}`} />
                            </div>
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu — Full overlay */}
            <div
                className={`fixed inset-0 z-40 transition-all duration-500 ${mobileMenuOpen ? 'visible' : 'invisible'
                    }`}
            >
                {/* Backdrop */}
                <div
                    className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-500 ${mobileMenuOpen ? 'opacity-100' : 'opacity-0'
                        }`}
                    onClick={() => setMobileMenuOpen(false)}
                ></div>

                {/* Menu Panel — slides from right */}
                <div className={`absolute top-0 right-0 h-full w-[280px] sm:w-[320px] bg-slate-950 border-l border-slate-800 shadow-2xl transition-transform duration-500 ease-out ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
                    }`}>
                    <div className="flex flex-col h-full">
                        {/* Mobile Header */}
                        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-800">
                            <div className="flex items-center gap-2">
                                <img src="/images/logo.webp" alt="Velora" className="h-8 w-auto" />
                                <span className="font-bold text-white text-lg tracking-tight">Velora</span>
                            </div>
                            <button
                                onClick={() => setMobileMenuOpen(false)}
                                className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-900 transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Mobile Links */}
                        <div className="flex-1 px-4 py-6 overflow-y-auto">
                            <div className="space-y-1">
                                {navLinks.map((link, i) => (
                                    <button
                                        key={link.id}
                                        onClick={() => scrollToSection(link.id)}
                                        className={`w-full text-left px-4 py-3 rounded-xl text-[15px] font-medium transition-all duration-200 flex items-center justify-between group ${activeSection === link.id
                                                ? 'bg-blue-600 text-white shadow-md shadow-blue-900/30'
                                                : 'text-slate-300 hover:bg-slate-900 hover:text-white'
                                            }`}
                                        style={{ transitionDelay: mobileMenuOpen ? `${i * 50}ms` : '0ms' }}
                                    >
                                        {link.label}
                                        {activeSection === link.id && (
                                            <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Mobile CTA */}
                        <div className="px-4 pb-6 pt-2 border-t border-slate-800">
                            <button
                                onClick={() => scrollToSection('contact')}
                                className="w-full bg-gradient-to-r from-blue-600 to-orange-500 hover:from-blue-500 hover:to-orange-400 text-white py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-900/30 hover:shadow-orange-500/20"
                            >
                                <span>Hubungi Kami</span>
                                <ArrowRight className="w-4 h-4 text-orange-100" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Navbar;
