import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

/**
 * 全局頁首組件
 */
export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { t } = useTranslation('common');
  const router = useRouter();
  const { locale } = router;

  const handleLangChange = (newLocale) => {
    router.push(router.asPath, undefined, { locale: newLocale });
  };

  // 監聽滾動事件
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/', labelKey: 'header.navHome' },
    { href: '/resources', labelKey: 'header.navResources' },
    { href: '/blog', labelKey: 'header.navBlog' },
    { href: '/contact', labelKey: 'header.navContact' },
  ];

  const isNavLinkActive = (href) => {
    if (href === '/') {
      return router.pathname === '/';
    }
    return router.pathname.startsWith(href);
  };

  const langButtons = [
    { code: 'en', label: 'EN' },
    { code: 'tc', label: 'TC' },
    { code: 'sc', label: 'SC' },
  ];

  return (
    <header
      className={`
        fixed inset-x-0 top-0 z-40 w-full transition-all duration-300 ease-in-out
        ${isScrolled 
          ? 'bg-white/95 backdrop-blur-sm shadow-md' // 滾動後的樣式
          : 'bg-white' // 預設樣式
        }
      `}
    >
      <div className="content-container flex justify-between items-center py-4">
        
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <Image 
            src="/logo.png" 
            alt="SustainSage Group Logo"
            width={32}
            height={32}
            className="h-8 w-8"
          />
          <span className="font-bold text-lg text-text-primary">
            SustainSage Group Ltd.
          </span>
        </Link>

        {/* 桌面版選單 */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link 
              key={link.href} 
              href={link.href}
              className={`
                text-base font-medium transition-colors
                ${isNavLinkActive(link.href)
                  ? 'font-bold text-primary' 
                  : 'text-text-secondary hover:text-primary-dark'
                }
              `}
            >
              <span>{t(link.labelKey)}</span>
            </Link>
          ))}
        </nav>

        {/* 語言切換 (桌面版) */}
        <div className="hidden md:flex space-x-2">
          {langButtons.map((btn) => (
            <button
              key={btn.code}
              onClick={() => handleLangChange(btn.code)}
              className={`
                px-3 py-2 text-sm font-medium rounded-md transition-colors
                ${locale === btn.code
                  ? 'bg-primary text-white' // Active 狀態
                  : 'text-text-secondary hover:bg-gray-100' // Inactive 狀態
                }
              `}
            >
              {btn.label}
            </button>
          ))}
        </div>
        
        {/* 行動版開關按鈕 [ ! ] 修正這裡的圖標 */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="p-2 rounded-md text-gray-700"
          >
            {/* [ ! ] 替換為 Bars3Icon (三條槓) */}
            <Bars3Icon className="h-6 w-6" /> 
          </button>
        </div>
      </div>
      
      {/* 行動版側邊選單 */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-white/95 backdrop-blur-sm md:hidden">
          {/* 關閉按鈕 [ ! ] 修正這裡的圖標 */}
          <div className="flex justify-end p-4">
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 rounded-md text-gray-700"
            >
              {/* [ ! ] 替換為 XMarkIcon (叉叉) */}
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>
          
          {/* 選單連結 */}
          <div className="flex flex-col space-y-6 text-center text-2xl font-semibold mt-16">
            {navLinks.map((link) => (
              <Link 
                key={link.href} 
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`
                  ${isNavLinkActive(link.href)
                    ? 'font-bold text-primary' 
                    : 'text-text-primary hover:text-primary-dark'
                  }
                `}
              >
                <span>{t(link.labelKey)}</span>
              </Link>
            ))}
            
            {/* 行動版語言切換 */}
            <div className="flex justify-center space-x-2 border-t border-gray-300 pt-8 mt-8">
              {langButtons.map((btn) => (
                <button
                  key={btn.code}
                  onClick={() => handleLangChange(btn.code)}
                  className={`
                    px-3 py-2 text-base font-medium rounded-md
                    ${locale === btn.code
                      ? 'bg-primary text-white' // Active 狀態
                      : 'text-text-secondary hover:bg-gray-100' // Inactive 狀態
                    }
                  `}
                >
                  {btn.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}