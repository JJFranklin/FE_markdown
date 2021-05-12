<template>
  <div class="">
    <el-menu>
      <el-menu-item index="1-3" v-for="menu in menus" :key="menu.path">
        <router-link class="router-link" :to="menu.path"
          ><i class="menu-icon" :class="menu.icon"></i
          >{{ menu.name }}</router-link
        >
      </el-menu-item>
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
