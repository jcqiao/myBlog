// 输入：grid = [[0,6,0],[5,8,7],[0,9,0]]
// 输出：24
// 解释：
// [[0,6,0],
//  [5,8,7],
//  [0,9,0]]
// 一种收集最多黄金的路线是：9 -> 8 -> 7。

// 链接：https://leetcode-cn.com/problems/path-with-maximum-gold

// m * n 个网格点，只要grid[m][n] > 0就可以当做起点开采
// 记枚举起点为（i,j），从（i,j）作为起点进行递归+回溯
// 用digui(x, y, gold)函数(x, y)为坐标gold为当前所拥有的数量
// 1. gold += grid[x][y] 这里不用判断当前grid[x][y]为0在递归调用时判断
// 2. res = MATH.max(res, gold) res = 0
// 3. 因为题目规定每个网格只能走一次 第一步就已经对当前(x,y)进行递归了 所以暂时将grid[x][y]置零 递归完成后再恢复

/**
 * @param {number[][]} grid
 * @return {number}
 */
var getMaximumGold = function (grid) {
  // console.log(globalThis)
  globalThis.grid = grid
  globalThis.m = globalThis.grid.length
  globalThis.n = globalThis.grid[0].length
  globalThis.ans = 0
  globalThis.dirs = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ]

  const digui = function (x, y, gold) {
    gold += grid[x][y]
    globalThis.ans = Math.max(gold, ans)
    // 保存当前grid[x][y] 为避免下次递归多算一次 要清零
    const gridAns = grid[x][y]
    grid[x][y] = 0

    for (let d = 0; d < 4; d++) {
      let nx = x + globalThis.dirs[d][0]
      let ny = y + globalThis.dirs[d][1]
      // x, y位置上至少为1 才能开采 也就是说dirs最小是-1 nx ny最小是0
      if (nx >= 0 && nx < m && ny >= 0 && ny < n && grid[nx][ny] > 0) {
        digui(nx, ny, gold)
      }
    }
    grid[x][y] = gridAns
  }

  for (let i = 0; i < m; ++i) {
    for (let j = 0; j < n; ++j) {
      if (grid[i][j] != 0) {
        digui(i, j, 0)
      }
    }
  }
  return ans
}
console.log(
  getMaximumGold([
    [0, 6, 0],
    [5, 8, 7],
    [0, 9, 0],
  ])
)
