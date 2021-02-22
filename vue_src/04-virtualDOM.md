# virtual DOM

## 真实dom

- 真实dom是非常庞大的

``` javascript
  div = document.querySelector('div')
  for(key in div){str += key + ''}
```

**01pic**

![avatar](https://raw.githubusercontent.com/jcqiao/myBlog/gh-pages/vue_src/imgs/01.png)

- 可以看出dom是非常庞大的，所以原生js/jquery操作dom是会影响性能的
- 而virtual dom是原生js用来 **描述** dom的，注意是 **描述** 只需要使用需要的属性即可。所以要比 **创建** 一个dom代价要少的多
- 在vue中virtual dom是定义了一个vnode类实现的
- /src/core/vdom/vnode.js

``` javascript
  export default class VNode {
  tag: string | void;
  data: VNodeData | void;
  children: ?Array<VNode>;
  text: string | void;
  elm: Node | void;
  ns: string | void;
  context: Component | void; // rendered in this component's scope
  key: string | number | void;
  componentOptions: VNodeComponentOptions | void;
  componentInstance: Component | void; // component instance
  parent: VNode | void; // component placeholder node

  // strictly internal
  raw: boolean; // contains raw HTML? (server only)
  isStatic: boolean; // hoisted static node
  isRootInsert: boolean; // necessary for enter transition check
  isComment: boolean; // empty comment placeholder?
  isCloned: boolean; // is a cloned node?
  isOnce: boolean; // is a v-once node?
  asyncFactory: Function | void; // async component factory function
  asyncMeta: Object | void;
  isAsyncPlaceholder: boolean;
  ssrContext: Object | void;
  fnContext: Component | void; // real context vm for functional nodes
  fnOptions: ?ComponentOptions; // for SSR caching
  devtoolsMeta: ?Object; // used to store functional render context for devtools
  fnScopeId: ?string; // functional scope id support

  constructor (
    tag?: string,
    data?: VNodeData,
    children?: ?Array<VNode>,
    text?: string,
    elm?: Node,
    context?: Component,
    componentOptions?: VNodeComponentOptions,
    asyncFactory?: Function
  )
```

- 上半部分是常用的属性比如tag,data,children...
- 下半部分则是vue内置的一些属性
- 选择需要的属性传入 这确实比创建dom要轻很多

## 总结

- vnode就是dom的一个抽象表达，核心就是tag,data,children...其他都是用来扩展vnode。在vuejs中create vnode实际上是在createElement中实现的。(render函数创建的过程中生成虚拟dom => vnode, $mount方法将vnode挂到真实dom，在这个过程中不关心是否操作dom).
- 在vnode 到 真正的dom 是经历了 create -> diff -> patch 等过程
- 在renderFn中简要的介绍了createElement下章将详细介绍
