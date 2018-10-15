## 版本一
```js
/****** 选择元素类 ******/
function id$(id) {
    return document.getElementById(id);
}

function tag$(tag) {
    return document.getElementsByTagName(tag);
}

function class$(clName) {
    return document.getElementsByClassName(clName);
}

function name$(eleName) {
    return document.getElementsByName(eleName);
}

function selectorAll$(selector) {
    return document.querySelectorAll(selector);
}

function selector$(selector) {
    return document.querySelector(selector);
}

/****** 动画类 ******/
/**
 *  @param elem,获取样式的元素
 *  @param attr, 获取样式的名称
 */
function getStyle(elem, attr) {
    return window.getComputedStyle ? window.getComputedStyle(elem, null)[attr] : elem.currentStyle[attr] || 0;
}


/**
 *  给一个元素添加动画
 * @param elem, 添加动画的元素
 * @param targetObj, 调整属性的对象
 * @param speed，每次添加步长的时间间隔
 * @param func，回调函数
 */
function animation(elem, targetObj, speed, func) {
    // 清理之前的定时器
    window.clearInterval(elem.timerId);

    // 遍历设置属性的对象，为每个属性设置定时器
    elem.timerId = setInterval(function () {
        // 设置一个终止标识
        var flag = true;

        for (var attrTarget in targetObj) {
            // 获取属性的目标值
            var target = targetObj[attrTarget];
            // 获取当前的属性
            var currentValue = getStyle(elem, attrTarget);

            if (attrTarget === "opacity") {
                // 设置透明度
                // 获取当前元素的透明度
                // currentValue就是获取透明度的数值，无需转换
                target = target * 100;
                currentValue = currentValue * 100;
                var step = (target - currentValue) / 10;
                step = step > 0 ? Math.ceil(step) : Math.floor(step);

                // 变化后的透明度
                currentValue += step;
                // 缩小100倍后赋值
                elem.style[attrTarget] = currentValue / 100;
            }
            else if (attrTarget === "zIndex") {
                // 若为层级，直接改变这个值
                currentValue = target;
                elem.style.zIndex = currentValue;
                console.log("zIndex");
            }
            else {
                // 为其他属性值的时候
                // 获取属性的数值
                currentValue = parseInt(currentValue);
                // 获取添加的步长值
                var step = (target - currentValue) / 10;
                step = step > 0 ? Math.ceil(step) : Math.floor(step);
                // 更新现在的属性值
                currentValue += step;
                elem.style[attrTarget] = currentValue + "px";
            }
            // 有一个不达到目标都停止计时
            if (currentValue !== target) {
                flag = false;
            }
        }
        // 全部达到目标的时候，停止执行
        if (flag) {
            window.clearInterval(elem.timerId);
            if (func) {
                // 回调函数存在则调用
                func();
            }
        }
    }, speed);
}

/****** 事件类 ******/
/* 为元素添加事件
*
* */
function addEventListener(elem, eventName, func) {
    if (elem.addEventListener) {
        elem.addEventListener(eventName, func, false);
    } else if (elem.attachEvent) {
        elem.attachEvent("on"+eventName, func);
    } else {
        var oldEvent = elem["on" + eventName];
        if (!oldEvent) {
            elem["on" + eventName] = func;
        } else {
            elem["on" + eventName] = function() {
                oldEvent();
                func();
            };
        }
    }
}
```

## 版本二
```js
/****** 选择元素类 ******/
function id$(id) {
    return document.getElementById(id);
}

function tag$(tag) {
    return document.getElementsByTagName(tag);
}

function class$(clName) {
    return document.getElementsByClassName(clName);
}

function name$(eleName) {
    return document.getElementsByName(eleName);
}

function selectorAll$(selector) {
    return document.querySelectorAll(selector);
}

function selector$(selector) {
    return document.querySelector(selector);
}

/****** 动画类 ******/
/**
 *  @param elem,获取样式的元素
 *  @param attr, 获取样式的名称
 */
function getStyle(elem, attr) {
    return window.getComputedStyle ? window.getComputedStyle(elem, null)[attr] : elem.currentStyle[attr] || 0;
}


/**
 *  给一个元素添加动画
 * @param elem, 添加动画的元素
 * @param targetObj, 调整属性的对象
 * @param speed，每次添加步长的时间间隔
 * @param func，回调函数
 */
function animation(elem, targetObj, speed, func) {
    // 清理之前的定时器
    window.clearInterval(elem.timerId);

    // 遍历设置属性的对象，为每个属性设置定时器
    elem.timerId = setInterval(function () {
        // 设置一个终止标识
        var flag = true;

        for (var attrTarget in targetObj) {
            // 获取属性的目标值
            var target = targetObj[attrTarget];
            // 获取当前的属性
            var currentValue = getStyle(elem, attrTarget);

            if (attrTarget === "opacity") {
                // 设置透明度
                // 获取当前元素的透明度
                // currentValue就是获取透明度的数值，无需转换
                target = target * 100;
                currentValue = currentValue * 100;
                var step = (target - currentValue) / 10;
                step = step > 0 ? Math.ceil(step) : Math.floor(step);

                // 变化后的透明度
                currentValue += step;
                // 缩小100倍后赋值
                elem.style[attrTarget] = currentValue / 100;
            }
            else if (attrTarget === "zIndex") {
                // 若为层级，直接改变这个值
                currentValue = target;
                elem.style.zIndex = currentValue;
            }
            else {
                // 为其他属性值的时候
                // 获取属性的数值
                currentValue = parseInt(currentValue);
                // 获取添加的步长值
                var step = (target - currentValue) / 10;
                step = step > 0 ? Math.ceil(step) : Math.floor(step);
                // 更新现在的属性值
                currentValue += step;
                elem.style[attrTarget] = currentValue + "px";
            }
            // 有一个不达到目标都停止计时
            if (currentValue !== target) {
                flag = false;
            }
        }
        // 全部达到目标的时候，停止执行
        if (flag) {
            window.clearInterval(elem.timerId);
            if (func) {
                // 回调函数存在则调用
                func();
            }
        }
    }, speed);
}

/****** 事件类 ******/
var eventFunc = {
    /**
     *  为某个元素的某事件添加函数
     * @param elem
     * @param eventName
     * @param func
     */
    addEventListener: function (elem, eventName, func) {
        if (elem.addEventListener) {
            elem.addEventListener(eventName, func, false);
        } else if (elem.attachEvent) {
            elem.attachEvent("on" + eventName, func);
        } else {
            var oldEvent = elem["on" + eventName];
            if (!oldEvent) {
                elem["on" + eventName] = func;
            } else {
                elem["on" + eventName] = function () {
                    oldEvent();
                    func();
                };
            }
        }
    },

    /**
     *  移除某个元素事件的某个函数
     * @param elem，移除事件的元素
     * @param eventName，要移除的事件的名字，不带"on"
     * @param funcName, 移除事件的函数名称
     */
    removeEventListener: function (elem, eventName, funcName) {
        if (removeEventListener) {
            elem.removeEventListener(eventName, funcName, false);
        } else if (detachEvent) {
            elem.detachEvent("on" + eventName, funcName);
        } else {
            elem["on" + eventName] = null;
        }
    },

    /**
     *  获取事件的参数
     * @param argObj，出入事件的参数对象
     * @returns {*|Event | undefined}
     */
    getArgObj: function (argObj) {
        return argObj || window.event;
    },

    getClientX: function (argObj) {
        return this.getArgObj(argObj).clientX;
    },

    getClientY: function (argObj) {
        return this.getArgObj(argObj).clientY;
    },

    getScrollX: function () {
        return window.pageXOffset || document.body.scrollLeft || document.documentElement.scrollLeft;
    },

    getScrollY: function () {
        return window.pageYOffset || document.body.scrollTop || document.documentElement.scrollTop;
    },

    getPageX: function (argObj) {
        var argEventObj = this.getArgObj(argObj);
        var scrollX = this.getScrollX();
        var clientX = this.getClientX(argObj);
        return argEventObj.pageX ? argEventObj.pageX : scrollX + clientX;
    },

    getPageY: function (argObj) {
        var argEventObj = this.getArgObj(argObj);
        var scrollY = this.getScrollY();
        var clientY = this.getClientY(argObj);
        return argEventObj.pageY ? argEventObj.pageY : scrollY + clientY;
    }
};

/****** CSS类 ******/
var styleFunc = {
    getComputedStyle: function (elem, pseudoElt) {
        if (getComputedStyle) {
            return getComputedStyle(elem, pseudoElt);
        } else {
            return elem.currentStyle;
        }
    },
    getStyle: function (elem, pseudoElt, attr) {
        var computedStyle = this.getComputedStyle(elem, pseudoElt);
        return computedStyle[attr];
    }
};
```

## 版本三：添加了冒泡
```js
/****** 选择元素类 ******/
function id$(id) {
    return document.getElementById(id);
}

function tag$(tag) {
    return document.getElementsByTagName(tag);
}

function class$(clName) {
    return document.getElementsByClassName(clName);
}

function name$(eleName) {
    return document.getElementsByName(eleName);
}

function selectorAll$(selector) {
    return document.querySelectorAll(selector);
}

function selector$(selector) {
    return document.querySelector(selector);
}

/****** 动画类 ******/
/**
 *  @param elem,获取样式的元素
 *  @param attr, 获取样式的名称
 */
function getStyle(elem, attr) {
    return window.getComputedStyle ? window.getComputedStyle(elem, null)[attr] : elem.currentStyle[attr] || 0;
}


/**
 *  给一个元素添加动画
 * @param elem, 添加动画的元素
 * @param targetObj, 调整属性的对象
 * @param speed，每次添加步长的时间间隔
 * @param func，回调函数
 */
function animation(elem, targetObj, speed, func) {
    // 清理之前的定时器
    window.clearInterval(elem.timerId);

    // 遍历设置属性的对象，为每个属性设置定时器
    elem.timerId = setInterval(function () {
        // 设置一个终止标识
        var flag = true;

        for (var attrTarget in targetObj) {
            // 获取属性的目标值
            var target = targetObj[attrTarget];
            // 获取当前的属性
            var currentValue = getStyle(elem, attrTarget);

            if (attrTarget === "opacity") {
                // 设置透明度
                // 获取当前元素的透明度
                // currentValue就是获取透明度的数值，无需转换
                target = target * 100;
                currentValue = currentValue * 100;
                var step = (target - currentValue) / 10;
                step = step > 0 ? Math.ceil(step) : Math.floor(step);

                // 变化后的透明度
                currentValue += step;
                // 缩小100倍后赋值
                elem.style[attrTarget] = currentValue / 100;
            }
            else if (attrTarget === "zIndex") {
                // 若为层级，直接改变这个值
                currentValue = target;
                elem.style.zIndex = currentValue;
            }
            else {
                // 为其他属性值的时候
                // 获取属性的数值
                currentValue = parseInt(currentValue);
                // 获取添加的步长值
                var step = (target - currentValue) / 10;
                step = step > 0 ? Math.ceil(step) : Math.floor(step);
                // 更新现在的属性值
                currentValue += step;
                elem.style[attrTarget] = currentValue + "px";
            }
            // 有一个不达到目标都停止计时
            if (currentValue !== target) {
                flag = false;
            }
        }
        // 全部达到目标的时候，停止执行
        if (flag) {
            window.clearInterval(elem.timerId);
            if (func) {
                // 回调函数存在则调用
                func();
            }
        }
    }, speed);
}

/****** 事件类 ******/
var eventFunc = {
    /**
     *  为某个元素的某事件添加函数
     * @param elem
     * @param eventName
     * @param func
     */
    addEventListener: function (elem, eventName, func) {
        if (elem.addEventListener) {
            elem.addEventListener(eventName, func, false);
        } else if (elem.attachEvent) {
            elem.attachEvent("on" + eventName, func);
        } else {
            var oldEvent = elem["on" + eventName];
            if (!oldEvent) {
                elem["on" + eventName] = func;
            } else {
                elem["on" + eventName] = function () {
                    oldEvent();
                    func();
                };
            }
        }
    },

    /**
     *  移除某个元素事件的某个函数
     * @param elem，移除事件的元素
     * @param eventName，要移除的事件的名字，不带"on"
     * @param funcName, 移除事件的函数名称
     */
    removeEventListener: function (elem, eventName, funcName) {
        if (removeEventListener) {
            elem.removeEventListener(eventName, funcName, false);
        } else if (detachEvent) {
            elem.detachEvent("on" + eventName, funcName);
        } else {
            elem["on" + eventName] = null;
        }
    },

    stopPropagation: function (e) {
        if (e) {
            e.stopPropagation();
        } else {
            window.event.cancelBubble = true;
        }

    },
    /**
     *  获取事件的参数
     * @param argObj，出入事件的参数对象
     * @returns {*|Event | undefined}
     */
    getArgObj: function (argObj) {
        return argObj || window.event;
    },

    getClientX: function (argObj) {
        return this.getArgObj(argObj).clientX;
    },

    getClientY: function (argObj) {
        return this.getArgObj(argObj).clientY;
    },

    getScrollX: function () {
        return window.pageXOffset || document.body.scrollLeft || document.documentElement.scrollLeft;
    },

    getScrollY: function () {
        return window.pageYOffset || document.body.scrollTop || document.documentElement.scrollTop;
    },

    getPageX: function (argObj) {
        var argEventObj = this.getArgObj(argObj);
        var scrollX = this.getScrollX();
        var clientX = this.getClientX(argObj);
        return argEventObj.pageX ? argEventObj.pageX : scrollX + clientX;
    },

    getPageY: function (argObj) {
        var argEventObj = this.getArgObj(argObj);
        var scrollY = this.getScrollY();
        var clientY = this.getClientY(argObj);
        return argEventObj.pageY ? argEventObj.pageY : scrollY + clientY;
    }
};

/****** CSS类 ******/
var styleFunc = {
    getComputedStyle: function (elem, pseudoElt) {
        if (getComputedStyle) {
            return getComputedStyle(elem, pseudoElt);
        } else {
            return elem.currentStyle;
        }
    },
    getStyle: function (elem, pseudoElt, attr) {
        var computedStyle = this.getComputedStyle(elem, pseudoElt);
        return computedStyle[attr];
    }
};
```