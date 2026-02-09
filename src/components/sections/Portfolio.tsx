'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { ExternalLink, Github } from 'lucide-react';

// Fallback data jika Sanity belum dihubungkan
const fallbackProjects = [
  {
    title: 'E-Commerce Platform',
    description: 'Platform e-commerce multi-channel dengan integrasi payment gateway dan inventory management real-time.',
    image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=800&q=80',
    techStack: ['React', 'Node.js', 'PostgreSQL'],
    repoUrl: 'https://github.com/velora-1d',
    liveUrl: 'https://example.com',
  },
  {
    title: 'Digital Banking App',
    description: 'Aplikasi mobile banking dengan fitur transfer, pembayaran, dan investment tracking.',
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80',
    techStack: ['Flutter', 'Go', 'MongoDB'],
    repoUrl: 'https://github.com/velora-1d',
    liveUrl: 'https://example.com',
  },
  {
    title: 'Hospital Management System',
    description: 'Sistem informasi rumah sakit terintegrasi dengan rekam medis elektronik dan telemedicine.',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80',
    techStack: ['Laravel', 'Vue.js', 'MySQL'],
    repoUrl: 'https://github.com/velora-1d',
    liveUrl: 'https://example.com',
  },
];

type PortfolioItem = {
  title: string;
  description: string;
  image: string;
  techStack: string[];
  repoUrl?: string;
  liveUrl?: string;
};

type Props = {
  items?: PortfolioItem[];
};

const Portfolio = ({ items }: Props) => {
  const t = useTranslations('portfolio');
  const projects = items && items.length > 0 ? items : fallbackProjects;

  return (
    <section id="portfolio" className="py-12 sm:py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-blue-100 text-blue-600 rounded-full text-sm font-semibold mb-4 tracking-wide">
            {t('badge')}
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t('title')}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-200 flex flex-col h-full group"
            >
              <div className="h-48 overflow-hidden relative">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-400 ease-out group-hover:scale-105"
                />
              </div>
              <div className="p-6 flex flex-col grow">
                <h3 className="text-xl font-bold text-gray-900 mb-2 leading-tight">
                  {project.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4 grow leading-relaxed">
                  {project.description}
                </p>
                
                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.techStack.map((tech, i) => (
                    <span key={i} className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs font-mono">
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4 border-t border-gray-100 mt-auto">
                  {project.repoUrl && (
                    <a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 inline-flex items-center justify-center gap-2 bg-gray-900 hover:bg-gray-800 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                    >
                      <Github className="w-4 h-4" />
                      {t('viewRepo')}
                    </a>
                  )}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 inline-flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                      {t('viewLive')}
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
