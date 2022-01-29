// 206
// 给你单链表的头节点 head ，请你反转链表，并返回反转后的链表。
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var reverseList = function (head) {
  let prev = null
  let current = head
  while (current) {
    let next = current.next
    current.next = prev
    prev = current
    current = next
  }
  return prev
}
console.log(reverseList({ ele: 1, next: { ele: 2, next: null } }))
