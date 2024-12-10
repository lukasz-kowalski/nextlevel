import styles from '../MealsLoadingPage.module.css';

const MealLoadingPage = (): JSX.Element => {
  return (
    <p className={styles.loading}>Fetching meal details...</p>
  )
}

export default MealLoadingPage;
