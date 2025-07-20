// 搜索表单配置
export const searchConfig = [
  {
    label: '用户名',
    prop: 'username',
    type: 'input',
    placeholder: '请输入用户名',
    span: 5
  },
  {
    label: '状态',
    prop: 'status',
    type: 'select',
    options: [
      { label: '全部', value: '' },
      { label: '启用', value: 1 },
      { label: '禁用', value: 0 }
    ],
    span: 5
  },
  {
    label: '创建时间',
    prop: 'createTime',
    type: 'daterange',
    props: {
      type: 'daterange',
      'start-placeholder': '开始日期',
      'end-placeholder': '结束日期'
    },
    span: 6
  }
]

// 表格列配置
export const tableColumns = [
  {
    prop: 'id',
    label: 'ID',
    align: 'center',
    width: 80
  },
  {
    prop: 'username',
    label: '用户名',
    align: 'center',
    width: 150
  },
  {
    prop: 'email',
    label: '邮箱',
    width: 200
  },
  {
    prop: 'role',
    label: '角色',
    width: 120
  },
  {
    prop: 'status',
    label: '状态',
    width: 100,
    formatter: (row) => row.status === 1 ? '启用' : '禁用'
  },
  {
    prop: 'createTime',
    label: '创建时间',
    width: 180
  },
  {
    prop: 'custom',
    label: '自定义列',
    slot: 'customColumn' // 使用插槽自定义
  }
]

// 操作列配置
export const operationConfig = {
  width: 200,
  buttons: [
    {
      label: '编辑',
      icon: 'Edit',
      event: 'edit',
      type: 'primary'
    },
    {
      label: '删除',
      icon: 'Delete',
      event: 'delete',
      type: 'danger'
    },
    {
      label: '查看',
      icon: 'View',
      event: 'view',
      type: 'success'
    }
  ]
}