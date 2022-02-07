var isValid = function (s) {
  const map = new Map([
    [')', '('],
    [']', '['],
    ['}', '{'],
  ])
  const stk = []
  for (let ch of s) {
    if (!map.has(ch)) {
      stk.push(ch)
    } else {
      if (!stk.length || stk.pop() !== map.get(ch)) {
        return false
      }
    }
  }
  return !stk.length
}
console.log(isValid('{()}'))
