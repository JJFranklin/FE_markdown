function arrayToTree(items) {
    const result = []; // 存放结果集
    const itemMap = {}; // 

    // 先转成map存储
    for (const item of items) {
        itemMap[item.id] = {
            ...item,
            children: []
        }
    }

    for (const item of items) {
        const id = item.id;
        const pid = item.pid;
        const treeItem = itemMap[id];
        // 根节点
        if (pid === 0) {
            result.push(treeItem);
        } else {
            // 当前节点没有找到父节点，构建自己的父节点，并将自己添加到自己的父节点中去
            if (!itemMap[pid]) {
                itemMap[pid] = {
                    children: [],
                }
            } 
            itemMap[pid].children.push(treeItem);
        }
    }
    return result;
}


let arr = [
    {id: 1, name: '部门1', pid: 0},
    {id: 2, name: '部门2', pid: 1},
    {id: 3, name: '部门3', pid: 1},
    {id: 4, name: '部门4', pid: 3},
    {id: 5, name: '部门5', pid: 4},
]


console.log("resutl", arrayToTree(arr));