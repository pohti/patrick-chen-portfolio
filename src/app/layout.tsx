import type { Metadata } from 'next';
import Link from 'next/link';
import { ReactNode } from 'react';

import './globals.css';

export const metadata: Metadata = {
  title: 'UI Showcase',
  description: 'Showcasing common UI components with React and Next.js',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen font-sans bg-gray-50 text-gray-900">
        {/* Top Navbar */}
        <header>
          <nav>
            <div className="nav-link-container">
              {/* TODO: highlight the link that's currently active */}
              <Link href="/">Home</Link>
              <Link href="/trading">Trading</Link>
            </div>
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
