import { Dispatch, SetStateAction, useEffect, useMemo, useState } from 'react';
import Food from './Food';
import Lives from './Lives';
import Score from './Score';
import Stove from './Stove';
import { createIndexedArray } from '../../util/arrayfromlength';
import { CondensedItem } from '../../util/quizletQuestions';
import { replace } from '../../util/replace';
import { dispatchMovementEvents } from '../../util/movementEvents';
import pause from '../../images/Pause.png';
import play from '../../images/Play.png';
import definitionBoardLeft from '../../images/definitionBoard_mobile_splitleft.png';
import definitionBoardRight from '../../images/definitionBoard_mobile_splitright.png';
import Image from 'next/image';

const STARTING_MILISECONDS = 400;

/**
 * The base component in which the game runs in. 
 */
export default function Game({
  startGame,
  setIsGameOver,
  setFinalScore,
} : {
  /**
   * Boolean that indicates whether the game should start. Do not make it false once it has been made true.
   */
  startGame: boolean;
  /**
   * setState function that is made true when the game ends (when the user has zero lives).
   */
  setIsGameOver: Dispatch<SetStateAction<boolean>>;
  /**
   * setState function in which the final score the user got is set in.
   */
  setFinalScore: Dispatch<SetStateAction<number>>;
}) {

  const [ isGameRunning, setIsGameRunning ] = useState(false);

  const [ score, setScore ] = useState(0);
  const [ lives, setLives ] = useState(3);
  const [ pots, setPots ] = useState(3);
  const [ nextIndex, setNextIndex ] = useState(0);

  const [ finishedFood, setFinishedFood ] = useState<{lane: number, term: CondensedItem}>(null);

  const potsArray = createIndexedArray(pots);

  const [ currSelectedIndex, setCurrSelectedIndex ] = useState(-1);
  const [ currLane, setCurrLane ] = useState(-1);

  const [ isDescending, setIsDescending ] = useState(potsArray.map(() => false));

  const milliseconds = useMemo(() => {
    return (STARTING_MILISECONDS * (0.9  ** Math.floor(score / 20)) + ((3 - lives) * 50));
  }, [score, lives]);
  
  const nextPercent = useMemo(() => {
    const exactPercent = Math.floor(milliseconds / 6.25);
    const roundedPercent = exactPercent - (exactPercent % 5);
    const minPercent = (90 / pots) + 5;
    return Math.max(roundedPercent, minPercent);
  }, [milliseconds, pots]);
  
  /**
   * Changes whether a Food component from a specific index is descending.
   * @param index the index of the Food component
   * @param bool if true, the Food component starts to descend 
   * from the top of the container. If false, the Food component disappears
   */
  const changeDescending = (index: number, bool: boolean) => {
    setIsDescending(replace(isDescending, bool, index));
  }
  
  /**
   * Sets the next Food component to descend.
   */
  const turnOnDescending = () => {
    changeDescending(nextIndex, true);
    setNextIndex((nextIndex + 1) % isDescending.length);
  };

  /**
   * Makes the Food component at the index disappear.
   * @param index the index of the Food component
   */
  const turnOffDescending = (index: number) => {
    changeDescending(index, false);
  };

  /**
   * Callback function run in a Food component when it has reached a definition (Pot component).
   * @param index the index of the Food component
   * @param lane the lane the Food component fell in
   * @param term the term on the Food component
   */
  const finishedDescending = (index: number, lane: number, term: CondensedItem) => {
    turnOffDescending(index);
    setFinishedFood({lane, term});
    setCurrSelectedIndex((currSelectedIndex + 1) % pots);
  };

  /**
   * Makes the next Food component start to descend.
   */
  const nextTerm = () => {
    turnOnDescending();
  };

  useEffect(() => {
    const event = new CustomEvent('descend');
    const descendID = setInterval(() => { 
      if (isGameRunning)
        document.dispatchEvent(event);
    }, milliseconds);
    return () => {
      clearInterval(descendID);
    };
  }, [milliseconds, isGameRunning]);

  useEffect(() => {
    const togglePause = () => setIsGameRunning((isGameRunning) => !isGameRunning);
    if (startGame) {
      setIsGameRunning(true);
      nextTerm();
      setCurrSelectedIndex(0);
      dispatchMovementEvents();
      document.addEventListener('togglePause', togglePause);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startGame]);

  useEffect(() => {
    if (lives < 1) {
      setIsGameRunning(false);
      setFinalScore(score);
      setTimeout(() => setIsGameOver(true), 1000);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lives]);

  return (
    <div
      className='h-screen flex flex-col text-xl'>
      <header className='px-4 mb-2 flex justify-between'>
        <Score score={score} />
        <button 
          className='self-start pt-4 mx-12 text-3xl'
          onClick={() => setIsGameRunning(!isGameRunning)}>
            <Image
              src={isGameRunning ? pause : play}
              alt="pause / play button"
              width={60} />
        </button>
        <Lives lives={lives} />
      </header>

  
      <main className='flex-1 flex align-bottom relative'>
        {potsArray.map((i) => 
        <Food 
          key={i}
          index={i}
          pots={pots}
          isDescending={isDescending[i]} 
          currSelectedIndex={currSelectedIndex}
          setCurrLane={setCurrLane}
          nextPercent={nextPercent}
          nextTerm={nextTerm}
          finishedDescending={finishedDescending}
          isGameRunning={isGameRunning} />)}
      </main>

      <footer className='z-10'>
          <div className='flex'>
            {potsArray.map((i) =>
              <Stove 
                key={i} 
                index={i} 
                setScore={setScore}
                setLives={setLives} 
                food={finishedFood}
                isGameRunning={isGameRunning}
                currLane={currLane} />)}
          </div>
          <div className='bg-[url(../images/Stove.png)] bg-no-repeat bg-top bg-cover h-24 sm:h-16'>
          </div>
          <div className='absolute bottom-2 w-full h-20 md:h-28 flex items-center sm:hidden'>
            <Image 
              src={definitionBoardLeft}
              alt=''
              className='h-full w-auto'/>
            <p className='h-full flex-1 text-sm md:text-lg py-1 overflow-hidden 
            bg-[url(../images/definitionBoard_mobile_splitmiddle.png)] bg-contain'>
            </p>
            <Image 
              src={definitionBoardRight}
              alt=''
              className='h-full w-auto'/>
          </div>
      </footer>
    </div>
  );
}
