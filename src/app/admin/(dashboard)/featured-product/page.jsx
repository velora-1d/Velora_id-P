import { createClient } from '@/lib/supabase/server';
import FeaturedProductClient from './FeaturedProductClient';

export const metadata = { title: 'Kelola Produk Unggulan - Admin Velora' };

export default async function AdminFeaturedProductPage() {
    const supabase = await createClient();
    const [{ data: features }, { data: benefits }] = await Promise.all([
        supabase.from('featured_products').select('*').order('sort_order', { ascending: true }),
        supabase.from('product_benefits').select('*').order('sort_order', { ascending: true })
    ]);
    return <FeaturedProductClient initialFeatures={features || []} initialBenefits={benefits || []} />;
}
