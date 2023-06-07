export function arrayFromLength <T>(length: number, fill: T): Array<T> { 

    return Array.from<T>({length}).fill(fill);
}
