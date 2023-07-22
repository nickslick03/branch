type coord = {
    x: number;
    y: number;
}

/**
 * Adds event listeners to the document that dispatch different events needed for the game.
 */
export function dispatchMovementEvents() {

    const start = {
        x: 0,
        y: 0
    };
    const end = {
        x: 0,
        y: 0
    };

    const left = new CustomEvent("left");
    const right = new CustomEvent("right");
    const down = new CustomEvent("down");
    const repeatDown = new CustomEvent("repeatDown");
    const togglePause = new CustomEvent("togglePause");

    document.addEventListener('touchstart', e => {
        start.x = e.changedTouches[0].screenX;
        start.y = e.changedTouches[0].screenY;
    });

    document.addEventListener('touchend', e => {
        end.x = e.changedTouches[0].screenX;
        end.y = e.changedTouches[0].screenY;
        checkSwipe(start, end);
    });

    document.addEventListener('keydown', e => {
        checkKey(e.key);
    });

    /**
     * Checks if user swiped down and the slope of the swipe line is greater than 1 or greater than -1.
     * @param start The starting coordinate of the swipe
     * @param end The ending coordinate of the swipe
     * @returns A boolean indicating whether the swipe was downward.
     */
    const isSwipeDown = (start: coord, end: coord) => 
        end.y > start.y && (end.y - start.y) > Math.abs(end.x - start.x);

    /**
     * Dispatches a direction event for the game based on the swipe coordinates.
     * @param start The starting coordinate of the swipe
     * @param end The ending coordinate of the swipe
     */
    const checkSwipe = (start: coord, end: coord) => {
        if (isSwipeDown(start, end)) document.dispatchEvent(repeatDown);
        else if (end.x < start.x) document.dispatchEvent(left);
        else if (end.x > start.x) document.dispatchEvent(right);
    };

    /**
     * Dispatches a direction event for the game based on the key clicked.
     * @param key a string representing the key the user input
     */
    const checkKey = (key: String) => {
        if (key == 'ArrowLeft') document.dispatchEvent(left);
        else if (key == 'ArrowRight') document.dispatchEvent(right);
        else if (key == 'ArrowDown') document.dispatchEvent(down);
        else if (key == 'p' || key == 'P') document.dispatchEvent(togglePause);
    };
}

