import type { Metadata } from 'next';
import { ReactNode } from 'react';

import './globals.css';
import CustomNavLink from '@/components/CustomNavLink';
import DownloadResumeButton from './DownloadResumeButton';
import {
  HomeOutlined,
  StockOutlined,
  MessageOutlined,
} from '@ant-design/icons';

export const metadata: Metadata = {
  title: 'Patrick Chen',
  description: 'Showcasing common UI components with React and Next.js', // TODO: clean up the description
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen font-sans bg-gray-50 text-gray-900">
        <header>
          <nav className="nav-link-container">
            <CustomNavLink href="/">
              <HomeOutlined /> Home
            </CustomNavLink>
            <CustomNavLink href="/trading">
              <StockOutlined /> Trading
            </CustomNavLink>
          </nav>

          <div className="flex" style={{ gap: '1rem' }}>
            <CustomNavLink href="/chat">
              <MessageOutlined /> Chat
            </CustomNavLink>
            <DownloadResumeButton />
          </div>
        </header>

        <main>{children}</main>

        {/* TODO: embed links to GitHub, LinkedIn and Email */}
        {/* <footer>
          © {new Date().getFullYear()} UI Showcase — Built with Next.js
        </footer> */}
      </body>
    </html>
  );
}
