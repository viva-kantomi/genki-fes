import { useState, useEffect } from 'react';

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
      className={`countdown-container ${isVisible ? '' : 'countdown-container--transparent'}`}
      onClick={toggleVisibility}
    >
      <img
        src={`${basePath}images/common/cloud/cloud (1).png`}
        alt=""
        className="countdown-cloud"
      />
      <div className="countdown-content">
        <p className="countdown-label">げんき<br/>フェスタまで残り</p>
        <div className="countdown-timer">
          <span className="countdown-number">{daysLeft}</span>
          <span className="countdown-unit">日</span>
        </div>
        <p className="countdown-date">2026.5.24 SUN</p>
      </div>

      <style>{`
        .countdown-container {
          position: fixed;
          bottom: -80px;
          right:  -90px;
          z-index: 1000;
          cursor: pointer;
          transition: opacity 0.3s ease;
          width: 350px;
          height: 250px;
        }

        .countdown-container--transparent {
          opacity: 0.2;
        }

        .countdown-cloud {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: contain;
          filter: drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.15));
        }

        .countdown-content {
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100%;
          padding: 16px;
        }

        .countdown-label {
          font-size: 1rem;
          font-weight: 700;
          color: var(--color-primary, #286FAA);
          margin-right: 20px;
          text-shadow: 0 0 2px white;
        }

        .countdown-timer {
          display: flex;
          align-items: baseline;
          gap: 2px;
        }

        .countdown-number {
          font-size: 1.5rem;
          font-weight: 900;
          color: var(--color-red, #E63946);
          text-shadow: 0 0 4px white, 0 0 8px white;
          font-family: var(--font-accent, 'M PLUS Rounded 1c', sans-serif);
        }

        .countdown-unit {
          font-size: 0.8rem;
          font-weight: 700;
          color: var(--color-text, #333);
          text-shadow: 0 0 2px white;
        }

        .countdown-date {
          font-size: 0.8rem;
          font-weight: 700;
          color: var(--color-text-muted, #666);
          text-shadow: 0 0 2px white;
        }

        /* PC表示では非表示 */
        @media (min-width: 1200px) {
          .countdown-container {
            display: none;
          }
        }

        @media (min-width: 1024px) and (max-width: 1199px) and (orientation: landscape) {
          .countdown-container {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}
