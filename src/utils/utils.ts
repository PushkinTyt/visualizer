let currentNumber = 1;

export function getUnicNumber(): number {
    return currentNumber++
}

export function getUnicString(): string {
    return `id_${currentNumber++}`
}
