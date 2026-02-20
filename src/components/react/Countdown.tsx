import { useState, useEffect } from 'react';
import styles from './Countdown.module.css';

// げんきフェスタ2026の開催日
const EVENT_DATE = new Date('2026-05-24T10:00:00+09:00');

function calculateDaysLeft(): number {
  const now = new Date();
  const difference = EVENT_DATE.getTime() - now.getTime();

  if (difference <= 0) {
    return 0;
  }

  return Math.floor(difference / (1000 * 60 * 60 * 24));
}

export function Countdown() {
  const [daysLeft, setDaysLeft] = useState<number>(calculateDaysLeft());
  const [isVisible, setIsVisible] = useState(true);
  const basePath = import.meta.env.BASE_URL || '/';

  useEffect(() => {
    // 日単位なので1時間ごとに更新
    const timer = setInterval(() => {
      setDaysLeft(calculateDaysLeft());
    }, 1000 * 60 * 60);

    return () => clearInterval(timer);
  }, []);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  // イベント終了後は表示しない
  if (daysLeft === 0) {
    return null;
  }

  return (
    <div
      className={`${styles.countdownContainer} ${isVisible ? '' : styles.countdownContainerTransparent}`}
      onClick={toggleVisibility}
    >
      <img
        src={`${basePath}images/common/cloud/cloud (1).png`}
        alt=""
        className={styles.countdownCloud}
      />
      <div className={styles.countdownContent}>
        <p className={styles.countdownLabel}>げんき<br/>フェスタまで残り</p>
        <div className={styles.countdownTimer}>
          <span className={styles.countdownNumber}>{daysLeft}</span>
          <span className={styles.countdownUnit}>日</span>
        </div>
        <p className={styles.countdownDate}>2026.5.24 SUN</p>
      </div>
    </div>
  );
}
