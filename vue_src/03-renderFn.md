# render函数

## 什么时候调用render函数

- 初步了解：
- new Vue(options)时在_init函数初始化中调用了initRender函数
  1. options未定义render函数，需要编译成render函数，在编译过程中，使用$mount将数据渲染到视图上,$mount未实现时网页中显示的是{{msg}},一旦$mount完成后{{msg}}才会被替换掉
  2. options中定义render函数，直接调用_initRender函数

``` javascript
  export function initMixin (Vue: Class<Component>) {
    Vue.prototype._init = function (options?: Object) {
      const vm: Component = this
      ...
      vm._self = vm
      initLifecycle(vm)
      initEvents(vm)
      initRender(vm)
      callHook(vm, 'beforeCreate')
      initInjections(vm) // resolve injections before data/props
      initState(vm)
      initProvide(vm) // resolve provide after data/props
      callHook(vm, 'created')
```

## 正式开始

- _render返回vnode(render可手写),拿到options中的render.call(vm._renderProxy, vm.$createElement)
- vm._renderProxy在生产环境中就是this,vm实例；在开发环境中是proxy对象(ES6).Proxy 可以理解成，在目标对象之前架设一层“拦截”，外界对该对象的访问，都必须先通过这层拦截，因此提供了一种机制，可以对外界的访问进行过滤和改写。Proxy 这个词的原意是代理，用在这里表示由它来“代理”某些操作，可以译为“代理器”.

``` javascript
// core/instance/render.js
  Vue.prototype._render = function (): VNode {
    const vm: Component = this
    const { render, _parentVnode } = vm.$options
    ...
    vnode = render.call(vm._renderProxy, vm.$createElement)
    return vnode
```

- initRender函数
  1. return vnode虚拟node
  2. 这里有两个函数都是使用了createElement
    - vm._c 是编译生成render函数所使用的的方法
    - vm.$createElement是手写的render函数，定义在initRender中(同一文件下)，initRender在_init(new Vue)初始化initRender过程中执行

``` javascript
  export function initRender (vm: Component) {
    vm._c = (a, b, c, d) => createElement(vm, a, b, c, d, false)
    vm.$createElement = (a, b, c, d) => createElement(vm, a, b, c, d, true)
  }
```

- 手写render函数

``` javascript
  new Vue({
    el:'#app',
    render(createElement){
      return createElement('div',{
        attr: {
          id: 'app'
        }
      }, this.msg)
    },
    data(){
      return {
        msg: 'hi'
      }
    }
  })
```

- Vue.prototype._render中 render.call(vm._renderProxy, vm.$createElement),对应上面例子,vm.$createElement就是createElement; vm.$createElement = (a, b, c, d) => createElement(vm, a, b, c, d, true): a=>'div'; b:{attr:{}};c=>this.msg;
- return vnode: vnode = render.call(vm._renderProxy, vm.$createElement)

``` javascript
  export function createElement (
    context: Component,
    tag: any,
    data: any,
    children: any,
    normalizationType: any,
    alwaysNormalize: boolean
  ): VNode | Array<VNode> {
    return vnode
```

- 可以看出a: tag/div; b:data{attr}; c: childen(this.msg); 运行起来直接显示**hi** 没有插值变化过程；之前写的插值在html上，当不执行vue时直接显示{{msg}}，当new Vue $mount实现后才将插值替换掉；所以直接用render函数，当render函数完成后将c:childern渲染到html中。因为手写render，所以不需要将template/el转为render函数；render函数出来的dom是直接替换el关联的dom，所以el关联的不能是body，否则body会被替换，dom结构不对。

``` javascript
// src/core/instance/init.js
   if (process.env.NODE_ENV !== 'production') {
      initProxy(vm)
    } else {
      vm._renderProxy = vm
    }
```

- 再看render.call(vm._renderProxy, vm.$createElement)第一个参数
- vm._renderProxy定义在src/core/instance/init.js中 首先做了一次判断:生产环境就将vm/this给vm._renderProxy(还记得之前说过吗)，开发环境下：initProxy(vm)

- 看下initProxy
- src/core/instance/proxy.js

``` javascript
  initProxy = function initProxy (vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      const options = vm.$options
      const handlers = options.render && options.render._withStripped
        ? getHandler
        : hasHandler
      vm._renderProxy = new Proxy(vm, handlers)
    } else {
      vm._renderProxy = vm
    }
  }
}
```

- 支持proxy 当访问vm._renderProxy时做拦截调用handlers函数
- 在我们这个例子下options:render无_withStripped，所以handlers= hasHandler

- 看hasHandler做了什么

``` javascript
    const hasHandler = {
    has (target, key) {
      const has = key in target
      const isAllowed = allowedGlobals(key) ||
        (typeof key === 'string' && key.charAt(0) === '_' && !(key in target.$data))
      if (!has && !isAllowed) {
        if (key in target.$data) warnReservedPrefix(target, key)
        else warnNonPresent(target, key)
      }
      return has || !isAllowed
    }
  }
```

- 首先做了一次判断has = key in targe 判断该属性是否在data/props/methods下
- isAllowed判断属性是不是全局属性和方法
- 否则warnNonPresent会报该属性未在xxx定义,这个错在生产环境下看不到

``` javascript
    const warnNonPresent = (target, key) => {
    warn(
      `Property or method "${key}" is not defined on the instance but ` +
      'referenced during render. Make sure that this property is reactive, ' +
      'either in the data option, or for class-based components, by ' +
      'initializing the property. ' +
      'See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.',
      target
    )
  }
```

- 回到render方法，实际上是在生成vnode过程中出错就报错
