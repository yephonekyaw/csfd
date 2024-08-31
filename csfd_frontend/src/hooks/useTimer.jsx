import { useEffect, useState } from 'react';

export const useTimer = (expiredAt, startedAt) => {
  const [timeLeft, setTimeLeft] = useState(35);
  useEffect(() => {
    const computeTimeLeft = setInterval(() => {
      const secondDiff = Math.floor((expiredAt - startedAt) / 1000);

      const days = Math.floor(secondDiff / 86400);
      const hours = Math.floor((secondDiff % 86400) / 3600);
      const minutes = Math.floor(((secondDiff % 86400) % 3600) / 60);
      const seconds = Math.floor(((secondDiff % 86400) % 3600) % 60);

      // console.log(
      //   `${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`,
      // );

      if (days > 0) {
        setTimeLeft(() => `${days} d(s)`);
      } else if (hours > 0) {
        setTimeLeft(() => `${hours} hr(s)`);
      } else if (minutes > 0) {
        setTimeLeft(() => `${minutes} min(s)`);
      } else if (seconds > 0) {
        setTimeLeft(() => `${seconds} sec(s)`);
      } else {
        setTimeLeft(null);
        clearInterval(computeTimeLeft);
      }
      startedAt += 1000;
    }, 1000);

    return () => clearInterval(computeTimeLeft);
  }, []);
  return timeLeft;
};
