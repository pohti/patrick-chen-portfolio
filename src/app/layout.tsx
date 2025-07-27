import type { Metadata } from 'next';
import { ReactNode } from 'react';

import './globals.css';
import CustomNavLink from '@/components/CustomNavLink';

export const metadata: Metadata = {
  title: 'Patrick Chen | Software Engineer Portfolio',
  description: 'Showcasing common UI components with React and Next.js', // TODO: clean up the description
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen font-sans bg-gray-50 text-gray-900">
        <header>
          <nav className="nav-link-container">
            <CustomNavLink href="/">Home</CustomNavLink>
            <CustomNavLink href="/trading">Trading</CustomNavLink>
          </nav>
        </header>

        <main>{children}</main>

        <footer>
          © {new Date().getFullYear()} UI Showcase — Built with Next.js
        </footer>
      </body>
    </html>
  );
}
