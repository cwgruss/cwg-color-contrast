

export function noColorFoundAtIndexException(index: number) {
    return new Error(`Cannont find color at index ${index}`);
}