## 强制类型转换

You can use the [editor on GitHub](https://github.com/jcqiao/myBlob/edit/gh-pages/index.md) to maintain and preview the content for your website in Markdown files.
  
Whenever you commit to this repository, GitHub Pages will run [Jekyll](https://jekyllrb.com/) to rebuild the pages in your site, from the content in your Markdown files.

### ToString

负责处理非字符串到字符串的强制类型转换。**toString** 是定义在 Object.prototype.toString 上，如果被处理的对象自身定义了toString则会覆盖其原型的toString，所以重写了原型的toString.

基本类型值的字符转换规则：null --> "null" , undefined --> "undefined" , true --> "true" , Number类型遵循通用规则(除了极大或绩效的数字使用指数形式) 

Object.prototype.toString()返回内部属性[[class]]值，如[[object number]].


![avatar](https://github.com/jcqiao/myBlob/raw/gh-pages/code_Class.png)

以上介绍了基本类型的toString，数组的toString经过重新定义，将单元字符串化再用','拼接
```
let a = [1,2,3]
a.toString() // "1,2,3"
```
a.toString() 相当于是a.join()

### JSON字符串化 (不是强制类型转换 这里介绍是有关toString())

对于大多数简单值如bool,number,string,null其转为字符串的方法与toString基本相同。

所有安全的JSON值都可以用JSON.stringify()转化，不安全的JSON值如undefined,function,symbol,对象的循环引用，这些都不能正确呈现JSON格式，JSON在处理的时候回忽略掉输出undefined，若是在数组中则用null占位保证数组长度不变。

对于对象来说:
如果对象定义了toJSON()那么JSON.stringify()首先会调用toJSON()然后用他的返回值进行序列化

```
var obj = {
  name: 'a',
  age: 11,
  like: 'fdsfds',
  toJSON(){
    return { name: this.name}
  }
}
JSON.stringify(obj) //"{"name": "a"}"
```
很多人误认为toJSON()返回的是JSON字符串化后的值，其实不然，toJSON返回一个适当的值(安全的JSON值)，然后JSON.stringify()将toJSON()返回来的值进行字符串化。

- JSON.stringify(obj, params)
  他的第二的参数params可以是一个数组、函数。用来指定序列化的对象哪些属性需要被处理。其功能类似toJSON()
  ```
    var obj = {name: 'a', age: 11, like: [1,2,3]}
    JSON.stringify(obj, ["name","age"]) //"{"name": "a", "age": 11}"
    JSON.stringify(obj, function(k, v){ if(k !== "age") return v}) //"{"name": "a", "like": [1,2,3]}"
  ```
  字符串化是递归的，所以like数组也要进行序列化处理
 
### 总结
1. string,number,boolean,null的JSON.stringify()规则与toString()相同
2. 若对象中定义了toJSON()则在字符串化之前调用toJSON()，再进行字符串化
  
### Markdown

Markdown is a lightweight and easy-to-use syntax for styling your writing. It includes conventions for

```markdown
Syntax highlighted code block

# Header 1
## Header 2
### Header 3

- Bulleted
- List

1. Numbered
2. List

**Bold** and _Italic_ and `Code` text

[Link](url) and ![Image](src)
```

For more details see [GitHub Flavored Markdown](https://guides.github.com/features/mastering-markdown/).

### Jekyll Themes

Your Pages site will use the layout and styles from the Jekyll theme you have selected in your [repository settings](https://github.com/jcqiao/myBlob/settings). The name of this theme is saved in the Jekyll `_config.yml` configuration file.

### Support or Contact

Having trouble with Pages? Check out our [documentation](https://docs.github.com/categories/github-pages-basics/) or [contact support](https://support.github.com/contact) and we’ll help you sort it out.
