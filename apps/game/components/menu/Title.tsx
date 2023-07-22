import { useRef } from "react";
import Button from "./Button";
import Image from "next/image";
import logo from "../../images/logo.png";

/**
 * The title screen of the game.
 */
export default function Title({
    startFunc
} : {
    /**
     * A callback function that runs the game when clicked.
     */
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
            bg-black bg-opacity-60 text-white px-6
            flex flex-col justify-evenly items-center">
            <hgroup className="text-center mb-4">
                <h1 className="mb-10">
                    <Image 
                    src={logo}
                    width={600}
                    className='m-auto'
                    alt=""/>
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