<template>
<div>
    <button @click='btnClick'>子组件</button>
    <slot name="user" :e="obj"></slot>
    <slot name="age" :user="obj">{{obj.age}}</slot>
    <input ref="input" @focus="autofocus"/>
</div>
</template>

<script>
export default {
    props:{
        // parentClick:{
        //     type:Function,
        //     default:function(){}
        // }
    },
    methods:{
        btnClick(){
            this.$emit('pclick','franklin');
            // this.parentClick();
        },
        autofocus(){
            this.$refs.input.focus();
        }
    },
    data(){
        return {
            obj:{
                age:'12dfsfsd3',
                name:'frankoin'
                
            }
                
        }
    }

}
</script>
