type UnionToIntersection<U> = (U extends unknown ? (k: U) => void : never) extends (k: infer I) => void ? I : never;
type ValueUnion<T> = T[keyof T];
type Expand<T> = T extends infer O ? { [K in keyof O]: O[K] } : never;
type ConvertKeysToValue<T, V> = {
	[key in keyof T]: V;
};

export type { UnionToIntersection, Expand, ValueUnion, ConvertKeysToValue };
