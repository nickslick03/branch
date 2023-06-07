import { Dispatch, SetStateAction, useEffect, useState } from 'react';

export default function Pot({
  index,
  lastLane,
  setScore,
  setLives,
  setLastLane,
}: {
  index: number,
  lastLane: number,
  setScore: Dispatch<SetStateAction<number>>,
  setLives: Dispatch<SetStateAction<number>>,
  setLastLane: Dispatch<SetStateAction<number>>,
}) {
  let [amount, setAmount] = useState(0);

  useEffect(() => {
    // Food fell into different pot
    if (index + 1 != lastLane) return;

    if (true) {
      // answer is correct
      if (amount == 2) {
        setScore(s => s + 10);
        setAmount(0);
      } else {
        setAmount(amount + 1);
      }
    } else {
      // answer is incorrect
    }

    // reset lane
    setLastLane(0);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastLane]);

  return (
    <div className="flex-1 flex flex-col items-strech">
      
      {/*POT*/}
      <div 
        className="z-10 text-white bg-red-700 self-center 
        min-w-[6rem] w-[20vw] max-w-[15rem]
        min-h-[4.5rem] h-[15vw] max-h-[10rem]">
        Definition {index + 1}
      </div>

      {/*FRACTION*/}
      <div className="bg-orange-400 h-16 flex justify-center items-center">
        {amount % 3} / 3
      </div>
    </div>
  );
}
