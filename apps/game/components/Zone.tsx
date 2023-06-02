import { Dispatch, SetStateAction, useEffect, useState } from "react";

export default function Zone({
    setScore
}: {
    setScore: Dispatch<SetStateAction<number>>
}) {

    let [ amount, setAmount ] = useState(0);

    useEffect(() => {
        if (amount != 0  && amount % 3 == 0) {
            setScore(score => score + 1);
        }
    }, [amount, setScore]);

    return (
        <div className="flex-1 flex flex-col justify-end items-strech">
            {/*POT*/}
            <div className="w-32 h-24 text-white bg-red-700 self-center" onClick={() => setAmount(amount + 1)}>
                Definition
            </div>

            {/*FRACTION*/}
            <div className="bg-orange-400 h-16 flex justify-center items-center">
                {amount % 3} / 3
            </div>
        </div>
    );
}