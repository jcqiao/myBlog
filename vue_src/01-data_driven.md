# 数据驱动 

- vue是数据驱动视图，修改数据视图就会更改。不像传统的js/jquery去操作dom来更新视图。我们所有的操作都是数据的修改，并没有直接操作dom，逻辑更清晰，简化代码量。
- 从上章源码分析中找到真正的vue定义在：src/core/instance/index.js中

``` javascript
  function Vue (options) {
  if (process.env.NODE_ENV !== 'production' &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword')
  }
  this._init(options)
}

initMixin(Vue)
stateMixin(Vue)
eventsMixin(Vue)
lifecycleMixin(Vue)
renderMixin(Vue)

export default Vue
```

- Vue是一个函数(构造函数)，下面几个mixin是想Vue原型上添加方法。在回到Vue函数中，调用了_init方法(来自initMixin)，进行了一堆的初始化操作，_init方法将传入的options进行合并挂到实例的$option上，就可以使用vm.$option.el/data访问。判断option中有没有el有的话就将el字符串挂到$mount上。

``` javascript
  export function initMixin (Vue: Class<Component>) {
     if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options)
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      )
    }
    ...
    
    if (vm.$options.el) {
      vm.$mount(vm.$options.el)
    }
  }
```

## 为什么定义在data中的数据可以通过this访问到？

``` javascript
  import vue from 'vue'
  
  const vm = new Vue({ //options
    el: 'app',
    mounted(){
      console.log(this.message) //hi
    },
    data(){
      return {
        message:'hi'
      }
    }
  })
```

- 可以看下new vue，_init()发生了什么
  
``` javascript
 export function initMixin (Vue: Class<Component>) {
    initLifecycle(vm)
    initEvents(vm)
    initRender(vm)
    callHook(vm, 'beforeCreate')
    initInjections(vm) // resolve injections before data/props
    initState(vm)
    initProvide(vm) // resolve provide after data/props
    callHook(vm, 'created')
 }
```

- 可以看出进行了一堆的初始化工作，如initState。
- initState中：先判断vm.options中是否有props,有就初始化Props；有没有method，有初始化；有没有data，有就初始化。
- 重点看下data:
  - 判断data是不是个函数，是的话调用getData(data,vm),getData中return data.call(vm, vm)就是将data中this指向vue实例vm,传入参数vm。此时回到调用处，将其赋值给当前data和**vm._data**，最后调用proxy(vm, `_data`, key)，proxy实际上只是对vm._data对象添加了getter,setter属性：当你访问vm.message实际上访问的是vm._data.message(还记得刚才的vm._data吗)；看下proxy代码访问this[key]被代理为this[sourcekey][key]。其实就是将vm中data代理到vm._data, **_data这种一般是私有属性，默认是不可以访问的，所以可以用vue提供的接口vm.data.message访问/this.message**
  
``` javascript
  function initData (vm: Component) {
  let data = vm.$options.data
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {}
    ...
    if (props && hasOwn(props, key)) {
      process.env.NODE_ENV !== 'production' && warn(
        `The data property "${key}" is already declared as a prop. ` +
        `Use prop default value instead.`,
        vm
      )
    } else if (!isReserved(key)) {
      proxy(vm, `_data`, key)
    }
  }

export function getData (data: Function, vm: Component): any {
  // #7573 disable dep collection when invoking data getters
  pushTarget()
  try {
    return data.call(vm, vm)
  } catch (e) {
    handleError(e, vm, `data()`)
    return {}
  } finally {
    popTarget()
  }
}

export function proxy (target: Object, sourceKey: string, key: string) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  }
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val
  }
  Object.defineProperty(target, key, sharedPropertyDefinition)
}
```
