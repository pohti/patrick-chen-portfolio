'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import './styles.css';

interface Props {
  href: string;
  children?: React.ReactNode;
  disabled?: boolean;
}

const CustomNavLink = ({ href, children, disabled }: Props) => {
  const pathname = usePathname();
  const className =
    'nav-link' +
    (pathname === href ? ' active' : '') +
    (disabled ? ' disabled' : '');
  return (
    <Link href={disabled ? '#' : href} className={className}>
      {children}
    </Link>
  );
};

export default CustomNavLink;
