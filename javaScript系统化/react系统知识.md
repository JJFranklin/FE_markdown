#### React
- bind this
```javascript
在构造函数中每次初始化的时候只执行一次，性能较好
在jsx 中绑定的时候，会每次点击都重新创建一个,性能较差
```
- 事件
```javascript
react事件是合成事件，对原生事件进行了封装，
模拟了document事件，同时屏蔽了浏览器的兼容性
react事件都是挂在document事件上，代理模式，减少资源消耗
```
- 受控组件和非受控组件
```javascript
受控组件：能够被state进行控制的组件
非受控组件：必须通过ref，手动操作dom元素，不能通过state拿到实际数据（文件上传场景）
```
- state 的操作  原则：不可变值
```javascript
1、修改原来的值，只能使用setState来改变，不能使用pop，push ,slice等来改变属性中数组的值，因为会影响到原数组的数据
不影响数据原数据的操作：concat,slice,join
2、可能异步，可能同步（setTimeout和dom 自定义事件中是同步变化，即给state 属性赋值，马上就能拿到新的值）
3、可能合并（this.setState 传入的是对象），不合并的情况传入的是函数，函数不能进行合并，每次都是执行
```
- 高级特性
```javascript
1、受控组件
2、context：传递一些公共信息，可以用于组件间的通信,一般用于包裹根组件，可以作用于所有组件
	2.1、通过provider包裹需要传输的值，通过context接收
	const MyContext = React.createContext("themeValue"); // 创建需要传输的值
	// class 组件接收
	// 父组件包裹
	<MyContext.Provider value={this.state.value/*声明默认值*/}>
  		<Child></Child>
	</MyContext.Provider>

	// 子组件接收
	let theme = this.context; // 第二步，拿到定义的值
		<div>{theme}</div>
	Child.contextType = MyContext  // 第一步，指定接收哪一个context

3、异步组件：路由懒加载、组件比较大的情况
	()=>import("./componentName")); // 异步引入组件
	const componentName = React.lazy(()=>import("./componentName"))) // react 特有 异步引入组件
	<React.Suspense>
		<componentName></componentName>
	</React.Suspense>
4、函数组件和UI组件
 4.1、函数组件，没有状态，没有生命周期，只接受props控制页面进行渲染
	4.2、UI 组件
5、portals : 可以让组件渲染到父组件外面，比如说是 modal 弹窗
	5.1、通过ReactDom.creatPortal(dom,"#id");
6、性能优化 
	6.1、shouldComponentUpdate:默认返回true
		父组件更新，会重新触发render 渲染，子组件也会更新
		因此通过 shouldComponentUpdate,控制子组件进行是否更新
		为什么不建议在其中进行深度比较
	6.2、PureComponent:纯组件，在其中实现了浅比较 React.PureComponent
	6.3、memo:函数组件中的浅比较，声明一个类似 shouldComponentUpdate 的生命周期函数，并注入到函数组件中React.memo(componentName,shouldComponentUpdateCopy/*类似 shouldComponentUpdate 的周期函数*/)
7、公共组件逻辑的抽离
	7.1、HOC 高阶组件：接收一个组件作为参数，通过封装通用的逻辑，然后将封装后的数据给组件参数，并返回一个新的组件。redux 中的connect是高阶组件
	7.2、render.props 抽离出公共的组件部分作为公共组件，在公共的组件中处理公共逻辑，并将render函数作为属性传递给公共的逻辑组件，然后，逻辑组件将自己的state,通过render属性传递给作为属性的render函数要渲染的部分。
	<Parent>
		<Common render={
			/*公共逻辑组件，作为属性的render函数，渲染一个函数组件*/
			(props)=>{
				<div>{...props}</div>
		}></Common>
	</Parent>

	// 公共逻辑组件
	<Common>{this.props.render(this.state)}</Common>
```

#### Redux
1、redux的基本概念和使用
2、异步action
3、单向数据流

#### react-router
1、基本使用
2、hash 和 history 模式


#### React 原理


