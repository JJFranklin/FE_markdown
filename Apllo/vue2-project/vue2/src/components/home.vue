<template>
    <div class=''>
        首页
        <el-button type="" @click="test">测试</el-button>
        {{ msg }}
    </div>
</template>

<script>
export default {
    props: {

    },
    data() {
        return {
            msg: 'woshi'
        };
    },
    methods: {
        test() {
            this.msg = 'shijie';
            this.$bus.$emit("changetheme");
        },
        // 测试自定义的 watch 用字符串的形式调用 自定义方法的情况
        testWatch(){
            console.log('ceshi testWatch');
        }
    },
    computed: {

    },
    watch: {
        msg: {
            handler:'testWatch',
            // immediate:true
        }
    },
    mounted() {
    },
};
</script>

<style scoped lang='scss'></style>
