#### dpr
测量出来的像素是 物理像素 = 设备像素，
 css 像素宽度 = 设备宽度
dpr = 设备像素 / css 像素
如果一个 css 像素对应 2 个设备像素，dpr就是 2
window.devicePixelRatio 就是 dpr
视口：内容主要展示的区域

layoutViewport：默认 PC 端网页视口宽度
visiual ViewPort 是设备宽度
ideal viewPort: 始终按照 css的像素宽度来设计，保证每个页面都可以完美呈现给用户。

content="width=device-width" 表示将视口宽度默认设置为 设备宽度或者css像素宽度  iphone678 默认 375 
设置 content="inital-scale=1" 表示以ideal-viewport 的宽度为默认缩放
缩放值 = ideal-width/layout-width
保证在任何的情况先，视口缩放都完美呈现
常见的写法
```html
    <meta name="viewport" content="width=device-width, initial-scale=1.0,maximum-scale=1,minimum-scale=1,user-scalable=no">
```

适配方案
1、vw、vh -> 最新的方案
2、rem 方案
3、百分比方案
4、dpr 适配
5、viewport 方案
6、基于 rem 的 第三方库 hotcss -> px2rem


#### 响应式设计 -> 媒体查询 
1、媒体类型
2、媒体特性
3、逻辑运算符
width、min-width、max-width、orientation、device-pixel-ratio

#### 移动端事件
事件执行顺序
touchstart -> touchmove -> touched -> click

事件穿透原因
这是因为在移动端测览器，事件执行的顺序是 touchstart → touchmove → touched → click。而 cick 事件有 300ms 的延迟，当touchstart 事件把上层元素隐藏之后，隔了300ms，浏览器触发了 click 事件，但是此时上面的元素不见了，所以该事件被派发到了下层元素身上

解决方式
1、取消事件默认的行为 

***移动端开发一开始是默认阻止所有默认行为，后面很多功能都是我们自己去自定义实现。***

