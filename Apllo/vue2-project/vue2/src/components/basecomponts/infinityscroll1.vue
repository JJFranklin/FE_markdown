
<template>
    <div class="good">
        <div class="row-header">
            <span class="header-title">序号</span>
            <span class="header-title">商品名称</span>
            <span class="header-title">价格</span>
            <span class="header-title">描述</span>
        </div>
        <div class="goodlist" @scroll.passive="debounceScroll">
            <div class="row" v-for="item in list" :key="item.index">
                <span class="good-item no">{{ item.index }}</span>
                <span class="good-item name">{{ item.name }}</span>
                <span class="good-item price">{{ item.price }}</span>
                <span class="good-item des">{{ item.des }}</span>
            </div>
            <div class="loading-container" v-if="isLoading">
                <span class="el-icon-loading"></span>加载中...
            </div>
        </div>
    </div>
</template>

<script>
/**
 * 第一种无限加载的组件，采取分页参数的的形式动态加载组件
 * 1、传递分页加载的参数
 * 2、返回的数据和之前的数据拼接在一起
 * 3、控制控制加载时机，滚动到距离底部多少的时候，发起请求
 * 4、防抖处理，掌握触发时机
 * 5、返回的参数和原来的参数拼接在一起
 * 6、先实现，在留接口
 * ele.scrollHeight 滚动区域的高度，也就实际内容的高度
 * ele.scrollTop  滚动条距离顶部的高度
 * ele.clientHeight 可视区域的高度
 *
 * 滚动条距离底部的距离 ele.scrollHeight - ele.scrollTop - ele.clientHeight
 *
 * 滚动条距离底部一定的距离重新加载数据，思路
 * 1、计算距离滚动条距离底部的距离 实际内容高度（scrollHeight） - 滚动条距离顶部的高度（scrollTop） - 可视内容高度（clientHeight）
 * 2、记录上一次请求是否完成；
 * 3、混动条的滚动方向：通过判断上一次滚动条的位置和现在滚动条的位置
 * 4、记录数据是否加载完毕，避免加载完了，还发送请求
 * 5、每次load完，或者所有数据加载完了，loading 效果去掉
 */
//
import { mapGetters, mapActions, mapState } from "vuex";

export default {
    props: {},
    data() {
        return {
            list: [],
            eleScrollBottom: "",
            scrollTop: 0, // 初始滚动条距离顶部的距离
            triggerBottomHeight: 10,
            loaded: false, // 记录数据是否加载完毕
            isScrollDown: true, // 滚动条滚动方向 up 向上滚动 默认向下滚动 down
            isLoading: false, // 是否出现加载动画
            wait: 500, // 等待时间
        };
    },
    methods: {
        ...mapActions(["getAllGoodList", "getGoodListByParam"]),
        calculateScrollBottom(e) {
            let ele = e.target;
            let eleScrollHeight = ele.scrollHeight;
            let eleClientHight = ele.clientHeight;
            this.isScrollDown = ele.scrollTop - this.scrollTop > 0;
            this.scrollTop = ele.scrollTop;
            this.eleScrollBottom = eleScrollHeight - eleClientHight - this.scrollTop;
        },

        debounceScroll(e) {
            this.loaded = false;
            this.isLoading = this.goodList.length == this.pageInfo.size;
            this.calculateScrollBottom(e);
            if (
                this.eleScrollBottom < this.triggerBottomHeight &&
                // !this.loaded &&
                this.isScrollDown &&
                this.goodList.length == this.pageInfo.size
            ) {
                _.debounce(this.loadMore, this.wait)();
            }
        },
        loadMore() {
            // 模拟分页请求；
            let param = Object.assign({}, { page: this.pageInfo.page + 1 });
            this.getGoodListByParam(param);
            this.list = [...this.list, ...this.goodList];
            this.loaded = true;
            this.isLoading = false;
        },
    },
    computed: {
        ...mapState({
            goodList: (state) => state.good.goodList,
            pageInfo: (state) => state.good.pageInfo,
        }),
    },
    watch: {},
    created() {
        this.list = [];
        // this.getAllGoodList().then((res) => {
        //     this.list = [...this.list, ...this.goodList];
        // });
    },
};
</script>

<style scoped lang='scss'>
.good {
    .goodlist {
        height: 800px;
        overflow-y: auto;
        overflow-x: hidden;
        .row {
            &-header {
                padding: 15px 0;
                background: #f5f7fa;
            }
            padding: 15px 24px;
            box-sizing: border-box;
            border-bottom: 1px solid #eee;
        }
    }
    .good-item,
    .header-title {
        display: inline-block;
        min-width: 120px;
        line-height: 32px;
        height: 32px;
        padding-left: 15px;
        box-sizing: border-box;
        &.no {
            text-align: left;
        }
    }
    .loading-container {
        line-height: 32px;
        height: 32px;
        text-align: center;
    }
}
</style>
