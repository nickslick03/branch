/**
 * Replaces a single value in an copied array and returns the copied array.
 * @param array the array
 * @param item the item to swap with the replaced value
 * @param index the index at which to replace the item
 * @returns A copied array with the item replaced.
 */
export function replace<T>(array: T[], item: T, index: number): T[] {
    
    const copyArray = [...array];
    copyArray[index] = item;
    return copyArray;
}
