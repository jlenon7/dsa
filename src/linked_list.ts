import { Color, Options } from '@athenna/common'
import { Node } from '#src/helpers/node'

export class LinkedList<T = any> {
  private head: Node<T>
  private tail: Node<T>
  private length: number = 0

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
     * index provided is exceding the size of the list,
     * in this case, just append the value to the end
     * of the list.
     */
    if (!oldNode) {
      return this.append(value)
    }

    const curNode = oldNode.next

    /**
     * If the node in the current index provided doesn't
     * exist, it means that the index provided is exceding
     * the size of the list, in this case, just append the
     * value to the end of the list.
     */
    if (!curNode) {
      return this.append(value)
    }

    const node = new Node(value, curNode?.next)

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
      this.head = this.head?.next!

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
     * index provided is exceding the size of the
     * list, in this case, do nothing.
     */
    if (!oldNode || !curNode) {
      return this
    }

    this.length--

    oldNode.next = curNode.next

    /**
     * If the next value of the current node is
     * undefined, it means that current node was
     * the tail of the list, in this case we need
     * to update the tail to be the old node.
     */
    if (!oldNode.next) {
      this.tail = oldNode
    }

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

    this.head = node

    return this
  }

  /**
   * Verify if value exists inside the linked list.
   *
   * Time complexity: O(n)
   * Space complexity: O(1)
   */
  public contains(value: T) {
    return !!this.find(node => node.value === value)
  }

  /**
   * Traverse the linked list running a closure for each
   * element. This method will create and return a new linked
   * list, if you want to modify the values in the current
   * linked list instance, use the `traverse()` method.
   *
   * Time complexity: O(n)
   * Space complexity: O(n)
   */
  public map<R = any>(closure: (node: Node<T>, index?: number) => R) {
    let index = 0
    let node: Node<T> | undefined = this.head
    const linkedList = new LinkedList<R>()

    while (node) {
      linkedList.append(closure(node, index))

      index++
      node = node.next
    }

    return linkedList
  }

  /**
   * Traverse the linked list joining values of nodes
   * using the defined separator.
   *
   * Time complexity: O(n)
   * Space complexity: O(n)
   */
  public join(separator: string) {
    let string = ''

    this.traverse((node, i) => {
      if (i === 0) {
        string += node.value

        return
      }

      string += `${separator}${node.value}`
    })

    return string
  }

  /**
   * Traverse the linked list running a closure in each
   * node value. It stops and return the node when the
   * closure return a truffy value for the first time.
   *
   * Time complexity: O(n)
   * Space complexity: O(1)
   */
  public find(closure: (node: Node<T>, index?: number) => any) {
    let index = 0
    let node: Node<T> | undefined = this.head

    while (node) {
      if (closure(node, index)) {
        break
      }

      index++
      node = node.next
    }

    return node
  }

  /**
   * Traverse the linked list running a closure for each node.
   *
   * Time complexity: O(n)
   * Space complexity: O(1)
   */
  public traverse(closure: (node: Node<T>, index?: number) => any) {
    let index = 0
    let node: Node<T> | undefined = this.head

    while (node) {
      closure(node, index)

      index++
      node = node.next
    }

    return this
  }

  /**
   * Just an alias for the `traverse()` method.
   *
   * Time complexity: O(n)
   * Space complexity: O(1)
   */
  public forEach(closure: (node: Node<T>, index?: number) => any) {
    return this.traverse(closure)
  }

  /**
   * Create a new linked list with all values reversed.
   *
   * Time complexity: O(n)
   * Space complexity: O(n)
   */
  public reverse() {
    const reversedLinkedList = new LinkedList<T>()

    this.forEach(node => reversedLinkedList.prepend(node.value))

    return reversedLinkedList
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

    return `${Color.yellow('LinkedList[')}${nodes}${Color.yellow(']')}`
  }
}
