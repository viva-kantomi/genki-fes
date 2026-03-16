import { useState, useEffect } from 'react';
import styles from './Countdown.module.css';

// げんきフェスタ2026の開催日（日本時間 朝10時）
const EVENT_DATE = new Date('2026-05-24T10:00:00+09:00');
const SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000;

// デバッグフラグ: trueで常に時分秒表示
const DEBUG_SHOW_FULL_COUNTDOWN = true;

interface TimeLeft {
  totalHours: number;
  minutes: number;
  seconds: number;
  days: number;
  isUnderSevenDays: boolean;
}

function calculateTimeLeft(): TimeLeft {
  const now = new Date();
  const difference = EVENT_DATE.getTime() - now.getTime();

  if (difference <= 0) {
    return { totalHours: 0, minutes: 0, seconds: 0, days: 0, isUnderSevenDays: true };
  }

  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const totalHours = Math.floor(difference / (1000 * 60 * 60));
  const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((difference % (1000 * 60)) / 1000);

  return {
    totalHours,
    minutes,
    seconds,
    days,
    isUnderSevenDays: difference < SEVEN_DAYS_MS,
  };
}

export function Countdown() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());
  const [isVisible, setIsVisible] = useState(true);
  const basePath = import.meta.env.BASE_URL || '/';

  useEffect(() => {
    // デバッグ時または7日以内は毎秒更新、それ以外は1時間ごと
    const shouldUpdateEverySecond = DEBUG_SHOW_FULL_COUNTDOWN || timeLeft.isUnderSevenDays;
    const interval = shouldUpdateEverySecond ? 1000 : 1000 * 60 * 60;
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, interval);

    return () => clearInterval(timer);
  }, [timeLeft.isUnderSevenDays]);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  // イベント終了後は表示しない
  if (timeLeft.totalHours === 0 && timeLeft.minutes === 0 && timeLeft.seconds === 0) {
    return null;
  }

  const pad = (num: number) => num.toString().padStart(2, '0');

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
        {(DEBUG_SHOW_FULL_COUNTDOWN || timeLeft.isUnderSevenDays) ? (
          <div className={styles.countdownTimer}>
            <span className={styles.countdownNumber}>{timeLeft.totalHours}</span>
            <span className={styles.countdownUnit}>時間</span>
            <span className={styles.countdownNumber}>{pad(timeLeft.minutes)}</span>
            <span className={styles.countdownUnit}>分</span>
            <span className={styles.countdownNumber}>{pad(timeLeft.seconds)}</span>
            <span className={styles.countdownUnit}>秒</span>
          </div>
        ) : (
          <div className={styles.countdownTimer}>
            <span className={styles.countdownNumber}>{timeLeft.days}</span>
            <span className={styles.countdownUnit}>日</span>
          </div>
        )}
        <p className={styles.countdownDate}>2026.5.24 SUN</p>
      </div>
    </div>
  );
}
