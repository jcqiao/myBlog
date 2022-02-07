/**
 * @param {number[]} nums
 * @return {number}
 */
var sumOfUnique = function (nums) {
  const map = new Map()
  nums.forEach((item) => {
    if (map.has(item)) {
      map.set(item, map.get(item) + 1)
    } else {
      map.set(item, 0)
    }
  })
  console.log(1, map)
  let sum = 0
  map.forEach((v, k) => {
    if (v < 1) {
      sum += k
    }
  })
  return sum
}

var sumOfUnique2 = function (nums) {
  let ans = 0
  const state = new Map()
  for (const num of nums) {
    if (!state.has(num)) {
      ans += num
      state.set(num, 1)
    } else if (state.get(num) === 1) {
      ans -= num
      state.set(num, 2)
    }
  }
  return ans
}

console.log(sumOfUnique([1, 2, 3, 2]))
// 链接：https://leetcode-cn.com/problems/sum-of-unique-elements/solution/wei-yi-yuan-su-de-he-by-leetcode-solutio-tueh/
