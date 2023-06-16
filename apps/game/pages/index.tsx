import { useState } from "react";
import Game from "../components/Game";
import Title from "../components/Title";

export default function Index() {

    const [startGame, setStartGame] = useState(false);

    return (
        <div className="relative font-retro h-screen">
            {!startGame ? <Title setStartGame={setStartGame} /> : ''}
            <Game startGame={startGame}/>
        </div>
    );
}