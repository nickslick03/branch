import { Dispatch, SetStateAction, useEffect, useState } from 'react';

export default function Food({
  isDescending,
  setIsDescending,
  pots,
  startingLane,
  finishedDescending,
}: {
  isDescending: boolean;
  setIsDescending: Dispatch<SetStateAction<boolean>>;
  pots: number;
  startingLane: number;
  finishedDescending: (lane: number) => void;
}) {
  const [isSelected, setIsSelected] = useState(false);
  const [lane, setLane] = useState(startingLane);
  const [percentDown, setPercentDown] = useState(0);

  const changeLane = (num: number) => {
    if (lane + num >= 1 && lane + num <= pots) {
      setLane(lane + num);
      changePercentDown();
    }
  };

  const changePercentDown = (num?: number) => {
    if (percentDown >= 90) {
      finishedDescending(lane);
      setPercentDown(0);
      setIsSelected(false);
      setIsDescending(false);
    } else {
      setPercentDown(percentDown + (num || 5));
    }
  };

  const handleKeyDown = (key: String) => {
    if (key == 'ArrowLeft') changeLane(-1);
    else if (key == 'ArrowRight') changeLane(1);
    else if (key == 'ArrowDown') changePercentDown();
  };

  useEffect(() => {
    if (isDescending) {
      const id = setInterval(() => {
        changePercentDown();
      }, 500);
      return () => clearInterval(id);
    }
  });

  useEffect(() => {
    if (isDescending) {
      setPercentDown(0);
    }
  }, [isDescending]);

  return (
    <div
      className={
        `h-20 w-20 text-white bg-orange-950 
            absolute border-4 origin-center -translate-x-1/2 ` +
        (isDescending ? '' : 'hidden') +
        (isSelected ? 'border-red-500' : '')
      }
      style={{
        left: Math.floor((lane / pots) * 100 - (1 / pots) * 50) + '%',
        top: percentDown + '%',
      }}
      tabIndex={isDescending ? 0 : -1}
      onFocus={() => setIsSelected(true)}
      onBlur={() => setIsSelected(false)}
      onKeyDown={e => handleKeyDown(e.key)}
      onTouchStart={() => {}}
      onTouchMove={() => {}}>
      Term
    </div>
  );
}
