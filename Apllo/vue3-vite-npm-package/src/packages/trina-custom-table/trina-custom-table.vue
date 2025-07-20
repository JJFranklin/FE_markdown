<template>
  <div class="search-table-container">
    <!-- 搜索表单 -->
    <el-form :model="searchForm" ref="searchFormRef" label-width="100px">
      <el-row>
        <el-col v-for="(item, index) in searchConfig" :key="index" :span="item.span || 5">
          <el-form-item :label="item.label" :prop="item.prop">
            <!-- 动态渲染表单项 -->
            <component :is="getSearchComponent(item.type)" v-model="searchForm[item.prop]" v-bind="item.props || {}"
              :placeholder="item.placeholder || `请输入${item.label}`">
              <template v-if="item.type === 'select'">
                <el-option v-for="opt in item.options" :key="opt.value" :label="opt.label" :value="opt.value" />
              </template>
            </component>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item>
            <el-button type="primary" @click="handleSearch">
              <el-icon>
                <Search />
              </el-icon> 查询
            </el-button>
            <el-button @click="handleReset">
              <el-icon>
                <Refresh />
              </el-icon> 重置
            </el-button>
            <el-button type="success" @click="handleAdd">
              <el-icon>
                <Plus />
              </el-icon> 新增
            </el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <!-- 数据表格 -->
    <el-table :data="tableData" v-loading="loading" border stripe style="width: 100%">
      <template v-for="column in tableColumns" :key="column.prop">
        <!-- 自定义插槽列 -->
        <el-table-column v-if="column.slot" :prop="column.prop" :label="column.label" :width="column.width" :align="column.align">
          <template #default="scope">
            <slot :name="column.slot" :row="scope.row"></slot>
          </template>
        </el-table-column>

        <!-- 普通列 -->
        <el-table-column v-else :prop="column.prop" :label="column.label" :width="column.width" :formatter="column.formatter" :align="column.align" />
      </template>

      <!-- 操作列 -->
      <el-table-column v-if="operationConfig && operationConfig.buttons" label="操作" align="center"
        :width="operationConfig.width || 180" fixed="right">
        <template #default="scope">
          <el-button v-for="(btn, index) in operationConfig.buttons" :key="index" :type="btn.type || 'primary'"
            :size="btn.size || 'small'" @click="handleOperation(btn.event, scope.row)">
            {{ btn.label }}
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页组件 -->
    <div class="pagination">
      <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize" :page-sizes="[10, 20, 50, 100]"
        layout="total, sizes, prev, pager, next, jumper" :total="total" @size-change="handleSizeChange"
        @current-change="handleCurrentChange" />
    </div>

    <!-- 新增/编辑弹窗 -->
    <el-dialog v-model="dialogVisible" :title="dialogTitle" width="600px" destroy-on-close>
      <slot name="dialog" :form="dialogForm"></slot>
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleDialogSubmit">
          确认
        </el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive, computed, watch } from 'vue'
import { Search, Refresh, Plus } from '@element-plus/icons-vue'

const props = defineProps({
  // 搜索配置
  searchConfig: {
    type: Array,
    required: true,
    default: () => []
  },
  // 表格列配置
  tableColumns: {
    type: Array,
    required: true,
    default: () => []
  },
  // 操作列配置
  operationConfig: {
    type: Object,
    default: () => ({})
  },
  // 表格数据
  tableData: {
    type: Array,
    required: true,
    default: () => []
  },
  // 分页总数
  total: {
    type: Number,
    default: 0
  },
  // 加载状态
  loading: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits([
  'search',
  'reset',
  'add',
  'edit',
  'delete',
  'operation',
  'page-change',
  'dialog-submit'
])

// 初始化搜索表单
const initSearchForm = () => {
  const form = {}
  props.searchConfig.forEach(item => {
    form[item.prop] = item.defaultValue || ''
  })
  return form
}

const searchFormRef = ref(null)
const searchForm = reactive(initSearchForm())
const currentPage = ref(1)
const pageSize = ref(10)
const dialogVisible = ref(false)
const dialogForm = ref({})
const dialogType = ref('add')
const dialogTitle = computed(() => dialogType.value === 'add' ? '新增数据' : '编辑数据')

// 获取搜索组件类型
const getSearchComponent = (type) => {
  const componentMap = {
    input: 'el-input',
    select: 'el-select',
    date: 'el-date-picker',
    datetime: 'el-date-picker',
    daterange: 'el-date-picker'
  }
  return componentMap[type] || 'el-input'
}

// 搜索处理
const handleSearch = () => {
  currentPage.value = 1
  emit('search', searchForm)
}

// 重置处理
const handleReset = () => {
  searchFormRef.value?.resetFields()
  emit('reset', searchForm)
}

// 新增处理
const handleAdd = () => {
  dialogType.value = 'add'
  dialogForm.value = {}
  dialogVisible.value = true
  emit('add')
}

// 操作按钮处理
const handleOperation = (event, row) => {
  if (event === 'edit') {
    dialogType.value = 'edit'
    dialogForm.value = { ...row }
    dialogVisible.value = true
    emit('edit', row)
  } else {
    emit('operation', event, row)
  }
}

// 弹窗提交
const handleDialogSubmit = () => {
  emit('dialog-submit', dialogType.value, dialogForm.value)
  dialogVisible.value = false
}

// 分页处理
const handleSizeChange = (size) => {
  pageSize.value = size
  emitPageChange()
}

const handleCurrentChange = (page) => {
  currentPage.value = page
  emitPageChange()
}

const emitPageChange = () => {
  emit('page-change', {
    page: currentPage.value,
    size: pageSize.value
  })
}

// 监听外部传入的表格数据变化
watch(() => props.tableData, (newVal) => {
  if (newVal.length === 0 && currentPage.value > 1) {
    currentPage.value -= 1
    emitPageChange()
  }
})
</script>

<style scoped>
.pagination {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
}
</style>