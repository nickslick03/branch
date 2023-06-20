import { useRef } from "react";
import Button from "./Button";

export default function Title({
    startFunc
} : {
    startFunc: () => void
}) {

    const div = useRef<HTMLDivElement>();

    const runStart = () => {
        div.current.style.display = 'none';
        startFunc();
    };

    return (
        <div 
            ref={div}
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
            <Button onClick={runStart}>
                Get Started
            </Button>
        </div>
    );
}