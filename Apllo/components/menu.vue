<template>
    <div class='menus'>
        <div class="menu" v-for="(menu,index) in menus" :key="index">
            <div class="title" @click.stop="changeTab(index)">{{menu.title}}</div>
            <div class="menu-detail" v-if="menu.show"> 
                <div v-for="(item,findex) in menu.detail" :key="findex">{{item}}</div>
            </div>
        </div>

    </div>
</template>

<script>
export default {
    data() {
        return {
            curIndex:0,
            menus:[
                {
                    title:"菜单1",
                    detail:["1",2,3,4,5]
                },
                {
                    title:"菜单2",
                    detail:["1",2,3,4,5]
                },{
                    title:"菜单3",
                    detail:["1",2,3,4,5]
                }
                
            ]

        };
    },
    computed: {

    },
    mounted() {
        this.menus = this.menus.map((menu,index)=>{
            menu.show = index == 0
            return menu;
        });
    },
    watch: {

    },
    methods: {
        changeTab(curIndex){
            this.menus = this.menus.map((menu,index)=>{
                curIndex == index?menu.show = !menu.show:menu.show = false;
                return menu;
            });
            this.curIndex = curIndex;
        }
    }
};
</script>

<style scoped lang='scss'>
.menu{
    width: 300px;
    height: auto;
    margin-bottom: 8px;
    .title{
        line-height: 32px;
        background: #f2f3f4;
    }
    &-detail{
        height: 120px;
        &.close{
            display: none;
        }
        &.open{
            display: inline-block;
        }
    }
}

</style>
