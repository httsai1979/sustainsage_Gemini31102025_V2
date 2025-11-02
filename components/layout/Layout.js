// components/layout/Layout.js

// ⚠️ 關鍵修復：必須使用 `./MainLayout`
import MainLayout from './MainLayout'; 
import Head from 'next/head';

export default function Layout({ children }) {
  // 必須返回 MainLayout
  return <MainLayout>{children}</MainLayout>;
}