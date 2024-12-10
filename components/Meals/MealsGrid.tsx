import { MealItem } from './MealItem';

import styles from './MealsGrid.module.css';

export interface Meal {
  id: string;
  title: string;
  slug: string;
  image: string;
  summary: string;
  instructions: string;
  creator: string;
  creator_email: string;
}

interface Props {
  meals: Meal[];
}

export const MealsGrid = ({ meals }: Props): JSX.Element => {
  return (
    <ul className={styles.meals}>
      {meals.map((meal) => <li key={meal.id}>
      <MealItem {...meal} />
      </li>)}
    </ul>
  )
}