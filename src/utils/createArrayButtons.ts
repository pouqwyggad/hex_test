export const createArrayButtons = (quantity: number, startNumber: number) => {
    const newArr = [...Array.from({length: quantity})];
    return newArr.map((n, i) => startNumber + i);
};
