// 获取新的子节点
const newChildren = n2.children;
// 获取老的子节点
const oldChildren = n1.children;
// 更新相同的前置节点
// 新，老开始节点的下标
let j = 0;
// 获取老的一组子节点的开始节点
let oldVnode = oldChildren[j];
// 获取新的一组子节点的开始节点
let newVnode = newChildren[j];
// 如果新，老的开始节点相同
while(oldVnode.key === newChildren.key) {
  // 递归处理子节点
  patch(oldVnode, newVnode, container);
  // 下标往后移动一格
  j++;
  // 获取 +1 后的新，老节点
  oldVnode = oldChildren[j];
  newVnode = newChildren[j];
}

// 更新相同的后置节点
// 索引 oldEnd 指向旧的一组子节点的最后一个节点
let oldEnd = oldChildren.length - 1;
// 索引 newEnd 指向新的一组子节点的最后一个节点
let newEnd = newChildren.length - 1;
// 获取新，老结束下标对应的节点
oldVnode = oldChildren[oldEnd];
newVnode = newChildren[newEnd];

// 如果新，老的结束节点相同
while(oldVnode.key === newVnode.key) {
  // 递归处理子节点
  patch(oldVnode, newVnode, container)
  // 递减 oldEnd 和 nextEnd
  oldEnd--
  newEnd--
  // 获取递减对应的节点
  oldVnode = oldChildren[oldEnd]
  newVnode = newChildren[newEnd]
}
// 预处理完毕后，如果满足如下条件，则说明从 j --> newEnd 之间的节点应该作为新节点插入
if (j > oldEnd && j <= newEnd) {
  // 锚点的索引，用于挂载时确定挂载的位置,即插入该锚点节点的前面
  const anchorIndex = newEnd + 1;
  // 锚点元素，如何anchorIndex不小于newChildren.length说明是尾部节点无需锚点元素
  const anchor = anchorIndex < newChildren.length ? newChildren[anchorIndex].el : null;
  // 采用 while 循环， 调用 patch 函数逐个挂载新增节点
  while (j <= newEnd) {
    patch(null, newChildren[j++], container, anchor)
  }
} else if (j > newEnd && j <= oldEnd) {
  // 如果满足如下条件以上条件，那么j --> oldEnd 之间的节点应该被卸载
  while (j <= oldEnd) {
      // 循环卸载多余节点
    unmount(oldChildren[j++])
  }
} else {
  // 获取剩余新的一组子节点的个数
  const count = newEnd - j + 1;
  // 定义个长度为 count 的 数组，用于存放新的一组子节点在老的组中位置，果然没有的话就存-1
  const source = new Array(count);
  // 初始化都存放-1
  source.fill(-1);

  // oldStart 和 newStart 分别为起始索引，即j
  const oldStart = j;
  const newStart = j;
  // 用于最后判断是否有要移动的节点
  let moved = false;
  // 遍历旧的一组子节点的过程中遇到的最大索引值 k
  let pos = 0;
  // 循环新的一组的子节点，构建key 和 index 的映射表
  const keyIndex = {};
  for(let i = newStart; i <= newEnd; i++) {
    keyIndex[newChildren[i].key] = i;
  }
  // 代表更新过的节点数量
  let patched = 0;
  // 遍历旧的一组子节点中剩余未处理的节点
  for(let i = oldStart; i <= oldEnd; i++) {
    oldVnode = oldChildren[i];
    // 如果更新过的节点数量小于等于需要更新的节点数量，则执行更新
    if (patched <= count) {
       // 取出老节点在新节点的索引
      const k = keyIndex[oldVnode.key];
      if (typeof k !== 'undefined') {
        newVnode = newChildren[k];
         // 递归处理子节点
        patch(oldVnode, newVnode, container);
        // 每更新一个节点，都将 patched 变量 +1
        patched++;
        // 存放新的一组子节点在老的组中位置 
        source[k - newStart] = i;
        // 如果该节点新的位置小于最大的索引值,说明该节点往前移了
        if (k < pos) {
          moved = true
        } else {
          // 如果不是就把该位子存到pos，目前k是递增子节点中最大的索引
          pos = k
        }
      } else {
        // 没找到, 卸载该节点
        unmount(oldVnode)
      }
    } else {
      // 如果更新过的节点数量大于需要更新的节点数量，则卸载多余的节点
      unmount(oldVnode)
    }
  }
}
 // moved 为 true 时说明需要移动节点 
if (moved) {
  // 计算最长递增子序列
  const seq = lis(source);
  // 最长递增子序列中最后一个值的索引
  let s = seq.length - 1;
  // 新的一组子节点从后往前遍历
  for (i = count - 1; i >=0; i--) {
       // 该节点在新 children 中的真实位置索引
      const pos = i + newStart;
      const newVnode = newChildren[pos];
      // 该节点的下一个节点的位置索引
     const nextPos = pos + 1;
      // 锚点
     const anchor = nextPos < newChildren.length ? newChildren[nextPos].el : null;
    if (source[i] === -1) {
      // 说明索引为 i 的节点是全新的节点，应该将其插入
      // 挂载
      patch(null, newVnode, container, anchor);
    } else if(s < 0 || i !== seq[s]) {
      // 如果节点的索引 i 不等于 seq[s] 的值， 说明该节点需要移动
      // s < 0 说明没有稳定的子序列(例如反向)
      // 移动
      insert(newVnode.el, container, anchor)
    } else {
      // 当 i === seq[s] 时, 说明该位置的节点不需要移动，只需要让 s 指向下一个位置
      s--
    }
  }
}
