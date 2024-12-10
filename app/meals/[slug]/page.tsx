import Image from 'next/image';
import { notFound } from 'next/navigation';

import { getMeal } from '@/lib/meals';

import styles from './page.module.css';

export const generateMetadata = async ({ params }: {
  params: Promise<{ slug: string }>
}) => {
  const { slug }  = await params;
  const meal = await getMeal(slug);

  if (!meal) {
    notFound();
  }

  return {
    title: meal.title,
    description: meal.summary
  };
}

const SelectedMealPage = async ({ params }: {
  params: Promise<{ slug: string }>
}): Promise<JSX.Element> => {
  const { slug }  = await params;
  const meal = await getMeal(slug);

  if (!meal) {
    notFound();
  }

  meal.instructions = meal.instructions.replace(/\n/g, '<br />'); // replace line breaks in provided HTML

  return (
    <>
  <header className={styles.header}>
    <div className={styles.image}>
    <Image src={meal.image} fill alt={meal.title} />
    </div>

    <div className={styles.headerText}>
      <h1>{meal.title}</h1>
      <p className={styles.creator}>
        by <a href={`mailto:${meal.creator_email}`}>{meal.creator}</a>
      </p>

      <p className={styles.summary}>{meal.summary}</p>
    </div>
  </header>

  <main>
    <p className={styles.instructions} dangerouslySetInnerHTML={{
      __html: meal.instructions
    }}></p>
  </main>
    </>
  )
}

export default SelectedMealPage;
