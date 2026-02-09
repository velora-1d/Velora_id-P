import { useState, useEffect } from 'react';
import { Menu, X, MessageSquare } from 'lucide-react';

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

    const scrollToSection = (id) => {
        setMobileMenuOpen(false);
        const element = document.getElementById(id);
        if (element) {
            window.scrollTo({
                top: element.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    };

    const navLinks = [
        { id: 'home', label: 'Home' },
        { id: 'services', label: 'Layanan' },
        { id: 'featured', label: 'Sistem' },
        { id: 'portfolio', label: 'Portfolio' },
        { id: 'workflow', label: 'Cara Kerja' },
        { id: 'faq', label: 'FAQ' },
    ];

    return (
        <nav className={`fixed top-0 left-0 w-full z-50 navbar-transition ${scrolled ? 'bg-white/95 backdrop-blur-lg shadow-lg py-4' : 'bg-transparent py-6'}`}>
            <div className="container mx-auto flex justify-between items-center px-6">
                {/* Logo */}
                <button
                    onClick={() => scrollToSection('home')}
                    className="flex items-center gap-3 group"
                >
                    <img
                        src="/images/logo.png"
                        alt="Velora"
                        className="h-16 w-auto"
                    />
                    <span className={`text-2xl font-extrabold tracking-tight ${scrolled ? 'text-gray-900' : 'text-white'}`}>
                        Velora
                    </span>
                </button>

                {/* Desktop Menu */}
                <div className="hidden lg:flex items-center gap-1">
                    {navLinks.map((link) => (
                        <button
                            key={link.id}
                            onClick={() => scrollToSection(link.id)}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${activeSection === link.id
                                ? 'bg-primary/10 text-primary'
                                : (scrolled ? 'text-gray-600 hover:text-gray-900 hover:bg-gray-100' : 'text-white/80 hover:text-white hover:bg-white/10')
                                }`}
                        >
                            {link.label}
                        </button>
                    ))}
                </div>

                {/* CTA */}
                <div className="hidden lg:flex items-center gap-4">
                    <button
                        onClick={() => scrollToSection('contact')}
                        className={`inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm btn-hover ${scrolled
                            ? 'bg-gray-900 text-white hover:bg-gray-800 shadow-lg'
                            : 'bg-white text-gray-900 hover:bg-gray-100 shadow-xl'
                            }`}
                    >
                        <MessageSquare className="w-4 h-4" />
                        Hubungi Kami
                    </button>
                </div>

                {/* Mobile Toggle */}
                <button
                    className={`lg:hidden p-2 rounded-lg transition-colors ${scrolled ? 'text-gray-800 hover:bg-gray-100' : 'text-white hover:bg-white/10'}`}
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                    {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </div>

            {/* Mobile Menu */}
            <div className={`lg:hidden absolute top-full left-0 w-full bg-white shadow-2xl border-t transition-all duration-300 ${mobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'}`}>
                <div className="container mx-auto px-6 py-6 flex flex-col gap-2">
                    {navLinks.map((link) => (
                        <button
                            key={link.id}
                            onClick={() => scrollToSection(link.id)}
                            className={`text-left px-4 py-3 rounded-xl text-lg font-medium transition-colors ${activeSection === link.id ? 'bg-primary/10 text-primary' : 'text-gray-600 hover:bg-gray-50'
                                }`}
                        >
                            {link.label}
                        </button>
                    ))}
                    <button
                        onClick={() => scrollToSection('contact')}
                        className="mt-4 w-full bg-gray-900 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2"
                    >
                        <MessageSquare className="w-5 h-5" />
                        Hubungi Kami
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
