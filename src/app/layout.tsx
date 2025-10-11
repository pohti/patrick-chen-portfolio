import type { Metadata } from 'next';
import { ReactNode } from 'react';

import './globals.css';
import CustomNavbar from './components/CustomNavbar';
import ConditionalFooter from './ConditionalFooter';

export const metadata: Metadata = {
  title: 'Patrick Chen',
  description: 'Showcasing common UI components with React and Next.js', // TODO: clean up the description
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen font-sans bg-gray-50 text-gray-900">
        <CustomNavbar />

        <main>
          <>{children}</>
        </main>

        <ConditionalFooter />
      </body>
    </html>
  );
}
