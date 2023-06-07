import Quizlet from 'dataset';
import Fun from 'dataset/sets/Fun';
import {
  CardSide,
  MediaType,
  SerializedMedia,
  SerializedMediaImage,
  SerializedMediaText,
  StudiableItem,
} from 'dataset/types';
import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';
import Food from '../components/Food';
import Lives from '../components/Lives';
import Score from '../components/Score';
import Pot from '../components/Pot';
import { arrayFromLength } from '../util/arrayfromlength';
import { quizletQuestions } from '../util/quizletQuestions';

const IMAGE_HEIGHT = 100;
const IMAGE_WIDTH = 120;

const STARTING_MILISECONDS = 500;

export default function Game() {

  // to get a specific Set
  //const { disneyPrincessTrivia: quizletSet } = Fun.getAllSetsMap();
  // const quizletSet = Quizlet.getRandomSet();

  const renderMedia = (media: SerializedMedia) => {
    switch (media.type) {
      case MediaType.TEXT:
        const { plainText } = media as SerializedMediaText;
        return <div key={media.type}>{plainText}</div>;
      case MediaType.IMAGE:
        const { url } = media as SerializedMediaImage;
        return (
          <Image
            alt="term image"
            height={IMAGE_HEIGHT}
            key={media.type}
            src={url}
            width={IMAGE_WIDTH}
          />
        );
    }
  };
  const renderTerm = (studiableItem: StudiableItem) => (
    <div key={studiableItem.id}>
      {studiableItem.cardSides.map(cardSide => {
        const { label, media } = cardSide;
        return (
          <div key={cardSide.sideId}>
            {label}: {media.map(termMedia => renderMedia(termMedia))}
          </div>
        );
      })}
    </div>
  );

  const renderTerms = (studiableItems: StudiableItem[]) => (
    <>
      <h3>({studiableItems.length} Terms)</h3>
      {studiableItems.map(studiableItem => renderTerm(studiableItem))}
    </>
  );
  
  const [ score, setScore ] = useState(0);
  const [ lives, setLives ] = useState(3);
  const [ pots, setPots ] = useState(3);
  const [ currIndex, setCurrIndex ] = useState(0);
  const [ lastLane, setLastLane ] = useState(0);

  const [ isDescending, setIsDescending ] = useState(arrayFromLength(pots, 0).map(() => false));
  const milliseconds = useMemo( () => {
    return STARTING_MILISECONDS * (0.75  ** Math.floor(score / 20));
  }, [score])

  const changeDescending = (index: number, bool: boolean) => {
    setIsDescending(isDescending.map((b, i) => i == index ? bool : b));
  }
  
  const turnOnDescending = () => {
    changeDescending(currIndex, true);
    setCurrIndex((currIndex + 1) % isDescending.length);
  };

  const turnOffDescending = (index: number) => {
    changeDescending(index, false);
  };

  const finishedDescending = (id: number, lane: number) => {
    setLastLane(lane);
    turnOffDescending(id);
  };

  useEffect(() => {
    const event = new CustomEvent('descend');
    const id = setInterval(() => { 
      document.dispatchEvent(event);
    }, milliseconds);
    return () => clearInterval(id);
  }, [milliseconds]);

  console.log(quizletQuestions.getNextItem());

  return (
    <div className='min-h-screen flex flex-col'>
      <header className='px-2 mb-2 flex justify-between'  onClick={() => {turnOnDescending()}}>
        <Score score={score} />
        <h1>Order Up!</h1>
        <Lives lives={lives} />
      </header>
      <main className='flex-1 flex align-bottom relative'>
        {arrayFromLength(pots, 0).map((_, i) => 
        <Food 
          key={i}
          id={i}
          isDescending={isDescending[i]} 
          pots={pots} 
          startingLane={i + 1} 
          finishedDescending={finishedDescending}
          />)}
      </main>
      <footer className='flex'>
        {arrayFromLength(pots, 0).map((_, i) =>
        <Pot 
          key={i} 
          index={i} 
          lastLane={lastLane}
          setScore={setScore}
          setLives={setLives} 
          setLastLane={setLastLane} />)}
      </footer>
      
    </div>
  );
}
