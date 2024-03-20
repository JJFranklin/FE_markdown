- RESTful

  设计原则


  1、api 请求资源路径里面使用名词
  2、将url设计成资源标识
  3、使用不同的方法标识不同的操作
  4、不适用url 参数

  ```javascript
  https://api.example.com/v1/zoos  // 获取所有动物园信息
  https://api.example.com/v1/animals // 获取所有动物信息
  https://api.example.com/v1/employees // 获取所有雇员信息
  ```

  2、增删查改操作通过不同请求来区分

  ```javascript
  GET（SELECT）：从服务器取出资源（一项或多项）。
  POST（CREATE）：在服务器新建一个资源。
  PUT（UPDATE）：在服务器更新资源（服务端提供改变后的完整资源）。
  PATCH（UPDATE）：在服务器更新资源（客户端提供改变的属性）。
  DELETE（DELETE）：从服务器删除资源。
  ```

- GraphQL 设计原则