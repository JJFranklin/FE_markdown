
export default {
    state: {
        goodAllList: [], // 所有数据
        goodList: [], // 分页数据
        pageInfo: {
            page: 0, // 当前页数据
            size: 20, // 每页的数据
        },
    },
    getters: {
        goodAllList(state, getters, rootstate) {
            return state.goodAllList;
            // 返回1000条数据
        },
        goodList(state) {
            return state.goodList;
        },
        pageInfo(state) {
            return state.pageInfo;
        }
    },
    mutations: {
        getGoodItem(state, result) {
            state.goodAllList = [];
            state.goodList = [];
            let {
                name,
                price,
                des
            } = result;
            for (let i = 0; i < 199; i++) {
                state.goodAllList.push({
                    index: i + 1,
                    name: `${name}${i + 1}`,
                    price: `${price + i}`,
                    des: `第${i + 1}${des}`
                })
            }
        },
        getGoodListByParam(state, params) {
            let {
                page
            } = params;
            let {
                size
            } = state.pageInfo;

            let startPage = page * size;
            let endPage = (page + 1) * size;

            state.pageInfo.page = page;
            state.goodList = state.goodAllList.slice(startPage, endPage);
        }
    },
    actions: {
        getAllGoodList({
            commit,
            dispatch,
            state
        }) {
            return this.$http.get("/api/good.json").then(res => {
                if (200 == res.status) {
                    commit("getGoodItem", res.data)
                }
            }).then(() => {
                commit("getGoodListByParam", {
                    page: 0,
                    size: state.pageInfo.size
                });
            });
        },
        getGoodListByParam({
            commit
        }, params) {
            commit("getGoodListByParam", params);
        }
    }
}