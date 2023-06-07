import { useEffect, useState } from 'react';

export default function Food({
  id,
  isDescending,
  pots,
  startingLane,
  finishedDescending,
}: {
  id: number,
  isDescending: boolean;
  pots: number;
  startingLane: number;
  finishedDescending: (id: number, lane: number) => void;
}) {

  const [isSelected, setIsSelected] = useState(false);
  const [lane, setLane] = useState(startingLane);
  const [percentDown, setPercentDown] = useState(0);

  const changeLane = (num: number) => {
    if (lane + num >= 1 && lane + num <= pots) {
      setLane(lane + num);
    }
  };

  const changePercentDown = (num?: number) => {
    if (percentDown >= 90) {
      finishedDescending(id, lane);
      setPercentDown(0);
      setIsSelected(false);
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
      setLane(startingLane);
      setPercentDown(0);
    }
  }, [isDescending, startingLane]);

  useEffect(() => {
    const callback = () => changePercentDown();
    if (isDescending) { 
      document.addEventListener('descend', callback);
    }
    return () => document.removeEventListener('descend', callback);
  });
  
  return (
    <div
      className={
        `h-20 w-20 text-white bg-orange-950 border-4
        absolute origin-center -translate-x-1/2 ` +
        (isDescending ? '' : 'hidden') +
        (isSelected ? 'border-red-500' : '')
      }
      style={{
        left: (lane / pots) * 100 - 50 / pots + '%',
        top: percentDown + '%',
      }}
      tabIndex={isDescending[id] ? 0 : -1}
      onFocus={() => setIsSelected(true)}
      onBlur={() => setIsSelected(false)}
      onKeyDown={e => handleKeyDown(e.key)}
      onTouchStart={() => {}}
      onTouchMove={() => {}}>
      Term {id + 1}
    </div>
  );
}
