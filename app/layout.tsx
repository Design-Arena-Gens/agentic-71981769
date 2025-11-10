import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { NavBar } from '@/components/NavBar';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap'
});

export const metadata: Metadata = {
  title: 'Anime Vista | Reviews, Summaries & Community Insights',
  description:
    'Discover anime reviews with concise and in-depth summaries, community pros and cons, seasonal rankings, and trending charts.'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NavBar />
        {children}
      </body>
    </html>
  );
}
