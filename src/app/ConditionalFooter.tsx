'use client';

import { usePathname } from 'next/navigation';
import {
  GithubOutlined,
  LinkedinOutlined,
  MailOutlined,
} from '@ant-design/icons';

export default function ConditionalFooter() {
  const pathname = usePathname();

  // Only show footer on the root/landing page
  if (pathname !== '/') {
    return null;
  }

  return (
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
          <LinkedinOutlined style={{ marginRight: 8, fontSize: '1.5rem' }} />
        </a>
        <a href="mailto:patrickchen.mmo@gmail.com" className="footer-link">
          <MailOutlined style={{ marginRight: 8, fontSize: '1.5rem' }} />
        </a>
      </div>
    </footer>
  );
}
