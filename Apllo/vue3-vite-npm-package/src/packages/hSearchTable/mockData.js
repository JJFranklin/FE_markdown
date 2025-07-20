// 模拟表格数据
export const mockTableData = (size = 10) => {
  const data = []
  for (let i = 1; i <= size; i++) {
    data.push({
      id: i,
      username: `user${i}`,
      email: `user${i}@example.com`,
      role: i % 3 === 0 ? '管理员' : '普通用户',
      status: i % 4 === 0 ? 0 : 1,
      createTime: `2023-06-${10 + i % 20} 08:30:00`
    })
  }
  return data
}

// 模拟分页数据
export const getPageData = (page = 1, size = 10) => {
  const total = 85
  const totalPages = Math.ceil(total / size)
  
  if (page > totalPages) {
    page = totalPages
  }
  
  const start = (page - 1) * size
  const end = Math.min(start + size, total)
  
  return {
    total,
    data: mockTableData(end - start)
  }
}