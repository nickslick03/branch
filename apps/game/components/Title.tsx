import { Dispatch, SetStateAction } from "react";

export default function Title({
    setStartGame
} : {
    setStartGame: Dispatch<SetStateAction<boolean>>
}) {

    return (
        <div 
            className="absolute z-20 h-full w-full 
            bg-black bg-opacity-60 text-white
            flex flex-col justify-center items-center gap-32">
            <hgroup className="text-center">
                <h1 className="text-7xl mb-10">
                    Order Up
                </h1>
                <p className="text-xl">
                    Put the Foods in the correct pot!
                </p>
            </hgroup>
            <button 
                className="text-white bg-brandblue px-20 py-6 hover:bg-[#6ea2f7]" 
                onClick={() => setStartGame(true)}>
                Play
            </button>
        </div>
    );
}