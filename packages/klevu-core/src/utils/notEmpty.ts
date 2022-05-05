/**
 * Type safe version to remove nulls and undefineds from array
 *
 * usage: `myArray.filter(notEmpty)`
 *
 * @param value
 * @returns
 */
export function notEmpty<TValue>(
  value: TValue | null | undefined
): value is TValue {
  return value !== null && value !== undefined
}
