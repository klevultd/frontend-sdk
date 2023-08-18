/**
 * Used to replace any amount of %s tokens with array of strings.
 * `hello %s %s %s` with values ['1', 'world', '2'] will lead to `hello 1 world 2`.
 *
 * If there isn't enough array values then %s will be left to string.
 *
 * @param string
 * @param values
 * @returns
 */
export function stringReplace(string: string, values: string[]) {
  let copy = string
  for (const v of values) {
    copy = copy.replace("%s", v)
  }
  return copy
}
