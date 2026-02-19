import { createClient } from '@/lib/supabase/server';
import TestimonialsClient from './TestimonialsClient';

export const metadata = { title: 'Kelola Testimonials - Admin Velora' };

export default async function AdminTestimonialsPage() {
    const supabase = await createClient();
    const { data: testimonials } = await supabase
        .from('testimonials')
        .select('*')
        .order('created_at', { ascending: false });

    return <TestimonialsClient initialTestimonials={testimonials || []} />;
}
