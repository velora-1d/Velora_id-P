import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export default function BlogLayout({ children }) {
    return (
        <div className="font-sans text-gray-900 overflow-x-hidden">
            <Navbar />
            {children}
            <Footer />
        </div>
    );
}
