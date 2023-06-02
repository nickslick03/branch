import { useState, useEffect} from "react"

export default function Food({
    pots
}: {
    pots: number
}) {

    const [ isSelected, setIsSelected ] = useState(false);
    const [ lane, setlane ] = useState(1);

    const changeLane = (num: number) => {
        if (lane + num >= 1 && lane + num <= pots) {
            setlane(lane + num);
        }
    };

    const handleKeyDown = (key: String) => {
        if (key == 'ArrowLeft') changeLane(-1);
        else if (key == 'ArrowRight') changeLane(1);
    };

    return (
        <div 
            className={`h-20 w-20 text-white bg-orange-950 
            absolute border-4  transition-all origin-center 
            -z-10 animate-[drop_5s_linear_infinite]`
                + (isSelected ? " border-red-500" : "")}
            style={{
                "left" : Math.floor(lane / pots * 100 - 1 / pots * 50) + '%'
            }}
            tabIndex={0}
            onFocus={() => setIsSelected(true)}
            onBlur={() => setIsSelected(false)}
            onKeyDown={(e) => handleKeyDown(e.key)}
            onTouchStart={() => {}}
            onTouchMove={() => {}}>
            Term
        </div>
    )
}