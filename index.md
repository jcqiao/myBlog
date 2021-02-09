## 强制类型转换

You can use the [editor on GitHub](https://github.com/jcqiao/myBlob/edit/gh-pages/index.md) to maintain and preview the content for your website in Markdown files.
  
Whenever you commit to this repository, GitHub Pages will run [Jekyll](https://jekyllrb.com/) to rebuild the pages in your site, from the content in your Markdown files.

### ToString

负责处理非字符串到字符串的强制类型转换。**toString** 是定义在 Object.prototype.toString 上，如果被处理的对象自身定义了toString则会覆盖其原型的toString，所以重写了原型的toString.

基本类型值的字符转换规则：null --> "null" , undefined --> "undefined" , true --> "true" , Number类型遵循通用规则(除了极大或绩效的数字使用指数形式) 

Object.prototype.toString()返回内部属性[[class]]值，如[[object number]].
![avatar](https://raw.githubusercontent.com/jcqiao/myBlob/gh-pages/Screen%20Shot%202021-02-09%20at%201.49.28%20PM.png)



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
