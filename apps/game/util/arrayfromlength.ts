/**
 * Creates an indexed array of the specified length.
 * @param length The length of the array.
 * @returns An array of the specified length where each element is its index.
 */
export function createIndexedArray (length: number): number[] {
    
    return Array
    .from({length})
    .fill(0)
    .map((_, i) => i);
}
