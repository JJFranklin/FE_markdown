<template>
  <div class="">
    <ul>
      <li
        :class="[curId == item.id ? 'active' : '']"
        v-for="item in ulData"
        :key="item.id"
        @click="select(item)"
      >
        {{ item.id }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {},
  data() {
    return {
      curId: -1,
      ulData: [
        {
          id: 1,
          name: "1",
        },
        {
          id: 2,
          name: "12",
        },
        {
          id: 3,
          name: "123",
        },
        {
          id: 4,
          name: "1234",
        },
      ],
    };
  },
  methods: {
      select(item){
        this.curId = item.id;
      }
  },
  computed: {},
  watch: {},
  mounted() {},
};
</script>

<style scoped lang='scss'>
ul {
  li {
    display: block;
    color: #051433;
    &.active {
      color: red;
    }
  }
}
</style>



