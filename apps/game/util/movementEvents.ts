type coord = {
    x: number;
    y: number;
}

export function movementEvents() {

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

    document.addEventListener('touchstart', e => {
        start.x = e.changedTouches[0].screenX;
        start.y = e.changedTouches[0].screenY;
    });

    document.addEventListener('touchend', e => {
        end.x = e.changedTouches[0].screenX;
        end.y = e.changedTouches[0].screenY;
        checkDirection(start, end);
    });

    document.addEventListener('keydown', e => {
        checkKey(e.key);
    });

    const isSwipeDown = (start: coord, end: coord) => 
        end.y > start.y && (end.y - start.y) > Math.abs(end.x - start.x);

    const checkDirection = (start: coord, end: coord) => {
        if (isSwipeDown(start, end)) document.dispatchEvent(repeatDown);
        else if (end.x < start.x) document.dispatchEvent(left);
        else if (end.x > start.x) document.dispatchEvent(right);
    };

    const checkKey = (key: String) => {
        if (key == 'ArrowLeft') document.dispatchEvent(left);
        else if (key == 'ArrowRight') document.dispatchEvent(right);
        else if (key == 'ArrowDown') document.dispatchEvent(down);
    };
}

