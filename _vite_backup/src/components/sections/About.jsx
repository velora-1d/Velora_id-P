const About = () => {
    return (
        <section id="tentang" className="py-12 sm:py-20 bg-white">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">Tentang Velora</h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Kami adalah tim profesional yang berdedikasi untuk membantu bisnis Anda tumbuh melalui inovasi digital.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
                    <div>
                        <img
                            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80"
                            alt="Tim Velora"
                            className="rounded-xl shadow-xl w-full object-cover h-[400px]"
                        />
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold text-gray-800 mb-4">Sejarah Velora</h3>
                        <p className="text-gray-600 mb-4 leading-relaxed text-justify">
                            Velora didirikan pada tahun 2023 dengan visi sederhana: menjembatani kesenjangan antara teknologi canggih dan kebutuhan bisnis praktis. Bermula dari sebuah tim kecil pengembang yang passionate, kami berkembang menjadi konsultan transformasi digital yang melayani berbagai industri.
                        </p>
                        <p className="text-gray-600 mb-6 leading-relaxed text-justify">
                            Nama "Velora" diambil dari kata "Velocity" (kecepatan) dan "Aurora" (cahaya baru), melambangkan komitmen kami untuk membawa percepatan dan perspektif baru bagi setiap klien kami. Kami percaya bahwa teknologi bukan hanya alat, tetapi katalis untuk perubahan positif.
                        </p>

                        <div className="grid grid-cols-2 gap-6 mt-8">
                            <div className="bg-gray-50 p-4 rounded-lg text-center">
                                <span className="block text-3xl font-bold text-primary mb-1">50+</span>
                                <span className="text-sm text-gray-500">Proyek Selesai</span>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-lg text-center">
                                <span className="block text-3xl font-bold text-primary mb-1">98%</span>
                                <span className="text-sm text-gray-500">Klien Puas</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
