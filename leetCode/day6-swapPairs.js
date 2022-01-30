// [1,2,3,4]
// [2,1,4,3]
// 题解：[1,2, | 3, 4]

/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var swapPairs = function (head) {
  if (!head || !head.next) {
    return head
  }
  let newHead = head.next
  head.next = swapPairs(newHead.next)
  newHead.next = head
  return newHead
}

var swapPairs2 = function (head) {
  if (!head || !head.next) {
    return head
  }
  let one = head
  let two = one.next
  let three = two.next
  two.next = one
  one.next = swapPairs2(three)
  return two
}
