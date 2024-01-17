import { useState, useEffect } from 'react';
import { getRemainingTimeUntilMsTimestamp } from '@/Utils/CountdownTimerUtils';


const CountdownTimer = ({ countdownTimestampMs, subject, auth }) => {
    const [remainingTime, setRemainingTime] = useState({
        seconds: '00',
        minutes: '00',
        hours: '00',
        days: '00'
    });

    if (localStorage.getItem("timestamp"+subject+auth.user.name) != null) {
        var tempCountdown = parseInt(localStorage.getItem("timestamp"+subject+auth.user.name))
    } else {
        var tempCountdown = countdownTimestampMs
    }


    if (localStorage.getItem("timestamp"+subject+auth.user.name) != null) {
        var timestampForLocalPerma = parseInt(localStorage.getItem("timestamp"+subject+auth.user.name))
    } else {
        var timestampForLocalPerma = countdownTimestampMs
    }

    useEffect(() => {
        const intervalId = setInterval(() => {
            updateRemainingTime(countdownTimestampMs);
        }, 1000);
        return () => clearInterval(intervalId);
    }, [countdownTimestampMs]);

    function updateRemainingTime(countdown) {        
        if(localStorage.getItem("timestamp"+subject+auth.user.name) == null) {
            setRemainingTime(getRemainingTimeUntilMsTimestamp(countdown));
        } else {
            setRemainingTime(getRemainingTimeUntilMsTimestamp(timestampForLocalPerma));
        }
        tempCountdown = tempCountdown - 250
        localStorage.setItem("timestamp" + subject + auth.user.name, tempCountdown)
    }

    return (
        <p className='font-semibold'>{remainingTime.hours}:{remainingTime.minutes}:{remainingTime.seconds}</p>

    );
}

export default CountdownTimer;