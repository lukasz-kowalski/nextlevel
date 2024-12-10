import { Suspense } from 'react';

import Link from 'next/link';

import { MealsGrid } from '@/components/Meals/MealsGrid';
import { getMeals } from '@/lib/meals';
import { MealsLoadingPage } from './MealsLoadingPage';

import styles from './page.module.css';

export const metadata = {
  title: 'All Meals',
  description: 'Browse the delicious meals shared by our vibrant community.',
};

const Meals = async (): Promise<JSX.Element> => {
  const meals = await getMeals();

  return <MealsGrid meals={meals} />
}

const MealsPage = (): JSX.Element => {
  return (
    <>
    <header className={styles.header}>
    <h1>
      Delicious meals, created <span className={styles.highlight}>by you</span>
    </h1>

    <p>Choose your favorite recipe and cook it yourself. It is easy and fun!</p>
    <p className={styles.cta}>
      <Link href="/meals/share">
        Share Your Favorite Recipe
      </Link>
    </p>
    </header>
    <main className={styles.main}>
      <Suspense fallback={<MealsLoadingPage />}>
      <Meals />
      </Suspense>
    </main>
    </>
  )
}

export default MealsPage;
