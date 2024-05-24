<template>
    <div class=''>
        <el-button @click="changeHash">切换hash</el-button>
        <el-button type="primary" @click="changeHistory">切换history</el-button>
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    props: {

    },
    data() {
        return {

        };
    },
    methods: {
        changeHash(){
            // location.hash = "#/chart";
        },
        changeHistory(){
            const state = { 'page_id': 1, 'user_id': 5 };
            const title = '';
            const url = 'hello-world';
            history.pushState(state,title,url);
        }
    },
    computed: {

    },
    watch: {

    },
    mounted() {
        // hash 改变的原理
        window.onhashchange = function(event){
            location.hash = "#/basecomponents/infinityscroll1" 
        };

        window.onpopstate = function(event){
            debugger;
            const state = { 'page_id': 1, 'user_id': 5 };
            const title = '';
            const url = 'hello-world';
            history.pushState(event.state,"",location.pathname);
        }
    },
};
</script>

<style scoped lang='scss'>

</style>
