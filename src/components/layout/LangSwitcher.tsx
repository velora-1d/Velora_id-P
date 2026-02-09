'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import { Globe } from 'lucide-react';

type Props = {
  isScrolled: boolean;
};

const LangSwitcher = ({ isScrolled }: Props) => {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const switchLocale = (newLocale: string) => {
    // Remove current locale from path and add new one
    const segments = pathname.split('/');
    if (segments[1] === 'id' || segments[1] === 'en') {
      segments[1] = newLocale;
    } else {
      segments.splice(1, 0, newLocale);
    }
    router.push(segments.join('/') || '/');
  };

  return (
    <div className="flex items-center gap-2">
      <Globe
        size={18}
        className={isScrolled ? 'text-gray-500' : 'text-white/70'}
      />
      <button
        onClick={() => switchLocale('id')}
        className={`text-sm font-medium transition-colors ${
          locale === 'id'
            ? 'text-blue-500'
            : isScrolled
            ? 'text-gray-500 hover:text-gray-700'
            : 'text-white/70 hover:text-white'
        }`}
      >
        ID
      </button>
      <span className={isScrolled ? 'text-gray-300' : 'text-white/50'}>|</span>
      <button
        onClick={() => switchLocale('en')}
        className={`text-sm font-medium transition-colors ${
          locale === 'en'
            ? 'text-blue-500'
            : isScrolled
            ? 'text-gray-500 hover:text-gray-700'
            : 'text-white/70 hover:text-white'
        }`}
      >
        EN
      </button>
    </div>
  );
};

export default LangSwitcher;
