export function shuffle<T>(array: T[]): T[] {

    for (let index = 0; index < array.length - 1; index++) {

        const randomIndex = Math.floor(Math.random() * (array.length - (index))) + index;
        const temp = array[index];
        array[index] = array[randomIndex];
        array[randomIndex] = temp;
    }

    return array;
}
