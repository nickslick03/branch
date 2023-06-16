import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { CondensedItem, quizletQuestions } from '../util/quizletQuestions';

export default function Food({
  index,
  isDescending,
  pots,
  currSelectedIndex,
  nextPercent,
  nextTerm,
  finishedDescending,
  isGameRunning,
}: {
  index: number;
  isDescending: boolean;
  pots: number;
  currSelectedIndex: number;
  nextPercent: number;
  nextTerm: () => void;
  finishedDescending: (index: number, lane: number, term: CondensedItem) => void;
  isGameRunning: boolean;
}) {

  const [lane, setLane] = useState<number>();
  const [percentDown, setPercentDown] = useState(0);
  const [item, setItem] = useState<CondensedItem>();
  const [isRepeatDown, setIsRepeatDown] = useState(false);
  const div = useRef<HTMLDivElement>(null);

  const changeLane = (num: number) => {
    if (lane + num >= 1 && lane + num <= pots) {
      setLane(lane + num);
    }
  };

  const changePercentDown = (num?: number) => {
    if (percentDown == 90) {
      setIsRepeatDown(false);
      setPercentDown(0);
      setLane(Math.floor(Math.random() * pots) + 1);
      finishedDescending(index, lane, item);
    } else {
      setPercentDown(percentDown + (num || 5));
    }
  };

  useEffect(() => {
    const down = () => changePercentDown();
    if (isDescending) {
      if (isRepeatDown) {
        setTimeout(() => down(), 50);
      } else {
        document.addEventListener('descend', down);
      }
    }
    return () => document.removeEventListener('descend', down);
  });

  useEffect(() => {
    const left = () => changeLane(-1);
    const right = () => changeLane(1);
    const down = () => changePercentDown();
    const repeatDown = () => setIsRepeatDown(true);
    if (currSelectedIndex == index && percentDown < 90) {
      document.addEventListener('left', left);
      document.addEventListener('right', right);
      document.addEventListener('down', down);
      document.addEventListener('repeatDown', repeatDown);
    }
    return () => {
      document.removeEventListener('left', left);
      document.removeEventListener('right', right);
      document.removeEventListener('down', down);
      document.removeEventListener('repeatDown', repeatDown);
    }
  });

  useEffect(() => {
    if (isDescending) {
      setItem(quizletQuestions.getNextTerm());
    }
  }, [isDescending]);

  useEffect(() => {
    if (percentDown == nextPercent) {
      nextTerm();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [percentDown, nextPercent]);

  useEffect(() => 
    setLane(Math.floor(Math.random() * pots) + 1),
  // eslint-disable-next-line react-hooks/exhaustive-deps
  []);
  
  return (
    <div className='flex-1'>
      <div
        ref={div}
        className={
          `h-20 w-20 
          text-white text-sm text-center break-words leading-none
          bg-orange-900 border-4
          flex justify-center items-center
          absolute origin-center -translate-x-1/2 `
          + (isDescending ? '' : 'hidden ')
          + (currSelectedIndex == index ? 'border-red-500 ' : '')
        }
        style={{
          left: (lane / pots) * 100 - 50 / pots + '%',
          top: percentDown + '%',
        }}>
        {isGameRunning ? item?.term : ''}
      </div>
    </div>
  );
}
