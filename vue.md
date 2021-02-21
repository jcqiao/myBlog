# what is VUE?

## vue是构建用户界面的渐进式框架

  What's progressive framework?
  progressive:一步一步的，需要用哪个就用哪个

  ![avatar](https://raw.githubusercontent.com/jcqiao/myBlog/gh-pages/images/declareRender.jpg)

- 声明式渲染
  - 函数与状态的映射。组件在编译时，将实际的DOM操作封装给vue的render函数，让render函数创建虚拟DOM，render函数执行完成后，patch函数会将虚拟DOM添加到真正的DOM上。当数据发生改变时，对应组件再次编译成render函数-》虚拟DOM--patch--》DOM。

  - 为什么要这么做？因为使用js api调用原生dom时会有相当大的损耗，js运行很快，但dom运行很慢，当你用原生dom api的时候，浏览器在js引擎环境下操作dom，当操作的dom多了，这个过程有损耗(经常渲染视图)。而用声明式渲染，是将dom放在render函数中去生成虚拟dom，render函数调用完会将整个虚拟dom挂到真正的dom上，而不用执行一次dom操作就挂在真正的dom上(命令式渲染)。

  ![avatar](https://raw.githubusercontent.com/jcqiao/myBlog/gh-pages/images/declareRender2.png)

  - 继续说说当状态改变render函数如何重新渲染视图
    首先什么是render函数:比如左侧的模板，经过vue编译如上图(compile)后变成右侧render函数

    ![avatar](https://raw.githubusercontent.com/jcqiao/myBlog/gh-pages/images/renderFn.png)

      当编译模板成render函数：**vue响应式系统**
      1. 模板用到的属性会调用getter函数，并将属性保存在watch中
      2. render函数完成后patch函数将虚拟dom挂在真正的dom中，每个属性都会被保存起来
      3. 属性被修改时调用setter函数，通知数据对象数据发生改变
      4. 通知含有该属性的组件，需要重新渲染
      5. 对应组件再次调用render函数生成虚拟dom树 挂到真正的dom上

      ![avatar](https://raw.githubusercontent.com/jcqiao/myBlog/gh-pages/images/traceSystem.jpg)

  - 组件系统

    就是UI --> Components的映射。它是由小型、独立和可重用的组件构成一个大型应用。
    在vue中，组件就是一个vue实例，拥有预定义选项的vue实例

    ![avatar](https://raw.githubusercontent.com/jcqiao/myBlog/gh-pages/images/UIComponent.png)

    - 父子间的通信
      父--》子 props 子--》父 $emit
    - vue组件引入“构建工具”后有一个**单文件组件**概念
      单文件组件与web component的本质区别在于单文件组件基于构建工具生成。这样的好处是有了一个构建的机会，可以对这些单文件组件做更多的分析，在每一个语言块里可以单独使用不同的处理器，这点后面还会讲到。

  - 客户端路由

  - 本质：url --> component映射
    当一个页面有多个状态时，显然不能只刷新一次页面就将所有状态显示给用户。而是将多个状态放在不同路径下供用户访问。

    ![avatar](https://raw.githubusercontent.com/jcqiao/myBlog/gh-pages/images/router.png)
    若要自己实现一个这样的路由，看上去倒是很简单，用hash去模拟一下，就可以自己很快地做出很简单的路由。但事实上，客户端路由涉及很多更复杂的问题，如下表所示。

    | 1 | 2 |
    |  ----  | ----  |
    | 嵌套路由 | 重定向/别名 |
    | 具名路由 | 跳转动画 |
    | 多个平级路由出口 | 异步数据处理 |
    | 复杂匹配规则 | 跳转规则限制 |
    | 当前活跃链接 | 滚动条行为 |
    | | 懒加载 |

    可能同一层的路由有多个不同的出口，还有着复杂的URL匹配规则，等等。可以借助vue-router实现
    配合Webpack还可以实现基于路由的懒加载，一条路径所对应的组件在打包的时候，会分离成另外一块，只有当该路由被访问的时候，才会被加载出来。

## 为什么会出现vue

  1. vue只关注视图层，响应式。状态(数据)驱动视图，视图更新数据。
    传统用Js操作dom过于频繁，每次都会更新dom结构，即使出现jquery对js封装再操作dom，在大型网页上，视图和数据就会形成高度耦合，可能一个dom控制很多数据或一个数据被很多dom使用，可能会很卡。因此像vue这种声明式渲染，利用虚拟dom将每次需要更新的地方进行对比，将需要更改的地方挂到真正的dom上，提高性能。
  2. 组件开发
  3. 虚拟dom
    只关心结果 不关心操作
