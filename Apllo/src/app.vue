<template>
<div class="wrapper">
    <!-- <he-input></he-input> -->
    <wx-ui-test></wx-ui-test>
</div>
</template>

<script>
import heInput from "@components/he-input";
import WxUiTest from "@components/wx-ui-test";
export default {
    data(){
        return{
        }   
    },
    methods:{
    },
    computed:{
    },
    watch:{
    },
    mounted(){
    },
    components:{
        'he-input':heInput,
        "wx-ui-test":WxUiTest
    }
}
</script>

<style lang='scss'>

</style>