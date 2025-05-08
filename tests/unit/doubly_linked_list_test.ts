import { Test, type Context } from '@athenna/test'
import { DoublyLinkedList } from '#src/doubly_linked_list'

export default class DoublyLinkedListTest {
  @Test()
  public async shouldBeAbleToAppendValuesToTheDoublyLinkedList({ assert }: Context) {
    const doublyLinkedList = new DoublyLinkedList<number>()

    doublyLinkedList.append(1)
    doublyLinkedList.append(2)
    doublyLinkedList.append(3).append(4)
    doublyLinkedList.append(5)

    const middleNode = doublyLinkedList.get(2)

    assert.deepEqual(middleNode.value, 3)
    assert.deepEqual(middleNode.previous.value, 2)
    assert.deepEqual(middleNode.next.value, 4)

    assert.deepEqual(doublyLinkedList.toArray({ onlyValues: true }), [1, 2, 3, 4, 5])
  }

  @Test()
  public async shouldBeAbleToPrependValuesToTheDoublyLinkedList({ assert }: Context) {
    const doublyLinkedList = new DoublyLinkedList<number>()

    doublyLinkedList.prepend(1)
    doublyLinkedList.prepend(2)
    doublyLinkedList.prepend(3).prepend(4).prepend(5)

    const middleNode = doublyLinkedList.get(2)

    assert.deepEqual(middleNode.value, 3)
    assert.deepEqual(middleNode.previous.value, 4)
    assert.deepEqual(middleNode.next.value, 2)

    assert.deepEqual(doublyLinkedList.toArray({ onlyValues: true }), [5, 4, 3, 2, 1])
  }

  @Test()
  public async shouldBeAbleToValidateThatDoublyLinkedListContainsValueTraversingFromHead({ assert }: Context) {
    const doublyLinkedList = new DoublyLinkedList<number>()

    doublyLinkedList.append(1)

    assert.isTrue(doublyLinkedList.contains(1))
    assert.isFalse(doublyLinkedList.contains(2))
  }

  @Test()
  public async shouldBeAbleToValidateThatDoublyLinkedListContainsValueTraversingFromTail({ assert }: Context) {
    const doublyLinkedList = new DoublyLinkedList<number>()

    doublyLinkedList.append(1)

    assert.isTrue(doublyLinkedList.contains(1, 'end'))
    assert.isFalse(doublyLinkedList.contains(2, 'end'))
  }

  @Test()
  public async shouldBeAbleToTraverseTheDoublyLinkedListRunningAClosureStartingFromHead({ assert }: Context) {
    const doublyLinkedList = new DoublyLinkedList<number>()

    let count = 0

    doublyLinkedList
      .append(1)
      .append(1)
      .append(1)
      .traverse(node => (count += node.value))

    assert.deepEqual(count, 3)
  }

  @Test()
  public async shouldBeAbleToTraverseTheDoublyLinkedListRunningAClosureStartingFromTail({ assert }: Context) {
    const doublyLinkedList = new DoublyLinkedList<number>()

    let count = 0

    doublyLinkedList
      .append(1)
      .append(1)
      .append(1)
      .traverse(node => (count += node.value), 'end')

    assert.deepEqual(count, 3)
  }

  @Test()
  public async shouldBeAbleToTraverseTheDoublyLinkedListRunningAClosureChangingItStateStartingFromHead({
    assert
  }: Context) {
    const doublyLinkedList = new DoublyLinkedList<number>()

    doublyLinkedList
      .append(1)
      .append(1)
      .append(1)
      .traverse(node => node.value++)

    assert.deepEqual(doublyLinkedList.toArray({ onlyValues: true }), [2, 2, 2])
  }

  @Test()
  public async shouldBeAbleToTraverseTheDoublyLinkedListRunningAClosureChangingItStateStartingFromTail({
    assert
  }: Context) {
    const doublyLinkedList = new DoublyLinkedList<number>()

    doublyLinkedList
      .append(1)
      .append(1)
      .append(1)
      .traverse(node => node.value++, 'end')

    assert.deepEqual(doublyLinkedList.toArray({ onlyValues: true }), [2, 2, 2])
  }

  @Test()
  public async shouldBeAbleToMapTheDoublyLinkedListValuesRunningAClosureStartingFromHead({ assert }: Context) {
    const doublyLinkedList = new DoublyLinkedList<number>()

    let count = 0

    doublyLinkedList
      .append(1)
      .append(1)
      .append(1)
      .map(node => (count += node.value))

    assert.deepEqual(count, 3)
  }

  @Test()
  public async shouldBeAbleToMapTheDoublyLinkedListValuesRunningAClosureStartingFromTail({ assert }: Context) {
    const doublyLinkedList = new DoublyLinkedList<number>()

    let count = 0

    doublyLinkedList
      .append(1)
      .append(1)
      .append(1)
      .map(node => (count += node.value), 'end')

    assert.deepEqual(count, 3)
  }

  @Test()
  public async shouldBeAbleToMapTheDoublyLinkedListValuesRunningAClosureWithoutChangingItStateStartingFromHead({
    assert
  }: Context) {
    const doublyLinkedList = new DoublyLinkedList<number>()

    const newLinkedList = doublyLinkedList
      .append(1)
      .append(1)
      .append(1)
      .map(node => node.value + 1)

    assert.deepEqual(doublyLinkedList.toArray({ onlyValues: true }), [1, 1, 1])
    assert.deepEqual(newLinkedList.toArray({ onlyValues: true }), [2, 2, 2])
  }

  @Test()
  public async shouldBeAbleToMapTheDoublyLinkedListValuesRunningAClosureWithoutChangingItStateStartingFromTail({
    assert
  }: Context) {
    const doublyLinkedList = new DoublyLinkedList<number>()

    const newLinkedList = doublyLinkedList
      .append(1)
      .append(1)
      .append(1)
      .map(node => node.value + 1, 'end')

    assert.deepEqual(doublyLinkedList.toArray({ onlyValues: true }), [1, 1, 1])
    assert.deepEqual(newLinkedList.toArray({ onlyValues: true }), [2, 2, 2])
  }

  @Test()
  public async shouldBeAbleToFindAValueInTheDoublyLinkedListRunningAClosureStartingFromHead({ assert }: Context) {
    const doublyLinkedList = new DoublyLinkedList<number>()

    doublyLinkedList.append(1).append(2).append(3)

    const node = doublyLinkedList.find(node => node.value === 3)

    assert.deepEqual(node?.value, 3)
    assert.isUndefined(doublyLinkedList.find(node => node.value === 4))
  }

  @Test()
  public async shouldBeAbleToFindAValueInTheDoublyLinkedListRunningAClosureStartingFromTail({ assert }: Context) {
    const doublyLinkedList = new DoublyLinkedList<number>()

    doublyLinkedList.append(1).append(2).append(3)

    const node = doublyLinkedList.find(node => node.value === 3, 'end')

    assert.deepEqual(node?.value, 3)
    assert.isUndefined(doublyLinkedList.find(node => node.value === 4))
  }

  @Test()
  public async shouldBeAbleToSetValuesInSpecificIndexesOfTheDoublyLinkedList({ assert }: Context) {
    const doublyLinkedList = new DoublyLinkedList<number>().append(1).append(3)

    doublyLinkedList.set(1, 2)
    doublyLinkedList.set(4, 3)
    doublyLinkedList.set(2, 3)
    doublyLinkedList.set(0, 1)
    doublyLinkedList.set(9999, 4)
    doublyLinkedList.set(99999, 5)

    const middleNode = doublyLinkedList.get(2)

    assert.deepEqual(middleNode.value, 3)
    assert.deepEqual(middleNode.previous.value, 2)
    assert.deepEqual(middleNode.next.value, 4)

    assert.deepEqual(doublyLinkedList.toArray({ onlyValues: true }), [1, 2, 3, 4, 5])
  }

  @Test()
  public async shouldBeAbleToGetValuesInSpecificIndexesOfTheDoublyLinkedList({ assert }: Context) {
    const doublyLinkedList = new DoublyLinkedList<number>().append(1).append(3)

    doublyLinkedList.set(1, 2)
    doublyLinkedList.set(4, 3)
    doublyLinkedList.set(2, 3)
    doublyLinkedList.set(0, 1)
    doublyLinkedList.set(9999, 4)
    doublyLinkedList.set(99999, 5)

    assert.deepEqual(doublyLinkedList.get(0)?.value, 1)
    assert.deepEqual(doublyLinkedList.get(1)?.value, 2)
    assert.deepEqual(doublyLinkedList.get(2)?.value, 3)
    assert.deepEqual(doublyLinkedList.get(3)?.value, 4)
    assert.deepEqual(doublyLinkedList.get(4)?.value, 5)
    assert.isUndefined(doublyLinkedList.get(5))
  }

  @Test()
  public async shouldBeAbleToDeleteNodesFromTheDoublyLinkedListByIndex({ assert }: Context) {
    const doublyLinkedList = new DoublyLinkedList<number>()

    doublyLinkedList.append(1)
    doublyLinkedList.append(2)
    doublyLinkedList.append(3)

    assert.deepEqual(doublyLinkedList.get(1).value, 2)
    assert.deepEqual(doublyLinkedList.get(1).next.value, 3)
    assert.deepEqual(doublyLinkedList.get(1).previous.value, 1)
    assert.deepEqual(doublyLinkedList.toArray({ onlyValues: true }), [1, 2, 3])

    doublyLinkedList.delete(1)

    assert.isUndefined(doublyLinkedList.get(1).next)
    assert.deepEqual(doublyLinkedList.get(1).value, 3)
    assert.deepEqual(doublyLinkedList.get(1).previous.value, 1)
    assert.deepEqual(doublyLinkedList.toArray({ onlyValues: true }), [1, 3])

    doublyLinkedList.delete(1)

    assert.deepEqual(doublyLinkedList.get(0).value, 1)
    assert.isUndefined(doublyLinkedList.get(0).next)
    assert.isUndefined(doublyLinkedList.get(0).previous)
    assert.deepEqual(doublyLinkedList.toArray({ onlyValues: true }), [1])

    doublyLinkedList.delete(0)

    assert.deepEqual(doublyLinkedList.toArray({ onlyValues: true }), [])

    doublyLinkedList.delete(9999)

    assert.deepEqual(doublyLinkedList.toArray({ onlyValues: true }), [])
  }

  @Test()
  public async shouldBeAbleToCheckTheSizeOfTheDoublyLinkedList({ assert }: Context) {
    const doublyLinkedList = new DoublyLinkedList<number>().append(1).append(3)

    assert.deepEqual(doublyLinkedList.size(), 2)

    doublyLinkedList.set(1, 2)
    doublyLinkedList.set(4, 4)
    doublyLinkedList.set(0, 4)
    doublyLinkedList.set(9999, 4)
    doublyLinkedList.set(3, 5)

    assert.deepEqual(doublyLinkedList.size(), 4)
  }

  @Test()
  public async shouldBeAbleToReverseTheDoublyLinkedListStartingFromHead({ assert }: Context) {
    const doublyLinkedList = new DoublyLinkedList<number>().append(1).append(2).append(3)
    const reversedLinkedList = doublyLinkedList.reverse()

    assert.deepEqual(reversedLinkedList.toArray({ onlyValues: true }), [3, 2, 1])
  }

  @Test()
  public async shouldBeAbleToReverseTheDoublyLinkedListStartingFromTail({ assert }: Context) {
    const doublyLinkedList = new DoublyLinkedList<number>().append(1).append(2).append(3)
    const reversedLinkedList = doublyLinkedList.reverse('end')

    assert.deepEqual(reversedLinkedList.toArray({ onlyValues: true }), [1, 2, 3])
  }
}
