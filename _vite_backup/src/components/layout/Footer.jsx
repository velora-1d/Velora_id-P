import { Phone, Linkedin, Github } from 'lucide-react';

// TikTok icon (not in lucide-react)
const TikTokIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
    </svg>
);

// WhatsApp icon (official brand shape)
const WhatsAppIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.008-.57-.008-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
);

const socialLinks = [
    {
        name: 'WhatsApp',
        href: 'https://wa.me/6281320442174',
        icon: WhatsAppIcon,
        hoverColor: 'hover:bg-green-500'
    },
    {
        name: 'LinkedIn',
        href: 'https://www.linkedin.com/in/mahin-utsman-nawawi-s-h-3b4758379/',
        icon: Linkedin,
        hoverColor: 'hover:bg-blue-600'
    },
    {
        name: 'TikTok',
        href: 'https://www.tiktok.com/@velora002',
        icon: TikTokIcon,
        hoverColor: 'hover:bg-gray-900'
    },
    {
        name: 'GitHub',
        href: 'https://github.com/mahinutsmannawawi20-svg',
        icon: Github,
        hoverColor: 'hover:bg-gray-800'
    },
];

const Footer = () => {
    return (
        <footer className="bg-white border-t border-gray-200 pt-16 pb-8">
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
                <div className="col-span-1 md:col-span-2">
                    <div className="flex items-center gap-3 mb-4">
                        <img src="/images/logo.png" alt="Velora" className="h-10 w-auto" />
                        <span className="text-2xl font-extrabold text-gray-900">Velora</span>
                    </div>
                    <p className="text-gray-600 mb-6 max-w-sm">
                        Mitra transformasi digital terpercaya untuk bisnis Anda. Kami menghadirkan solusi teknologi inovatif untuk mendorong pertumbuhan bisnis di era digital.
                    </p>
                    <div className="text-gray-600 mb-6 flex flex-col gap-2 text-sm">
                        <p>📍 Jakarta, Indonesia</p>
                        <p>📧 velora@gmail.com</p>
                    </div>
                    <div className="flex gap-3">
                        {socialLinks.map((social) => (
                            <a
                                key={social.name}
                                href={social.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={social.name}
                                className={`w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 ${social.hoverColor} hover:text-white transition-colors`}
                            >
                                <social.icon className="w-5 h-5" />
                            </a>
                        ))}
                    </div>
                </div>

                <div>
                    <h4 className="text-lg font-bold text-gray-800 mb-4">Layanan</h4>
                    <ul className="space-y-2">
                        <li><a href="#services" className="text-gray-600 hover:text-primary">Deploy Website</a></li>
                        <li><a href="#services" className="text-gray-600 hover:text-primary">Payment Gateway</a></li>
                        <li><a href="#featured" className="text-gray-600 hover:text-primary">Sistem Pesantren</a></li>
                        <li><a href="#services" className="text-gray-600 hover:text-primary">Maintenance</a></li>
                    </ul>
                </div>

                <div>
                    <h4 className="text-lg font-bold text-gray-800 mb-4">Perusahaan</h4>
                    <ul className="space-y-2">
                        <li><a href="#tentang" className="text-gray-600 hover:text-primary">Tentang Kami</a></li>
                        <li><a href="#portfolio" className="text-gray-600 hover:text-primary">Portfolio</a></li>
                        <li><a href="#workflow" className="text-gray-600 hover:text-primary">Cara Kerja</a></li>
                        <li><a href="#contact" className="text-gray-600 hover:text-primary">Kontak</a></li>
                    </ul>
                </div>
            </div>

            <div className="container mx-auto border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
                <p>&copy; {new Date().getFullYear()} Velora. All rights reserved.</p>
                <div className="flex gap-6 mt-4 md:mt-0">
                    <a href="#faq" className="hover:text-primary">FAQ</a>
                    <a href="#contact" className="hover:text-primary">Hubungi Kami</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
