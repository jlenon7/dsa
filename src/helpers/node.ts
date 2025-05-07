export class Node<T = any> {
  public value: T
  public next?: Node<T>

  public constructor(value: T, next?: Node<T>) {
    this.value = value
    this.next = next
  }

  public toString() {
    return `${this.value}`
  }
}
