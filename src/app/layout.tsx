import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { CurrencyProvider } from '@/context/CurrencyContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'IMUS Realty | Real Estate AI & Data Science Suite',
  description: 'Autonomous Dubai real estate intelligence and valuation engine.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CurrencyProvider>
          {children}
        </CurrencyProvider>
      </body>
    </html>
  );
}
