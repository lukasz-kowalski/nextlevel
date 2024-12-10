import styles from './MealsLoadingPage.module.css';

export const MealsLoadingPage = (): JSX.Element => {
  return (
    <p className={styles.loading}>Fetching meals...</p>
  )
}
