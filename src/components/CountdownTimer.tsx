/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";

interface CountdownTimerProps {
  targetDate: string;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ targetDate }) => {
  const calculateTimeLeft = () => {
    const difference = +new Date(targetDate) - +new Date();
    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(interval);
  }, [calculateTimeLeft, targetDate]);

  return (
    <div className="flex justify-center items-center bg-gray-800">
      <div className="grid grid-flow-col gap-5 text-center auto-cols-max mt-4 mb-4">
        <div className="flex flex-col p-2 bg-neutral rounded-box text-white">
          <span className="countdown font-mono text-5xl">{timeLeft.days}</span>
          days
        </div>
        <div className="flex flex-col p-2 bg-neutral rounded-box text-white">
          <span className="countdown font-mono text-5xl">{timeLeft.hours}</span>
          hours
        </div>
        <div className="flex flex-col p-2 bg-neutral rounded-box text-white">
          <span className="countdown font-mono text-5xl">
            {timeLeft.minutes}
          </span>
          min
        </div>
        <div className="flex flex-col p-2 bg-neutral rounded-box text-white">
          <span className="countdown font-mono text-5xl">
            {timeLeft.seconds}
          </span>
          sec
        </div>
      </div>
    </div>
  );
};

export default CountdownTimer;
