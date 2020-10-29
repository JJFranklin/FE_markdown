<template>
    <div class='he-input_wrapper'>
        <!-- 前缀 -->
        <template></template>
        <input class='he-input' type='text'/>
        <!-- 后缀 -->
        <template></template>

    </div>
    

</template>

<script>
export default {
    name:'heInput',
    data() {
        return {

        };
    },
    computed: {

    },
    mounted() {

    },
    watch: {

    },
    methods: {

    }
};
</script>

<style scoped lang='scss'>
.he-input_wrapper{
    .he-input{
        height: 32px;
        line-height: 32px;
        padding: 8px;
        box-sizing: border-box;
        border:1px solid #b3b8c1;
        border-radius: 4px;
    }
}

</style>
