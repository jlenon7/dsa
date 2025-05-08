import type { Node } from './node.js'

/**
 * Type used to define closures of methods like `map()`,
 * `forEach()`, `traverse()`, etc.
 */
export type TraverseClosure<T = any, R = any> = (
  node: Node<T>,
  index?: number
) => R
