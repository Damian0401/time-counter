import { useEffect, useState } from 'react';
import styles from './Timer.module.scss';
import { TimerProps } from './TimerProps';

function Timer({ name, date }: TimerProps) {
    const [timeDiffrence, setTimeDiffrence] = useState<number>(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setTimeDiffrence(date.getTime() - new Date().getTime());
        }, 1000);

        return () => clearInterval(interval);
    }, [date]);

    const secondsDiffrence = Math.floor(timeDiffrence / 1000) % 60;
    const minutesDiffrence = Math.floor(timeDiffrence / 1000 / 60) % 60;
    const hoursDiffrence = Math.floor(timeDiffrence / 1000 / 60 / 60) % 24;
    const dayDiffrence = Math.floor(timeDiffrence / 1000 / 60 / 60 / 24);

    const timeHasPassed = new Date().getTime() > date.getTime();
    const nameStyle = timeHasPassed ? styles.timerNamePassed : styles.timerName;
    const dateStyle = dayDiffrence < 1 
        ? styles.timerDateAttention 
        : dayDiffrence < 3 ? styles.timerDateWarning
        : styles.timerDate;


    return (
        <div className={styles.timerContainer}>
            <p className={nameStyle}>{name}</p>
            {timeHasPassed ?
                <span className={styles.timerDatePassed}>Time has passed</span> :
                <>
                    <span className={dateStyle}>{date.toLocaleString()}</span>
                    <div className={styles.timerDateContainer}>
                        <span className={dateStyle}>
                            {dayDiffrence > 0 && `${dayDiffrence} days,`}
                        </span>
                        <span className={dateStyle}>
                            {(hoursDiffrence > 0 || dayDiffrence > 0) && `${hoursDiffrence} hours,`}
                        </span>
                        <span className={dateStyle}>
                            {`${minutesDiffrence} minutes,`}
                        </span>
                        <span className={dateStyle}>
                            {`${secondsDiffrence} seconds`}
                        </span>
                    </div>
                </>
            }
        </div>
    );
}

export default Timer;