import Image from "next/image";
import scoreboard from "../../images/scoreboard.png";

/**
 * Displays the score of the game.
 */
export default function Score({
    score
}: {
    /**
     * The current score
     */
    score: number
}) {

    return (
        <div className="pt-4">
            <div className="h-min relative">
                <Image src={scoreboard} alt='score board' className="w-[120px]" />
                <div className="absolute top-0 left-1 -translate-y-1/2 text-xl sm:text-2xl scale-y-150">
                    score
                </div>
                <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2">
                    {score}
                </div>
            </div>
        </div>
    );
}