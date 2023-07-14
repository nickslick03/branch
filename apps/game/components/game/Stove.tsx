import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { CondensedItem, quizletQuestions } from '../../util/quizletQuestions';
import Pot from './Pot';
import Image from 'next/image';
import stoveTopGrill from '../../images/StovetopGrill.png';
import flame1 from '../../images/Fire_GIFS/flame1.gif';
import flame2 from '../../images/Fire_GIFS/flame2.gif';
import flame3 from '../../images/Fire_GIFS/flame3.gif';
import flameWrongAnswer from '../../images/Fire_GIFS/flameWrongAnswer.gif';

const FLAMES = [
  flame1,
  flame2,
  flame3,
];

export default function Stove({
  index,
  setScore,
  setLives,
  food,
  isGameRunning,
  currLane,
}: {
  index: number;
  setScore: Dispatch<SetStateAction<number>>;
  setLives: Dispatch<SetStateAction<number>>;
  food: {lane: number, term: CondensedItem};
  isGameRunning: boolean;
  currLane: number;
}) {

  const [item, setItem] = useState<CondensedItem>(null);
  const [flameIndex, setFlameIndex] = useState(0);
  const wrongFlameElement = useRef<HTMLImageElement>();
  const plus10 = useRef<HTMLSpanElement>();

  useEffect(() => {
    let wrongID: NodeJS.Timeout;

    // Food fell into different pot
    if (food?.lane != index + 1) return;

    // answer is correct
    if (food.term.id === item.id) {
      setItem(quizletQuestions.getNextDefinition());
      if (flameIndex === 2) {
        setScore(s => s + 10);
        plus10.current.style.display = 'block';
        setFlameIndex(0);
      } else {
        setFlameIndex(flameIndex + 1);
      }
    } else {
      quizletQuestions.gotTermWrong(food.term);
      setLives(lives => lives - 1);
      wrongFlameElement.current.style.display = 'block';
      wrongID = setTimeout(() => wrongFlameElement.current.style.display = '', 1000);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [food]);

  useEffect(() => {
    setItem(quizletQuestions.getNextDefinition());
  }, []);

  return (
    <>
      <div className="z-20 relative flex-1 flex flex-col items-center">
        <div className='absolute top-0 -translate-y-full text-6xl max-sm:text-3xl'>
          <span 
            ref={plus10}
            className={'hidden animate-floatOut'}
            onAnimationEnd={() => plus10.current.style.display = ''}>
              +10
          </span>
        </div>
        <Image
          ref={wrongFlameElement}
          src={flameWrongAnswer}
          alt={'wrong answer flame'}
          className='absolute top-0 w-[80%] max-w-[120px] -translate-y-full hidden' />
        <Pot imgURL={isGameRunning ? item?.imageURL : undefined}>
          {isGameRunning ? (item?.definition ?? '') : ''}
        </Pot>
        <Image 
          src={stoveTopGrill} 
          alt={'stove top'}
          width={120}
          className='z-10' />
        <Image 
          src={FLAMES[flameIndex]} 
          alt='stove top flame' 
          width={120}
          className='absolute bottom-0' />
      </div>
      <p 
        className='z-10 fixed bottom-2 left-0 w-full h-20 md:h-28 
        flex-1 text-sm md:text-lg px-4 py-1 overflow-hidden'
        style={{
          visibility: (currLane - 1) === index && isGameRunning ? 'visible' : 'hidden'
        }}>
        {item?.definition}
      </p>
    </>
    
  );
}
