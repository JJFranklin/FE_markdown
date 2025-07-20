<template>
  <a-button @click="operate({})" type="primary">添加</a-button>
  <a-table :columns="columns" :data="tableData">
    <template #operate="{ record }">
      <a-button @click="operate(record)" type="primary">编辑</a-button>
    </template>
  </a-table>

  <EditDialog v-model:visible="dialogVisible" :editData="curRow"></EditDialog>
</template>

<script setup>
import EditDialog from '../components/edit.vue';
import { reactive, ref, toRefs } from 'vue';
const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
  },
  {
    title: 'Salary',
    dataIndex: 'salary',
  },
  {
    title: 'Address',
    dataIndex: 'address',
  },
  {
    title: 'Email',
    dataIndex: 'email',
  },
  {
    title: '操作',
    slotName: 'operate'
  },
];
const tableData = ref([{
  key: '1',
  name: 'Jane Doe',
  salary: 23000,
  address: '32 Park Road, London',
  email: 'jane.doe@example.com'
}, {
  key: '2',
  name: 'Alisa Ross',
  salary: 25000,
  address: '35 Park Road, London',
  email: 'alisa.ross@example.com'
}, {
  key: '3',
  name: 'Kevin Sandra',
  salary: 22000,
  address: '31 Park Road, London',
  email: 'kevin.sandra@example.com'
}, {
  key: '4',
  name: 'Ed Hellen',
  salary: 17000,
  address: '42 Park Road, London',
  email: 'ed.hellen@example.com'
}, {
  key: '5',
  name: 'William Smith',
  salary: 27000,
  address: '62 Park Road, London',
  email: 'william.smith@example.com'
}]);

const dialogVisible = ref(false);
const curRow = ref({});
const operate = (record) => {
  curRow.value = record;
  if (record.key) {
    curRow.value.keys = [1, 2];
    curRow.value.opts = [
      {
        name: 'baobai=1',
        key: 1,

      },
      {
        name: 'baobai=2',
        key: 2,

      },
      {
        name: 'baobai=3',
        key: 3,
      }
    ];
  }

  dialogVisible.value = true;
  // setTimeout(() => {
  //   curRow.value = record;
  //   if (record.key) {
  //     curRow.value.keys = [1, 2];
  //     curRow.value.opts = [
  //       {
  //         name: 'baobai=1',
  //         key: 1,

  //       },
  //       {
  //         name: 'baobai=2',
  //         key: 2,

  //       },
  //       {
  //         name: 'baobai=3',
  //         key: 3,
  //       }
  //     ];
  //   }

  //   dialogVisible.value = true;

  // }, 1000);

}
</script>

<style scoped lang='scss'></style>