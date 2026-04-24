import styles from './NewsList.module.css';

export function NewsList() {
  return (
    <>
      <div className={styles.pageHeader}>
        <div className={styles.container}>
          <p className={styles.pageLabel}>NEWS</p>
          <h1 className={styles.pageTitle}>お知らせ</h1>
        </div>
      </div>

      <div className={styles.container}>
        <div className={styles.empty}>
          <p>準備中</p>
        </div>
      </div>
    </>
  );
}
