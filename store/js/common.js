//console.log("引用common成功")
/**
 * Created by WL on 2016/10/31.
 */
/**
 * 将类名调换的方法
 * @param element
 * @param oldstr
 * @param newstr
 */
function replaceClassName(element, oldstr, newstr) {
    element.className = element.className.replace(oldstr, newstr);
}

/**
 * 封装 赋值  为一个元素添加innerText内容兼容性解决方法
 * @param element
 * @param content
 */
function setInnerText(element, content) {
    if (typeof element.innerText === "string") {
        element.innerText = content;
    } else {
        element.textContent = content;
    }
}

/**
 * 封装 返回值 适用于浏览器的兼容 为一个元素显示innerText内容
 * @param element
 * @returns {*}
 */
function getInnerText(element) {
    if (typeof element.innerText === "string") {
        return element.innerText;
    } else {
        return element.textContent;
    }
}

/**
 * 封装 获取下一个兄弟元素 的兼容方法
 * @param element
 * @returns {*}
 */
//封装 获取下一个兄弟元素兼容的方法
function getNextElement(element) {
    if (element.nextElementSibling) {//能找到
        return element.nextElementSibling;
    } else {
        var next = element.nextSibling;//下一个兄弟节点
        //如果next是我们想要的 就返回 如果不是我们先要的 就一直找
        //这个判断的条件是有下一个兄弟节点 但是不是我们想要的
        //当循环找完所有的兄弟节点或者找到我们想要的兄弟元素时跳出循环返回这个元素
        while (next && next.nodeType !== 1) {
            //下一个兄弟节点 =>上一个兄弟节点.nextSibling;
            next = next.nextSibling;
        }
        return next;
    }
}
/**
 * 获取上一个兄弟元素的兼容写法
 * @param element
 * @returns {*}
 */
function getPreviousElement(element) {
    if (element.previousElementSibling) {
        return element.previousElementSibling;
    } else {
        var prev = element.previousSibling;
        while (prev && 1 !== prev.nodeType) {
            prev = prev.previousSibling;
        }
        return prev;
    }
}

/**
 * isMoveAll 如果 true 就全都移动 如果是 false 只移动选中的
 * @param sour
 * @param dest
 * @param isMoveAll
 */
function move(sour, dest, isMoveAll) {
    var options = sour.children;
    for (var i = 0; i < options.length; i++) {
        var option = options[i];
        if (isMoveAll || option.selected) {
            dest.appendChild(option);
            i--;
        }
    }
}

/**
 * 封装 获取当前元素的第一个子元素
 * @param element
 * @returns {*}
 */
function getFirstElement(element) {
    if (element.firstElementChild) {
        return element.firstElementChild;
    } else {
        var el = element.firstChild;//第一个子节点
        while (el && 1 !== el.nodeType) {
            el = el.nextSibling;//往后找
        }
        return el;
    }
}
/**
 * 封装 获取当前元素的最后一个子元素
 * @param element
 * @returns {*}
 */
function getLastElement(element) {
    if (element.lastElementChild) {
        return element.lastElementChild;
    } else {
        var el = element.lastChild;
        while (el && 1 !== el.nodeType) {
            el = el.previousSibling;//上一个兄弟节点
        }
        return el;
    }
}
/**
 * 封装 通过类名获取元素对象的兼容方法
 * @param element
 * @param className
 * @returns {*}
 */
function getElementsByClassName(element, className) {
    //原来就有
    if (element.getElementsByClassName) {
        return element.getElementsByClassName(className);
    } else {
        //首先找到element里面所有的标签 然后判断 有没有我们要的类名
        //如果有就把当前标签 放到一个集合中 最后全都找完了 把集合返回
        var filterArr = [];//这个数组用来放匹配的元素
        var elements = element.getElementsByTagName("*");//通配符 表示所有标签
        for (var i = 0; i < elements.length; i++) {
            if (elements[i].className.indexOf(className) !== -1) {
                //包含了我们要的类名 这个元素是我们要的
                filterArr.push(elements[i]);
            }
        }
        return filterArr;
    }
}

/**
 * 封装一个动画函数 可以将对象移动到指定的地方
 * @param obj
 * @param target
 */
function Animate(obj, target) {
    clearInterval(obj.timer);
    obj.timer = setInterval(function () {
        var leader = obj.offsetLeft;
        var step = 10;
        step = leader < target ? step : -step;
        if (Math.abs(target - leader) >= Math.abs(step)) {
            leader = leader + step;
            obj.style.left = leader + "px";
        } else {
            //就差一点儿了手动放到目标即可
            obj.style.left = target + "px";
            clearInterval(obj.timer);
        }
    }, 15);
}

/**
 * 封装一个获取滚动卷去的top值和left值
 * @returns {{top: (Number|number), left: (Number|number)}}
 */
function scroll() {
    return {
        top: window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0,
        left: window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0
    };
}


/**
 * //把 任意对象 的 任意数值属性 改变为 任意的目标值 添加透明度
 * @param obj
 * @param json
 * @param fn
 */
//json {attr:target}将属性和目标位置 放到一个对象中 遍历这个对象
function animate(obj, json, fn) {
    clearInterval(obj.timer);
    obj.timer = setInterval(function () {
        var flag = true; //定义一个标记 假设全部到达
        for (var k in json) {   //json {attr:target} 属性名:属性值 k:json[k]
            if (k === "opacity") {//opacity要特殊处理
                //opacity没有单位 参与运算自动转换成数值 所以不用parsetInt
                //取值范围 0-1 0.1 0.33 33 为了让以前的计算公式生效 要扩大100倍
                var leader = getStyle(obj, k) * 100;
                var target = json[k] * 100;
                var step = (target - leader) / 10;
                step = step > 0 ? Math.ceil(step) : Math.floor(step);
                leader = leader + step;
                obj.style[k] = leader / 100;//opacity没有单位
            }
            else if (k === "zIndex") {
                obj.style.zIndex = json[k];//层级不需要渐变 直接设置即可
            }
            //普通数值属性依然不变
            else {
                //获取任意数值属性的当前值但是获取的是字符串有单位所以要转换 但这个值有可能是非数字 如果是NaN 给个默认值0
                var leader = parseInt(getStyle(obj, k)) || 0;
                var target = json[k];  //当前属性的目标值
                var step = (target - leader) / 10;
                step = step > 0 ? Math.ceil(step) : Math.floor(step);
                leader = leader + step;
                obj.style[k] = leader + "px";
            }
            if (leader != target) {
                flag = false; //告诉标记 当前这个属性还没到达
            }
        }
        //如果此时仍然为true 就说明真的都到达了
        if (flag) {
            clearInterval(obj.timer);//全部属性都到达目标值才能清空
            //当代码执行到这一步时说明定时器所有内容执行完毕 在下面添加回调函数 可以再次执行
            if (fn) {
                fn();
            }
        }
    }, 15);
}
/**
 * 获取计算后样式的属性
 * @param obj
 * @param attr
 * @returns {*}
 */
function getStyle(obj, attr) {
    if (window.getComputedStyle) {
        return window.getComputedStyle(obj, null)[attr];
    } else {
        return obj.currentStyle[attr];
    }
}

/**
 * 封装一个函数获取页面可视区域的宽高 返回的是对象
 * @returns {{width: (Number|number), height: (Number|number)}}
 */
function client() {
    return {
        width: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth || 0,
        height: window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight || 0
    }
}

/**
 * 封装一个函数得到数组中最小的值和索引  返回值是对象
 * @param arr
 * @returns {{}}
 */
function getMin(arr) {
    var min = {};
    min.index = 0;//最小值的索引
    min.value = arr[min.index];//最小值的值
    //遍历数组 一个一个比较
    for (var i = 0; i < arr.length; i++) {
        if (min.value > arr[i]) {
            min.value = arr[i];
            min.index = i;
        }
    }
    return min;
}


function getTarget(event) {
    return event.target || event.srcElement;
}

/**
 * 获取事件对象的的函数 将所有与事件有关的封装函数存放到事件工具对象中
 * @type {{getEvent: Function, getPageX: Function, getPageY: Function, stopPropagation: Function, getTarget: Function}}
 */
var eventUtil = {
    getEvent: function (event) {
        return event || window.event;
    },
    getPageX: function (event) {
        return event.pageX || event.clientX + document.documentElement.scrollLeft;
    },
    getPageY: function (event) {
        return event.pageY || event.clientY + document.documentElement.scrollTop;
    },
    stopPropagation: function (event) {
        if (event.stopPropagation) {
            event.stopPropagation();
        } else {
            event.cancelBubble = true;
        }
    },
    getTarget: function (event) {
        return event.target || event.srcElement;
    }
};