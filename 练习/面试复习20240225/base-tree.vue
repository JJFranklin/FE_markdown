<template>
  <div class="meg-base-tree" :class="{ 'meg-base-tree--highlight-current': highlightCurrent }"
    :style="{ 'height': renderAll ? showNodesLength * itemHeight + 'px' : forceHeight ? forceHeight + 'px' : staticHeight ? staticHeight + 'px' : '100%' }"
    ref="tree" @scroll="setShowStartAndEnd">
    <!-- 用于显示虚拟高度 -->
    <div class="meg-base-tree__phantom" :style="{ 'height': showNodesLength * itemHeight + 'px' }">
    </div>

    <!-- 真正显示的树 -->
    <div class="meg-base-tree__content" :style="{ 'padding-top': showStart * itemHeight + 'px' }"
      :class="{ 'drag-will-drop-before': dropType === 'before', 'drag-will-drop-after': dropType === 'after' }">
      <!-- 空列表 暂无数据提示 -->
      <div v-show="trueShowNodes.length === 0" class="meg-base-tree__nodata">
        <slot name="empty">
          {{ emptyText || t('meg.tree.emptyText') }}
        </slot>
      </div>
      <!-- 每个树节点 -->
      <div class="meg-base-tree__node" :draggable="draggable || (canDragFn && canDragFn(item))"
        v-for="(item, index) in trueShowNodes" :key="item.nodeId"
        :style="{ 'padding-left': searchLeafModelOn ? 0 : item.z * 20 + 'px', 'min-height': itemHeight + 'px' }"
        :class="[{ 'is-disabled': ifDisabled(item), 'is-current': currentNode && currentNode.nodeId === item.nodeId, 'is-drag-will-drop': willDropId === item.nodeId }, itemClassFn && itemClassFn(item)]"
        @dragstart.stop="handleDragStart($event, item)" @dragover.stop="handleDragOver($event, item, index)"
        @dragend.stop="handleDragEnd($event, item)" @drop.stop="handleDrop($event, item)"
        @click="clickItem(item, index)">
        <!-- 展开箭头 -->
        <meg-icon name="meg-icon-caret_right" class="meg-base-tree__expand-icon meg-icon-caret-right"
          v-if="!item.isLeaf" :class="{ 'is-collapse': item.collapse }"
          @click.stop="goCollapse(item, index)"></meg-icon>
        <span v-else v-show="!searchLeafModelOn" class="meg-base-tree__expand-placeholder"></span>
        <!-- 复选框 -->
        <meg-checkbox class="meg-tree-checkbox" v-if="showCheckbox" v-model="item.checked" :disabled="ifDisabled(item)"
          :indeterminate="item.indeterminate" @click.native.stop
          @change="!ifDisabled(item) && checkoutChange(item, item.checked)"></meg-checkbox>
        <!-- 节点文字部分 -->
        <node-content :node="item"></node-content>
        <div v-if="item.loading" class="meg-base-tree__loading">
          <meg-icon spin name="circle_spin"></meg-icon>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Locale from 'megvii-ui/components/utils/mixins/locale';
import { escapeRegexpString } from 'megvii-ui/components/utils/util';

import MegCheckbox from 'megvii-ui/components/checkbox';

export default {
  name: 'MegBaseTree',
  components: {
    MegCheckbox,
    /**
     * 节点内部组件
     *
     */
    NodeContent: {
      props: {
        node: {
          required: true
        }
      },
      render() {
        const parent = this.$parent;
        const { node } = this;
        const { data } = node;
        return (
          parent.$scopedSlots.default
            ? parent.$scopedSlots.default({ node, data })
            : <span class="meg-base-tree-node__label">{node.label}</span>
        );
      }
    }
  },
  mixins: [Locale],
  props: {
    /**
     * 树数据
      [{
          id: 1,
          label: '一级 1',
          children: [
            {
              id: 11,
              label: '二级 1-1',
              children: [
                {
                  id: 111,
                  label: '二级 1-1-1'
                }
              ]
            }
          ]
        }]
     * */
    data: {
      type: Array,
      default: () => []
    },
    // 在显示复选框的情况下，是否严格的遵循父子不互相关联的做法，默认关连
    checkStrictly: Boolean,
    // 点击节点时是否展开
    expandOnClickNode: {
      type: Boolean,
      default: true
    },
    // 是否在点击节点的时候选中节点
    checkOnClickNode: Boolean,
    defaultCheckedKeys: {
      type: Array,
      default: () => []
    },
    // 默认展开的节点, 只要传了这个，就只展开这部分，其余收起
    defaultExpandedKeys: {
      type: Array,
      default: () => []
    },
    // 是否展开全部
    defaultExpandAll: {
      type: Boolean,
      default: true
    },
    // 是否显示复选框
    showCheckbox: {
      type: Boolean,
      default: false
    },
    // 是否整个树的节点可以拖拽
    draggable: {
      type: Boolean,
      default: false
    },
    // 是否整个树的节点可以接受外来拖入
    dropable: {
      type: Boolean,
      default: false
    },
    // allowDrag: Function,
    // allowDrop: Function,
    // 高亮当前节点
    highlightCurrent: {
      type: Boolean,
      default: false
    },
    // 节点的class
    itemClassFn: {
      type: Function,
      default: undefined
    },
    // 是否默认选中全部
    defaultCheckedAll: {
      type: Boolean,
      default: false
    },
    // 无数据时显示的提示信息
    emptyText: {
      type: String,
      default: ''
    },
    // 树的外层可视区高度 外部传来的默认值是 400 
    contentHeight: {
      type: Number,
      default: undefined
    },
    renderAll: {
      type: Boolean,
      default: false
    },
    // 某个节点是否可拖拽，和 draggable 冲突，不能混用
    canDragFn: {
      type: Function,
      default: undefined
    },
    // 标准树数据预处理函数
    pretreatmentNodeDataFn: {
      type: Function,
      default: undefined
    },
    // 独一无二的 key，默认 id
    nodeKey: {
      type: String,
      default: 'id'
    },
    // 是否是标准的树数据  默认标准的带children 的数据，设置为 false，则表示扁平的处理有的数据
    standardTreeData: {
      type: Boolean,
      default: true
    },
    // 子节点 及 label 对应的字段
    props: {
      type: Object,
      default: () => ({})
    },
    // 树筛选的回调替代方法
    filterNodeMethod: {
      type: Function,
      default: undefined
    },
    // 每个节点的高度
    itemHeight: {
      type: Number,
      default: 34
    },
    // 懒加载
    lazy: {
      type: Boolean,
      default: false,
    },
    // 检索叶子节点模式
    searchLeafModel: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      // 可用于显示的节点数据的长度（去除了 filter 和 show:false 之后的数据）
      showNodesLength: 0,
      // 真正会在页面中显示的数据
      trueShowNodes: [],
      // 显示其实位置
      showStart: 0,
      // 显示结束位置
      showEnd: 0,
      // 当前节点
      currentNode: null,
      // 拖拽目标 node 对应的 id
      willDropId: '',
      // 拖放的类型，有 before after inner 三个值
      dropType: '',
      // 当父级没有高度或者有contentHeight 的时候，作为固定高度
      staticHeight: 0,
      // 强制刷新的高度
      forceHeight: 0,
      // contentHeight 是否有效，这个是为了 当 resize 的时候将contentHeight无效掉
      contentHeightUseful: true,
      searchLeafModelOn: false,
    };
  },
  computed: {
    defaultProps() {
      return Object.assign({}, {
        children: 'children',
        label: 'label'
      }, this.props);
    }
  },
  watch: {
    data() {
      this.dataChange();
    },
    contentHeight() {
      this.contentHeightUseful = true;
      if (this.searchLeafModel && this.contentHeight) this.setShowStartAndEnd();
    }
  },
  created() {
    // 所有node 节点的 map
    this.nodesMap = {}; // 为了减少 vue 的监听，将不需要双向绑定的数据提出来
    // 所有的节点
    this.rederNodes = []; // 为了减少 vue 的监听，将不需要双向绑定的数据提出来
    // 通过 filter 方法筛选之后的节点
    this.filterNodes = []; // 为了减少 vue 的监听，将不需要双向绑定的数据提出来

    // 可用于显示的节点数据（去除了 filter 和 show:false 之后的数据）
    this.showNodes = []; // 为了减少 vue 的监听，将不需要双向绑定的数据提出来
  },
  mounted() {
    // 数据改变就会执行
    this.dataChange();
  },
  beforeDestroy() {
    this.clearData();
  },
  methods: {
    /**
     * 清理基础数据，避免如果因为外部原因造成组件无法销毁成功时造成内存泄露过多
     *
     */
    clearData() {
      this.nodesMap = {};
      this.rederNodes = [];
      this.filterNodes = [];
      this.showNodes = [];
    },
    /**
     * 第一步
     * 扁平数据初始化处理
     */
    dataChange(data) {
      this.searchLeafModelOn = false;
      let allData = data || this.data;
      if (this.standardTreeData) { // 如果是标准的树数据，则先扁平化
        if (!this.defaultProps.children) throw new Error('children property in props is required with standardTreeData module');
        this.standardData = [];
        this.standardDataChange(allData, 0);
        allData = this.standardData;
        this.standardData = null; // 不用了，就让回收机制回收了
      }

      if (!this.defaultProps.label) throw new Error('label property in props is required');

      const nodes = [];
      const nodesMap = {};
      let latestZ = 0;
      const idPath = [];

      allData.forEach((node, index) => {
        const newNode = {
          ...node,
          loading: false,
          collapse: false,
          show: true,
          indeterminate: false,
          checked: false,
          filtered: false,
          isLeaf: false,
          count: 0,
          selectCount: 0,
          index,
          data: node
        };

        if (!node[this.nodeKey] && node[this.nodeKey] !== 0) throw new Error('there is no value for nodeKey !');
        newNode.nodeId = node[this.nodeKey];

        // 对于undefined 处理成 '', 其他情况转变成字符串，用于后续查找
        newNode.label = node[this.defaultProps.label] === undefined ? '' : `${node[this.defaultProps.label]}`;

        // 赋上层级 id  值得注意的是：idPath中推的是上一个node的 nodeId，而latestZ是当前node的z
        if (node.z > latestZ) {
          // if (!nodes[index - 1]) throw new Error('there is something wrong with your tree data, please check them!');
          idPath.push(nodes[index - 1].nodeId);
          latestZ = node.z;
        }
        if (node.z < latestZ) {
          idPath.splice(node.z, 20);
          latestZ = node.z;
        }
        newNode.idPath = [...idPath];

        // 判断是否叶子节点 (如果是异步模式，则全部都是可展开的，只有在 isLeaf 标识的情况下，才表示叶子节点)
        if (this.lazy && node.isLeaf) {
          newNode.isLeaf = true;
        }
        if (!allData[index + 1] || allData[index + 1].z <= node.z) {
          if (this.lazy) {
            newNode.noChildNodes = true; // 如果是异步模式，标记没有实际的子节点，为了在检索的时候能收起展开按钮
          } else {
            newNode.isLeaf = true;
          }
        }

        // 如果默认选中全部的话
        if (this.defaultCheckedAll) {
          newNode.checked = true;
        }
        nodes.push(newNode);
        // 由 nodeId 和 node 节点组成的map 对象缓存数据，并且检查是否有重复的节点，用 id 做唯一 key 的情况下
        if (nodesMap[newNode.nodeId]) {
          console.warn(`[Megvii tree] Duplicate node-key detected: '${newNode.nodeId}'. This may cause tree error`);
        }
        nodesMap[newNode.nodeId] = newNode;
      });

      this.rederNodes = nodes;
      this.nodesMap = nodesMap;

      // 如果设置了全部不展开，或者有设置默认展开项， 【这步放在显示之前，是为了提升效率，以免再调用一次 getShowNodes，虽然牺牲了 少量渲染前的数据处理时间，也避免了出现数据闪现的可能】
      if (this.lazy || !this.defaultExpandAll || (this.defaultExpandedKeys && this.defaultExpandedKeys.length)) {
        this.goDefaultExpand();
      }

      this.filterNodes = [...nodes];
      this.getShowNodes();

      // 数据处理完成后，额外操作
      // 如果没有全选，且有默认选中或展开的，需要在这里操作。
      if (!this.defaultCheckedAll && this.defaultCheckedKeys && this.defaultCheckedKeys.length > 0) {
        this.setCheckedKeys(this.defaultCheckedKeys, false);
      }
      this.$nextTick(() => {
        this.$emit('tree-update-ready', this.rederNodes);
      });
    },

    /**
     * 第二步
     * 标准数树数据初始化处理 扁平化处理
     * @param {Array} data children 数据
     * 树结构数据
     [{
          id: 1,
          label: '一级 1',
          children: [
            {
              id: 11,
              label: '二级 1-1',
              children: [
                {
                  id: 111,
                  label: '二级 1-1-1'
                }
              ]
            }
          ]
        }]
     *
     * @param {number} z 父节点的层级
     * @param {number|string} [parentId=null] 父级id
     * 
     */
    standardDataChange(data, z, parentId = null) {
      // 根据构造函数判断是不是数组
      if (data.constructor === Array) {
        data.forEach((item) => {
          // let newNode = item;  这里 如果外部 处理数据不当，会有后续报错风险，
          // 但是，即使通过 assign 处理返回值，由于传入的是引用，还是会有修改问题，还不如直接处理性能优
          if (this.pretreatmentNodeDataFn) this.pretreatmentNodeDataFn(item);
          const node = {
            ...item,
            z,
            parentId
          };

          delete node[this.defaultProps.children];
          this.standardData.push(node);
          const children = item[this.defaultProps.children];
          if (children && children.length > 0) { // 如果有子节点
            this.standardDataChange(children, z + 1, item[this.nodeKey]/*子节点id 作为下一个父节点*/);
          }
        });
      }
    },
    /**
     * 第三步 筛选 标记展示的数据
     * 筛选出可以用于显示的数据 去除 show 为 false 的数据
     */
    getShowNodes() {
      // console.time();
      const nodes = this.filterNodes.filter(item => item.show);
      this.showNodes = nodes;
      this.showNodesLength = nodes.length;
      this.setShowStartAndEnd();
      // console.timeEnd();
    },
    /**
     * 第四步
     * 计算显示的起始位置
     * 根据起始位置获取，在视口内获取展示的数据
     */
    setShowStartAndEnd() {
      if (!this.$refs.tree) return;
      const scrollTop = this.$refs.tree.scrollTop || 0;
      // 树容器的高度
      let { clientHeight } = this.$refs.tree;
      // 包裹树的容器没有高度，则设置包裹树的容器高度初始值
      if (clientHeight === 0 || (this.contentHeight && this.contentHeightUseful)) { // 父级没设置高度 或有contentHeight且有效 的情况
        clientHeight = this.contentHeight > 0 ? this.contentHeight : 300;
        this.staticHeight = clientHeight;
      }

      if (this.renderAll) { // 如果设置了全量渲染，就直接渲染全部
        this.showStart = 0;
        this.showEnd = this.showNodesLength;
      } else {
        // 可视区域的长度是固定的
        const visibleCount = Math.ceil(clientHeight / this.itemHeight);
        this.showStart = Math.floor(scrollTop / this.itemHeight);
        // 所以可视区域展示树节点数量就是开始的位置索引 + 可视区域可以展示节点数量
        this.showEnd = this.showStart + visibleCount;
      }
      this.getTrueShowNodes();
    },
    /**
    * 第五步
    * 根据起始位置获取需要展示的真正节点
    * 遍历获取实际显示的 dom
    *
    */
    getTrueShowNodes() {
      this.trueShowNodes = this.showNodes.slice(this.showStart, this.showEnd);
    },

    /**
     * 展开默认展开项
     *
     */
    goDefaultExpand() {
      const keys = this.defaultExpandedKeys;
      const expandKeys = [];
      const expandMap = {};
      if (keys.length > 30) {
        console.warn('[Megvii tree] the length of defaultExpandedKeys limited at 30');
        return;
      }
      // 找到父级
      keys.forEach((key) => {
        const node = this.nodesMap[key];
        if (!node.isLeaf && !expandMap[node.nodeId]) { // 非叶子节点才设置展开处理
          node.idPath.forEach((parentId) => {
            if (!expandMap[parentId]) {
              expandKeys.push(parentId);
              expandMap[parentId] = 1;
            }
          });
          expandKeys.push(key);
          expandMap[key] = 1;
        }
      });

      this.rederNodes.forEach((item) => {
        const parentId = item.idPath[item.idPath.length - 1];

        if (expandMap[item.nodeId]) { // 设置要展开的项
          item.show = true;
          item.collapse = false;
        } else if (expandMap[parentId]) { // 如果父级是要展开的，则显示，这里可以不判断parentId是否存在，因为如果是 undefined,那么这个判断也不会过
          item.show = true;
          item.collapse = true;
        } else {
          // 其余情况设置收起，并不显示，顶级一定要显示的，所以用了 parentId 来判断
          item.show = !item.parentId && item.parentId !== 0;
          item.collapse = true;
        }
      });
    },

    /**
     * 对外提供的 数据筛选方法
     * @param {string|number} searchText 需要筛选的字段
     */
    filter(searchText) {
      const filterNodes = [];
      const filterKeysObj = {};
      // 需要筛选的情况
      if (searchText || searchText === 0) {
        // 获取全部的筛选出的 ids
        this.rederNodes.forEach((ele) => {
          // 由于有些数据被修改过，这里需要重置一下
          ele.show = true;
          ele.collapse = false;
          ele.filtered = false;
          //  加入 filter-node-method 替代 indexOf 简单判断
          let filtered = false;
          if (this.filterNodeMethod) {
            filtered = this.filterNodeMethod(searchText, ele);
          } else {
            filtered = new RegExp(escapeRegexpString(searchText), 'i').test(`${ele.label}`);
          }
          // 如果是searchLeafModel 模式，就只对参与统计的叶子节点去筛选
          const canFilter = !this.searchLeafModel || (ele.isLeaf && !ele.noStatistics);
          if (canFilter && filtered && !filterKeysObj[ele.nodeId]) {
            if (!this.searchLeafModel && ele.idPath) {
              ele.idPath.forEach((id) => {
                if (!filterKeysObj[id]) {
                  filterKeysObj[id] = 1;
                  filterNodes.push(this.nodesMap[id]);
                }
              });
            }
            filterKeysObj[ele.nodeId] = 1;
            filterNodes.push(ele);
          }
        });

        filterNodes.forEach((item, index) => {
          // 当查找到非叶子节点的时候，标记未收起状态，并用 filtered 标记其子集数据已被筛选掉了
          if ((index + 1 === filterNodes.length || (filterNodes[index + 1] && item.z >= filterNodes[index + 1].z)) && !item.isLeaf) {
            item.collapse = true;
            item.filtered = true;
          }
        });
        this.filterNodes = filterNodes;
        if (this.searchLeafModel) this.searchLeafModelOn = true;
        // filterNodes;
      } else { // 不需要筛选的情况 由于有些数据被修改过，这里需要重置一下 全部展开
        this.searchLeafModelOn = false;
        this.rederNodes.forEach((item) => {
          item.show = true;
          item.collapse = false;
          item.filtered = false;
        });
        // 如果是异步加载，则通过goDefaultExpand实现全部收起
        if (this.lazy) this.goDefaultExpand();
        this.filterNodes = [...this.rederNodes];
      }
      if (this.$refs.tree) this.$refs.tree.scrollTop = 0;
      // 筛选完以后，重新遍历出需要显示的数据
      this.getShowNodes();
      this.$emit('after-filter', [...filterNodes]);
    },

    /**
     * 选择发生改变
     * @param {Object} item 节点
     * @param {boolean} checked 是否选中
     * @param {boolean} [emit=true] 是否向上级派发事件
     */
    checkoutChange(item, checked, emit = true) {
      if (!item || !this.showCheckbox) return;
      item.checked = checked;
      item.indeterminate = false;

      if (!this.checkStrictly) {
        this.checkChildrenChecked(item, checked);
        this.checkParentChecked(item.idPath);
      }
      if (emit) {
        this.$emit('check-change', { ...item }, item.checked);
      }
    },

    /**
     * 根据子节点设置父级的选中状态
     * @param {Array.<string|number>} idPath 父节点id的合集
     */
    checkParentChecked(idPath) {
      if (!idPath || idPath.length === 0) return;
      let childrenAllChecked = true;
      let childSomeChecked = false;
      // 倒着遍历，减少计算父级状态的次数
      for (let i = idPath.length - 1; i >= 0; i -= 1) {
        const parentId = idPath[i];
        const parentNode = this.nodesMap[parentId];

        if (!childrenAllChecked && childSomeChecked) { // 如果是半选，上级也一定是半选，就不用再遍历了
          //
        } else {
        // 遍历父级节点之后的节点
          for (let j = (parentNode.index + 1); j < this.rederNodes.length; j += 1) {
            const ele = this.rederNodes[j];
            // 找到节点的父节点id和比较的父节点id 相同的节点，而且层级比当前父节点深的节点，一定是当前父节点的子节点
            if (ele.z > parentNode.z && ele.parentId === parentNode.nodeId) {
              // 直接子集
              // 判断子节点有没有勾选，没有勾选，全选就是false
              if (!ele.checked) childrenAllChecked = false;
              // 有勾选 是部分勾选 也就是半选状态
              if (ele.checked || ele.indeterminate) childSomeChecked = true; // 子集有选中的
            }
            if (ele.z <= parentNode.z) {
              break;
            }
          }
        }
        // 都不成立就是全选，父节点状态是勾选状态
        parentNode.checked = childrenAllChecked;

        if (!childrenAllChecked && childSomeChecked) {
          parentNode.indeterminate = true;
        } else {
          parentNode.indeterminate = false;
        }
      }
    },

    /**
     * 改变子集选中状态
     * @param {Object} item 节点
     * @param {boolean} checked 是否选中
     */
    checkChildrenChecked(item, checked) {
      if (!item) return;
      // console.log(item.index);
      for (let i = (item.index + 1); i < this.rederNodes.length; i += 1) {
        const ele = this.rederNodes[i];
        if (ele.z > item.z) {
          ele.checked = checked;
          ele.indeterminate = false;
        }
        if (ele.z <= item.z) {
          break;
        }
      }
    },

    /**
     * 异步增加数
     点击加载数据
     * @param { Node } parentNode 父节点
     * @param { Array } data 子节点数据
     * @returns
     */
    apendData(parentNode, data) {
      // 只响应第一次异步结果 展开过已经记载过谁，再次点击不用展开
      if (!parentNode.loaded) {
        parentNode.loading = false;
        // 标记已经异步加载过
        parentNode.loaded = true;
        // 如果没传或者穿空，则表示当前为叶子节点，没有下级
        if (!data || !data.length) {
          parentNode.noStatistics = true; // 这种情况，虽然变成叶子节点，但是预期设定一定不是叶子节点，如果是真叶子节点，就不会再加载子集，所以这里强制纳入不统计。
          parentNode.isLeaf = !!parentNode.noChildNodes;
        } else {
          // 标记父级已经有子节点了
          parentNode.noChildNodes = false;

          let lastChild = parentNode;
          for (let i = parentNode.index + 1; i < this.rederNodes.length; i += 1) {
            const ele = this.rederNodes[i];
            if (ele.z > parentNode.z) {
              lastChild = ele;
            } else {
              break;
            }
          }

          const nodes = [];
          data.forEach((node, index) => {
            const newNode = {
              ...node,
              z: parentNode.z + 1,
              noChildNodes: true,
              parentId: parentNode.nodeId,
              loading: false,
              collapse: true,
              show: true,
              indeterminate: false,
              checked: this.checkStrictly ? false : parentNode.checked,
              filtered: false,
              isLeaf: false,
              count: 0,
              selectCount: 0,
              index: index + lastChild.index + 1,// 自动生成序列，从最后一个子节点往后面排列
              data: node
            };

            if (!node[this.nodeKey] && node[this.nodeKey] !== 0) throw new Error('there is no value for nodeKey !');
            newNode.nodeId = node[this.nodeKey];

            // 对于undefined 处理成 '', 其他情况转变成字符串，用于后续查找
            newNode.label = node[this.defaultProps.label] === undefined ? '' : `${node[this.defaultProps.label]}`;

            newNode.idPath = [...parentNode.idPath, parentNode.nodeId];

            // 判断是否叶子节点
            if (node.isLeaf) newNode.isLeaf = true;

            nodes.push(newNode);
            this.nodesMap[newNode.nodeId] = newNode;
          });

          // 处理后的数据添加如全局数据, 处理后续 index
          // 最后的子集后面所有节点序列号都往后顺延
          for (let i = lastChild.index + 1; i < this.rederNodes.length; i += 1) {
            this.rederNodes[i].index = i + nodes.length;
          }
          // 从最后节点位置插入新的节点数据
          this.rederNodes.splice(lastChild.index + 1, 0, ...nodes);

          const insertIndex = this.filterNodes.indexOf(lastChild);
          if (!parentNode.filtered) this.filterNodes.splice(insertIndex + 1, 0, ...nodes);
        }
        // 对于原来有子节点数据，但是展开之后如果未加载数据，也要展开，所以放到了判空之外处理
        parentNode.collapse = !parentNode.collapse;
        this.goCollapse(parentNode, false);

        this.$nextTick(() => {
          if (data && data.length) this.$emit('tree-update-ready', this.rederNodes);
        });
      }
    },

    /**
     * 折叠
     * 子节点的点击事件
     * @param {Object} item 节点
     * @param {Boolean} emit 是否 emit 展开收起事件
     */
    goCollapse(item, emit = true) {
      if (item.isLeaf) return; // 如果是叶子节点，不出发展开收起操作
      item.collapse = !item.collapse;
      if (emit) this.$emit('node-collapse-change', item.collapse, item);

      // 如果是异步，则需要异步加载数据
      if (!item.collapse && this.lazy && !item.loaded) {
        item.loading = true;
        const resolve = (data) => {
          // 回调函数，data 数据从外面传进来，然后加载到父节点中，作为子节点
          // 此处的闭包，可能因为外部会调一直不执行而导致内存泄露，还有优化空间
          this.apendData(item, data);
        };
        this.$emit('load', item, resolve);
        return;
      }
      item.loading = false;

      // 非异步情况
      const filteredNodes = [];
      let latestZ = 0;
      let latestParentNode = null;

      for (let j = (item.index + 1); j < this.rederNodes.length; j += 1) {
        const ele = this.rederNodes[j];
        if (ele.z > item.z) {
          // 子集
          if (item.filtered && !item.collapse) { // 如果是筛选的情况，如果展开，需要把子集推进去
            ele.collapse = true; // 将子集都收起，以免展开时全部展开影响体验
            filteredNodes.push(ele);
          }
          if (!item.collapse) { // 展开的情况
            // 缓存上级 node
            if (!latestParentNode || ele.z > latestZ) {
              latestParentNode = this.rederNodes[j - 1];
              latestZ = ele.z;
            } else if (ele.z < latestZ) {
              latestParentNode = this.nodesMap[ele.idPath[ele.idPath.length - 1]];
              latestZ = ele.z;
            }
            // 根据上级的展开收起状态来看是否显示
            if (!latestParentNode.collapse && latestParentNode.show) {
              ele.show = true;
            } else {
              ele.show = false;
            }
          } else { // 收起的情况
            ele.show = false;
          }
        }
        if (ele && ele.z <= item.z) {
          break;
        }
      }

      if (item.filtered) { // 如果是筛选的情况，如果展开，需要把子集推进去
        const insertIndex = this.filterNodes.indexOf(item);
        this.filterNodes.splice(insertIndex + 1, 0, ...filteredNodes);
        item.filtered = false;
      }

      this.getShowNodes();
    },

    /**
     * 点击一行
     * @param {Object} item 节点
     */
    clickItem(item) {
      const disabled = this.ifDisabled(item);
      if (!disabled) this.currentNode = item;
      if (this.expandOnClickNode) this.goCollapse(item);
      if (this.checkOnClickNode && !disabled) this.checkoutChange(item, !item.checked);
      if (!disabled) this.$emit('node-click', item, item.data);
    },

    /**
     * 拖拽开始
     * @param {Object} e 事件对象
     * @param {Object} item 节点
     */
    handleDragStart(e, item) {
      this.dragingItem = item;
      e.dataTransfer.setData('draggingData', JSON.stringify(item.data));
      e.dataTransfer.setData('mapData', JSON.stringify(item.data)); // 如果你看到这里，不要觉得奇怪为什么写了两个，是为了适应以前的树拖拽，友情添加的data。
      this.$emit('node-drag-start', item, e);
    },

    /**
     * 拖拽放下
     * @param {Object} e 事件对象
     * @param {Object} item 节点
     */
    handleDrop(e, item) {
      this.clearDragData();
      this.$emit('node-drop', this.dragingItem ? this.dragingItem.data : undefined, item.data, this.dropType, e);
    },

    /**
     * 拖拽到目标 item 上
     * @param {Object} e 事件对象
     * @param {Object} item 节点
     * @param {number} index 节点的 index
     */
    handleDragOver(e, item, index) {
      if (!this.draggable && !this.dropable) return; // 既非可拖拽，也非可放置
      if (!this.dropable && !this.dragingItem) return; // 外部拖入的情况，如果内部设置成了可拖拽，那么要禁止外部拖入的情况

      // 在可拖拽情况下，两种情况可放 1、设置了可放置，且非内部拖入的情况。2、内部拖拽，目标节点非拖动节点，且拖动节点非目标节点的父节点
      if ((this.dropable && !this.dragingItem) || (item.nodeId !== this.dragingItem.nodeId && item.idPath.indexOf(this.dragingItem.nodeId) === -1)) {
        this.willDropId = item.nodeId;

        // 换算拖放类型
        if (e.offsetY < this.itemHeight / 3) {
          this.dropType = 'before';
        } else if (e.offsetY > this.itemHeight * 2 / 3) {
          if (this.trueShowNodes[index + 1] && item.z < this.trueShowNodes[index + 1].z) { // 如果是父级的情况，应该不能拖放
            this.willDropId = '';
            this.dropType = '';
            return;
          }
          this.dropType = 'after';
        } else {
          this.dropType = 'inner';
        }

        e.preventDefault();
      } else {
        this.willDropId = '';
        this.dropType = '';
      }
    },

    /**
     * 拖拽结束
     * @param {Object} e 事件对象
     * @param {Object} item 节点
     */
    handleDragEnd(e, item) {
      this.clearDragData();
      this.$emit('node-drag-end', item, e);
    },

    /**
     * 清理拖拽过程中的数据
     */
    clearDragData() {
      // 这里加 timer 上为了让拖拽的数据保留一会儿，让拖拽事件把数据传出去再清除
      setTimeout(() => {
        this.dragingItem = '';
        this.willDropId = '';
        this.dropType = '';
      }, 200);
    },

    /**
     * 全部的选中状态设置 (如果参数传 true,表示全部选择)
     *
     */
    setAllCheckedState(checked = false) {
      this.rederNodes.forEach((node) => {
        node.checked = checked;
        node.indeterminate = false;
      });
    },

    /**
     * 节点是否禁用
     * @param { Object } node 需要判断的节点
     * @returns
     */
    ifDisabled(node) {
      return typeof this.props.disabled === 'function' ? this.props.disabled(node, node.data) : node.disabled;
    },

    /**
     * 以下为向外暴露的方法
     *
     * 获取当前项 key
     * @return {string|number:id}
     */
    getCurrentKey() {
      return this.currentNode ? this.currentNode.nodeId : null;
    },

    /**
     * 设置当前项 key
     * @param {string|number} key 节点id
     */
    setCurrentKey(key) {
      if (!key && key !== 0) {
        this.currentNode = null;
      } else {
        this.currentNode = this.nodesMap[key] || null;
      }
    },

    /**
     * 获取当前项 node
     * @return {Object:node}
     */
    getCurrentNode() {
      return this.currentNode;
    },

    /**
     * 设置当前项 node
     * @param {Object} node 节点
     */
    setCurrentNode(node) {
      this.currentNode = node;
    },

    /**
     * 获取选中项 nodes
     * @param {Function} filter 后置过滤方法
     * @param {Boolean} leafOnly 是否只返回叶子节点
     * @return {Array.<Object:node>}
     */
    getCheckedNodes(filter, leafOnly) {
      if (filter === true && leafOnly === undefined) {
        leafOnly = filter;
        filter = undefined;
      }
      const nodes = [];
      this.rederNodes.forEach((node) => {
        if (node.checked && (!leafOnly || node.isLeaf)) {
          if (!filter || (typeof filter === 'function' && filter(node))) nodes.push(node);
        }
      });
      return nodes;
    },

    /**
     * 获取选中项 keys
     * @param {Function} filter 后置过滤方法
     * @param {Boolean} leafOnly 是否只返回叶子节点
     * @return {Array.<string|number:id>}
     */
    getCheckedKeys(filter, leafOnly) {
      if (filter === true && leafOnly === undefined) {
        leafOnly = filter;
        filter = undefined;
      }
      const keys = [];
      this.rederNodes.forEach((node) => {
        if (node.checked && (!leafOnly || node.isLeaf)) {
          if (!filter || (typeof filter === 'function' && filter(node))) keys.push(node.nodeId);
        }
      });
      return keys;
    },

    /**
     * 获取半选项 nodes
     * @param {Function} filter 后置过滤方法
     * @return {Array.<Object:node>}
     */
    getHalfCheckedNodes(filter) {
      const nodes = [];
      this.rederNodes.forEach((node) => {
        if (node.indeterminate) {
          if (!filter || (typeof filter === 'function' && filter(node))) nodes.push(node);
        }
      });
      return nodes;
    },

    /**
     * 获取半选项 keys
     * @param {Function} filter 后置过滤方法
     * @return {Array.<string|number:id>}
     */
    getHalfCheckedKeys(filter) {
      const keys = [];
      this.rederNodes.forEach((node) => {
        if (node.indeterminate) {
          if (!filter || (typeof filter === 'function' && filter(node))) keys.push(node.nodeId);
        }
      });
      return keys;
    },

    /**
     * 设置选中项 keys
     * @param {Array.<string|number>} keys 需要选中的id数组 传null 或 [] 则是取消选中
     * @param {boolean} [noCheckOthers=true] （内部使用）是否去除其他项的选中 noCheckOthers参数的意义是为了当是 defaultCheckedKeys 的时候减少计算
     * @param {boolean} checked (内部使用) 是否选中，默认选中
     */
    setCheckedKeys(keys, noCheckOthers = true, checked = true) {
      if (!keys) {
        this.setAllCheckedState(false);
        return;
      }
      // 全选
      if (keys === 'ALL') {
        this.setAllCheckedState(checked);
        return;
      }
      if (keys.constructor !== Array) throw new Error('keys must be an Array');
      if (noCheckOthers) this.setAllCheckedState(false);

      if (this.checkStrictly) { // 如果是不联动选择
        keys.forEach((key) => {
          this.checkoutChange(this.nodesMap[key], checked, false);
        });
        return;
      }

      const newNodes = [];
      const nodesMap = {};
      const faterNodeCheckBuffer = [];
      const faterNodeCheckBufferMap = {};
      // 由于联动选择的计算性能不高，所以，需要避免重复操作
      // 生产 map 减少比对次数
      keys.forEach((key) => {
        nodesMap[key] = 1;
      });
      // 遍历去除不用设置的 key 并 设置父级选中状态 buffer
      keys.forEach((key) => {
        const node = this.nodesMap[key];
        if (node && node.idPath) {
          let push = true;
          node.idPath.forEach((parentId) => { // 如果父级已经存在于需要选中的当中，自己就不用再去设置选中了
            if (nodesMap[parentId]) push = false;
          });
          if (push) {
            newNodes.push(node);
            // 需要将父级缓存下来
            node.idPath.forEach((parentId) => {
              if (!faterNodeCheckBufferMap[parentId]) {
                faterNodeCheckBuffer.push(this.nodesMap[parentId]);
                faterNodeCheckBufferMap[parentId] = 1;
              }
            });
          }
        }
      });

      // 批量设置选中的方法（方法内部使用）
      const checkoutChangeMany = (item, checked) => { // eslint-disable-line
        if (!item) return;
        item.checked = checked;
        item.indeterminate = false;
        if (!this.checkStrictly) {
          if (!item.isLeaf) this.checkChildrenChecked(item, checked);
        }
      };

      // 开始设置选中
      newNodes.forEach((node) => {
        checkoutChangeMany(node, checked);
      });

      // 开始父级 buffer 的处理
      const newBuffer = faterNodeCheckBuffer.sort((a, b) => b.z - a.z);
      newBuffer.forEach((node) => {
        this.checkParentChecked([node.nodeId]);
      });
    },

    /**
     * 设置选中项 nodes
     * @param {Array.<Object>} nodes 需要选中的节点数组 传null 或 [] 则是取消选中
     */
    setCheckedNodes(nodes) {
      if (!nodes || nodes.length === 0) {
        this.setAllCheckedState(false);
        return;
      }
      // 全选
      if (nodes === 'ALL') {
        this.setAllCheckedState(true);
        return;
      }
      if (nodes.constructor !== Array) throw new Error('nodes must be an Array');
      const keys = nodes.map(node => node.nodeId);
      this.setCheckedKeys(keys);
    },

    /**
     * 设置某个节点的选中状态
     * @param {string|number} key 节点 id
     * @param {boolean} checked 选中状态
     */
    setChecked(key, checked) {
      this.checkoutChange(this.nodesMap[key], checked, false);
    },

    /**
     * 强制刷新 高度  如果传了高度，会以此高度为content-height进行渲染，如果没传，将再次获取树的实际高度重新渲染
     * @param {number} height 树外层高度
     */
    forceRenderHeight(height) {
      this.forceHeight = height > 0 ? height : 0;
      this.contentHeightUseful = false;
      this.staticHeight = 0;
      this.$nextTick(() => {
        this.setShowStartAndEnd();
      });
    },
    resize(height) {
      this.forceRenderHeight(height);
    },

    /**
     * 根据 id 设置某个节点的参数
     * @param {string|number} key 节点id
     * @param {string} name 节点的属性名
     * @param {*} value 节点的属性只
     */
    setNodeAttributeByKey(key, name, value) {
      const node = this.nodesMap[key] || null;
      if (!node) return;
      this.$set(node, name, value);
    },

    /**
     * 根据 id 获取节点
     * @param {string|number} key 节点id
     */
    getNode(key) {
      return this.nodesMap[key] || null;
    },

    /**
     * 根据 id 设置子节点选中状态
     * @param {string|number} parentKey 节点id
     * @param {boolean} checked 选中状态
     */
    setChildrenChecked(parentKey, checked) {
      this.checkChildrenChecked(this.nodesMap[parentKey], checked);
    },

    /**
     * 手动设置树数据
     * @param { Array } data
     * @returns
     */
    setData(data) {
      this.dataChange(data);
    },
  }
};
</script>
