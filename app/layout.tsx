import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import LayoutWrapper from '../components/LayoutWrapper';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'ContentQ - Build Authority Across AI, Search, and Social',
  description: 'B2B content intelligence platform that helps companies build systematic content authority across AI assistants, search engines, and social platforms.',
  keywords: 'content marketing, B2B marketing, AI content, SEO, social media marketing, content strategy',
  authors: [{ name: 'ContentQ' }],
  viewport: 'width=device-width, initial-scale=1',
  themeColor: '#94D82D',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className}>
        <LayoutWrapper>
          {children}
        </LayoutWrapper>
      </body>
    </html>
  );
}