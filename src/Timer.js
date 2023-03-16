import { useState, useRef } from "react";

export default function Timer() {
    const [time, setTime] = useState({ min: 0, sec: 0 });
    const timer = useRef(null);
    const minRef = useRef();
    const secRef = useRef();

    function startTimer() {

        timer.current = setInterval(function () {
            setTime(time => {
                let newTime = { ...time };
                if (newTime.sec > 0) {
                    newTime.sec--;
                }
                if (newTime.sec == 0) {
                    if (newTime.min > 0) {
                        newTime.min--;
                        newTime.sec = 59;
                    }
                }

                if (newTime.sec == 0 && newTime.min == 0) {
                    clearTimer();
                }

                return newTime;
            });
        }, 1000);
    }

    const handleStart = (event) => {
        clearTimer();
        setTime(() => getStartTime());
        startTimer();
    }

    function getStartTime() {
        let newTime = {
            min: parseInt(minRef.current.value), sec: parseInt(secRef.current.value)
        }
        if (newTime.sec >= 60) {
            newTime.min += Math.floor(newTime.sec / 60);
            newTime.sec = newTime.sec % 60;
        }
        return newTime;
    }

    function clearTimer() {
        clearInterval(timer.current);
    }

    const handlePause = (event) => {
        if (timer.current) {
            clearTimer();
            timer.current = null;
        } else {
            startTimer();
        }
    }

    const handleReset = (event) => {
        setTime({ min: 0, sec: 0 });
        minRef.current.value = 0;
        secRef.current.value = 0;
        clearTimer();
    }

    function getTime() {
        if (!time) {
            return '00:00';
        }
        let str = '';

        if (time.min < 10) {
            str = '0'
        }
        str += time.min.toString() + ':';
        if (time.sec < 10) {
            str += '0'
        }
        str += time.sec.toString();
        return str;
    }

    console.log(time, minRef.current, secRef.current);
    return (
        <div>
            <div>
                <input ref={minRef} defaultValue={0} type="number" />Minutes
                <input ref={secRef} defaultValue={0} type="number" />Seconds
            </div>

            <button onClick={handleStart}>Start</button>
            <button onClick={handlePause}>Pause</button>
            <button onClick={handleReset}>Reset</button>
            <div>{getTime()}</div>
        </div>
    )
}


