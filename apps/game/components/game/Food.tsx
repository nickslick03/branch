import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import lettuce from '../../images/foods/lettuce.png';
import lettuceHighlight from '../../images/foods/lettuceHighlight.png';
import potato from '../../images/foods/potato.png';
import potatoHighlight from '../../images/foods/potatoHighlight.png';
import tomato from '../../images/foods/tomato.png';
import tomatoHighlight from '../../images/foods/tomatoHighlight.png';
import { CondensedItem, quizletQuestions } from '../../util/quizletQuestions';

const FOOD_IMGS = [
  [lettuce, lettuceHighlight],
  [potato, potatoHighlight],
  [tomato, tomatoHighlight],
];

/**
 * The Food component periodically discends from the top of it's root div element until it has reached the bottom.
 *  It then calls a callback function, sending its term object to be scored.
 */
export default function Food({
  index,
  isDescending,
  pots,
  currSelectedIndex,
  nextPercent,
  setCurrLane,
  nextTerm,
  finishedDescending,
  isGameRunning,
}: {
  /**
   * The index of the Food component
   */
  index: number;
  /**
   * If true, the Food component is visible and descends from the top of its root div. If false, it is invisible
   */
  isDescending: boolean;
  /**
   * The number of pots the Food component has available
   */
  pots: number;
  /**
   * The index of the bottom-most Food component. The food component only moves or descends if its index is equal to currSelectedIndex
   */
  currSelectedIndex: number;
  /**
   * The percent of descending the Food component is at before sending the next Food component to descend
   */
  nextPercent: number;
  /**
   * setState function to set the current lane the Food component is in
   */
  setCurrLane: Dispatch<SetStateAction<number>>;
  /**
   * Makes the next Food component start to descend.
   */
  nextTerm: () => void;
  /**
   * Callback function run in a Food component when it has reached a definition (Pot component).
   * @param index the index of the Food component
   * @param lane the lane the Food component fell in
   * @param term the term on the Food component
   */
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
  const [isRepeatDown, setIsRepeatDown] = useState(false);
  const div = useRef<HTMLDivElement>(null);

  /**
   * Changes the lane the Food component is in.
   * @param num the lane number to change to
   */
  const changeLane = (num: number) => {
    if (lane + num >= 1 && lane + num <= pots) {
      if (currSelectedIndex === index) {
        setCurrLane(lane + num);
      }
      setLane(lane + num);
    }
  };

  /**
   * Changes the percent of descending of the Food component
   * @param num the percent to change the previous descending by (default is 5)
   */
  const changePercentDown = (num: number = 5) => {
    if (percentDown === 90) {
      setIsRepeatDown(false);
      setPercentDown(0);
      setLane(Math.floor(Math.random() * pots) + 1);
      finishedDescending(index, lane, item);
    } else {
      setPercentDown(percentDown + (num));
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
    if (currSelectedIndex === index && percentDown < 90 && isGameRunning) {
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
      setItem(quizletQuestions.getNextTerm());
    }
  }, [isDescending]);

  useEffect(() => {
    if (percentDown === nextPercent) {
      nextTerm();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [percentDown, nextPercent]);

  useEffect(() => {
    if (currSelectedIndex === index) setCurrLane(lane);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currSelectedIndex, index]);

  useEffect(
    () => {
      const startingLane = Math.floor(Math.random() * pots) + 1;
      if (index === 0) setCurrLane(startingLane);
      setLane(startingLane);
    },
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
          (isDescending && isGameRunning ? '' : 'hidden ')
        }
        style={{
          left: (lane / pots) * 100 - 50 / pots + '%',
          top: percentDown + '%',
          backgroundImage: `url(${
            FOOD_IMGS[index % (pots - 1)][currSelectedIndex === index ? 1 : 0]
              .src
          })`,
        }}>
        {item?.term}
      </div>
    </div>
  );
}
