// components/layout/MainLayout.js

import Header from './Header'; // <-- 確保是 './Header'
import Footer from './Footer'; // <-- 確保是 './Footer'
import Head from 'next/head';

export default function MainLayout({ children }) {
  return (
    <>
      {/* ... Head JSX ... */}
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          {children} 
        </main>
        <Footer />
      </div>
    </>
  );
}