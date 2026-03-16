import styles from './History.module.css';

// 過去のイベント（古い順）
const pastEvents = [
  { year: 2024 },
  { year: 2025 },
];

export function History() {
  return (
    <>
      <section className={styles.pageHeader}>
        <div className={styles.container}>
          <p className={styles.pageLabel}>HISTORY</p>
          <h1 className={styles.pageTitle}>これまでの活動</h1>
          <p className={styles.pageLead}>げんき塾チームのこれまでの活動を振り返ります</p>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.preparingNotice}>
            <p className={styles.preparingTitle}>準備中</p>
            <p className={styles.preparingText}>過去の活動内容を整理しています。<br />もうしばらくお待ちください。</p>
          </div>
          <div className={styles.timeline}>
            {pastEvents.map((event) => (
              <div key={event.year} className={styles.timelineItem}>
                <div className={styles.timelineMarker}>
                  <span className={styles.timelineYear}>{event.year}</span>
                </div>
                <div className={styles.timelineContent}>
                  <div className={styles.historyCard}>
                    <div className={styles.historyImage}>
                      <div className={styles.historyImagePlaceholder}>
                        <span className={styles.historyYearBadge}>{event.year}</span>
                      </div>
                    </div>
                    <div className={styles.historyBody}>
                      <h2 className={styles.historyTitle}>げんきフェスタ{event.year}</h2>
                      <p className={styles.historyPreparing}>詳細準備中</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
