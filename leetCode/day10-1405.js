// 贪心算法
// 尽可能优先使用当前数量最多的字母，因为最后同一种字母剩余的越多，越容易出现字母连续相同的情况。如果构建完成最长的快乐字符串后还存在剩余未选择的字母，则剩余的字母一定为同一种字母且该字母的总数量最多。
// 依次从当前数量最多的字母开始尝试，如果发现加入当前字母会导致出现三个连续相同字母，则跳过当前字母，直到我们找到可以添加的字母为止。实际上每次只会在数量最多和次多的字母中选择一个。
// 如果尝试所有的字母都无法添加，则直接退出，此时构成的字符串即为最长的快乐字符串。

// 链接：https://leetcode-cn.com/problems/longest-happy-string/solution/zui-chang-kuai-le-zi-fu-chuan-by-leetcod-5nde/

/**
 * @param {number} a
 * @param {number} b
 * @param {number} c
 * @return {string}
 */
var longestDiverseString = function (a, b, c) {
  const res = []
  const arr = [
    [a, 'a'],
    [b, 'b'],
    [c, 'c'],
  ]

  // 每次都对arr排序
  while (true) {
    arr.sort((a, b) => b[0] - a[0])
    // 控制while循环什么时候结束
    let hasNext = false
    for (const [i, [c, ch]] of arr.entries()) {
      // 遇到=0的就说明本次循环已结束 找到最长字符串
      if (c <= 0) {
        break
      }
      const len = res.length
      // 若长度>=2且最后两个都是相同字符那么就跳过此次循环继续循环
      if (len >= 2 && res[len - 2] === ch && res[len - 1] === ch) {
        continue
      }
      // while循环不能结束 因为c还没有=0的情况
      hasNext = true
      res.push(ch)
      arr[i][0]--
      // 这里不用continue是为了保证不会有剩余未被遍历的
      break
    }
    if (!hasNext) {
      break
    }
  }
  return res.join('')
}
longestDiverseString(1, 1, 7)
