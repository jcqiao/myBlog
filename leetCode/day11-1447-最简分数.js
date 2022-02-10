/**
 * @param {number} n
 * @return {string[]}
 */
var simplifiedFractions = function (n) {
  let arr = []
  if (n === 1) {
    return arr
  }
  for (let i = 1; i < n; i++) {
    for (let j = 2; j <= n; j++) {
      if (j > i && gcd(i, j) === 1) {
        arr.push(`${i}/${j}`)
      }
    }
  }
  return arr
}
// 辗转相除发求最大公约数
const gcd = (a, b) => {
  if (b === 0) {
    return a
  }
  return gcd(b, a % b)
}
// 最小公倍数
function scm(a, b) {
  return (a * b) / gcd(a, b)
}
console.log(simplifiedFractions(6))
