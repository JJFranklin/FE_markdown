
// 浅拷贝 模仿 Object.assign()
let obj = {
    a: 1,
    b: 2,
    c: {
        d: [1, 2, 3, 4],
        e: {h:3}
    },
    f: function () {},
    g: undefined
};

function shallowCopy(obj) {
    if(!obj) return {};
    let target = {};
    Object.keys(obj).map(key=>{
        target[key] = obj[key];
    });
    return target;
}

/**
 * 深拷贝
 * 只有数组和对象是需要重复遍历
 * null 类型判断也是object 所以要单独的处理
 * 区分数组和对象
*/
function deepClone(obj){
    if(!isObject(obj)) return obj;
    // 区分出数组和对象
    let target = Array.isArray(obj) ? [] : {};
    let keys = Object.keys(obj);
    keys.map(key => {
        if (isObject(obj[key])) {
            target[key] = deepClone(obj[key]);
        } else {
            target[key] = obj[key];
        }
    });
    return target;
}

function isObject(obj){
    return obj && typeof obj === "object";
}


let res = deepClone(obj);
res.c.e.h = 4;
console.log(res,obj);
// 深度优先遍历


// 广度优先遍历


// lodash 的深度克隆
// 木易杨
function baseClone(value, bitmask, customizer, key, object, stack) {
    let result

    // 标志位
    const isDeep = bitmask & CLONE_DEEP_FLAG		// 深拷贝，true
    const isFlat = bitmask & CLONE_FLAT_FLAG		// 拷贝原型链，false
    const isFull = bitmask & CLONE_SYMBOLS_FLAG	// 拷贝 Symbol，true

    // 自定义 clone 函数
    if (customizer) {
        result = object ? customizer(value, key, object, stack) : customizer(value)
    }
    if (result !== undefined) {
        return result
    }

    // 非对象  
    if (!isObject(value)) {
        return value
    }
    
    const isArr = Array.isArray(value)
    const tag = getTag(value)
    if (isArr) {
        // 数组
        result = initCloneArray(value)
        if (!isDeep) {
            return copyArray(value, result)
        }
    } else {
        // 对象
        const isFunc = typeof value == 'function'

        if (isBuffer(value)) {
            return cloneBuffer(value, isDeep)
        }
        if (tag == objectTag || tag == argsTag || (isFunc && !object)) {
            result = (isFlat || isFunc) ? {} : initCloneObject(value)
            if (!isDeep) {
                return isFlat
                    ? copySymbolsIn(value, copyObject(value, keysIn(value), result))
                	: copySymbols(value, Object.assign(result, value))
            }
        } else {
            if (isFunc || !cloneableTags[tag]) {
                return object ? value : {}
            }
            result = initCloneByTag(value, tag, isDeep)
        }
    }
    // 循环引用
    stack || (stack = new Stack)
    const stacked = stack.get(value)
    if (stacked) {
        return stacked
    }
    stack.set(value, result)

    // Map
    if (tag == mapTag) {
        value.forEach((subValue, key) => {
            result.set(key, baseClone(subValue, bitmask, customizer, key, value, stack))
        })
        return result
    }

    // Set
    if (tag == setTag) {
        value.forEach((subValue) => {
            result.add(baseClone(subValue, bitmask, customizer, subValue, value, stack))
        })
        return result
    }

    // TypedArray
    if (isTypedArray(value)) {
        return result
    }

    // Symbol & 原型链
    const keysFunc = isFull
    	? (isFlat ? getAllKeysIn : getAllKeys)
    	: (isFlat ? keysIn : keys)

    const props = isArr ? undefined : keysFunc(value)
    
    // 遍历赋值
    arrayEach(props || value, (subValue, key) => {
        if (props) {
            key = subValue
            subValue = value[key]
        }
        assignValue(result, key, baseClone(subValue, bitmask, customizer, key, value, stack))
    })
    
    // 返回结果
    return result
}
