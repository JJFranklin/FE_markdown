<template>
    <div class=''>
        首页
        <el-button type="" @click="test">测试</el-button>

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
        test(){
            this.$bus.$emit("changetheme");
        }

    },
    computed: {

    },
    watch: {

    },
    mounted() {
    },
};
</script>

<style scoped lang='scss'>

</style>
