/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
// 龟兔赛跑
/**
 * @param {ListNode} head
 * @return {boolean}
 */
var hasCycle = function (head) {
  if (!head || !head.next) {
    return false
  }
  let slow = head
  let fast = head
  while (slow && fast && fast.next != null) {
    slow = slow.next
    fast = fast.next.next
    if (slow === fast) {
      return true
    }
  }
  return false
}
var hasCycle = function (head) {
  if (!head || !head.next) {
    return false
  }
  let slow = head
  let fast = head.next
  while (slow != fast) {
    if (!fast || !fast.next) {
      return false
    }
    slow = slow.next
    fast = fast.next.next
  }
  return true
}
