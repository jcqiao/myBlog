var MyStack = function () {
  this.q1 = []
  this.q2 = []
}

/**
 * @param {number} x
 * @return {void}
 */
MyStack.prototype.push = function (x) {
  this.q1.push(x)
}

/**
 * @return {number}
 */
MyStack.prototype.pop = function () {
  if (!this.q1.length) {
    this.q1 = [...this.q2]
    this.q2 = []
  }
  while (this.q1.length > 1) {
    this.q2.push(this.q1.shift())
  }

  return this.q1.shift()
}

/**
 * @return {number}
 */
MyStack.prototype.top = function () {
  if (!this.q1.length) {
    this.q1 = [...this.q2]
    this.q2 = []
  }
  while (this.q1.length > 1) {
    this.q2.push(this.q1.shift())
  }
  return this.q1[0]
}

/**
 * @return {boolean}
 */
MyStack.prototype.empty = function () {
  return this.q1.length === 0 && this.q2.length === 0
}
/**
 * Your MyStack object will be instantiated and called as such:
 * var obj = new MyStack()
 * obj.push(x)
 * var param_2 = obj.pop()
 * var param_3 = obj.top()
 * var param_4 = obj.empty()
 */

let myStack = new MyStack()
myStack.push(1)
myStack.push(2)
myStack.push(3)
console.log(myStack.pop()) // 返回 2
console.log(myStack.pop()) // 返回 2
console.log(myStack.pop()) // 返回 2
console.log(myStack.top()) // 2
// console.log(myStack.empty()) // 返回 False
