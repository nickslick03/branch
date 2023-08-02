import { useRef, useState } from "react";
import Game from "../components/game/Game";
import Button from "../components/menu/Button";
import Controls from "../components/menu/Controls";
import GameOver from "../components/menu/GameOver";
import HowToPlay from "../components/menu/HowToPlay";
import Modal from "../components/menu/Modal";
import ModalSlide from "../components/menu/ModalSlide";
import Title from "../components/menu/Title";
import { quizletQuestions } from "../util/quizletQuestions";

export default function Index() {

    const [isSetSelected, setIsSetSelected] = useState(false);

    const [startModalSlide, setStartModalSlide] = useState(false);
    const [startGame, setStartGame] = useState(false);
    const [isGameOver, setIsGameOver] = useState(false);
    const [finalScore, setFinalScore] = useState(0);

    let selectElement = useRef<HTMLSelectElement>();

    if (!isSetSelected) return (
        <div className="h-screen w-screen scr flex items-center font-retro">
            <Modal>
                <div className="text-center flex flex-col items-center gap-5">
                    <p>
                        Choose a set to use:
                    </p>
                    <select ref={selectElement} className="max-w-full">
                        {quizletQuestions.getSetTitles().map((title, i) =>
                        <option key={i}>
                            {title}
                        </option>)}
                    </select>
                    <Button onClick={() => {
                        quizletQuestions.changeSet(
                            quizletQuestions.getSetTitles().indexOf(
                                selectElement.current.value
                            )
                        );
                        setIsSetSelected(true);
                        }}>
                        Select
                    </Button>
                </div>
            </Modal>
        </div>
    );

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