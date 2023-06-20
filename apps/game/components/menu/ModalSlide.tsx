import { useRef, useState } from "react";

export default function ModalSlide({
    isStarted,
    modals,
    endFunc,
} : {
    isStarted: boolean;
    modals: JSX.Element[];
    endFunc: () => any;
}) {
    
    const length = modals.length;
    const [index, setIndex] = useState(0);

    const div = useRef<HTMLDivElement>();

    const incrIndex = () => {
        if (index + 1 === length) {
            div.current.style.display = 'none';
            endFunc();
        } else {
            setIndex(index + 1);
        }
    }

    return (
        <div 
            className={isStarted ? '' : 'hidden'}
            ref={div}
            onClick={incrIndex}>
                {modals[index]}
        </div>
    );
}