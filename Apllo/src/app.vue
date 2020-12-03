<template>
<div class="wrapper">
    <!-- <he-input></he-input> -->
    <!-- <wx-ui-test></wx-ui-test> -->
    <css-track></css-track>
</div>
</template>

<script>
import heInput from "@components/he-input";
import WxUiTest from "@components/wx-ui-test";
import CssTrack from "@components/css-track";
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
        "wx-ui-test":WxUiTest,
        CssTrack,
    }
}
</script>

<style lang='scss'>

</style>