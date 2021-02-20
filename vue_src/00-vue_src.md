# vue源码构建

## 大致过程

  1. 拿到所有配置
  2. 过滤掉不需要打包的文件
  3. 最终编译过滤掉后需要的文件

## package.json

- npm run build: node scripts/build.js" 到这个目录下

``` javascript
  let builds = require('./config').getAllBuilds()
```

- /scripts/config.js 导出了getAllBuilds

``` javascript
  exports.getAllBuilds = () => Object.keys(builds).map(genConfig)
```

- 实际上这一步是将builds对象中的每个key(key的值也是对象)执行genConfig函数

``` javascript
const builds = {
  // Runtime only (CommonJS). Used by bundlers e.g. Webpack & Browserify
  'web-runtime-cjs-dev': {
    entry: resolve('web/entry-runtime.js'),
    dest: resolve('dist/vue.runtime.common.dev.js'),
    format: 'cjs',
    env: 'development',
    banner
  },...
```

- builds对象是什么？
  - 往上找builds是vue编译不同版本的配置对象，每个编译配置有个entry,dest,format... entry,dest:resolve(...)，resolve是返回对应入口/出口的路径，如上端代码entry的resolve('web/entry-runtime.js'), resolve中base保存了web，aliases[web]:resolve('src/platforms/web'),在alias.js中resolve拼接的是其参数文件的路径即：/Users/chunqiaojiang/web/vue_source/src/platforms/web。在config.js中resolve中if为true返回了/Users/chunqiaojiang/web/vue_source/src/platforms/web/vue.runtime.common.dev.js。
  - 再看genConfig函数又弄了个config,这个config数据结构才是rollup本身的配置结构。
  - 这里实际上是将builds对象中的配置通过映射最终胜出rollup中的配置(数组)


``` javascript
  // filter builds via command line arg
  if (process.argv[2]) {
    const filters = process.argv[2].split(',')
    builds = builds.filter(b => {
      return filters.some(f => b.output.file.indexOf(f) > -1 || b._name.indexOf(f) > -1)
    })
  } else {
    // filter out weex builds by default
    builds = builds.filter(b => {
      return b.output.file.indexOf('weex') === -1
    })
  }
```

- 回到build.js现在拿到所有的builds，进行筛选process.argv[2],是对build命令带不带参数的过滤npm run build **-- weex** 就是--weex，过滤掉不需要打包的文件。如果没有参数就把weex过滤掉。然后打包web平台

- 这个build.js发生的就是
  1. 拿到所有配置
  2. 过滤掉不需要打包的文件
  3. 最终编译过滤掉后需要的文件

## Runtime Only VS Runtime + Compiler

- Runtime Only
我们在使用 Runtime Only 版本的 Vue.js 的时候，通常需要借助如 webpack 的 vue-loader 工具把 .vue 文件编译成 JavaScript，因为是在编译阶段做的，所以它只包含运行时的 Vue.js 代码，因此代码体积也会更轻量。

- Runtime + Compiler
我们如果没有对代码做预编译，但又使用了 Vue 的 template 属性并传入一个字符串，则需要在客户端编译模板

``` javascript
  // 需要编译器的版本
  new Vue({
    template: '<div>{{ hi }}</div>'
  })

  // 这种情况不需要
  new Vue({
    render (h) {
      return h('div', this.hi)
    }
  })
```

- 因为在 Vue.js 2.0 中，最终渲染都是通过 render 函数，如果写 template 属性，则需要编译成 render 函数，那么这个编译过程会发生运行时，所以需要带有编译器的版本。

- 很显然，这个编译过程对性能会有一定损耗，所以通常我们更推荐使用 Runtime-Only 的 Vue.js。
