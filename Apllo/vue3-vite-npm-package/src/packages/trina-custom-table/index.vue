<template>
  <div class="page-container">
    <TrinaCustomTable
      :search-config="searchConfig"
      :table-columns="tableColumns"
      :operation-config="operationConfig"
      :table-data="tableData"
      :total="total"
      :loading="loading"
      @search="handleSearch"
      @reset="handleReset"
      @add="handleAdd"
      @operation="handleOperation"
      @page-change="handlePageChange"
      @dialog-submit="handleDialogSubmit"
    >
      <!-- 自定义列插槽 -->
      <template #customColumn="{ row }">
        <el-tag :type="row.status === 1 ? 'success' : 'danger'">
          {{ row.status === 1 ? '正常' : '异常' }}
        </el-tag>
      </template>
      
      <!-- 弹窗内容插槽 -->
      <template #dialog="{ form }">
        <el-form :model="form" label-width="80px">
          <el-form-item label="用户名">
            <el-input v-model="form.username" />
          </el-form-item>
          <el-form-item label="邮箱">
            <el-input v-model="form.email" />
          </el-form-item>
          <el-form-item label="状态">
            <el-switch v-model="form.status" :active-value="1" :inactive-value="0" />
          </el-form-item>
        </el-form>
      </template>
    </TrinaCustomTable>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import TrinaCustomTable from './trina-custom-table.vue'
import { searchConfig, tableColumns, operationConfig } from './config.js'
import { getPageData } from './mock.js'

const loading = ref(false)
const tableData = ref([])
const total = ref(0)

// 初始加载数据
const loadData = (params = {}) => {
  loading.value = true
  setTimeout(() => {
    const { page = 1, size = 10 } = params
    const result = getPageData(page, size)
    tableData.value = result.data
    total.value = result.total
    loading.value = false
  }, 500)
}

onMounted(() => {
  loadData()
})

// 处理搜索
const handleSearch = (form) => {
  console.log('搜索参数:', form)
  loadData({ ...form })
}

// 处理重置
const handleReset = (form) => {
  console.log('重置表单:', form)
  loadData()
}

// 处理新增
const handleAdd = () => {
  console.log('打开新增弹窗')
}

// 处理操作按钮
const handleOperation = (event, row) => {
  console.log('操作事件:', event, '行数据:', row)
  if (event === 'delete') {
    // 这里可以添加删除确认逻辑
    ElMessageBox.confirm('确定删除该记录吗?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(() => {
      ElMessage.success('删除成功')
    }).catch(() => {})
  }
}

// 处理分页变化
const handlePageChange = ({ page, size }) => {
  console.log(`分页变化: 第${page}页, 每页${size}条`)
  loadData({ page, size })
}

// 处理弹窗提交
const handleDialogSubmit = (type, form) => {
  console.log(`${type === 'add' ? '新增' : '编辑'}提交:`, form)
  ElMessage.success(`${type === 'add' ? '新增' : '更新'}成功`)
}
</script>

<style scoped>
</style>