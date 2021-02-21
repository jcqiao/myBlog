# vue实例挂载

## 总结

- new vue过程中将实例挂载发生在Vue.prototype.$mount

1. 将el转为dom对象

  - el是dom对象 直接返回
  - el是String且第一个字符为'#',使用querySelector找到该dom返回；未找到就返回div dom

2. el不能是html/body会被覆盖导致html格式错误
3. if(render)
   1. y 调用未修改的原型mount 在mount中将el挂到真正的dom上
   2. n template? y charAt(0) === '#' 调用idToTemplate函数将ID为'app'的dom对象返回给template; dom? innerhtml返回给template. n 将el整个dom给template； 编译成render函数。再去挂载。

  挂载的过程
  实际上在new Watcher中实现 又称渲染watcher

## runtime + Compiler

- 入口：/src/platforms/web/entry-runtime-with-compiler.js
  1. 将原型上的$mount方法保存到mount方法上
  2. 重新定义原型$mount方法
- 为什么要重写？
- 实际上在runtime-only版本没有重写原型$mount 是为了给runtime-only复用，抽离出来的。

``` javascript
  // /src/platforms/web/entry-runtime-with-compiler.js
  const mount = Vue.prototype.$mount
  Vue.prototype.$mount = function (
    el?: string | Element,
    hydrating?: boolean
  ): Component {
    el = el && query(el)
```

- 继续看重写的mount函数，el可以是字符串也可以是dom对象。
- query函数是对el进行处理将el转为dom对象，若el是个字符串则用document.querySeletor()找到对应dom对象，若没找到返回一个div dom对象；若el是个dom对象就直接返回。

``` javascript
/**
 * Query an element selector if it's not an element already.
 */
export function query (el: string | Element): Element {
  if (typeof el === 'string') {
    const selected = document.querySelector(el)
    if (!selected) {
      process.env.NODE_ENV !== 'production' && warn(
        'Cannot find element: ' + el
      )
      return document.createElement('div')
    }
    return selected
  } else {
    return el
  }
}
```

- 继续看重写的mount函数
- 对el做了一层判断，若el是html/body是会被覆盖的，需要警告用户不能将el用作html/body

``` javascript
  /* istanbul ignore if */
  if (el === document.body || el === document.documentElement) {
    process.env.NODE_ENV !== 'production' && warn(
      `Do not mount Vue to <html> or <body> - mount to normal elements instead.`
    )
    return this
  }
```

- 此时判断options中是否有render函数(vue最终要的就是render函数)
- 无render()
  - 查看options中是否有template对象
    - 有template对象：是String?是：第一个字符是'#'?(template:'#app')是：调用idToTemplate函数将ID为'app'的dom对象返回给template
    - 有template对象：是String?否：是节点(dom 对象)吗？是：将节点的innerHTML返回给template
  - 无template对象
    - 有el？有：将整个el dom节点给template (<div id="app">{{msg}}</div>)
  - template最终是个字符串
  - 开始编译成render函数
  - return mount.call(this, el, hydrating)这个mount是一开始缓存的mount

``` javascript

  const options = this.$options
  // resolve template/el and convert to render function
  if (!options.render) {
    let template = options.template
    if (template) {
      if (typeof template === 'string') {
        if (template.charAt(0) === '#') {
          template = idToTemplate(template)
          /* istanbul ignore if */
          if (process.env.NODE_ENV !== 'production' && !template) {
            warn(
              `Template element not found or is empty: ${options.template}`,
              this
            )
          }
        }
      } else if (template.nodeType) {
        template = template.innerHTML
      } else {
        if (process.env.NODE_ENV !== 'production') {
          warn('invalid template option:' + template, this)
        }
        return this
      }
    } else if (el) {
      template = getOuterHTML(el)
    }
    if (template) {
      /* istanbul ignore if */
      if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
        mark('compile')
      }
   return mount.call(this, el, hydrating)
```

### 接下来分析缓存的mount函数

- mount函数中又对el进行判断 是因为在runtime-only版本中没对el进行处理
- 最后返回mountComponent函数。

``` javascript
  // public mount method
Vue.prototype.$mount = function (
  el?: string | Element,
  hydrating?: boolean
): Component {
  el = el && inBrowser ? query(el) : undefined
  return mountComponent(this, el, hydrating)
}
```

- 接下来看看mountComponent中发生了什么
  - 将el缓存
  - 若无render函数：有template且第一个字符不是'#' 或者 有el会报错：runtime-only无编译功能，无法将template/el编译成render函数

``` javascript
  export function mountComponent (
  vm: Component,
  el: ?Element,
  hydrating?: boolean
): Component {
  vm.$el = el
  if (!vm.$options.render) {
    vm.$options.render = createEmptyVNode
    if (process.env.NODE_ENV !== 'production') {
      /* istanbul ignore if */
      if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
        vm.$options.el || el) {
        warn(
          'You are using the runtime-only build of Vue where the template ' +
          'compiler is not available. Either pre-compile the templates into ' +
          'render functions, or use the compiler-included build.',
          vm
        )
      } else {
        warn(
          'Failed to mount component: template or render function not defined.',
          vm
        )
      }
    }
  }
  ...
   updateComponent = () => {
      vm._update(vm._render(), hydrating)
```

- 最后调用的是updateComponent中vm._update(vm._render(), hydrating)，vm._render生成虚拟dom
- updateComponent是怎么执行的？

``` javascript
 // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined
  new Watcher(vm, updateComponent, noop, {
    before () {
      if (vm._isMounted && !vm._isDestroyed) {
        callHook(vm, 'beforeUpdate')
      }
    }
  }, true /* isRenderWatcher */)
  hydrating = false
```

- watcher是**渲染watcher**与响应式渲染强相关 一种观察者模式 之后会详细讲解。

- new watcher后将传入的component挂到实例this.vm上,这里this具体指向可以往上找 或者打印出来
- 是渲染watcher吗？是就保存到vm_watcher中，再把this保存到vm_watchers中
- expOrFn是函数 就给当前函数的getter赋值
- this.getter.call(vm, vm)调用getter也就是传入的expOrFn也就是updateComponent，将虚拟dom挂到真实dom上

``` javascript
constructor (
    vm: Component,
    expOrFn: string | Function,
    cb: Function,
    options?: ?Object,
    isRenderWatcher?: boolean
  ) {
    this.vm = vm
    if (isRenderWatcher) {
      vm._watcher = this
    }
    vm._watchers.push(this)
    ...
     // parse expression for getter
    if (typeof expOrFn === 'function') {
      this.getter = expOrFn
    } else {
    ...
     /**
   * Evaluate the getter, and re-collect dependencies.
   */
  get () {
    pushTarget(this)
    let value
    const vm = this.vm
    try {
      value = this.getter.call(vm, vm)
    } catch (e) {
      if (this.user) {
        handleError(e, vm, `getter for watcher "${this.expression}"`)
      } else {
        throw e
      }
    } finally {
      // "touch" every property so they are all tracked as
      // dependencies for deep watching
      if (this.deep) {
        traverse(value)
      }
```
