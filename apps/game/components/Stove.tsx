import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { CondensedItem, quizletQuestions } from '../util/quizletQuestions';
import Pot from './Pot';

export default function Stove({
  index,
  setScore,
  setLives,
  food,
  isGameRunning,
}: {
  index: number;
  setScore: Dispatch<SetStateAction<number>>;
  setLives: Dispatch<SetStateAction<number>>;
  food: {lane: number, term: CondensedItem};
  isGameRunning: boolean;
}) {

  const [item, setItem] = useState<CondensedItem>(null);
  const [amount, setAmount] = useState(0);

  useEffect(() => {

    // Food fell into different pot
    if (food?.lane != index + 1) return;

    // answer is correct
    if (food.term.id == item.id) {
      setItem(quizletQuestions.getNextDefinition());
      if (amount == 2) {
        setScore(s => s + 10);
        setAmount(0);
      } else {
        setAmount(amount + 1);
      }
    } else {
      quizletQuestions.gotTermWrong(food.term);
      setLives(lives => lives - 1);
    }  
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [food]);

  useEffect(() => {
    console.log('firstItems');
    setItem(quizletQuestions.getNextDefinition());
  }, []);

  return (
    <div className="flex-1 flex flex-col items-strech">
      <Pot imgURL={isGameRunning ? item?.imageURL : undefined}>
        {isGameRunning ? (item?.definition ?? '') : ''}
      </Pot>
      <div className="bg-orange-400 h-16 flex justify-center items-center">
        {amount % 3} / 3
      </div>
    </div>
  );
}
