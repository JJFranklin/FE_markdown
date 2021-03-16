
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
    let target = Array.isArray(obj)?[]:{};
    let keys = Object.keys(obj);
    keys.map(key=>{
        if(isObject(obj[key])){
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

// 深度优先遍历


// 广度优先遍历