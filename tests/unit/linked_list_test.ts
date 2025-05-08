import { LinkedList } from '#src/linked_list'
import { Test, type Context } from '@athenna/test'

export default class LinkedListTest {
  @Test()
  public async shouldBeAbleToAppendValuesToTheLinkedList({ assert }: Context) {
    const linkedList = new LinkedList<number>()

    linkedList.append(1)
    linkedList.append(2)
    linkedList.append(3).append(4)

    assert.deepEqual(linkedList.toArray({ onlyValues: true }), [1, 2, 3, 4])
  }

  @Test()
  public async shouldBeAbleToPrependValuesToTheLinkedList({ assert }: Context) {
    const linkedList = new LinkedList<number>()

    linkedList.prepend(1)
    linkedList.prepend(2)
    linkedList.prepend(3).prepend(4)

    assert.deepEqual(linkedList.toArray({ onlyValues: true }), [4, 3, 2, 1])
  }

  @Test()
  public async shouldBeAbleToValidateThatLinkedListContainsValue({ assert }: Context) {
    const linkedList = new LinkedList<number>()

    linkedList.append(1)

    assert.isTrue(linkedList.contains(1))
    assert.isFalse(linkedList.contains(2))
  }

  @Test()
  public async shouldBeAbleToDeleteNodesFromTheLinkedListByIndex({ assert }: Context) {
    const linkedList = new LinkedList<number>()

    linkedList.append(1)
    linkedList.append(2)
    linkedList.append(3)

    assert.deepEqual(linkedList.get(1).value, 2)
    assert.deepEqual(linkedList.get(1).next.value, 3)
    assert.deepEqual(linkedList.toArray({ onlyValues: true }), [1, 2, 3])

    linkedList.delete(1)

    assert.isUndefined(linkedList.get(1).next)
    assert.deepEqual(linkedList.get(1).value, 3)
    assert.deepEqual(linkedList.toArray({ onlyValues: true }), [1, 3])

    linkedList.delete(1)

    assert.deepEqual(linkedList.get(0).value, 1)
    assert.isUndefined(linkedList.get(0).next)
    assert.deepEqual(linkedList.toArray({ onlyValues: true }), [1])

    linkedList.delete(0)

    assert.deepEqual(linkedList.toArray({ onlyValues: true }), [])

    linkedList.delete(9999)

    assert.deepEqual(linkedList.toArray({ onlyValues: true }), [])
  }

  @Test()
  public async shouldBeAbleToTraverseTheLinkedListRunningAClosure({ assert }: Context) {
    const linkedList = new LinkedList<number>()

    let count = 0

    linkedList
      .append(1)
      .append(1)
      .append(1)
      .traverse(node => (count += node.value))

    assert.deepEqual(count, 3)
  }

  @Test()
  public async shouldBeAbleToTraverseTheLinkedListRunningAClosureChangingItState({ assert }: Context) {
    const linkedList = new LinkedList<number>()

    linkedList
      .append(1)
      .append(1)
      .append(1)
      .traverse(node => node.value++)

    assert.deepEqual(linkedList.toArray({ onlyValues: true }), [2, 2, 2])
  }

  @Test()
  public async shouldBeAbleToMapTheLinkedListValuesRunningAClosure({ assert }: Context) {
    const linkedList = new LinkedList<number>()

    let count = 0

    linkedList
      .append(1)
      .append(1)
      .append(1)
      .map(node => (count += node.value))

    assert.deepEqual(count, 3)
  }

  @Test()
  public async shouldBeAbleToMapTheLinkedListValuesRunningAClosureWithoutChangingItState({ assert }: Context) {
    const linkedList = new LinkedList<number>()

    const newLinkedList = linkedList
      .append(1)
      .append(1)
      .append(1)
      .map(node => node.value + 1)

    assert.deepEqual(linkedList.toArray({ onlyValues: true }), [1, 1, 1])
    assert.deepEqual(newLinkedList.toArray({ onlyValues: true }), [2, 2, 2])
  }

  @Test()
  public async shouldBeAbleToFindAValueInTheLinkedListRunningAClosure({ assert }: Context) {
    const linkedList = new LinkedList<number>()

    linkedList.append(1).append(2).append(3)

    const node = linkedList.find(node => node.value === 3)

    assert.deepEqual(node?.value, 3)
    assert.isUndefined(linkedList.find(node => node.value === 4))
  }

  @Test()
  public async shouldBeAbleToSetValuesInSpecificIndexesOfTheLinkedList({ assert }: Context) {
    const linkedList = new LinkedList<number>().append(1).append(3)

    linkedList.set(1, 2)
    linkedList.set(4, 3)
    linkedList.set(2, 3)
    linkedList.set(0, 1)
    linkedList.set(9999, 4)
    linkedList.set(99999, 5)

    assert.deepEqual(linkedList.toArray({ onlyValues: true }), [1, 2, 3, 4, 5])
  }

  @Test()
  public async shouldBeAbleToGetValuesInSpecificIndexesOfTheLinkedList({ assert }: Context) {
    const linkedList = new LinkedList<number>().append(1).append(3)

    linkedList.set(1, 2)
    linkedList.set(4, 3)
    linkedList.set(2, 3)
    linkedList.set(0, 1)
    linkedList.set(9999, 4)
    linkedList.set(99999, 5)

    assert.deepEqual(linkedList.get(0)?.value, 1)
    assert.deepEqual(linkedList.get(1)?.value, 2)
    assert.deepEqual(linkedList.get(2)?.value, 3)
    assert.deepEqual(linkedList.get(3)?.value, 4)
    assert.deepEqual(linkedList.get(4)?.value, 5)
    assert.isUndefined(linkedList.get(5))
  }

  @Test()
  public async shouldBeAbleToCheckTheSizeOfTheLinkedList({ assert }: Context) {
    const linkedList = new LinkedList<number>().append(1).append(3)

    assert.deepEqual(linkedList.size(), 2)

    linkedList.set(1, 2)
    linkedList.set(4, 4)
    linkedList.set(0, 4)
    linkedList.set(9999, 4)
    linkedList.set(3, 5)

    assert.deepEqual(linkedList.size(), 4)
  }

  @Test()
  public async shouldBeAbleToReverseTheLinkedList({ assert }: Context) {
    const linkedList = new LinkedList<number>().append(1).append(2).append(3)
    const reversedLinkedList = linkedList.reverse()

    assert.deepEqual(reversedLinkedList.toArray({ onlyValues: true }), [3, 2, 1])
  }
}
