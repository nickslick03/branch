import { useState } from "react";
import Game from "../components/Game";
import Title from "../components/Title";

export default function Index() {

    const [startGame, setStartGame] = useState(false);

    return (
        <div 
            className="relative font-retro h-screen 
            bg-[url(../images/Background.png)] 
            bg-no-repeat bg-cover bg-center overflow-hidden">
            <div className="absolute bottom-0 w-full h-[41%] 
                bg-[url(../images/Counter.png)] bg-cover"></div>

            {!startGame ? <Title setStartGame={setStartGame} /> : ''}   
            <Game startGame={startGame}/>
            
        </div>
    );
}