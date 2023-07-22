import { useRef, useState } from "react";

/**
 * Displays an array of components sequentially. When a component is clicked on, it displays the next component.
 */
export default function ModalSlide({
    isStarted,
    modals,
    endFunc,
} : {
    /**
     * When true, displays the first component in the modals array.
     */
    isStarted: boolean;
    /**
     * An array of components displayed sequentially.
     */
    modals: JSX.Element[];
    /**
     * A callback function that is run when the last component in the modals array has been clicked.
     */
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