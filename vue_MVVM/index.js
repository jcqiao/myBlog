function Vue(options = {}) {
    this.$options = options
    let data = this._data = this.$options.data
    let _this = this
    this._data = observe(data)
    const p = new Proxy(_this, {
        get(target, key) {
            if (key[0] === '_') {
                return Reflect.get(target, key)
            }
            return Reflect.get(target._data, key)
        },
        set(target, key, value) {
            if (key[0] === '_') {
                Reflect.set(target, key, value)
            }
            Reflect.set(target._data, key, value)
        }
    })
    //编译
    new Compiler(this.$options.el, _this)
    return p
}

function observe(data) {
    if (!data || typeof data !== 'object') {
        return data
    }
    return new Observe(data)
}

function Observe(data) {
    for (const key in data) {
        data[key] = observe(data[key])
    }
    let dep = new Dep()
    return new Proxy(data, {
        get(target, key) {
            Dep.target && dep.add(Dep.target)
            return Reflect.get(target, key)
        },
        set(target, key, value) {
            // 新的值也要observe
            Reflect.set(target, key, observe(value))
            dep.notify()
        }
    })
}

function Compiler(el, vm) {
    vm.$el = document.querySelector(el)
    let fragment = document.createDocumentFragment()
    while (child = vm.$el.firstChild) {
        fragment.append(child)
    }
    replace(fragment)
    vm.$el.append(fragment)
    function replace(fragment) {
        Array.from(fragment.childNodes).forEach(node => {
            let text = node.textContent
            const reg = /\{\{(.*)\}\}/
            if (node.nodeType === 3 && reg.test(text)) {
                let val = vm._data
                RegExp.$1.split('.').forEach(item => val = val[item])
                new Watcher(vm, RegExp.$1, function (newVal) {
                    node.textContent = text.replace(reg, newVal)    
                })
                node.textContent = text.replace(reg, val)
            }
            if (node.nodeType === 1 && node.getAttribute('v-model')) {
                node.setAttribute('value', vm._data[RegExp.$1])
                // 订阅
                new Watcher(vm, RegExp.$1, function (newVal) {
                    node.setAttribute('value', newVal) 
                })
                node.addEventListener('input', (e) => {
                    console.log('1');
                    vm._data[RegExp.$1] = e.target.value
                })
            }
            if (node.childNodes) {
                replace(node)
            }
        })
    }
}

// 发布订阅
function Dep() {
    this.subs = []
}

Dep.prototype.add = function (fn) {
    this.subs.push(fn)
}

Dep.prototype.notify = function () {
    this.subs.forEach(fn => fn.update())
}

function Watcher(vm, reg, fn) {
    this.vm = vm
    this.reg = reg
    this.fn = fn
    Dep.target = this
    let val = vm._data
    reg.split('.').forEach(item => val = val[item])
    Dep.target = null
}

Watcher.prototype.update = function () {
    let newVal = this.vm._data
    this.reg.split('.').forEach(item => newVal = newVal[item])
    this.fn(newVal)
}
