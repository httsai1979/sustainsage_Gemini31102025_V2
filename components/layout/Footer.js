import Link from 'next/link';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';

/**
 * 全局頁腳組件
 */
export default function Footer() {
  const { t } = useTranslation('common');

  return (
    <footer className="bg-white border-t border-gray-200 mt-20">
      <div className="content-container section-padding">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          
          {/* Col 1: Logo & 理念 */}
          <div>
            <Link href="/" className="flex items-center space-x-2">
              
              {/*
                *** 檔案修正 ***
                這裡的 src 已經被修正為 "/logo.png"
              */}
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
            <p className="caption mt-4">
              <span>{t('footer.tagline')}</span>
            </p>
          </div>

          {/* Col 2: 網站地圖 */}
          <div>
            <h4 className="font-semibold text-text-primary mb-4">
              <span>{t('footer.sitemap')}</span>
            </h4>
            <ul className="space-y-2 caption">
              <li><Link href="/" className="hover:text-link"><span>{t('header.home')}</span></Link></li>
              <li><Link href="/resources" className="hover:text-link"><span>{t('header.resources')}</span></Link></li>
              <li><Link href="/blog" className="hover:text-link"><span>{t('header.blog')}</span></Link></li>
              <li><Link href="/contact" className="hover:text-link"><span>{t('header.contact')}</span></Link></li>
            </ul>
          </div>

          {/* Col 3: 聯繫資訊 */}
          <div>
            <h4 className="font-semibold text-text-primary mb-4">
              <span>{t('footer.contactInfo')}</span>
            </h4>
            <ul className="space-y-2 caption">
              <li><a href="mailto:hc.tsai@sustainsage-group.com" className="hover:text-link">hc.tsai@sustainsage-group.com</a></li>
              <li>+44-7510-317-505</li>
              <li>Southsea, England</li>
              <li>
                <a href="https://linkedin.com/company/sustainsage-group-ltd" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 group">
                  <svg className="h-5 w-5 text-text-secondary group-hover:text-link" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.602c0-3.376-4-3.524-4 0v5.602h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                  <span>LinkedIn</span>
                </a>
              </li>
            </ul>
          </div>

        </div>
        
        {/* 版權宣告 */}
        <div className="mt-12 text-center text-gray-500 caption">
          <p>&copy; {new Date().getFullYear()} SustainSage Group Ltd. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}