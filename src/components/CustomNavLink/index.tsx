'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import './styles.css';

interface Props {
  href: string;
  children?: React.ReactNode;
}

const CustomNavLink = ({ href, children }: Props) => {
  const pathname = usePathname();
  const className = 'nav-link' + (pathname === href ? ' active' : '');
  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
};

export default CustomNavLink;
