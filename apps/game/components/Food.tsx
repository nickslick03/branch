import { useEffect, useRef, useState } from 'react';
import lettuce from '../images/foods/lettuce.png';
import lettuceHighlight from '../images/foods/lettuceHighlight.png';
import potato from '../images/foods/potato.png';
import potato2 from '../images/foods/potato2.png';
import potato2Highlight from '../images/foods/potato2Highlight.png';
import potatoHighlight from '../images/foods/potatoHighlight.png';
import tomato from '../images/foods/tomato.png';
import tomatoHighlight from '../images/foods/tomatoHighlight.png';
import { CondensedItem, quizletQuestions } from '../util/quizletQuestions';

const FOOD_IMGS = [
  [lettuce, lettuceHighlight],
  [potato, potatoHighlight],
  [potato2, potato2Highlight],
  [tomato, tomatoHighlight]
];

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
  finishedDescending: (
    index: number,
    lane: number,
    term: CondensedItem
  ) => void;
  isGameRunning: boolean;
}) {

  const [lane, setLane] = useState<number>();
  const [percentDown, setPercentDown] = useState(0);
  const [item, setItem] = useState<CondensedItem>();
  const [randomFoodIndex, setRandomFoodIndex] = useState(Math.floor(Math.random() * FOOD_IMGS.length));
  const [isRepeatDown, setIsRepeatDown] = useState(false);
  const div = useRef<HTMLDivElement>(null);

  const changeLane = (num: number) => {
    if (lane + num >= 1 && lane + num <= pots) {
      setLane(lane + num);
    }
  };

  const changePercentDown = (num?: number) => {
    if (percentDown == 90) {
      console.log(index);
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
    };
  });

  useEffect(() => {
    if (isDescending) {
      setRandomFoodIndex(Math.floor(Math.random() * FOOD_IMGS.length));
      setItem(quizletQuestions.getNextTerm());
    }
  }, [isDescending]);

  useEffect(() => {
    if (percentDown == nextPercent) {
      nextTerm();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [percentDown, nextPercent]);

  useEffect(
    () => setLane(Math.floor(Math.random() * pots) + 1),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return (
    <div className="flex-1">
      <div
        ref={div}
        className={
          `h-28 w-28 bg-no-repeat bg-contain bg-center
          text-sm text-center break-words leading-none
          flex justify-center items-center
          absolute origin-center -translate-x-1/2 ` +
          (isDescending ? '' : 'hidden ')
        }
        style={{
          left: (lane / pots) * 100 - 50 / pots + '%',
          top: percentDown + '%',
          backgroundImage: `url(${FOOD_IMGS[randomFoodIndex][currSelectedIndex == index ? 1 : 0].src})`
        }}>
        {isGameRunning ? item?.term : ''}
      </div>
    </div>
  );
}
