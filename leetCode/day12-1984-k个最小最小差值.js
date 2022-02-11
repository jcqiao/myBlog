// 解题思路
// 1. 排序
// 2. 循环：使用k个长度的滑动框分割数组 并返回最大值与最小值的差
// 3. 循环的终止条件是最后一个滑动框的起始位置
// 4. 例：10 5 3 2 1
// ![Screen Shot 2022-02-11 at 10.20.06 PM.png](https://pic.leetcode-cn.com/1644589211-HVNJJM-Screen%20Shot%202022-02-11%20at%2010.20.06%20PM.png)
// ![Screen Shot 2022-02-11 at 10.21.10 PM.png](https://pic.leetcode-cn.com/1644589289-kzQyrv-Screen%20Shot%202022-02-11%20at%2010.21.10%20PM.png)

// 链接：https://leetcode-cn.com/problems/minimum-difference-between-highest-and-lowest-of-k-scores/solution/xue-sheng-fen-shu-de-zui-xiao-chai-zhi-b-oodu/

// 代码

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var minimumDifference = function (nums, k) {
  nums.sort((a, b) => a - b)
  let ans = Number.MAX_SAFE_INTEGER
  for (let i = 0; i < nums.length - k + 1; i++) {
    ans = Math.min(ans, nums[i + k - 1] - nums[i])
  }
  return ans
}
