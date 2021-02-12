## what is VUE?
### vue是构建用户界面的渐进式框架
  What's progressive framework?
  progressive:一步一步的，需要用哪个就用哪个
  ![avatar](https://raw.githubusercontent.com/jcqiao/myBlog/gh-pages/images/declareRender.jpg)
  
  - 声明式渲染
    函数与状态的映射。组件在编译时，将实际的DOM操作封装给vue的render函数，让render函数创建虚拟DOM，render函数执行完成后，patch函数会将虚拟DOM添加到真正的DOM上。当数据发生改变时，对应组件再次编译成render函数-》虚拟DOM--patch--》DOM。
    为什么要这么做？因为使用js api调用原生dom时会有相当大的损耗，js运行很快，但dom运行很慢，当你用原生dom api的时候，浏览器在js引擎环境下操作dom，当操作的dom多了，这个过程有损耗(经常渲染视图)。而用声明式渲染，是将dom放在render函数中去生成虚拟dom，render函数调用完会将整个虚拟dom挂到真正的dom上，而不用执行一次dom操作就挂在真正的dom上(命令式渲染)。
    ![avatar](https://raw.githubusercontent.com/jcqiao/myBlog/gh-pages/images/declareRender2.png)
