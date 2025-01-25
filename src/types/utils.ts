type UnionToIntersection<U> = 
    (U extends any ? (k: U) => void : never) extends 
    ((k: infer I) => void) ? I : never;

type Expand<T> = T extends infer O ? { [K in keyof O]: O[K] } : never;

export type { UnionToIntersection, Expand }