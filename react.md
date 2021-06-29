# react是什么
1. react是构建用户界面的js库 不是框架
2. 使用组件快速响应大型的web应用
3. 如何工作的
	3.1 声明式jsx实现 相对于命令式
	3.2 组件化：复用
	3.3 一次学习 随处编写 跨端开发 virtual dom实现
4. 优点
	1. 一次学习 随处编写
	2. virtual dom提高渲染效率
	3. api 简洁
5. 缺点
	1. 没有官方的解决方案 redux router都是第三方 vue有官方的vuex

# React为什么引入jsx
1. jsx js XML 形式上类似html 很好的描写视图构建
2. jsx 是 React.CreateElement的语法糖 

``` javascript
// html           jsx
  <h1 id="t">hello</h1> React.createElement("h1", {id:"t"}, "hello")
```
3. 目的 
  1. 实现声明式
  2. 结构清晰
  3. 不需要学习新的语法 只写Js
4. 为什么选jsx
  1. jsx vs 模板语法
  2. jsx类似html 模板语法如vue v-on需要学习新的方法
  3. api简单

# JSX工作原理

1. 形成AST抽象语法树
  1. 是源代码语法结构的抽象表示

# Virtual DOM的理解

1. 是什么
  是描述真实dom的纯js对象，是React.createElement()返回的对象
  刚刚说了jsx可以实现virtual dom React.createElement也可以实现
2. jsx vs React.createElement

```javascript
  const vDOMJSX = (                            const vDOMCreateElement = React.createElement(div, {id:"container"},
    <div id="container">                                  React.createElement(div, {id:"a"},a,React.createElement(div, {id:"b"},b)))
      <div id="a">a</div>
      <div id="b">b</div>
    </div>
  )
  //vDOMJSX 等价于 vDOMCreateElement
  
```
