const isNumber = (number: number | null | undefined) => !Number.isNaN(number) && number !== null && number !== undefined ? number : null;

export { isNumber };