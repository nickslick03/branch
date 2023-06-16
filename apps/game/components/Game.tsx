import { Dispatch, SetStateAction, useEffect, useMemo, useState } from 'react';
import Food from './Food';
import Lives from './Lives';
import Score from './Score';
import Stove from './Stove';
import { createIndexedArray } from '../util/arrayfromlength';
import { CondensedItem } from '../util/quizletQuestions';
import { replace } from '../util/replace';
import { movementEvents } from '../util/movementEvents';

const STARTING_MILISECONDS = 500;

export default function Game({
  startGame,
  setIsGameOver,
} : {
  startGame: boolean,
  setIsGameOver: Dispatch<SetStateAction<boolean>>,
}) {

  const [ isGameRunning, setIsGameRunning ] = useState(false);

  const [ score, setScore ] = useState(0);
  const [ lives, setLives ] = useState(3);
  const [ pots, setPots ] = useState(3);
  const [ nextIndex, setNextIndex ] = useState(0);

  const [ finishedFood, setFinishedFood ] = useState<{lane: number, term: CondensedItem}>(null);

  const potsArray = createIndexedArray(pots);

  const [ currSelectedIndex, setCurrSelectedIndex ] = useState(-1);

  const [ isDescending, setIsDescending ] = useState(potsArray.map(() => false));
  const milliseconds = useMemo(() => {
    return STARTING_MILISECONDS * (0.9  ** Math.floor(score / 20));
  }, [score]);

  const nextPercent = useMemo(() => {
    const exactPercent = Math.floor(milliseconds / 6.25);
    const roundedPercent = exactPercent - (exactPercent % 5);
    const minPercent = (90 / pots) + 5;
    return Math.max(roundedPercent, minPercent);
  }, [milliseconds, pots]);
  
  const changeDescending = (index: number, bool: boolean) => {
    setIsDescending(replace(isDescending, bool, index));
  }
  
  const turnOnDescending = () => {
    changeDescending(nextIndex, true);
    setNextIndex((nextIndex + 1) % isDescending.length);
  };

  const turnOffDescending = (index: number) => {
    changeDescending(index, false);
  };

  const finishedDescending = (index: number, lane: number, term: CondensedItem) => {
    turnOffDescending(index);
    setFinishedFood({lane, term});
    setCurrSelectedIndex((currSelectedIndex + 1) % pots);
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

  const nextTerm = () => {
    turnOnDescending();
  };

  useEffect(() => {
    if (startGame) {
      setTimeout(() => {
        setIsGameRunning(true);
        nextTerm();
        setCurrSelectedIndex(0);
      }, 1000);
      movementEvents();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startGame]);

  if (lives == 0) return <div>game over <br /> your score was {score}</div>;

  return (
    <div className='h-screen flex flex-col text-xl overflow-hidden bg-orange-200'>
      
      <header className='px-2 mb-2 flex justify-between'>
        <Score score={score} />
        <h1>Order Up!</h1>
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
          nextPercent={nextPercent}
          nextTerm={nextTerm}
          finishedDescending={finishedDescending}
          isGameRunning={isGameRunning} />)}
      </main>

      <footer className='flex'>
        {potsArray.map((i) =>
        <Stove 
          key={i} 
          index={i} 
          setScore={setScore}
          setLives={setLives} 
          food={finishedFood}
          isGameRunning={isGameRunning} />)}
      </footer>
    </div>
  );
}
