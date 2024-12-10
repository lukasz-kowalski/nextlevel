import Link from "next/link";
import Image from 'next/image';

import LogoImg from '@/assets/logo.png';
import { MainHeaderBackground } from '@/components/MainHeader/MainHeaderBackground';
import { NavLink } from './NavLink';

import styles from './MainHeader.module.css';

export const MainHeader = (): JSX.Element => {
  return (
    <>
    <MainHeaderBackground />

    <header className={styles.header}>
      <Link className={styles.logo} href="/">
        <Image src={LogoImg} priority alt="A plate with food on it" />
        NextLevel Food
      </Link>

      <nav className={styles.nav}>
        <ul>
          <li>
            <NavLink href="/meals">Browse Meals</NavLink>
          </li>
          <li>
            <NavLink href="/community">Foodies Community</NavLink>
          </li>
        </ul>
      </nav>
    </header>
    </>
  )
}
