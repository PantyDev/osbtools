const getNumberOrNull = (number: number | null | undefined) => !Number.isNaN(number) && number !== null && number !== undefined ? number : null;

export { getNumberOrNull };