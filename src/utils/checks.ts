const getNumberOrNull = (number: number | null | undefined) =>
	number !== null && number !== undefined && !isNaN(number) ? number : null;

export { getNumberOrNull };
