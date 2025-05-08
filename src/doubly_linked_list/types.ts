import type { Node } from './node.js'

/**
 * Type used to define how traverse will happen in the
 * list. The `start` value means it will start traversing
 * from the head and the `end` value means it will start
 * from the tail.
 */
export type Position = 'start' | 'end'

/**
 * Type used to define closures of methods like `map()`,
 * `forEach()`, `traverse()`, etc.
 */
export type TraverseClosure<T = any, R = any> = (
  node: Node<T>,
  index?: number
) => R
