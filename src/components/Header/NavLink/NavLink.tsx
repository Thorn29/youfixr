'use client'
import React, { ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './NavLink.module.css'

const NavLink: React.FC<{ href: string, children: ReactNode }> = ({ href, children }) => {
  const pathname: string = usePathname();
  const isActive: boolean = pathname === href;
  return (
    <li className={`${styles.link} ${isActive && styles.active} font1`}>
      <Link href={href}>{children}</Link>
    </li>
  );
};

export default NavLink;