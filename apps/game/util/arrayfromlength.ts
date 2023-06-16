export function createIndexedArray (length: number): number[] {
    
    return Array
    .from({length})
    .fill(0)
    .map((_, i) => i);
}
