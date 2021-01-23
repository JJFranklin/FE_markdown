<template>
    <div class='menus'>
        <div class="menu" v-for="(menu,index) in menus" :key="index">
            <div class="title" @click.stop="changeTab(index)">{{menu.title}}</div>
            <div class="menu-detail" v-if="menu.show"> 
                <div v-for="(item,findex) in menu.detail" :key="findex" @click.stop="del(findex,index)">{{item}}~{{findex+1}}</div>
            </div>
        </div>

    </div>
</template>

<script>
export default {
    props:{
        count:{
            type:Number,
            default:0
        },
        newMenus:{
            type:Object,
            default:function(){
                return {}
            }
        }
    },
    data() {
        return {
            curIndex:0,
            menus:[
                {
                    title:"菜单1",
                    detail:["1",4,5,6,7,8,9]
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
    created() {
        console.log(`运行次${this.count}次数：`,this.count,this.newMenus);
        this.menus = this.menus.map((menu,index)=>{
            menu.show = index == 0;
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
        },
        del(findex,index){
            this.menus[index].detail.splice(findex,1);
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
<<<<<<< Updated upstream:Apllo/vue2/components/menu.vue
        div{
            cursor: pointer;
        }
=======
>>>>>>> Stashed changes:Apllo/components/menu.vue
    }
}

</style>
