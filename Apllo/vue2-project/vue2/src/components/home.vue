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
            msg:'woshi'

        };
    },
    methods: {
        test(){
            this.msg = 'shijie';
            this.$bus.$emit("changetheme");

        }

    },
    computed: {

    },
    watch: {
        msg:{
            handler(newVal,oldVal){
                console.log('newVal-oldVal',newVal, oldVal);
            },
            // immediate:true
        }
    },
    mounted() {
    },
};
</script>

<style scoped lang='scss'>

</style>
