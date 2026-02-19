'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import {
    LayoutDashboard,
    FileText,
    Briefcase,
    MessageSquare,
    Star,
    LogOut,
    Menu,
    X,
    ChevronRight,
    ExternalLink,
    Globe,
    HelpCircle,
    Package,
    Info,
    User,
    Workflow,
    Scale,
    Settings
} from 'lucide-react';

const sidebarLinks = [
    { id: 'dashboard', label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { id: 'blog', label: 'Blog', href: '/admin/blog', icon: FileText },
    { id: 'portfolio', label: 'Portfolio', href: '/admin/portfolio', icon: Briefcase },
    { id: 'testimonials', label: 'Testimonials', href: '/admin/testimonials', icon: Star },
    { id: 'messages', label: 'Pesan Masuk', href: '/admin/messages', icon: MessageSquare },
    { id: 'divider-1', type: 'divider', label: 'Konten Website' },
    { id: 'services', label: 'Services', href: '/admin/services', icon: Globe },
    { id: 'faq', label: 'FAQ', href: '/admin/faq', icon: HelpCircle },
    { id: 'featured-product', label: 'Produk Unggulan', href: '/admin/featured-product', icon: Package },
    { id: 'about', label: 'About', href: '/admin/about', icon: Info },
    { id: 'founder', label: 'Founder', href: '/admin/founder', icon: User },
    { id: 'workflow', label: 'Workflow', href: '/admin/workflow', icon: Workflow },
    { id: 'legalitas', label: 'Legalitas', href: '/admin/legalitas', icon: Scale },
    { id: 'site-settings', label: 'Site Settings', href: '/admin/site-settings', icon: Settings },
];

export default function AdminLayout({ children }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [user, setUser] = useState(null);
    const router = useRouter();
    const pathname = usePathname();
    const supabase = createClient();

    useEffect(() => {
        supabase.auth.getUser().then(({ data: { user } }) => {
            setUser(user);
        });
    }, []);

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.push('/admin/login');
        router.refresh();
    };

    const isActive = (href) => {
        if (href === '/admin') return pathname === '/admin';
        return pathname.startsWith(href);
    };

    return (
        <div className="min-h-screen bg-gray-950 flex">
            {/* Sidebar overlay (mobile) */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/60 z-40 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-gray-900 border-r border-gray-800 flex flex-col transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
                {/* Logo */}
                <div className="p-6 border-b border-gray-800">
                    <div className="flex items-center gap-3">
                        <img src="/images/logo.png" alt="Velora" className="h-10 w-auto" />
                        <div>
                            <span className="text-lg font-bold text-white">Velora</span>
                            <p className="text-xs text-gray-500">Admin Panel</p>
                        </div>
                    </div>
                </div>

                {/* Navigation */}
                <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
                    {sidebarLinks.map((link) => link.type === 'divider' ? (
                        <div key={link.id} className="pt-4 pb-2 px-4">
                            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{link.label}</p>
                        </div>
                    ) : (
                        <Link
                            key={link.id}
                            href={link.href}
                            onClick={() => setSidebarOpen(false)}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${isActive(link.href)
                                ? 'bg-primary/10 text-primary'
                                : 'text-gray-400 hover:text-white hover:bg-gray-800'
                                }`}
                        >
                            <link.icon className="w-5 h-5" />
                            {link.label}
                            {isActive(link.href) && (
                                <ChevronRight className="w-4 h-4 ml-auto" />
                            )}
                        </Link>
                    ))}
                </nav>

                {/* Bottom */}
                <div className="p-4 border-t border-gray-800 space-y-2">
                    <Link
                        href="/"
                        target="_blank"
                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
                    >
                        <ExternalLink className="w-5 h-5" />
                        Lihat Website
                    </Link>
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors"
                    >
                        <LogOut className="w-5 h-5" />
                        Keluar
                    </button>
                </div>

                {/* User info */}
                {user && (
                    <div className="p-4 border-t border-gray-800">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center text-primary text-sm font-bold">
                                {user.email?.[0]?.toUpperCase()}
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-white truncate">{user.email}</p>
                                <p className="text-xs text-gray-500">Admin</p>
                            </div>
                        </div>
                    </div>
                )}
            </aside>

            {/* Main content */}
            <div className="flex-1 flex flex-col min-w-0">
                {/* Top bar */}
                <header className="sticky top-0 z-30 bg-gray-950/80 backdrop-blur-xl border-b border-gray-800 px-6 py-4 flex items-center gap-4">
                    <button
                        onClick={() => setSidebarOpen(true)}
                        className="lg:hidden p-2 text-gray-400 hover:text-white rounded-lg hover:bg-gray-800"
                    >
                        <Menu className="w-5 h-5" />
                    </button>
                    <div className="flex-1">
                        <h2 className="text-lg font-semibold text-white capitalize">
                            {pathname === '/admin' ? 'Dashboard' : pathname.split('/').filter(Boolean).pop()?.replace(/-/g, ' ')}
                        </h2>
                    </div>
                </header>

                {/* Page content */}
                <main className="flex-1 p-6 overflow-y-auto">
                    {children}
                </main>
            </div>
        </div>
    );
}
