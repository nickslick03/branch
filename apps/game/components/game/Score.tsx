import Image from "next/image";
import scoreboard from "../../images/scoreboard.png";

export default function Score({
    score
}: {
    score: number
}) {

    return (
        <div className="pt-4">
            <div className="h-min relative">
                <Image src={scoreboard} alt='score board' className="w-[150px]" />
                <div className="absolute top-0 left-1 -translate-y-1/2 text-2xl scale-y-150">
                    score
                </div>
                <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2">
                    {score}
                </div>
            </div>
        </div>
    );
}