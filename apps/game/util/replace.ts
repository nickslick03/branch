export function replace<T>(array: T[], item: T, index: number): T[] {
    
    const copyArray = [...array];
    copyArray[index] = item;
    return copyArray;
}
