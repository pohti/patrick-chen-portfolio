import type { Metadata } from 'next';
import { ReactNode } from 'react';

import './globals.css';
import CustomNavLink from '@/components/CustomNavLink';
import DownloadResumeButton from '../components/DownloadResumeButton';
import {
  HomeOutlined,
  StockOutlined,
  MessageOutlined,
  GithubOutlined,
  LinkedinOutlined,
  MailOutlined,
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
              <StockOutlined /> Trading Demo
            </CustomNavLink>
          </nav>

          <div className="flex" style={{ gap: '1rem' }}>
            <CustomNavLink href="/chat">
              <MessageOutlined /> Investor AI
            </CustomNavLink>
            <DownloadResumeButton />
          </div>
        </header>

        <main>{children}</main>

        <footer>
          <div className="footer-links">
            <a
              href="https://github.com/pohti"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-link"
            >
              <GithubOutlined style={{ marginRight: 8, fontSize: '1.5rem' }} />
            </a>
            <a
              href="https://www.linkedin.com/in/minmarnoo/"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-link"
            >
              <LinkedinOutlined
                style={{ marginRight: 8, fontSize: '1.5rem' }}
              />
            </a>
            <a href="mailto:patrickchen.mmo@gmail.com" className="footer-link">
              <MailOutlined style={{ marginRight: 8, fontSize: '1.5rem' }} />
            </a>
          </div>
        </footer>
      </body>
    </html>
  );
}
