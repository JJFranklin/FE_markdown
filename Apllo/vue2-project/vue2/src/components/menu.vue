<template>
  <div class="">
    <el-menu>
        <template v-for="menu in menus" >
            <el-menu-item v-if="!menu.children" :key="menu.path">
                <router-link 
                    class="router-link" 
                    :to="menu.path">
                <i class="menu-icon" :class="menu.icon"></i>{{ menu.name }}
                </router-link>
            </el-menu-item>

            <el-submenu index="1" v-else :key="menu.path">
                <template slot="title">
                    <i :class="menu.icon"></i>
                    <span>{{menu.name}}</span>
                </template>

                <el-menu-item-group>
                  <el-menu-item index="2" v-for="submenu in menu.children" :key="submenu.path">
                       <router-link 
                            class="router-link" 
                            :to="`${menu.path}/${submenu.path}`">
                       {{ submenu.name }}
                        </router-link>
                  </el-menu-item>
                </el-menu-item-group>
              
            </el-submenu>
        </template>
    </el-menu>
  </div> 
</template>

<script>
export default {
  props: {},
  data() {
    return {
      menus: [
        {
          name: "首页",
          path: "/home",
          icon: "el-icon-s-home",
        },
        {
          name: "商店",
          path: "/shop",
          icon: "el-icon-s-shop",
        },
        {
          name: "图表展示",
          path: "/chart",
          icon: "el-icon-s-data",
        },
        {
            name:"基础组件",
            icon:"el-icon-s-platform",
            path:"/basecomponents",
            children:[
                {
                    name:"无限滚动 1",
                    path:"infinityscroll1",
                },
                {
                    name:"无限滚动 2",
                    path:"infinityscroll2"
                }
            ]
        },
        {
          name: "关于我们",
          path: "/about",
          icon: "el-icon-user-solid",
        },
      ],
    };
  },
  methods: {},
  computed: {},
  watch: {},
  mounted() {},
};
</script>

<style scoped lang='scss'>
.router-link {
  display: block;
  text-decoration: none;
  color: #051433;
  .menu-icon {
    margin-right: 8px;
  }
}
.router-link-active {
  color: #409eff;
  .menu-icon {
    color: #409eff;
  }
}
</style>
