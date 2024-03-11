import lodashMerge from 'lodash.merge';

type OptionalPropertyNames<T> =
  {
    [K in keyof T]-?:
    (object extends { [P in K]: T[K] } ? K : never)
  }[keyof T];

type SpreadProperties<L, R, K extends keyof L & keyof R> =
  { [P in K]: L[P] | Exclude<R[P], undefined> };

type Id<T> = T extends infer U
  ? { [K in keyof U]: U[K] }
  : never;

type SpreadTwo<L, R> = Id<
  & Pick<L, Exclude<keyof L, keyof R>>
  & Pick<R, Exclude<keyof R, OptionalPropertyNames<R>>>
  & Pick<R, Exclude<OptionalPropertyNames<R>, keyof L>>
  & SpreadProperties<L, R, OptionalPropertyNames<R> & keyof L>
>;

type Spread<A extends readonly [ ...any ]> =
  A extends [ infer L, ...infer R ]
    ? SpreadTwo<L, Spread<R>>
    : unknown;

/**
 * Deep merge object with types
 * @link https://stackoverflow.com/questions/49682569/typescript-merge-object-types/49683575#49683575
 * @param {any} objects - Objects to merge
 * @returns {Spread<O>}
 */
export function deepmerge<O extends (object | undefined)[]>(...objects: [ ...O ]) {
  return lodashMerge({}, ...objects) as Spread<O>;
}
