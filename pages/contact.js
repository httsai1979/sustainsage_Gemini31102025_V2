// pages/contact.js
// 確保 MainLayout 和 ContactForm 都是 default export
import MainLayout from '../components/layout/MainLayout';
import ContactForm from '../components/Sections/ContactForm';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
// ... (省略其他匯入和 useTranslation)

export default function ContactPage() {
  // ...
  return (
    <MainLayout title="Contact">
      <ContactForm />
    </MainLayout>
  );
}

export async function getStaticProps({ locale }) {
  // 必須在頁面檔案中匯出此函數，以提供翻譯屬性
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
}