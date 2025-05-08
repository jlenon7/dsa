export class Node<T = any> {
  public value: T
  public next?: Node<T>
  public previous?: Node<T>

  public constructor(value: T, next?: Node<T>, previous?: Node<T>) {
    this.value = value
    this.next = next
    this.previous = previous
  }

  public toString() {
    return `${this.value}`
  }
}
