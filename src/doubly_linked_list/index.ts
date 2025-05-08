import { Node } from './node.js'
import { Color, Options } from '@athenna/common'
import type { Position, TraverseClosure } from './types.js'

export class DoublyLinkedList<T = any> {
  /**
   * Stores the first node of the list.
   */
  private head: Node<T>

  /**
   * Stores the last node of the list.
   */
  private tail: Node<T>

  /**
   * Stores the size of the list.
   */
  private length = 0

  /**
   * Return the size of the linked list.
   *
   * Time complexity: O(1)
   * Space complexity: O(1)
   */
  public size() {
    return this.length
  }

  /**
   * Get the node value on a specific index of the linked list.
   *
   * Time complexity: O(n)
   * Space complexity: O(1)
   */
  public get(index: number) {
    return this.find((_, i) => i === index)
  }

  /**
   * Set a value to a specific index of the linked list.
   *
   * Time complexity: O(n)
   * Space complexity: O(1)
   */
  public set(index: number, value: T) {
    /**
     * If list is empty, set the new value coming.
     */
    if (!this.head) {
      return this.prepend(value)
    }

    /**
     * If index is equals to 0 or bellow, just update
     * the head of the list.
     */
    if (index <= 0) {
      const node = new Node(value, this.head.next)

      this.head = node

      return this
    }

    const oldNode = this.get(index - 1)

    /**
     * If old node doesn't exist, it means that the
     * index provided is exceeding the size of the list,
     * in this case, just append the value to the end
     * of the list.
     */
    if (!oldNode) {
      return this.append(value)
    }

    const curNode = oldNode.next

    /**
     * If the node in the current index provided doesn't
     * exist, it means that the index provided is exceeding
     * the size of the list, in this case, just append the
     * value to the end of the list.
     */
    if (!curNode) {
      return this.append(value)
    }

    /**
     * Create the new node defining the next as the next
     * node of the current and the previous as the old
     * node.
     */
    const node = new Node(value, curNode?.next, oldNode)

    oldNode.next = node

    /**
     * If the next value is undefined, it means that
     * we are in the end of the list and we should
     * update the tail.
     */
    if (!node.next) {
      this.tail.next = node
      this.tail = node
    }

    return this
  }

  /**
   * Remove a node from the linked list by it index.
   *
   * Time complexity: O(n)
   * Space complexity: O(1)
   */
  public delete(index: number) {
    /**
     * In this case the list size is 1 or is already
     * empty, which means we should only clean the
     * list and it size.
     */
    if (index <= 0 && !this.head?.next) {
      this.length = 0
      this.head = undefined!
      this.tail = undefined!

      return this
    }

    if (index <= 0) {
      /**
       * Define the head node as the next node or
       * undefined if it doesn't exist.
       */
      this.head = this.head?.next as any

      /**
       * If head doesn't exist, also update the tail
       * and the list size since it is completely clean.
       */
      if (!this.head) {
        this.length = 0
        this.tail = undefined!

        return this
      }

      this.length--

      return this
    }

    const oldNode = this.get(index - 1)
    const curNode = oldNode?.next

    /**
     * If old node or the node in the current index
     * provided doesn't exist, it means that the
     * index provided is exceeding the size of the
     * list, in this case, do nothing.
     */
    if (!oldNode || !curNode) {
      return this
    }

    this.length--

    const nextNode = curNode.next

    oldNode.next = nextNode

    /**
     * If the next node of the current node is
     * undefined, it means that current node was
     * the tail of the list, in this case we need
     * to update the tail to be the old node.
     */
    if (!nextNode) {
      this.tail = oldNode

      return this
    }

    /**
     * Update the previous node of next node to point
     * to the old node.
     */
    nextNode.previous = oldNode

    return this
  }

  /**
   * Add a value to the end of the linked list.
   *
   * Time complexity: O(1)
   * Space complexity: O(1)
   */
  public append(value: T) {
    this.length++

    const node = new Node(value)

    if (!this.head) {
      this.head = node
      this.tail = node

      return this
    }

    /**
     * Update the old tail with the new value.
     */
    this.tail.next = node

    /**
     * Update the previous value of the node with
     * the old tail node.
     */
    node.previous = this.tail

    /**
     * Define the new tail.
     */
    this.tail = node

    return this
  }

  /**
   * Add a value to the beginning of the linked list.
   *
   * Time complexity: O(1)
   * Space complexity: O(1)
   */
  public prepend(value: T) {
    this.length++

    const node = new Node(value, this.head)

    if (!this.head) {
      this.head = node
      this.tail = node

      return this
    }

    /**
     * Update the previous node of the head to
     * point to the new node being inserted.
     */
    this.head.previous = node

    /**
     * Update the head to become the new node.
     */
    this.head = node

    return this
  }

  /**
   * Verify if value exists inside the linked list.
   *
   * Time complexity: O(n)
   * Space complexity: O(1)
   */
  public contains(value: T, pos?: Position) {
    return !!this.find(node => node.value === value, pos)
  }

  /**
   * Traverse the doubly linked list starting from the head by default.
   * It will run the defined closure for each node found. This method
   * will create and return a new doubly linked list, if you want to
   * modify the values in the current list instance, use the `traverse()`.
   *
   * Time complexity: O(n)
   * Space complexity: O(1)
   */
  public map<R = any>(closure: TraverseClosure<T, R>, pos?: Position) {
    if (!pos) pos = 'start'

    let index = 0
    let node: Node<T> | undefined = pos === 'start' ? this.head : this.tail
    const doublyLinkedList = new DoublyLinkedList<R>()

    while (node) {
      doublyLinkedList.append(closure(node, index))

      index++
      node = pos === 'start' ? node.next : node.previous
    }

    return doublyLinkedList
  }

  /**
   * Traverse the linked list joining values of nodes using the defined
   * separator. By default starts in the head of the list.
   *
   * Time complexity: O(n)
   * Space complexity: O(n)
   */
  public join(separator: string, pos?: Position) {
    if (!pos) pos = 'start'

    let string = ''

    this.traverse((node, i) => {
      if (i === 0) {
        string += node.value

        return
      }

      string += `${separator}${node.value}`
    }, pos)

    return string
  }

  /**
   * Traverse the linked list running a closure in each node value.
   * It stops and return the node when the closure return a truffy
   * value for the first time. By default starts in the head of the
   * list.
   *
   * Time complexity: O(n)
   * Space complexity: O(1)
   */
  public find(closure: TraverseClosure<T>, pos?: Position) {
    if (!pos) pos = 'start'

    let index = 0
    let node: Node<T> | undefined = pos === 'start' ? this.head : this.tail

    while (node) {
      if (closure(node, index)) {
        break
      }

      index++
      node = pos === 'start' ? node.next : node.previous
    }

    return node
  }

  /**
   * Traverse the doubly linked list starting from the head by default.
   * It will run the defined closure for each node found.
   *
   * Time complexity: O(n)
   * Space complexity: O(1)
   */
  public traverse(closure: TraverseClosure<T>, pos?: Position) {
    if (!pos) pos = 'start'

    let index = 0
    let node: Node<T> | undefined = pos === 'start' ? this.head : this.tail

    while (node) {
      closure(node, index)

      index++
      node = pos === 'start' ? node.next : node.previous
    }

    return this
  }

  /**
   * Just an alias for the `traverse()` method.
   *
   * Time complexity: O(n)
   * Space complexity: O(1)
   */
  public forEach(closure: TraverseClosure<T>, pos?: Position) {
    return this.traverse(closure, pos)
  }

  /**
   * Create a new linked list with all values reversed.
   *
   * Time complexity: O(n)
   * Space complexity: O(n)
   */
  public reverse(pos?: Position) {
    if (!pos) pos = 'start'

    const reversedDoublyLinkedList = new DoublyLinkedList<T>()

    this.forEach(node => reversedDoublyLinkedList.prepend(node.value), pos)

    return reversedDoublyLinkedList
  }

  public toArray(options: { onlyValues: true }): T[]
  public toArray(options?: { onlyValues?: false }): Node<T>[]

  /**
   * Parse the linked list to an array.
   *
   * Time complexity: O(n)
   * Space complexity: O(n)
   */
  public toArray(options?: { onlyValues?: boolean }) {
    options = Options.create(options, { onlyValues: false })

    const nodes: any[] = []

    this.traverse(node => {
      if (options?.onlyValues) {
        nodes.push(node.value)

        return
      }

      nodes.push(node)
    })

    return nodes
  }

  /**
   * Create a string visualization of the linked list.
   *
   * Time complexity: O(n)
   * Space complexity: O(n)
   */
  public toString() {
    const nodes = this.map(node => node.toString()).join(', ')

    return `${Color.yellow('DoublyLinkedList[')}${nodes}${Color.yellow(']')}`
  }
}
