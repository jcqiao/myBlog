// 使用双栈方法 一进s1 一出s2

var MyQueue = function () {
  this.s1 = []
  this.s2 = []
}

/**
 * @param {number} x
 * @return {void}
 */
MyQueue.prototype.push = function (x) {
  this.s1.push(x)
}

/**
 * @return {number}
 */
MyQueue.prototype.pop = function () {
  // s2不为空时直接pop s2 s2为空时若s1有值就压入s2 然后pop s2
  if (!this.s2.length) {
    while (this.s1.length > 0) {
      this.s2.push(this.s1.pop())
    }
  }
  return this.s2.pop()
}

/**
 * @return {number}
 */
MyQueue.prototype.peek = function () {
  if (!this.s2.length) {
    while (this.s1.length > 0) {
      this.s2.push(this.s1.pop())
    }
  }
  return this.s2[this.s2.length - 1]
}

/**
 * @return {boolean}
 */
MyQueue.prototype.empty = function () {
  while (this.s1.length > 0) {
    this.s2.push(this.s1.pop())
  }
  return !this.s2.length
}

/**
 * Your MyQueue object will be instantiated and called as such:
 * var obj = new MyQueue()
 * obj.push(x)
 * var param_2 = obj.pop()
 * var param_3 = obj.peek()
 * var param_4 = obj.empty()
 */
