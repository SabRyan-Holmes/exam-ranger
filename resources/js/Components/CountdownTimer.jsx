import { useState, useEffect } from 'react';
import { getRemainingTimeUntilMsTimestamp } from '@/Utils/CountdownTimerUtils';


const CountdownTimer = ({ countdownTimestampMs }) => {
    const [remainingTime, setRemainingTime] = useState({
        seconds: '00',
        minutes: '00',
        hours: '00',
        days: '00'
    });

    useEffect(() => {
        const intervalId = setInterval(() => {
            updateRemainingTime(countdownTimestampMs);
        }, 1000);
        return () => clearInterval(intervalId);
    }, [countdownTimestampMs]);

    function updateRemainingTime(countdown) {
        setRemainingTime(getRemainingTimeUntilMsTimestamp(countdown));
    }

    return (
        <p className='font-semibold'>{remainingTime.hours}:{remainingTime.minutes}:{remainingTime.seconds}</p>

    );
}

export default CountdownTimer;