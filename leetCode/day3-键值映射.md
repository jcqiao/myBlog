# 题目描述

  ## 实现一个 MapSum 类，支持两个方法，insert 和 sum：

     - MapSum() 初始化 MapSum 对象
     - void insert(String key, int val) 插入 key-val 键值对，字符串表示键 key ，整数表示值 val 。如果键 key 已经存在，那么原来的键值对将被替代成新的键值对。
     - int sum(string prefix) 返回所有以该前缀 prefix 开头的键 key 的值的总和。

  ## 来源：力扣（LeetCode）
     链接：https://leetcode-cn.com/problems/map-sum-pairs 
     著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
  
  ## 解题思路
  
  ### 注【1】中使用了es6语法 startsWith: 返回布尔值，表示参数字符串是否在字符串头部
  ### 也可以用indexOf === 0 但indexOf要遍历所有字符，所以字符串很长就会慢
  
  
 ``` javascript
  var MapSum = function() {
    this.map = new Map()
  };

/** 
 * @param {string} key 
 * @param {number} val
 * @return {void}
 */
  MapSum.prototype.insert = function(key, val) {
      if(this.map.has(key) && this.map.get(key) === val) {
          return;
      }
      this.map.set(key, val)
  };

  /** 
   * @param {string} prefix
   * @return {number}
   */
  MapSum.prototype.sum = function(prefix) {
      let sum = 0;
      for(let key of this.map.keys()) {
          if(key.startsWith(prefix)) {  //注「1」
              sum += this.map.get(key)
          }
      }
      return sum;
  };

/**
 * Your MapSum object will be instantiated and called as such:
 * var obj = new MapSum()
 * obj.insert(key,val)
 * var param_2 = obj.sum(prefix)
 */
 ```
