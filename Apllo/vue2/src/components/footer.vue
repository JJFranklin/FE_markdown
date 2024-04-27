<template>
    <div class='' @click="testClick">
        企业详细信息
    </div>
</template>

<script>
import EventBus from './eventBus/eventbus';
export default {
    props: {

    },
    data() {
        return {

        };
    },
    methods: {
        testClick(){
            EventBus.$emit('click1');
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
