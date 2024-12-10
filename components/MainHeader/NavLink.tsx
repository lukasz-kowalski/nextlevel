'use client';

import { PropsWithChildren } from 'react';
import Link from "next/link";
import { usePathname } from "next/navigation";

import styles from './NavLink.module.css';

interface Props {
  href: string;
}

export const NavLink = ({ href, children }: PropsWithChildren<Props>): JSX.Element => {
  const path = usePathname();

  return (
    <Link href={href} className={path.startsWith(href) ? `${styles.link} ${styles.active}` : styles.link}>{children}</Link>
  )
};
