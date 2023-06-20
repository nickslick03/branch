import { useState } from "react";
import Game from "../components/game/Game";
import Controls from "../components/menu/Controls";
import GameOver from "../components/menu/GameOver";
import HowToPlay from "../components/menu/HowToPlay";
import ModalSlide from "../components/menu/ModalSlide";
import Title from "../components/menu/Title";

export default function Index() {

    const [startModalSlide, setStartModalSlide] = useState(false);
    const [startGame, setStartGame] = useState(false);
    const [isGameOver, setIsGameOver] = useState(false);
    const [finalScore, setFinalScore] = useState(0);

    return (
        <div className="relative font-retro h-screen 
            bg-[url(../images/Background.png)] 
            bg-no-repeat bg-cover bg-center overflow-hidden">
            <div className="absolute bottom-0 w-full h-[41%] 
                bg-[url(../images/Counter.png)] bg-cover">
            </div>
            
            <Title startFunc={() => setStartModalSlide(true)} />

            <ModalSlide 
                isStarted={startModalSlide} 
                modals={[HowToPlay(), Controls()]}
                endFunc={() => setStartGame(true)}/>

            <GameOver isGameOver={isGameOver} score={finalScore}/>

            <Game 
                startGame={startGame} 
                setIsGameOver={setIsGameOver} 
                setFinalScore={setFinalScore} />
        </div>
    );
}